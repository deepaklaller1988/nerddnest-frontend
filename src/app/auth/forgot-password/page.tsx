"use client"
import React, { useState } from 'react'
import { useForgotpasswordMutation } from '@/redux/services/auth'
import { toasterSuccess } from '@/components/core/Toaster'
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import { forgotValidationSchema } from '@/utils/validationSchemas'
import { ForgotPasswordFormValues } from "@/types/authInterfaces";

export default function ForgotPassword() {
    useTitle("Lost Password")
    const [forgotpassword, { isLoading }] = useForgotpasswordMutation();

    const [initialValues, setInitialValues] = useState<ForgotPasswordFormValues>({
      email: "",
    });
    
    const handleSubmit = async (values: typeof initialValues) => {
        await forgotpassword(values).unwrap();
        toasterSuccess("Please Check Your Register Gmail Id", 3000, "id");
        setInitialValues({ email: "" });
      
    };
    return (
      <div>
        <AuthForm isLoading ={isLoading} type="forgot-password" initialValues={initialValues} validationSchema={forgotValidationSchema} onSubmit={handleSubmit} />
      </div>
    )
  }

