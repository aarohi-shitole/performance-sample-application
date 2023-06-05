import dayjs from 'dayjs/esm';

export interface IEmployeeGoalsReview {
  id: number;
  goalDescription?: string | null;
  goalCategory?: string | null;
  goaltype?: string | null;
  goalSetBy?: string | null;
  employeeId?: number | null;
  appraisalReviewId?: number | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewEmployeeGoalsReview = Omit<IEmployeeGoalsReview, 'id'> & { id: null };
