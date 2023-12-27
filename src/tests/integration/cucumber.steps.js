// attendance.steps.js
import React from 'react';
import { Given, Then, When } from '@cucumber/cucumber';
import { render, fireEvent } from '@testing-library/react';
import AttendanceGrid from '../../components/Attendance/AttendanceGrid';

const mockTeachers = [
  { name: 'Professor Dumbledore', attendance: 'Present' },
  { name: 'Minerva McGonagall', attendance: 'Absent' },
];

let component;
let onAttendanceChangeMock;

Given('the attendance grid is displayed', () => {
  // You can set up the initial rendering of the AttendanceGrid here
  component = render(<AttendanceGrid teachers={[]} onAttendanceChange={() => {}} />);
});

Given('the attendance grid is displayed with the following teachers:', (dataTable) => {
  // You can set up the initial rendering of the AttendanceGrid with mock data here
  const teachers = dataTable.hashes().map(({ Teacher, Attendance }) => ({ name: Teacher, attendance: Attendance }));
  component = render(<AttendanceGrid teachers={teachers} onAttendanceChange={() => {}} />);
});

When('the attendance for {string} is changed to {string}', (teacher, attendance) => {
  // Change attendance for the specified teacher
  const selectElement = component.getByTestId(`attendance-select-${teacher.replace(' ', '-')}`);
  fireEvent.change(selectElement, { target: { value: attendance } });
});

Then('the table header should contain {string} and {string}', (header1, header2) => {
  expect(component.getByText(header1)).toBeInTheDocument();
  expect(component.getByText(header2)).toBeInTheDocument();
});

Then('each teacher should have a corresponding row with their name and attendance status', () => {
  // Add assertions to check if each teacher has a corresponding row with name and attendance status
  mockTeachers.forEach(({ name, attendance }) => {
    expect(component.getByText(name)).toBeInTheDocument();
    expect(component.getByText(attendance)).toBeInTheDocument();
  });
});

Then('the onAttendanceChange callback should be called with arguments {string} and {string}', (teacher, attendance) => {
  expect(onAttendanceChangeMock).toHaveBeenCalledWith(teacher, attendance);
});

// You may also need a Before hook to set up common things before each scenario
// e.g., Before(() => { /* set up common things */ });
