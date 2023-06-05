import dayjs from 'dayjs/esm';

export interface IMasterPerformanceIndicator {
  id: number;
  category?: string | null;
  type?: string | null;
  name?: string | null;
  description?: string | null;
  weightage?: number | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewMasterPerformanceIndicator = Omit<IMasterPerformanceIndicator, 'id'> & { id: null };
