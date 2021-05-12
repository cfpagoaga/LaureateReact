import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import StudentForm, { Student } from './student-form.component'
import studentService from '../services/student.service'
import Swal from 'sweetalert2';

export default function EditStudent() {
  const { id } = useParams<{ id: string }>()

  const [isFetching, setIsFetching] = useState(true);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    const student = await studentService.get(id);
    const birthDate = student.birthDate.split('T')[0];
    setStudent({ 
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate,
      email: student.email,
      address: student.address,
      gender: student.gender
    })
    setIsFetching(false);
  }

  async function onSubmit(values: any) {
    let response = await studentService.update(id, values);
    if(response.status==200){
      Swal.fire('Student Updated Correctly', '', 'success')
    }else{
      Swal.fire('Something went wrong', '', 'error')
    }
  }

  return (
    <React.Fragment>
      {isFetching ? (<p>Cargando el estudiante...</p>) : (<StudentForm defaultValues={student} onSubmit={onSubmit} isEditing />)}
    </React.Fragment>
  )
}
