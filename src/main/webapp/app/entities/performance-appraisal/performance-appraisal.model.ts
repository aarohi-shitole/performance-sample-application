import dayjs from 'dayjs/esm';
import { IAppraisalReview } from 'app/entities/appraisal-review/appraisal-review.model';

export interface IPerformanceAppraisal {
  id: number;
  employeeId?: number | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  appraisalReview?: Pick<IAppraisalReview, 'id'> | null;
}

export type NewPerformanceAppraisal = Omit<IPerformanceAppraisal, 'id'> & { id: null };
