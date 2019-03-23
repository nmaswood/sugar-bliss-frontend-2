export interface FoodObject {
  camel: string;
  display: string;
}

export interface FoodQuantity {
  camel: string;
  quantity: Number;
}

export interface ServerInfo {
  times: string[];
  zipcodes: string[];
  foods: FoodObject[];
}

export interface InputSelection {
  time: string;
  date: Date;
  zipcode: string;
  foods: FoodQuantity[];
}
