import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail, 
  Phone, 
  Download, 
  Menu, 
  X, 
  ExternalLink, 
  ChevronRight,
  User,
  Layout,
  Briefcase,
  Award,
  LogOut,
  Save,
  Loader2
} from 'lucide-react';
import { ProfileData, Skill } from './types';
import { getProfile, loginAdmin, updateProfile, sendContactForm } from './services/mockApi';

// --- Utils ---

const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const WhatsappIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`lucide lucide-message-circle ${className}`}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

// --- UI Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-6 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    // Yellow background, Dark text for high contrast
    primary: "bg-accent text-slate-900 hover:bg-accent-hover shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    outline: "border-2 border-slate-300 text-slate-300 hover:border-accent hover:text-accent",
    outlineDark: "border-2 border-slate-800 text-slate-700 hover:border-accent hover:text-primary" // For light backgrounds
  };
  
  // Choose correct variant based on prop, default to primary
  const selectedVariant = variants[variant as keyof typeof variants] || variants.primary;

  return (
    <button className={`${baseStyle} ${selectedVariant} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, ...props }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input 
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
      {...props}
    />
  </div>
);

const TextArea = ({ label, ...props }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <textarea 
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all min-h-[120px]"
      {...props}
    />
  </div>
);

// --- Public Pages ---

const Hero = ({ data }: { data: ProfileData }) => (
  <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden text-white">
    {/* Background Image & Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
        alt="Business Dashboard Background" 
        className="w-full h-full object-cover"
      />
      {/* Heavy overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60"></div>
    </div>
    
    <div className="container mx-auto px-6 py-12 flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
      <div className="flex-1 space-y-6 text-center lg:text-left">
        <div className="inline-block px-3 py-1 bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-accent rounded-full text-sm font-semibold tracking-wide mb-2 animate-fade-in">
          Disponible para proyectos
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
          Hola, soy <br/>
          <span className="text-accent">{data.name.split(' ').slice(0, 2).join(' ')}</span>
        </h1>
        <h2 className="text-xl lg:text-2xl text-slate-200 font-medium">
          {data.title}
        </h2>
        <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          {data.summary}
        </p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>
            <Button variant="primary">Contáctame</Button>
          </a>
        </div>
        <div className="flex gap-4 justify-center lg:justify-start pt-6">
          {data.contact.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-accent transition-colors p-2">
              {link.provider === 'linkedin' && <Linkedin size={24} />}
              {link.provider === 'email' && <Mail size={24} />}
              {link.provider === 'whatsapp' && <WhatsappIcon size={24} />}
              {link.provider === 'github' && <Github size={24} />}
              {link.provider === 'twitter' && <Twitter size={24} />}
              {link.provider === 'website' && <Globe size={24} />}
            </a>
          ))}
        </div>
      </div>
      <div className="flex-1 relative flex justify-center lg:justify-end">
        <div className="relative w-64 h-64 lg:w-96 lg:h-96">
          <div className="absolute inset-0 bg-accent rounded-full opacity-20 blur-2xl transform translate-x-4 translate-y-4"></div>
          <div className="absolute -inset-4 border-2 border-slate-700/50 rounded-full opacity-50"></div>
          <img 
            src={data.photo} 
            alt={data.name} 
            className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const About = ({ data }: { data: ProfileData }) => (
  <section id="about" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Sobre Mí</h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-8 rounded"></div>
        <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border-l-4 border-accent">
          <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
            {data.about}
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Skills = ({ skills }: { skills: Skill[] }) => {
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'expert': return 'bg-primary text-accent border-primary'; // Dark blue pill with yellow text
      case 'advanced': return 'bg-white text-primary border-slate-300';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Habilidades</h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded"></div>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`px-5 py-2.5 rounded-full border ${getLevelColor(skill.level)} font-semibold text-sm flex items-center gap-2 shadow-sm transition-transform hover:-translate-y-1`}
            >
              {skill.name}
              {skill.level === 'expert' && <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ projects }: { projects: ProfileData['projects'] }) => (
  <section id="projects" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-primary mb-2 text-center">Proyectos Destacados</h2>
      <div className="w-16 h-1 bg-accent mx-auto mb-12 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-accent/20 transition-all duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-accent uppercase tracking-wide mb-2">{project.role}</span>
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-hover transition-colors">{project.title}</h3>
              <p className="text-slate-600 text-sm mb-4 flex-1">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = ({ contact }: { contact: ProfileData['contact'] }) => {
  const whatsappLink = contact.links.find(l => l.provider === 'whatsapp')?.url;
  const linkedinLink = contact.links.find(l => l.provider === 'linkedin')?.url;

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col text-center p-12 border border-slate-100">
          
          <div className="mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
              <WhatsappIcon size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">¡Hablemos de Negocios!</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded"></div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              ¿Tienes un proyecto en mente o quieres optimizar tus procesos con datos? 
              <br className="hidden md:block" />
              La forma más rápida y directa de contactarme es a través de WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <WhatsappIcon size={24} className="group-hover:scale-110 transition-transform" />
                Conversar por WhatsApp
              </a>
            )}
            {linkedinLink && (
              <a
                href={linkedinLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#0077b5] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#006396] hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
                Ver mi LinkedIn
              </a>
            )}
          </div>

          <div className="pt-8 border-t border-slate-100">
            <p className="text-slate-500 mb-6 text-sm font-medium uppercase tracking-wide">También puedes encontrarme en</p>
            <div className="flex justify-center gap-4">
              {contact.links.map((link, i) => {
                if (link.provider === 'whatsapp' || link.provider === 'linkedin') return null;
                return (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-accent hover:border-primary transition-all duration-300">
                    {link.provider === 'email' && <Mail size={20} />}
                    {link.provider === 'github' && <Github size={20} />}
                    {link.provider === 'twitter' && <Twitter size={20} />}
                    {link.provider === 'website' && <Globe size={20} />}
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = ({ name }: { name: string }) => (
  <footer className="bg-primary text-slate-400 py-10 border-t border-slate-800">
    <div className="container mx-auto px-6 text-center">
      <div className="mb-4">
         <span className="font-bold text-2xl text-accent">
          Business
        </span>
      </div>
      <p>&copy; {new Date().getFullYear()} {name}. Todos los derechos reservados.</p>
    </div>
  </footer>
);

const Navbar = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Contacto', href: '#contact' },
  ];

  // Dynamic text color based on scroll state
  const textColorClass = scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`font-bold text-xl tracking-tight`}>
          <span className="text-accent">Business</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors ${textColorClass}`}
              onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${scrolled ? 'text-slate-800' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-4 flex flex-col items-center gap-4">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-700 font-medium py-2 hover:text-primary"
              onClick={(e) => {
                handleSmoothScroll(e, link.href.substring(1));
                setIsOpen(false);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Admin Components ---

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await loginAdmin(email, password);
    if (success) {
      onLogin();
    } else {
      setError('Credenciales inválidas (Prueba: admin@example.com / password)');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border-t-4 border-primary">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <User size={24} />
          </div>
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
          <p className="text-slate-500 text-sm mt-2">Accede para editar tu perfil</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e: any) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            label="Contraseña" 
            type="password" 
            value={password} 
            onChange={(e: any) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Ingresar'}
          </Button>
        </form>
        <div className="mt-4 text-center text-xs text-slate-400">
          Demo: admin@example.com / password
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ data, onUpdate, onLogout }: { data: ProfileData, onUpdate: (d: ProfileData) => Promise<void>, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<ProfileData>(data);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof ProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: keyof ProfileData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent] as any, [field]: value }
    }));
  };

  const save = async () => {
    setSaving(true);
    await onUpdate(formData);
    setSaving(false);
    alert('Cambios guardados correctamente');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700 font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary">
            <User size={18} />
          </div>
          Admin
        </div>
        <div className="flex-1 py-6 space-y-2 px-3">
          {[
            { id: 'general', icon: User, label: 'General' },
            { id: 'skills', icon: Award, label: 'Habilidades' },
            { id: 'projects', icon: Layout, label: 'Proyectos' },
            { id: 'contact', icon: Briefcase, label: 'Contacto' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-accent text-primary font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-slate-700">
          <button onClick={onLogout} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <LogOut size={18} /> Salir
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-xl font-bold capitalize text-primary">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary">
              <ExternalLink size={16} /> Ver Sitio
            </Link>
            <Button onClick={save} disabled={saving} variant="primary" className="py-1.5 text-sm">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Guardar Cambios
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <Input 
                  label="Nombre Completo" 
                  value={formData.name} 
                  onChange={(e: any) => handleChange('name', e.target.value)} 
                />
                <Input 
                  label="Título Profesional" 
                  value={formData.title} 
                  onChange={(e: any) => handleChange('title', e.target.value)} 
                />
                <TextArea 
                  label="Resumen (Elevator Pitch)" 
                  value={formData.summary} 
                  onChange={(e: any) => handleChange('summary', e.target.value)} 
                />
                <TextArea 
                  label="Biografía Completa" 
                  value={formData.about} 
                  onChange={(e: any) => handleChange('about', e.target.value)} 
                  style={{ minHeight: '200px' }}
                />
                <Input 
                  label="URL Foto Perfil" 
                  value={formData.photo} 
                  onChange={(e: any) => handleChange('photo', e.target.value)} 
                />
                <Input 
                  label="URL CV (PDF)" 
                  value={formData.cv} 
                  onChange={(e: any) => handleChange('cv', e.target.value)} 
                />
              </div>
            )}
            
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <Input 
                  label="Email Público" 
                  value={formData.contact.email} 
                  onChange={(e: any) => handleNestedChange('contact', 'email', e.target.value)} 
                />
                <Input 
                  label="Teléfono" 
                  value={formData.contact.phone || ''} 
                  onChange={(e: any) => handleNestedChange('contact', 'phone', e.target.value)} 
                />
                <div className="bg-blue-50 p-4 rounded text-sm text-blue-800 border border-blue-100">
                  Nota: La edición de enlaces sociales y proyectos requiere lógica de arrays más compleja, simplificada para esta demo. 
                  En una app real, aquí usaríamos un `fieldArray`.
                </div>
              </div>
            )}

            {/* Placeholder for complex array editors to keep file size reasonable */}
            {(activeTab === 'skills' || activeTab === 'projects') && (
              <div className="text-center py-12 text-slate-500">
                <p className="mb-4">Editor de lista para {activeTab} disponible en versión completa.</p>
                <div className="bg-slate-100 p-4 rounded text-left overflow-auto max-h-64 font-mono text-xs">
                  {JSON.stringify(formData[activeTab as keyof ProfileData], null, 2)}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Main App Logic ---

const PublicProfile = ({ data }: { data: ProfileData }) => {
  const whatsappLink = data.contact.links.find(l => l.provider === 'whatsapp')?.url || '#';

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Navbar name={data.name} />
      <Hero data={data} />
      <About data={data} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Contact contact={data.contact} />
      <Footer name={data.name} />
      {/* Floating Button */}
      {whatsappLink !== '#' && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center animate-bounce-in"
          title="Escríbeme por WhatsApp"
        >
          <WhatsappIcon size={32} />
        </a>
      )}
    </div>
  );
};

function App() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    getProfile().then(profile => {
      setData(profile);
      setLoading(false);
    });
    // Check session
    const session = localStorage.getItem('admin_session');
    if (session) setIsAdmin(true);
  }, []);

  const handleUpdate = async (newData: ProfileData) => {
    const updated = await updateProfile(newData);
    setData(updated);
  };

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('admin_session', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_session');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-accent">
      <Loader2 size={48} className="animate-spin" />
    </div>
  );

  if (!data) return <div>Error loading profile data</div>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicProfile data={data} />} />
        <Route 
          path="/admin" 
          element={
            isAdmin ? (
              <AdminDashboard data={data} onUpdate={handleUpdate} onLogout={handleLogout} />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;