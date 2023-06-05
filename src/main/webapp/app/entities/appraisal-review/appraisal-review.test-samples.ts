import dayjs from 'dayjs/esm';

import { IAppraisalReview, NewAppraisalReview } from './appraisal-review.model';

export const sampleWithRequiredData: IAppraisalReview = {
  id: 33717,
};

export const sampleWithPartialData: IAppraisalReview = {
  id: 11686,
  status: 'Chief',
  companyId: 6250,
};

export const sampleWithFullData: IAppraisalReview = {
  id: 19189,
  reportingOfficer: 'Sports',
  roDesignation: 'Investor',
  status: 'Georgia',
  companyId: 29692,
  lastModified: dayjs('2023-06-05T03:22'),
  lastModifiedBy: 'rich pixel quantify',
};

export const sampleWithNewData: NewAppraisalReview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
