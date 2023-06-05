import dayjs from 'dayjs/esm';
import { IMasterPerformanceIndicator } from 'app/entities/master-performance-indicator/master-performance-indicator.model';

export interface IPerformanceIndicator {
  id: number;
  designationId?: number | null;
  indicatorValue?: string | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  masterPerformanceIndicator?: Pick<IMasterPerformanceIndicator, 'id'> | null;
}

export type NewPerformanceIndicator = Omit<IPerformanceIndicator, 'id'> & { id: null };
