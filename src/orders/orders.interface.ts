export interface InfoUserData {
  firstName: string;
  surName: string;
  lastName: string;
  phone: string;
  email: string;
  social: string;
}

export interface SheduleData {
  time: string;
  name: string;
}

export interface InfoRouteData {
  name: string;
  start: string;
  end: string;
  shedules: SheduleData[];
  descrption: string;
}

export interface TransportData {
  kind: string;
  mark: string;
  model: string;
  vin: string;
  numberOfPassengers: number;
}

export interface StatusData {
  value: string;
  lastModified: string;
}
