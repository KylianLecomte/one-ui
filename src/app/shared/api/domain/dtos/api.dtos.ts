export type ID = string | number | undefined | null;
export type Primitif = string | number | boolean | undefined | null;

export type JSONValue =
  | Primitif
  | {
      [x: string]: JSONValue;
    }
  | Array<JSONValue>
  | IDto;

export type JSONObject =
  | {
      [x: string]: JSONValue;
    }
  | Array<JSONObject>
  | IDto;

export type JSON = {
  [x: string]: JSON | Primitif;
};

export type Target = {
  target: {
    value: JSONObject;
  };
};

export interface IDto {
  id?: ID;
  creationDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  active?: boolean;
}
