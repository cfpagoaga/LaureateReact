import React from 'react';
import StudentForm from './student-form.component'
import studentService from "../services/student.service";
import Swal from 'sweetalert2';

export default function AddStudent() {
  async function onSubmit(values: any) {
    let response = await studentService.create(values);
    if(response.status ==200){
      Swal.fire('Student Saved Correctly', '', 'success')
    }else{
      Swal.fire('Something went wrong', '', 'error')
    }
  }

  return (
    <StudentForm onSubmit={onSubmit} allowReset />
  );
}