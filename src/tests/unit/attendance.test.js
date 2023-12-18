import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AttendanceGrid from '../../components/Attendance/AttendanceGrid';

// Mock data for testing
const mockTeachers = [
  { name: 'Professor Dumbledore', attendance: 'Present' },
  { name: 'Minerva McGonagall', attendance: 'Absent' },
];

test('renders attendance grid with teachers', () => {
  // Render the component with mock data
  const { getByText } = render(
    <AttendanceGrid teachers={mockTeachers} onAttendanceChange={() => {}} />
  );
  // Check if the table headers are rendered
  expect(getByText('Teacher')).toBeInTheDocument();
  expect(getByText('Attendance')).toBeInTheDocument();
});
