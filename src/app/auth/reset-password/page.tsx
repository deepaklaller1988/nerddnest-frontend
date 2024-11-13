"use client"
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import React from 'react'

export default function ResetPassword() {
  useTitle("Reset Password")

  return (
    <div>
      <AuthForm type="reset-password"/>
    </div>
  )
}
