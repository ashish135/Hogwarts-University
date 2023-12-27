// App.js

import React, { useState, useEffect } from "react";
import AttendanceGrid from "./components/Attendance/AttendanceGrid";
import ScheduleGrid from "./components/Schedule/ScheduleGrid";
import { getData } from "./services/dataService";
import { getHigherTeacher } from "./utils/helpers";

function App() {
  const [loading, setLoading] = useState(true);
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
    setAttendance(
      data.teachers.map((teacher) => ({
        name: teacher.name,
        attendance: teacher.attendance,
      }))
    );
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => timer;
  }, []);

  const handleAttendanceChange = (teacherName, newAttendance) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((teacher) =>
        teacher.name === teacherName
          ? { ...teacher, attendance: newAttendance }
          : teacher
      )
    );
    setTeachers((prevAttendance) =>
      prevAttendance.map((teacher) =>
        teacher.name === teacherName
          ? { ...teacher, attendance: newAttendance }
          : teacher
      )
    );
  };

  useEffect(() => {
    const updatedSchedule = students.map((student) => {
      const allocation = allocations.find(
        (alloc) =>
          alloc.student === student && alloc.subject === "Potions Master"
      );

      const assignedTeachers = allocations
        .filter((allocation) => allocation.teacher !== "")
        .map((allocation) => allocation.teacher);

      const unassignedTeachers = teachers
        .filter((teacher) => !assignedTeachers.includes(teacher.name))
        .filter((teacher) => teacher.attendance === "Present")
        .map((unassignedTeacher) => unassignedTeacher.name);
      const stadBy = unassignedTeachers[unassignedTeachers.length - 1];

      const allocatedTeacher =
        allocation && allocation.teacher
          ? allocation.teacher
          : stadBy
          ? stadBy
          : "";
      const teacherIndex = teachers.findIndex(
        (teacher) => teacher.name === allocatedTeacher
      );
      const higherTeacher = getHigherTeacher(allocatedTeacher, teachers);
      let assignedTeacher = "";
      if (attendance !== undefined && teacherIndex >= 0) {
        if (attendance[teacherIndex].attendance === "Present") {
          assignedTeacher = allocatedTeacher;
        } else if (
          attendance[teacherIndex].attendance === "Absent" &&
          attendance[teachers.findIndex((t) => t.name === higherTeacher)] &&
          attendance[teachers.findIndex((t) => t.name === higherTeacher)]
            .attendance === "Present"
        ) {
          assignedTeacher = higherTeacher;
        } else if (
          attendance[teachers.findIndex((t) => t.name === higherTeacher)] &&
          attendance[teachers.findIndex((t) => t.name === higherTeacher)]
            .attendance === "Absent"
        ) {
          assignedTeacher = "Not Assigned";
        } 
      } 

      return {
        student,
        subject: "Potions Master",
        teacher: assignedTeacher,
      };
    });

    setSchedule(updatedSchedule);
  }, [attendance, allocations, students, teachers]);

  return (
    <>
      {loading ? (
        <div className="wrapper">
          <div className="illu">
            <div className="besen">
              <div className="besen__start"></div>
              <div className="besen__end"></div>
            </div>

            <div className="body"></div>

            <div className="leg">
              <div className="leg__top"></div>
              <div className="leg__down">
                <div className="foot"></div>
              </div>
            </div>

            <div className="arm">
              <div className="arm__top"></div>
              <div className="arm__down"></div>
            </div>

            <div className="cap">
              <div className="cap__main"></div>
              <div className="cap__end"></div>
            </div>

            <div className="face--profil">
              <div className="nose"></div>
              <div className="base">
                <div className="hair hair--right"></div>
                <div className="hair hair--left"></div>
                <div className="mouth"></div>
                <div className="glases face--side"></div>
                <div className="eye eye--right"></div>
              </div>
            </div>
          </div>

          <div className="wind wind--1"></div>
          <div className="wind wind--2"></div>

          <div className="schnatz">
            <div className="kugel"></div>
            <div className="wing wing--left"></div>
            <div className="wing wing--right"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="snap-animation">
            <h1>Welcome to</h1>
            <h2>Hogwarts University</h2>
          </div>
          <div className="container">
            <div className="column">
              <h2>Attendance</h2>
              <AttendanceGrid
                teachers={teachers}
                onAttendanceChange={handleAttendanceChange}
              />
            </div>
            <div className="column">
              <h2>Current Schedule</h2>
              <ScheduleGrid schedule={schedule} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
