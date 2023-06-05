import dayjs from 'dayjs/esm';

import { IEmployeeGoalsReview, NewEmployeeGoalsReview } from './employee-goals-review.model';

export const sampleWithRequiredData: IEmployeeGoalsReview = {
  id: 70990,
};

export const sampleWithPartialData: IEmployeeGoalsReview = {
  id: 42003,
  goalDescription: 'synergies',
  goaltype: 'time-frame Arkansas synergies',
  employeeId: 27704,
  appraisalReviewId: 14931,
  lastModified: dayjs('2023-06-05T09:19'),
};

export const sampleWithFullData: IEmployeeGoalsReview = {
  id: 33953,
  goalDescription: 'Loan Synergized generate',
  goalCategory: 'utilisation',
  goaltype: 'Soap',
  goalSetBy: 'Analyst Dong Product',
  employeeId: 70446,
  appraisalReviewId: 98498,
  status: 'China',
  companyId: 75054,
  lastModified: dayjs('2023-06-05T09:35'),
  lastModifiedBy: 'Computers Analyst Kiribati',
};

export const sampleWithNewData: NewEmployeeGoalsReview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
