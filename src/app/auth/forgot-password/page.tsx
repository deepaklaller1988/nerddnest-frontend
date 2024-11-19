"use client"
import React from 'react'
import { useRegisterMutation } from '@/app/redux/services/auth'
import { toasterSuccess } from '@/components/core/Toaster'
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import { forgotValidationSchema } from '@/utils/validationSchemas'
import { ForgotPasswordFormValues } from "@/types/authInterfaces";

export default function ForgotPassword() {
    useTitle("Lost Password")
    const [forgotpassword, { isLoading }] = useRegisterMutation();

    const initialValues :ForgotPasswordFormValues= {
      email: "",
    };
    const handleSubmit = async (values: typeof initialValues) => {
      try {
        await forgotpassword(values).unwrap();
        toasterSuccess("Login successful", 1000, "id");
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

