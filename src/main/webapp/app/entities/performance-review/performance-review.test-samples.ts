import dayjs from 'dayjs/esm';

import { IPerformanceReview, NewPerformanceReview } from './performance-review.model';

export const sampleWithRequiredData: IPerformanceReview = {
  id: 29820,
};

export const sampleWithPartialData: IPerformanceReview = {
  id: 65193,
  appraisalReviewId: 73429,
  employeeRemark: 'capacitor Designer',
  reviewerRemark: 'ivory Soft',
  selfScored: 'open-source',
  scoredByReviewer: 'disintermediate Intuitive',
  reviewDate: dayjs('2023-06-04T21:50'),
  companyId: 9396,
  lastModified: dayjs('2023-06-04T16:53'),
  lastModifiedBy: 'Franc Japan driver',
  targetAchived: 40506,
};

export const sampleWithFullData: IPerformanceReview = {
  id: 48066,
  appraisalReviewId: 60450,
  employeeRemark: 'Synergistic',
  appraiserRemark: 'Pine',
  reviewerRemark: 'deposit',
  selfScored: 'revolutionize',
  scoredByAppraiser: 'Connecticut',
  scoredByReviewer: 'Multi-layered Som',
  appraisalStatus: 'Global Administrator solid',
  submissionDate: dayjs('2023-06-04T16:59'),
  appraisalDate: dayjs('2023-06-05T10:38'),
  reviewDate: dayjs('2023-06-05T01:30'),
  status: 'ROI Berkshire whiteboard',
  companyId: 43258,
  lastModified: dayjs('2023-06-04T17:53'),
  lastModifiedBy: 'Public-key',
  target: 31113,
  targetAchived: 78500,
};

export const sampleWithNewData: NewPerformanceReview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
