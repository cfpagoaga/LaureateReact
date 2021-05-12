import React from 'react';
import { useFormContext } from 'react-hook-form';

export function ErrorMessage({ name }: { name: string }) {
  const { formState: { errors } } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  return (
    <p style={{ color: 'red' }}>{error.message}</p>
  );
}