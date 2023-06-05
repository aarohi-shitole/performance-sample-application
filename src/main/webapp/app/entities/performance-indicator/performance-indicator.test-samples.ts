import dayjs from 'dayjs/esm';

import { IPerformanceIndicator, NewPerformanceIndicator } from './performance-indicator.model';

export const sampleWithRequiredData: IPerformanceIndicator = {
  id: 69833,
};

export const sampleWithPartialData: IPerformanceIndicator = {
  id: 49877,
  status: 'Wooden orchid Account',
};

export const sampleWithFullData: IPerformanceIndicator = {
  id: 17240,
  designationId: 53676,
  indicatorValue: 'Plastic connect Dynamic',
  status: 'overriding',
  companyId: 33609,
  lastModified: dayjs('2023-06-04T22:06'),
  lastModifiedBy: 'Configurable Ergonomic compelling',
};

export const sampleWithNewData: NewPerformanceIndicator = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
