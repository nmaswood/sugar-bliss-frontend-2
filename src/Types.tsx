export interface FoodObject {
  camel: string;
  display: string;
}

export interface FoodQuantity {
  camel: string;
  display: string;
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

export interface ServerInput extends Object {}
