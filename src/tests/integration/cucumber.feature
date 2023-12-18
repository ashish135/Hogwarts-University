Feature: Teacher Attendance and Student Schedule

  Scenario: Update teacher attendance and verify student schedule
    Given the teacher attendance grid is displayed
    When I change the attendance of "Professor Dumbledore" to "Absent"
    Then the current schedule should be updated accordingly
    And "Harry Potter" should be assigned a new teacher
