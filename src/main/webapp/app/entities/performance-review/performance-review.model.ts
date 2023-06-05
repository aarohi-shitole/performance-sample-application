import dayjs from 'dayjs/esm';
import { IPerformanceIndicator } from 'app/entities/performance-indicator/performance-indicator.model';

export interface IPerformanceReview {
  id: number;
  appraisalReviewId?: number | null;
  employeeRemark?: string | null;
  appraiserRemark?: string | null;
  reviewerRemark?: string | null;
  selfScored?: string | null;
  scoredByAppraiser?: string | null;
  scoredByReviewer?: string | null;
  appraisalStatus?: string | null;
  submissionDate?: dayjs.Dayjs | null;
  appraisalDate?: dayjs.Dayjs | null;
  reviewDate?: dayjs.Dayjs | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  target?: number | null;
  targetAchived?: number | null;
  performanceIndicator?: Pick<IPerformanceIndicator, 'id'> | null;
}

export type NewPerformanceReview = Omit<IPerformanceReview, 'id'> & { id: null };
