export type AuthUser = { id: string; email: string };

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type MeResponse = {
  userId: string;
  email: string;
};

export type Workspace = {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type SaleRecord = {
  id: string;
  workspaceId: string;
  date: string; // backend ISO dönebilir
  salesCount: number;
  salesAmount: string; // decimal string
  createdAt: string;
  updatedAt: string;
};

export type ApiErrorShape = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};