Feature: Attendance Grid Functionality

  Scenario: Render the table header
    Given the attendance grid is displayed
    Then the table header should contain "Teacher" and "Attendance"

  Scenario: Render a row for each teacher
    Given the attendance grid is displayed with the following teachers:
      | Teacher               | Attendance |
      | Professor Dumbledore  | Present    |
      | Minerva McGonagall    | Absent     |
    Then each teacher should have a corresponding row with their name and attendance status

  Scenario: Change attendance and verify onAttendanceChange callback
    Given the attendance grid is displayed with the following teachers:
      | Teacher               | Attendance |
      | Professor Dumbledore  | Present    |
      | Minerva McGonagall    | Absent     |
    When the attendance for "Professor Dumbledore" is changed to "Absent"
    Then the onAttendanceChange callback should be called with arguments "Professor Dumbledore" and "Absent"

    When the attendance for "Minerva McGonagall" is changed to "Present"
    Then the onAttendanceChange callback should be called with arguments "Minerva McGonagall" and "Present"
