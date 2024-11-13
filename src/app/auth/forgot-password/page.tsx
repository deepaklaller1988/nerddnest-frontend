"use client"
import AuthForm from '@/components/Forms/AuthForm'
import useTitle from '@/hooks/useTitle'
import React from 'react'

export default function ForgotPassword() {
    useTitle("Lost Password")

    return (
      <div>
        <AuthForm type="forgot-password"/>
      </div>
    )
  }
  