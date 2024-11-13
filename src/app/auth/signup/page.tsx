"use client"
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import React from 'react'

export default function SignUp() {
  useTitle("Create an Account")

  return (
    <div>
      <AuthForm type="signup"/>
    </div>
  )
}
