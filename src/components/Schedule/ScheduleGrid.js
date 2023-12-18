// ScheduleGrid.js

import React from "react";

const ScheduleGrid = ({ schedule }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Subject</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((entry) => (
          <tr key={entry.student}>
            <td>{entry.student}</td>
            <td>{entry.subject}</td>
            <td>{entry.teacher}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleGrid;
