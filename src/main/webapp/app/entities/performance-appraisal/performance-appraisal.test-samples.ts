import dayjs from 'dayjs/esm';

import { IPerformanceAppraisal, NewPerformanceAppraisal } from './performance-appraisal.model';

export const sampleWithRequiredData: IPerformanceAppraisal = {
  id: 16644,
};

export const sampleWithPartialData: IPerformanceAppraisal = {
  id: 85750,
  employeeId: 1228,
  status: 'Clothing',
  lastModifiedBy: 'Cheese Borders',
};

export const sampleWithFullData: IPerformanceAppraisal = {
  id: 59079,
  employeeId: 31026,
  status: 'Jersey orchestrate Pants',
  companyId: 61299,
  lastModified: dayjs('2023-06-05T04:43'),
  lastModifiedBy: 'hard Ball Berkshire',
};

export const sampleWithNewData: NewPerformanceAppraisal = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
