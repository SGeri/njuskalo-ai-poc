import { aiResponseSchema, carFilterSchema } from "@/lib/schemas";
import { z } from "zod";

export type CarFilters = z.infer<typeof carFilterSchema>;
export type AiResponse = z.infer<typeof aiResponseSchema>;

export enum Make {
  Toyota = "Toyota",
  Honda = "Honda",
  Ford = "Ford",
  BMW = "BMW",
  MercedesBenz = "Mercedes-Benz",
  Audi = "Audi",
  Volkswagen = "Volkswagen",
}

export enum FuelType {
  Petrol = "Petrol",
  Diesel = "Diesel",
  Hybrid = "Hybrid",
  Electric = "Electric",
  LPG = "LPG",
}

export enum Transmission {
  Automatic = "Automatic",
  Manual = "Manual",
  SemiAutomatic = "Semi-Automatic",
}

export enum EmissionStandard {
  Euro6 = "Euro 6",
  Euro5 = "Euro 5",
  Euro4 = "Euro 4",
  Euro3 = "Euro 3",
  Euro2 = "Euro 2",
  Euro1 = "Euro 1",
}

export enum BodyType {
  Compact = "Compact",
  Convertible = "Convertible",
  Coupe = "Coupe",
  SUV = "SUV",
  OffRoad = "Off-road",
  StationWagon = "Station Wagon",
  Sedan = "Sedan",
  Van = "Van",
  Transporter = "Transporter",
  Other = "Other",
}

export enum Color {
  Black = "Black",
  White = "White",
  Silver = "Silver",
  Gray = "Gray",
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Yellow = "Yellow",
  Orange = "Orange",
  Brown = "Brown",
}

export enum InteriorMaterial {
  Cloth = "Cloth",
  Leather = "Leather",
  Alcantara = "Alcantara",
  Vinyl = "Vinyl",
}

export enum Condition {
  New = "New",
  Used = "Used",
  Certified = "Certified Pre-Owned",
}
