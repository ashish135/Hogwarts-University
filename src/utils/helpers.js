// helpers.js

export const getHigherTeacher = (teacher, teachers) => {
    let index = teachers.findIndex((t) => t.name === teacher);
    if (index > 0) {
      for(let i = index; i>0; i--){
        if(teachers[i - 1].attendance === "Present"){
          return teachers[i - 1].name;
        }
      }
    }
    return 'Not Assigned';
  };
  