export interface Params {
  params: {
    id: string;
  };
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

export interface Client {
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
