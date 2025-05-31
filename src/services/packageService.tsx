// src/services/packageService.ts
import api from '../api/axios';

export interface Package {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration_days: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const createPackage = async (data: Package) => {
  const res = await api.post('/packages', data);
  return res.data as Package;
};

export const getPackages = async () => {
  const res = await api.get('/packages');
  return res.data as Package[];
};

export const getPackageById = async (id: string) => {
  const res = await api.get(`/packages/${id}`);
  return res.data as Package;
};

export const updatePackage = async (id: string, data: Partial<Package>) => {
  const res = await api.put(`/packages/${id}`, data);
  return res.data as Package;
};
