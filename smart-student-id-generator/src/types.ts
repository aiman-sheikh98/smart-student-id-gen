export type Allergy = 'Peanuts' | 'Dairy' | 'Gluten' | 'Eggs' | 'Shellfish';

export type ClassDivision = {
  class: string;
  division: string;
};

export type BusRoute = {
  number: string;
  description: string;
};

export type StudentData = {
  id: string;
  name: string;
  rollNumber: string;
  classDivision: ClassDivision;
  allergies: Allergy[];
  photo: string | null;
  rackNumber: string;
  busRoute: BusRoute;
  createdAt: string;
};

export const ALLERGIES: Allergy[] = ['Peanuts', 'Dairy', 'Gluten', 'Eggs', 'Shellfish'];

export const CLASS_DIVISIONS: ClassDivision[] = [
  { class: '1', division: 'A' },
  { class: '1', division: 'B' },
  { class: '2', division: 'A' },
  { class: '2', division: 'B' },
  { class: '3', division: 'A' },
  { class: '3', division: 'B' },
  { class: '4', division: 'A' },
  { class: '4', division: 'B' },
  { class: '5', division: 'A' },
  { class: '5', division: 'B' },
];

export const BUS_ROUTES: BusRoute[] = [
  { number: '101', description: 'North Campus' },
  { number: '102', description: 'South Campus' },
  { number: '103', description: 'East Campus' },
  { number: '104', description: 'West Campus' },
  { number: '105', description: 'Downtown' },
];

export type CardTemplate = 'standard' | 'premium';
