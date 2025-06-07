export type ID = string | number | undefined | null;
export type Primitif = string | number | boolean | undefined | null;

export type JSONValue = Primitif | JSON | Array<JSONValue> | IDto;

export type JSONObject = JSON | Array<JSONObject> | IDto;

export type JSON = {
  [x: string]: JSONValue;
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
