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
