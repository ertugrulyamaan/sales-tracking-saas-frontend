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
  salesAmount: string | number; // decimal string gelebilir
  createdAt: string;
  updatedAt: string;
};

export type RefundRecord = {
  id: string;
  workspaceId: string;
  date: string;
  refundCount: number;
  refundAmount: string | number; // decimal string gelebilir
  createdAt: string;
  updatedAt: string;
};

export type TargetRecord = {
  id: string;
  workspaceId: string;
  weekStartDate: string;
  targetSalesAmount: string | number; // decimal string gelebilir
  targetSalesCount: number;
  createdAt: string;
  updatedAt: string;
};

export type WeeklySummaryDaily = {
  date: string;
  salesCount: number;
  salesAmount: number;
  refundCount: number;
  refundAmount: number;
  netRevenue: number;
};

export type DailySummaryResponse = {
  workspaceId: string;
  current: WeeklySummaryDaily;
  previous: WeeklySummaryDaily | null;
  dayOverDay: {
    salesAmountDiff: number;
    refundAmountDiff: number;
    netRevenueDiff: number;
    salesAmountChangePct: number;
    refundAmountChangePct: number;
    netRevenueChangePct: number;
  } | null;
};

export type WeeklySummaryResponse = {
  workspaceId: string;
  weekStartDate: string;
  weekEndDate: string;
  totals: {
    totalSalesCount: number;
    totalSalesAmount: number;
    totalRefundCount: number;
    totalRefundAmount: number;
    netRevenue: number;
  };
  bestDay: WeeklySummaryDaily | null;
  worstDay: WeeklySummaryDaily | null;
  target: {
    targetSalesAmount: number;
    targetSalesCount: number;
    targetProgress: {
      amount: number;
      count: number;
    };
  } | null;
  weekOverWeek: {
    salesAmountDiff: number;
    refundAmountDiff: number;
    netRevenueDiff: number;
    salesAmountChangePct: number;
    refundAmountChangePct: number;
    netRevenueChangePct: number;
  } | null;
  dailyBreakdown: WeeklySummaryDaily[];
  insights: string[];
};

export type ApiErrorShape = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};