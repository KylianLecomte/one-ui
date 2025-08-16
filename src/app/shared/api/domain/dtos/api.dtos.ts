export type ID = string | number | undefined | null;
export type Primitif = string | number | boolean | undefined | null;

export type JSONValue = Primitif | JSON | JSONValue[] | Dto;

export type JSONObject = JSON | JSONObject[] | Dto;

export type JSON = {
  [x: string]: JSONValue;
};

export type Target = {
  target: {
    value: JSONObject;
  };
};

export interface Dto {
  id?: ID;
  creationDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  active?: boolean;
}
