import { useState } from 'react';
import type { StudentData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { deleteStudentData } from '../utils/storage';

interface StudentListProps {
  students: StudentData[];
  onSelect: (studentId: string) => void;
  onListUpdated: () => void;
}

export default function StudentList({ students, onSelect, onListUpdated }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.classDivision.class}-${student.classDivision.division}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this ID card?')) {
      deleteStudentData(id);
      onListUpdated();
    }
  };

  if (students.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-600">No student ID cards generated yet.</p>
        <p className="mt-2 text-sm text-gray-500">
          Fill out the form to generate your first ID card.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Previous ID Cards</h2>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => onSelect(student.id)}
            className="flex cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="w-24 bg-indigo-600 p-2">
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-20 w-20 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center bg-indigo-500 text-white">
                  <span className="text-3xl font-bold">{student.name.charAt(0)}</span>
                </div>
              )}
              <div className="mt-2">
                <QRCodeSVG
                  value={JSON.stringify(student)}
                  size={40}
                  level="L"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-3">
              <div>
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-xs text-gray-600">
                  Class {student.classDivision.class}-{student.classDivision.division} | Roll #{student.rollNumber}
                </p>
                {student.allergies.length > 0 && (
                  <p className="mt-1 text-xs text-red-600">
                    Allergies: {student.allergies.join(', ')}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(student.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => handleDelete(student.id, e)}
                  className="rounded-full p-1 text-red-500 hover:bg-red-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
