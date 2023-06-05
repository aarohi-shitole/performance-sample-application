import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 7813,
  empUniqueId: 'transmitting',
};

export const sampleWithPartialData: IEmployee = {
  id: 50464,
  firstName: 'Zechariah',
  lastName: 'Jakubowski',
  gender: 'ADP',
  empUniqueId: 'internet Ville strategic',
  joindate: dayjs('2023-06-05T06:56'),
  status: 'sensor',
  employmentTypeId: 93513,
};

export const sampleWithFullData: IEmployee = {
  id: 89015,
  firstName: 'Fermin',
  middleName: 'Analyst Cambridgeshire',
  lastName: 'Hermann',
  gender: 'GB open-source',
  empUniqueId: 'Loan challenge Iranian',
  joindate: dayjs('2023-06-05T02:43'),
  status: 'Indiana',
  emailId: 'Jamaica Island Concrete',
  employmentTypeId: 3076,
  reportingEmpId: 11720,
  companyId: 2373,
  lastModified: dayjs('2023-06-05T01:26'),
  lastModifiedBy: 'Factors',
};

export const sampleWithNewData: NewEmployee = {
  empUniqueId: 'feed',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
