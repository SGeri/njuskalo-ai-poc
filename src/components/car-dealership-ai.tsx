"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  BodyType,
  CarFilters,
  Color,
  Condition,
  EmissionStandard,
  FuelType,
  InteriorMaterial,
  Make,
  Transmission,
} from "@/types";
import { Car } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import AIResultAnimation from "./ai-generating-animation";

type CarDealershipAiProps = {
  onAIRequest: (input: string) => Promise<{
    explanation: string;
    filters: Partial<CarFilters>;
  }>;
};

export function CarDealershipAi({ onAIRequest }: CarDealershipAiProps) {
  const [userInput, setUserInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string>();
  const [filters, setFilters] = useState<Partial<CarFilters>>();

  const handleGenerateFilter = async () => {
    setIsAiLoading(true);
    setAiExplanation(undefined);

    const result = await onAIRequest(userInput);
    setAiExplanation(result.explanation);
    setFilters(result.filters);

    setIsAiLoading(false);
  };

  const handleFilterChange = <T extends keyof CarFilters>(
    key: T,
    value: CarFilters[T]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto w-full px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
        Njaskalo Car Dealership AI
      </h1>
      <p className="text-xl text-center text-blue-600 mb-8">
        Describe your dream car, and let AI do the rest!
      </p>

      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Textarea
            className="w-full p-4 text-lg border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Describe the car you're looking for..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <Button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          onClick={handleGenerateFilter}
          disabled={isAiLoading}
        >
          GENERATE MY FILTER
        </Button>
      </div>

      {isAiLoading && <AIResultAnimation className="mb-6" />}

      {aiExplanation && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            AI Suggestion
          </h2>
          <p className="text-gray-700 mb-4">{aiExplanation}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg drop-shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
          Car Search Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Label htmlFor="make">Make</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.make}
              onValueChange={(value) =>
                handleFilterChange("make", value as Make)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Car brand" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Make).map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Year of Manufacture</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="From"
                value={filters?.yearFrom}
                onChange={(e) =>
                  handleFilterChange("yearFrom", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
              <Input
                type="number"
                placeholder="To"
                value={filters?.yearTo}
                onChange={(e) =>
                  handleFilterChange("yearTo", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Price (EUR)</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="From"
                value={filters?.priceFrom}
                onChange={(e) =>
                  handleFilterChange("priceFrom", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
              <Input
                type="number"
                placeholder="To"
                value={filters?.priceTo}
                onChange={(e) =>
                  handleFilterChange("priceTo", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.fuelType}
              onValueChange={(value) =>
                handleFilterChange("fuelType", value as FuelType)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(FuelType).map((fuelType) => (
                  <SelectItem key={fuelType} value={fuelType}>
                    {fuelType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="transmission">Transmission</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.transmission}
              onValueChange={(value) =>
                handleFilterChange("transmission", value as Transmission)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Transmission).map((transmission) => (
                  <SelectItem key={transmission} value={transmission}>
                    {transmission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="power">Power (kW)</Label>
            <Input
              type="number"
              id="power"
              value={filters?.power}
              onChange={(e) =>
                handleFilterChange("power", parseInt(e.target.value))
              }
              disabled={isAiLoading}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="engineCapacity">Engine Capacity (L)</Label>
            <Input
              type="number"
              id="engineCapacity"
              step="0.1"
              value={filters?.engineCapacity}
              onChange={(e) =>
                handleFilterChange("engineCapacity", parseFloat(e.target.value))
              }
              disabled={isAiLoading}
            />
          </div>

          <div className="space-y-4">
            <Label>Mileage (km)</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="From"
                value={filters?.mileageFrom}
                onChange={(e) =>
                  handleFilterChange("mileageFrom", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
              <Input
                type="number"
                placeholder="To"
                value={filters?.mileageTo}
                onChange={(e) =>
                  handleFilterChange("mileageTo", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="emissionStandard">Emission Standard</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.emissionStandard}
              onValueChange={(value) =>
                handleFilterChange(
                  "emissionStandard",
                  value as EmissionStandard
                )
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EmissionStandard).map((standard) => (
                  <SelectItem key={standard} value={standard}>
                    {standard}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="bodyType">Body Type</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.bodyType}
              onValueChange={(value) =>
                handleFilterChange("bodyType", value as BodyType)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(BodyType).map((bodyType) => (
                  <SelectItem key={bodyType} value={bodyType}>
                    {bodyType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Number of Doors</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="From"
                value={filters?.doorsFrom}
                onChange={(e) =>
                  handleFilterChange("doorsFrom", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
              <Input
                type="number"
                placeholder="To"
                value={filters?.doorsTo}
                onChange={(e) =>
                  handleFilterChange("doorsTo", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="airConditioning"
              checked={filters?.airConditioning}
              onCheckedChange={(checked) =>
                handleFilterChange("airConditioning", checked)
              }
              disabled={isAiLoading}
            />
            <Label htmlFor="airConditioning">Air Conditioning</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="sunroof"
              checked={filters?.sunroof}
              onCheckedChange={(checked) =>
                handleFilterChange("sunroof", checked)
              }
              disabled={isAiLoading}
            />
            <Label htmlFor="sunroof">Sunroof</Label>
          </div>

          <div className="space-y-4">
            <Label htmlFor="color">Color</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.color}
              onValueChange={(value) =>
                handleFilterChange("color", value as Color)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Color).map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="interiorMaterial">Interior Material</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.interiorMaterial}
              onValueChange={(value) =>
                handleFilterChange(
                  "interiorMaterial",
                  value as InteriorMaterial
                )
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(InteriorMaterial).map((material) => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Date Listed</Label>
            <div className="flex space-x-4">
              <Input
                type="date"
                value={filters?.dateListedFrom}
                onChange={(e) =>
                  handleFilterChange("dateListedFrom", e.target.value)
                }
                disabled={isAiLoading}
              />
              <Input
                type="date"
                value={filters?.dateListedTo}
                onChange={(e) =>
                  handleFilterChange("dateListedTo", e.target.value)
                }
                disabled={isAiLoading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="condition">Condition</Label>
            <Select
              disabled={isAiLoading}
              value={filters?.condition}
              onValueChange={(value) =>
                handleFilterChange("condition", value as Condition)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Fuel type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Condition).map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="serviceHistory"
              checked={filters?.serviceHistory}
              onCheckedChange={(checked) =>
                handleFilterChange("serviceHistory", checked)
              }
              disabled={isAiLoading}
            />
            <Label htmlFor="serviceHistory">Service History Available</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="accidentFree"
              checked={filters?.accidentFree}
              onCheckedChange={(checked) =>
                handleFilterChange("accidentFree", checked)
              }
              disabled={isAiLoading}
            />
            <Label htmlFor="accidentFree">Accident Free</Label>
          </div>

          <div className="space-y-4">
            <Label>CO2 Emission (g/km)</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                placeholder="From"
                value={filters?.co2EmissionFrom}
                onChange={(e) =>
                  handleFilterChange(
                    "co2EmissionFrom",
                    parseInt(e.target.value)
                  )
                }
                disabled={isAiLoading}
              />
              <Input
                type="number"
                placeholder="To"
                value={filters?.co2EmissionTo}
                onChange={(e) =>
                  handleFilterChange("co2EmissionTo", parseInt(e.target.value))
                }
                disabled={isAiLoading}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Fuel Efficiency (L/100km)</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                step="0.1"
                placeholder="From"
                value={filters?.fuelEfficiencyFrom}
                onChange={(e) =>
                  handleFilterChange(
                    "fuelEfficiencyFrom",
                    parseFloat(e.target.value)
                  )
                }
                disabled={isAiLoading}
              />
              <Input
                type="number"
                step="0.1"
                placeholder="To"
                value={filters?.fuelEfficiencyTo}
                onChange={(e) =>
                  handleFilterChange(
                    "fuelEfficiencyTo",
                    parseFloat(e.target.value)
                  )
                }
                disabled={isAiLoading}
              />
            </div>
          </div>
        </div>

        <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">
          SEARCH
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Image
              src={`/placeholder.svg?height=200&width=300`}
              alt="Car image"
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader className="p-4 bg-blue-600">
              <CardTitle className="text-xl font-bold text-white">
                Toyota Corolla
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <Car className="inline-block mr-2" /> 2021
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Price:</span> €22,000
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Mileage:</span> 35,000 km
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
