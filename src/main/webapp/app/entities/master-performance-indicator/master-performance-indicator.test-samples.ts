import dayjs from 'dayjs/esm';

import { IMasterPerformanceIndicator, NewMasterPerformanceIndicator } from './master-performance-indicator.model';

export const sampleWithRequiredData: IMasterPerformanceIndicator = {
  id: 49156,
};

export const sampleWithPartialData: IMasterPerformanceIndicator = {
  id: 58397,
  type: 'Wyoming vertical',
  name: 'quantify Sausages multi-byte',
  description: 'Island Uzbekistan',
  lastModified: dayjs('2023-06-05T00:56'),
  lastModifiedBy: 'Chair',
};

export const sampleWithFullData: IMasterPerformanceIndicator = {
  id: 59351,
  category: 'green Intelligent',
  type: 'SSL Account',
  name: 'maroon',
  description: 'even-keeled',
  weightage: 22261,
  status: 'Beauty Response',
  companyId: 10035,
  lastModified: dayjs('2023-06-04T14:01'),
  lastModifiedBy: 'standardization Gloves Savings',
};

export const sampleWithNewData: NewMasterPerformanceIndicator = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
