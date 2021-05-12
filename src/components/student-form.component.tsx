import React, { Component } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import studentService from "../services/student.service";
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup';
import { ErrorMessage } from "./ui/ErrorMessage";

const validationSchema = object().shape({
  firstName: string().required('Ingrese el primer nombre.'),
  lastName: string().required('Ingrese el apellido.'),
  birthDate: string().required('Seleccione la fecha de nacimiento.'),
  email: string().email('El texto ingresado no es un correo valido.').required('Ingrese el correo.'),
  address: string().required('Ingrese la direccion.'),
  gender: string().transform((value) => (value == null ? '' : value)).required('Seleccione el genero.')
});

export interface Student {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  address: string;
  gender: string;
}

interface Props {
  defaultValues?: Student;
  onSubmit(values: any): void;
  allowReset?: boolean;
  isEditing?: boolean;
}

export default function StudentForm({ defaultValues, onSubmit, allowReset = false, isEditing = false }: Props) {
  const form = useForm({
    defaultValues, mode: 'all', resolver: yupResolver(validationSchema)
  });

  function handleSubmit(){
    form.handleSubmit(onSubmit)()
    form.reset();
  }

  return (
    <div>
      <FormProvider {...form} >
        <form style={{ display: 'flex', flexFlow: 'column', alignItems:"center" }}>
          <div style={{width:"400px", paddingTop: "50px"}}>
            <label htmlFor="firstName">First Name</label>
            <input  className="form-control" {...form.register('firstName')} />
            <ErrorMessage name='firstName' />

            <label htmlFor="lastName">Last Name</label>
            <input  className="form-control" {...form.register('lastName')} />
            <ErrorMessage name='lastName' />


            <label htmlFor="birthDate">Birth Date</label>
            <input  className="form-control" {...form.register('birthDate')} type='date' />
            <ErrorMessage name='birthDate' />


            <label htmlFor="email">Email</label>
            <input  className="form-control" {...form.register('email')} />
            <ErrorMessage name='email' />


            <label htmlFor="address">Address</label>
            <textarea className="form-control" {...form.register('address')} />
            <ErrorMessage name='address' />

            <div>
              <input className="form-check-input" {...form.register('gender')} value='male' type='radio' />
              <label className="form-check-label">Male</label>

              <input className="form-check-input" {...form.register('gender')} value='female' type='radio' />
              <label className="form-check-label">Female</label>
            </div>
            <ErrorMessage name='gender' />

            <div style={{display: 'flex', justifyContent:"center"}}>
              <div>
              {allowReset && (<button className="btn btn-secondary" type='button' onClick={() => form.reset()}>Reset</button>)}

              <button className="btn btn-success" type='button' onClick={()=>handleSubmit()}>{isEditing ? 'Editar' : 'Crear'}</button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
