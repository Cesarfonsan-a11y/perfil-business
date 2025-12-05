import { ProfileData } from './types';

export const INITIAL_PROFILE: ProfileData = {
  id: "julio-cesar-fonseca",
  name: "Julio Cesar Fonseca",
  title: "Ingeniero Industrial | Especialista en Analítica de Datos & Business Analytics",
  // Business Dashboard Image for profile circle
  photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  summary: "Transformo datos complejos en estrategias accionables que optimizan procesos industriales, maximizan la eficiencia operativa y generan valor empresarial tangible.",
  about: `Soy un Ingeniero Industrial apasionado por el mundo de los datos. Con formación de alta especialización en Econometría Aplicada, Machine Learning y herramientas avanzadas de análisis, desarrollo soluciones basadas en evidencia que impulsan la toma de decisiones estratégicas en entornos dinámicos.

🔍 Mi enfoque
Análisis predictivo y prescriptivo para anticipar tendencias y optimizar recursos.
Automatización de reporting y dashboards interactivos que facilitan la monitorización de KPIs.
Modelado de procesos con enfoque en mejora continua y reducción de costos operativos.
Storytelling con datos, comunicando insights claros y accionables a equipos técnicos y directivos.

🎓 Formación clave
Ingeniería Industrial.
Especialización en Econometría Aplicada y Análisis de Datos.
Maestría en Business Analytics.`,
  skills: [
    { name: "Python & R", level: "expert" },
    { name: "Power BI & Tableau", level: "expert" },
    { name: "SQL", level: "advanced" },
    { name: "Machine Learning", level: "advanced" },
    { name: "Excel Avanzado", level: "expert" },
    { name: "Stata & SPSS", level: "intermediate" }
  ],
  projects: [
    {
      id: "p1",
      title: "Forecasting de Demanda",
      description: "Implementación de modelos de forecasting para demanda y optimización de inventarios, logrando una reducción del 15% en costos de almacenamiento.",
      role: "Especialista en Datos",
      // Warehouse / Logistics / Inventory image
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: "p2",
      title: "Dashboards de Producción",
      description: "Desarrollo de un sistema de dashboards en tiempo real para monitoreo de eficiencia en líneas de producción, mejorando la productividad en un 12%.",
      role: "Analista BI",
      // Production charts / Factory monitoring image
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: "p3",
      title: "Modelo de Clasificación ML",
      description: "Creación de un modelo de clasificación de clientes utilizando machine learning, incrementando la tasa de conversión en campañas dirigidas.",
      role: "Data Scientist",
      // Tech / Network / Nodes image
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
      link: "#"
    }
  ],
  testimonials: [
    {
      id: "t1",
      author: "María González",
      role: "Gerente de Operaciones",
      text: "Julio transformó la manera en que visualizamos nuestros datos operativos. Su capacidad para traducir números en estrategia es excepcional."
    }
  ],
  contact: {
    email: "jcfs206@hotmail.com",
    phone: "316 756 2441",
    links: [
      { provider: "linkedin", url: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" },
      { provider: "email", url: "mailto:jcfs206@hotmail.com" },
      { provider: "whatsapp", url: "https://wa.me/573167562441" }
    ]
  },
  cv: "#",
  updatedAt: new Date().toISOString()
};