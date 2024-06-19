export interface Params {
  params: {
    id: string;
  };
}

export interface mailParams {
  price?: number;
  reserved_at?: Date;
  message: string | null | undefined;
  subject: string;
  employee_name?: string;
  employee_email?: string;
  client_name?: string;
  client_email?: string;
  receptor_email?: string;
  feedback?: boolean;
  ServiceConsumption_id: number;
}


export interface Result {
  data: any;
  table: string;
  count: number;
}

export interface SqlProfileByEmail {
  columns:         string[];
  columnTypes:     string[];
  rows:            Array<Array<number | string>>;
  rowsAffected:    number;
  lastInsertRowid: null;
}

export interface Client_type {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  bornDate?: Date;
  created_at?: Date;
  updated_at?: Date;
  username?: string;
  password?: string;
  confirmed?: boolean;
  image?: string;
  active?: boolean;
  [key: string]: any;
}

export enum Weather {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Snowy = 'Snowy',
}

export interface ServiceConsumption_type {
  id:         number;
  service_id:  number;
  service_name:  number;
  employee_id: number;
  employee_name: string;
  employee_mail: string;
  client_id:   number;
  client_email:   string;
  client_name:   string;
  rating?:      number;
  price:       number;
  delay?:       number;
  created_at:  Date;
  updated_at?:  Date;
  reserved_at:  Date;
  weather?:     Weather;
}

export interface ServicePredictionPost_type {
  id?:                   number;
  client_id?:            number;
  teacher_id?:           number;
  student_id?:           null;
  delay?:                null;
  service_id?:           number;
  created_at?:           Date;
  updated_at?:           null;
  reserved_at?:          Date;
  rating?:               null;
  price?:                number;
  weather?:              string;
  client_name?:          string;
  teacher_name?:         string;
  student_name?:         null;
  client_surname?:       string;
  teacher_surname?:      string;
  student_surname?:      null;
  client_address?:       string;
  teacher_address?:      string;
  student_address?:      null;
  client_phone_number?:  string;
  teacher_phone_number?: string;
  student_phone_number?: null;
  client_email?:         string;
  teacher_email?:        string;
  student_email?:        null;
  employee_salary?:      number;
}