import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  type Allergy,
  ALLERGIES,
  type BusRoute,
  BUS_ROUTES,
  type ClassDivision,
  CLASS_DIVISIONS,
  type StudentData,
} from '../types';

interface StudentDataFormProps {
  onSubmit: (studentData: StudentData) => void;
}

export default function StudentDataForm({ onSubmit }: StudentDataFormProps) {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [classDivision, setClassDivision] = useState<ClassDivision>(CLASS_DIVISIONS[0]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [rackNumber, setRackNumber] = useState('');
  const [busRoute, setBusRoute] = useState<BusRoute>(BUS_ROUTES[0]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAllergyChange = (allergy: Allergy) => {
    setAllergies((prevAllergies) =>
      prevAllergies.includes(allergy)
        ? prevAllergies.filter((a) => a !== allergy)
        : [...prevAllergies, allergy],
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studentData: StudentData = {
      id: uuidv4(),
      name,
      rollNumber,
      classDivision,
      allergies,
      photo,
      rackNumber,
      busRoute,
      createdAt: new Date().toISOString(),
    };

    onSubmit(studentData);

    // Reset form
    setName('');
    setRollNumber('');
    setClassDivision(CLASS_DIVISIONS[0]);
    setAllergies([]);
    setPhoto(null);
    setRackNumber('');
    setBusRoute(BUS_ROUTES[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Student Information</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium">
            Roll Number
          </label>
          <input
            id="rollNumber"
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="classDivision" className="block text-sm font-medium">
            Class & Division
          </label>
          <select
            id="classDivision"
            value={`${classDivision.class}-${classDivision.division}`}
            onChange={(e) => {
              const [selectedClass, selectedDivision] = e.target.value.split('-');
              const selected = CLASS_DIVISIONS.find(
                (cd) => cd.class === selectedClass && cd.division === selectedDivision,
              );
              if (selected) {
                setClassDivision(selected);
              }
            }}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            {CLASS_DIVISIONS.map((cd) => (
              <option key={`${cd.class}-${cd.division}`} value={`${cd.class}-${cd.division}`}>
                Class {cd.class} - Division {cd.division}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-sm font-medium">Allergies (if any)</span>
          <div className="mt-1 flex flex-wrap gap-3">
            {ALLERGIES.map((allergy) => (
              <label key={allergy} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={allergies.includes(allergy)}
                  onChange={() => handleAllergyChange(allergy)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm">{allergy}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium">
            Photo Upload
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {photo && (
              <div className="relative h-20 w-20 overflow-hidden rounded-md">
                <img
                  src={photo}
                  alt="Student"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="rackNumber" className="block text-sm font-medium">
            Rack Number
          </label>
          <input
            id="rackNumber"
            type="text"
            value={rackNumber}
            onChange={(e) => setRackNumber(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="busRoute" className="block text-sm font-medium">
            Bus Route
          </label>
          <select
            id="busRoute"
            value={busRoute.number}
            onChange={(e) => {
              const selected = BUS_ROUTES.find((route) => route.number === e.target.value);
              if (selected) {
                setBusRoute(selected);
              }
            }}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            {BUS_ROUTES.map((route) => (
              <option key={route.number} value={route.number}>
                {route.number} - {route.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate ID Card
        </button>
      </div>
    </form>
  );
}
