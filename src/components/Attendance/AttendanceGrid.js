// AttendanceGrid.js

import React from "react";

const AttendanceGrid = ({ teachers, onAttendanceChange }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 &&
            teachers.map((teacher) => (
              <tr key={teacher.name}>
                <td>{teacher.name}</td>
                <td>
                  <select
                    data-testid={`attendance-select-${teacher.name.replace(" ", "-")}`}
                    value={teacher.attendance}
                    onChange={(e) =>
                      onAttendanceChange(teacher.name, e.target.value)
                    }
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AttendanceGrid;
