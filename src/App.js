// App.js

import React, { useState, useEffect } from 'react';
import AttendanceGrid from './components/Attendance/AttendanceGrid';
import ScheduleGrid from './components/Schedule/ScheduleGrid';
import { getData } from './services/dataService';
import { getHigherTeacher } from './utils/helpers';

function App() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const data = getData();
    setTeachers(data.teachers);
    setStudents(data.students);
    setAllocations(data.allocations);
    setAttendance(data.teachers.map((teacher) => ({ name: teacher.name, attendance: teacher.attendance })));
  }, []);

  const handleAttendanceChange = (teacherName, newAttendance) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((teacher) =>
        teacher.name === teacherName ? { ...teacher, attendance: newAttendance } : teacher
      )
    );
    setTeachers((prevAttendance) =>
    prevAttendance.map((teacher) =>
      teacher.name === teacherName ? { ...teacher, attendance: newAttendance } : teacher
    ))
  };

  useEffect(() => {
    
    const updatedSchedule = students.map((student) => {
      const allocation = allocations.find((alloc) => alloc.student === student && alloc.subject === 'Potions Master');
      const allocatedTeacher = allocation ? allocation.teacher : '';
      const teacherIndex = teachers.findIndex((teacher) => teacher.name === allocatedTeacher);
      const higherTeacher = getHigherTeacher(allocatedTeacher, teachers);
      
      let assignedTeacher = '';
      if(attendance !== undefined && teacherIndex >= 0){
        if (attendance[teacherIndex].attendance === 'Present') {
          assignedTeacher = allocatedTeacher;
        } else if (attendance[teacherIndex].attendance === 'Absent' && attendance[teachers.findIndex((t) => t.name === higherTeacher)].attendance === 'Present') {
          assignedTeacher = higherTeacher;
        } else if (attendance[teachers.findIndex((t) => t.name === higherTeacher)].attendance === 'Absent') {
          assignedTeacher = 'Not Assigned';
        }
      }

      return {
        student,
        subject: 'Potions Master',
        teacher: assignedTeacher,
      };
    }
    );

    setSchedule(updatedSchedule);
  }, [attendance, allocations, students, teachers]);

  return (
    <div className="container">
      <div className="column">
        <h2>Attendance</h2>
        { console.log("Teacher ", teachers) }
        <AttendanceGrid teachers={teachers} onAttendanceChange={handleAttendanceChange} />
      </div>
      <div className="column">
        <h2>Current Schedule</h2>
        <ScheduleGrid schedule={schedule} />
      </div>
    </div>
  );
}

export default App;