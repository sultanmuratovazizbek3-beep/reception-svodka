export type Department = {
  id: string;
  name: string;
  doctors: string;
  bemor: number;
  qarovchi: number;
  vipiska: number;
  keldi: number;
};

export type SummaryData = {
  date: string;
  greeting: string;
  title: string;
  amb_driver: string;
  amb_doctor: string;
  amb_nurse: string;
  amb_contact: string;
  security: string;
  plumber: string;
  electrician: string;
  note: string;
  departments: Department[];
};

export type Totals = {
  bemor: number;
  qarovchi: number;
  vipiska: number;
  keldi: number;
  jami: number;
};
