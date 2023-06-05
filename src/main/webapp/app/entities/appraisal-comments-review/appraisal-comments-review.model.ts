import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IAppraisalCommentsReview {
  id: number;
  comment?: string | null;
  commentType?: string | null;
  appraisalReviewId?: number | null;
  refFormName?: string | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  employee?: Pick<IEmployee, 'id'> | null;
}

export type NewAppraisalCommentsReview = Omit<IAppraisalCommentsReview, 'id'> & { id: null };
