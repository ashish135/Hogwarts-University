import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AttendanceGrid from '../../components/Attendance/AttendanceGrid';
// Mock data for testing
const mockTeachers = [
  { name: 'Professor Dumbledore', attendance: 'Present' },
  { name: 'Minerva McGonagall', attendance: 'Absent' },
];

test("renders the table header", () => {
  const { getByText } = render(<AttendanceGrid teachers={[]} onAttendanceChange={() => {}} />);
  expect(getByText("Teacher")).toBeInTheDocument();
  expect(getByText("Attendance")).toBeInTheDocument();
});

test("renders a row for each teacher", () => {
  const { getAllByText } = render(<AttendanceGrid teachers={mockTeachers} onAttendanceChange={() => {}} />);
  expect(getAllByText("Professor Dumbledore")).toHaveLength(1);
  expect(getAllByText("Minerva McGonagall")).toHaveLength(1);
  expect(getAllByText("Present")).toHaveLength(2);
  expect(getAllByText("Absent")).toHaveLength(2);
});

test("calls onAttendanceChange with correct arguments", () => {
  const onAttendanceChangeMock = jest.fn();
  const { getByTestId } = render(<AttendanceGrid teachers={mockTeachers} onAttendanceChange={onAttendanceChangeMock} />);
  // Change attendance for Professor Dumbledore 
  const selectElement = getByTestId("attendance-select-Professor-Dumbledore");
  fireEvent.change(selectElement, { target: { value: "Absent" } });
  expect(onAttendanceChangeMock).toHaveBeenCalledWith("Professor Dumbledore", "Absent");

  // Change attendance for Minerva McGonagall 
  const selectElement2 = getByTestId("attendance-select-Minerva-McGonagall");
  fireEvent.change(selectElement2, { target: { value: "Present" } });
  expect(onAttendanceChangeMock).toHaveBeenCalledWith("Minerva McGonagall", "Present");

});
