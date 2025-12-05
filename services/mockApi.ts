import { ProfileData } from '../types';
import { INITIAL_PROFILE } from '../constants';

const STORAGE_KEY = 'profile_data_v1';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProfile = async (): Promise<ProfileData> => {
  await delay(500); // Simulate network latency
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return INITIAL_PROFILE;
};

export const updateProfile = async (data: ProfileData): Promise<ProfileData> => {
  await delay(800);
  const updatedData = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  return updatedData;
};

export const loginAdmin = async (email: string, password: string): Promise<boolean> => {
  await delay(1000);
  // Hardcoded mock credentials for demo purposes
  return email === 'admin@example.com' && password === 'password';
};

export const sendContactForm = async (data: any): Promise<boolean> => {
  await delay(1000);
  console.log("Email sent to server:", data);
  return true;
};
