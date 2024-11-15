"use client"
import { useRegisterMutation } from '@/app/redux/services/auth'
import { toasterSuccess } from '@/components/core/Toaster'
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import { forgotValidationSchema } from '@/utils/validationSchemas'
import React from 'react'

export default function ForgotPassword() {
    useTitle("Lost Password")
    const [login, { isLoading }] = useRegisterMutation();

    const initialValues = {
      email: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
      try {
        await login(values).unwrap();
        toasterSuccess("Login successful", "3000", "id");
      } catch (err) {
        console.error("Error:", err);
      }
    };
    return (
      <div>
        <AuthForm isLoading ={isLoading} type="forgot-password" initialValues={initialValues} validationSchema={forgotValidationSchema} onSubmit={handleSubmit} />
      </div>
    )
  }

