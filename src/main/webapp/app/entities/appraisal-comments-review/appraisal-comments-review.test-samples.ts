import dayjs from 'dayjs/esm';

import { IAppraisalCommentsReview, NewAppraisalCommentsReview } from './appraisal-comments-review.model';

export const sampleWithRequiredData: IAppraisalCommentsReview = {
  id: 61563,
};

export const sampleWithPartialData: IAppraisalCommentsReview = {
  id: 98821,
  appraisalReviewId: 44253,
  refFormName: 'drive Baby',
  lastModified: dayjs('2023-06-05T00:29'),
};

export const sampleWithFullData: IAppraisalCommentsReview = {
  id: 71655,
  comment: 'matrix Cheese Hat',
  commentType: 'lavender',
  appraisalReviewId: 72792,
  refFormName: 'Fresh',
  status: 'teal matrices',
  companyId: 37220,
  lastModified: dayjs('2023-06-05T05:18'),
  lastModifiedBy: 'navigate New',
};

export const sampleWithNewData: NewAppraisalCommentsReview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
