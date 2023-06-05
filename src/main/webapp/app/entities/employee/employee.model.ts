import dayjs from 'dayjs/esm';

export interface IEmployee {
  id: number;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  empUniqueId?: string | null;
  joindate?: dayjs.Dayjs | null;
  status?: string | null;
  emailId?: string | null;
  employmentTypeId?: number | null;
  reportingEmpId?: number | null;
  companyId?: number | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
