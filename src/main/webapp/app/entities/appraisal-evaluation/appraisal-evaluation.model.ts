import dayjs from 'dayjs/esm';
import { IAppraisalEvaluationParameter } from 'app/entities/appraisal-evaluation-parameter/appraisal-evaluation-parameter.model';

export interface IAppraisalEvaluation {
  id: number;
  answerFlag?: boolean | null;
  description?: string | null;
  employeeId?: number | null;
  appraisalReviewId?: number | null;
  availablePoints?: number | null;
  scoredPoints?: number | null;
  remark?: string | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  appraisalEvaluationParameter?: Pick<IAppraisalEvaluationParameter, 'id'> | null;
}

export type NewAppraisalEvaluation = Omit<IAppraisalEvaluation, 'id'> & { id: null };
