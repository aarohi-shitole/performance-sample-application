import dayjs from 'dayjs/esm';

export interface IAppraisalEvaluationParameter {
  id: number;
  name?: string | null;
  description?: string | null;
  type?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewAppraisalEvaluationParameter = Omit<IAppraisalEvaluationParameter, 'id'> & { id: null };
