import dayjs from 'dayjs/esm';

import { IAppraisalEvaluation, NewAppraisalEvaluation } from './appraisal-evaluation.model';

export const sampleWithRequiredData: IAppraisalEvaluation = {
  id: 66458,
};

export const sampleWithPartialData: IAppraisalEvaluation = {
  id: 30017,
  answerFlag: true,
  description: 'Communications Clothing Wisconsin',
  employeeId: 24242,
  availablePoints: 84146,
  status: 'magenta',
  companyId: 91170,
};

export const sampleWithFullData: IAppraisalEvaluation = {
  id: 89997,
  answerFlag: true,
  description: 'generate',
  employeeId: 95646,
  appraisalReviewId: 13268,
  availablePoints: 47032,
  scoredPoints: 73831,
  remark: 'Customer Island',
  status: 'Principal COM Concrete',
  companyId: 52528,
  lastModified: dayjs('2023-06-04T15:39'),
  lastModifiedBy: 'IB synergize Pizza',
};

export const sampleWithNewData: NewAppraisalEvaluation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
