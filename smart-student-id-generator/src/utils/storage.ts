import type { StudentData } from '../types';

const STORAGE_KEY = 'smart-student-id-generator-data';

export const saveStudentData = (student: StudentData): void => {
  try {
    const existingData = getStudentDataList();
    const updatedData = [student, ...existingData];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving student data:', error);
  }
};

export const getStudentDataList = (): StudentData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving student data:', error);
    return [];
  }
};

export const getStudentById = (id: string): StudentData | undefined => {
  try {
    const students = getStudentDataList();
    return students.find(student => student.id === id);
  } catch (error) {
    console.error('Error retrieving student by ID:', error);
    return undefined;
  }
};

export const deleteStudentData = (id: string): void => {
  try {
    const existingData = getStudentDataList();
    const updatedData = existingData.filter(student => student.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error deleting student data:', error);
  }
};
