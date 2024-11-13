"use client"
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import React from 'react'

export default function Login() {
  useTitle("Login")
  return (
    <div>
      <AuthForm type="login"/>
    </div>
  )
}
