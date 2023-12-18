// dataService.js

const teachersData = [
  { name: "Professor Dumbledore", attendance: "Present" },
  { name: "Minerva McGonagall", attendance: "Present" },
  { name: "Rubeus Hagrid", attendance: "Present" },
  { name: "Horace Slughorn", attendance: "Present" },
  { name: "Severus Snape", attendance: "Present" },
];

const studentsData = [
  "Harry Potter",
  "Hermione Granger",
  "Ron Weasley",
  "Draco Malfoy",
  "Padma Patil",
  "Luna Lovegood",
];

const subjectTeacherAllocation = [
  {
    student: "Harry Potter",
    subject: "Potions Master",
    teacher: "Horace Slughorn",
  },
  {
    student: "Hermione Granger",
    subject: "Potions Master",
    teacher: "Minerva McGonagall",
  },
  {
    student: "Ron Weasley",
    subject: "Potions Master",
    teacher: "Severus Snape",
  },
  {
    student: "Draco Malfoy",
    subject: "Potions Master",
    teacher: "Horace Slughorn",
  },
  {
    student: "Padma Patil",
    subject: "Potions Master",
    teacher: "Minerva McGonagall",
  },
  {
    student: "Luna Lovegood",
    subject: "Potions Master",
    teacher: "Severus Snape",
  },
];

export const getData = () => {
  return {
    teachers: teachersData,
    students: studentsData,
    allocations: subjectTeacherAllocation,
  };
};
