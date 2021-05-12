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
    if(!isEditing)
      form.reset();
  }

  return (
    <div>
      <FormProvider {...form} >
        <form style={{ display: 'flex', flexFlow: 'column', alignItems:"center" }}>
          <div className="col-md-8" style={{paddingTop: "50px"}}>
            <label htmlFor="firstName">First Name</label>
            <input  className="form-control" {...form.register('firstName')} />
            <ErrorMessage name='firstName' />

            <div style={{paddingTop:"20px"}}>
              <label htmlFor="lastName">Last Name</label>
              <input  className="form-control" {...form.register('lastName')} />
              <ErrorMessage name='lastName' />
            </div>

            <div style={{paddingTop:"20px"}}>
              <label htmlFor="birthDate">Birth Date</label>
              <input  className="form-control" {...form.register('birthDate')} type='date' />
              <ErrorMessage name='birthDate' />
            </div>

            <div style={{paddingTop:"20px"}}>
              <label htmlFor="email">Email</label>
              <input  className="form-control" {...form.register('email')} />
              <ErrorMessage name='email' />
              </div>

            <div style={{paddingTop:"20px"}}>
              <label htmlFor="address">Address</label>
              <textarea className="form-control" {...form.register('address')} />
              <ErrorMessage name='address' />
            </div>

            <div style={{paddingTop:"20px"}}>
              <input className="form-check-input" {...form.register('gender')} value='male' type='radio' />
              <label className="form-check-label">Male</label>

              <input className="form-check-input" {...form.register('gender')} value='female' type='radio' />
              <label className="form-check-label">Female</label>
            </div>
            <ErrorMessage name='gender' />

            <div style={{display: 'flex', justifyContent:"center", marginTop: "10%"}}>
              {allowReset && (<div style={{width:"50%", display: 'flex', justifyContent:"center"}}><button style={{width:"100%",marginRight: "5%"}} className="btn btn-secondary" type='button' onClick={() => form.reset()}>Reset</button></div>)}
              <div style={{width:"50%",display: 'flex', justifyContent:"center"}}>
                <button style={{width:"100%", marginLeft: "5%"}} className="btn btn-success" type='button' onClick={()=>handleSubmit()}>{isEditing ? 'Edit' : 'Create'}</button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
