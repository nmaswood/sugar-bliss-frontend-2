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

export type ServerInput = Record<string, string>;

export type Carrier = "ld" | "usm";

export interface CarrierPrice {
  carrier: string;
  date: string;
  price: Number;
  time: string;
}

export interface PriceResult {
  ld: Carrier;
  usm: Carrier;
  ld_dict: Record<string, number>;
  usm_dict: Record<string, number>;
}

export interface ServerOutput {
  basePrice: CarrierPrice[];
  total: CarrierPrice[];
  priceResult: {
    ld: number;
    usm: number;
    ldDict: Record<string, number>;
    usmDict: Record<string, number>;
  };
  valid: boolean;
}
