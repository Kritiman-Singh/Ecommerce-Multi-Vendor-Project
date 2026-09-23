import { api } from "../../../Config/Api";

export interface AdminCategory {
  id?: number;
  name: string;
  categoryId: string;
  level: number;
  parentCategory?: AdminCategory | null;
}

export interface CreateCategoryPayload {
  name: string;
  categoryId: string;
  level: number;
  parentCategoryId?: string;
}

export interface CreateAdminProductPayload {
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  brand: string;
  color: string;
  sizes: string;
  images: string[];
  category: string;
  category2: string;
  category3: string;
}

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt") || ""}` },
});

export const fetchAdminCategories = async (): Promise<AdminCategory[]> => {
  const res = await api.get("/admin/categories", authHeaders());
  return res.data;
};

export const createAdminCategory = async (payload: CreateCategoryPayload) => {
  const res = await api.post("/admin/categories", payload, authHeaders());
  return res.data;
};

export const fetchAdminProducts = async (): Promise<any[]> => {
  const res = await api.get("/admin/products", authHeaders());
  return res.data;
};

export const createAdminProduct = async (payload: CreateAdminProductPayload) => {
  const res = await api.post("/admin/products", payload, authHeaders());
  return res.data;
};

export const deleteAdminProduct = async (productId: number) => {
  const res = await api.delete(`/admin/products/${productId}`, authHeaders());
  return res.data;
};
