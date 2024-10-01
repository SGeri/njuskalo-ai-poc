import {
  BodyType,
  Color,
  Condition,
  EmissionStandard,
  FuelType,
  InteriorMaterial,
  Make,
  Transmission,
} from "@/types";
import { z } from "zod";

export const carFilterSchema = z.object({
  make: z.nativeEnum(Make),
  yearFrom: z.number(),
  yearTo: z.number(),
  priceFrom: z.number(),
  priceTo: z.number(),
  fuelType: z.nativeEnum(FuelType),
  transmission: z.nativeEnum(Transmission),
  power: z.number(),
  engineCapacity: z.number(),
  mileageFrom: z.number(),
  mileageTo: z.number(),
  emissionStandard: z.nativeEnum(EmissionStandard),
  bodyType: z.nativeEnum(BodyType),
  doorsFrom: z.number(),
  doorsTo: z.number(),
  airConditioning: z.boolean(),
  sunroof: z.boolean(),
  color: z.nativeEnum(Color),
  interiorMaterial: z.nativeEnum(InteriorMaterial),
  dateListedFrom: z.string(),
  dateListedTo: z.string(),
  condition: z.nativeEnum(Condition),
  serviceHistory: z.boolean(),
  accidentFree: z.boolean(),
  co2EmissionFrom: z.number(),
  co2EmissionTo: z.number(),
  fuelEfficiencyFrom: z.number(),
  fuelEfficiencyTo: z.number(),
});

export const aiResponseSchema = carFilterSchema.partial().extend({
  explanation: z.string(),
});
