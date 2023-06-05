import dayjs from 'dayjs/esm';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IAppraisalReview {
  id: number;
  reportingOfficer?: string | null;
  roDesignation?: string | null;
  status?: string | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  employee?: Pick<IEmployee, 'id'> | null;
}

export type NewAppraisalReview = Omit<IAppraisalReview, 'id'> & { id: null };
