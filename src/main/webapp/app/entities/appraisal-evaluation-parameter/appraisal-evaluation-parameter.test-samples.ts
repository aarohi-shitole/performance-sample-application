import dayjs from 'dayjs/esm';

import { IAppraisalEvaluationParameter, NewAppraisalEvaluationParameter } from './appraisal-evaluation-parameter.model';

export const sampleWithRequiredData: IAppraisalEvaluationParameter = {
  id: 57896,
};

export const sampleWithPartialData: IAppraisalEvaluationParameter = {
  id: 25807,
  companyId: 68941,
  status: 'Rubber Auto',
  lastModifiedBy: 'Engineer Tobago',
};

export const sampleWithFullData: IAppraisalEvaluationParameter = {
  id: 55717,
  name: 'Crossing niches',
  description: 'Product Communications Heights',
  type: 'compressing pink',
  companyId: 91178,
  status: 'platforms National',
  lastModified: dayjs('2023-06-04T15:36'),
  lastModifiedBy: 'Flat',
};

export const sampleWithNewData: NewAppraisalEvaluationParameter = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
