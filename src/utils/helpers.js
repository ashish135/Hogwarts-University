// helpers.js

export const getHigherTeacher = (teacher, teachers) => {
    const index = teachers.findIndex((t) => t.name === teacher);
    if (index > 0) {
      return teachers[index - 1].name;
    }
    return 'Not Assigned';
  };
  