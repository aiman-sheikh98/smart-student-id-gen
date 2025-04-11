import { useState, useEffect } from 'react';
import StudentDataForm from './components/StudentDataForm';
import IDCardPreview from './components/IDCardPreview';
import StudentList from './components/StudentList';
import type { CardTemplate, StudentData } from './types';
import { getStudentById, getStudentDataList, saveStudentData } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'preview'>('create');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [cardTemplate, setCardTemplate] = useState<CardTemplate>('standard');

  const selectedStudent = selectedStudentId ? getStudentById(selectedStudentId) : null;

  // Load students from localStorage on initial render
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const loadedStudents = getStudentDataList();
    setStudents(loadedStudents);
  };

  const handleFormSubmit = (studentData: StudentData) => {
    saveStudentData(studentData);
    setSelectedStudentId(studentData.id);
    loadStudents();
    setActiveTab('preview');
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-indigo-600">Smart Student ID Generator</h1>
          <p className="text-sm text-gray-600">Create professional student ID cards with ease</p>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="mb-4 border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`mr-6 border-b-2 py-3 text-sm font-medium ${
                    activeTab === 'create'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Create New ID
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`mr-6 border-b-2 py-3 text-sm font-medium ${
                    activeTab === 'preview'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  disabled={!selectedStudent}
                >
                  Preview ID Card
                </button>
              </nav>
            </div>

            {activeTab === 'create' ? (
              <StudentDataForm onSubmit={handleFormSubmit} />
            ) : selectedStudent ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Template Style</h2>
                  <fieldset className="inline-flex rounded-md shadow-sm">
                    <legend className="sr-only">ID Card Template Style</legend>
                    <button
                      type="button"
                      onClick={() => setCardTemplate('standard')}
                      className={`rounded-l-md border px-4 py-2 text-sm font-medium ${
                        cardTemplate === 'standard'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardTemplate('premium')}
                      className={`rounded-r-md border px-4 py-2 text-sm font-medium ${
                        cardTemplate === 'premium'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Premium
                    </button>
                  </fieldset>
                </div>
                <IDCardPreview studentData={selectedStudent} template={cardTemplate} />
              </div>
            ) : (
              <div className="rounded-lg bg-gray-50 p-6 text-center">
                <p className="text-gray-600">No student selected</p>
                <p className="mt-2 text-sm text-gray-500">
                  Create a new ID card or select one from the list.
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-4">
            <StudentList
              students={students}
              onSelect={handleStudentSelect}
              onListUpdated={loadStudents}
            />
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t bg-white py-6 text-center text-sm text-gray-600">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p>Smart Student ID Generator - A demo for Unity School Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
