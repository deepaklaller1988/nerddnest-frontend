"use client";
import { Formik, Field, Form } from "formik";
import React from "react";

export default function ForumContent() {
  return (
    <Formik
      initialValues={{ agree: false }} // Initial form values
      onSubmit={(values) => {
        console.log(values); // Handle form submission
      }}
    >
      {() => (
        <Form className="p-6">
          <h1 className="text-[var(--highlight)]">Group Forum</h1>
          <p className="text-sm mt-8">
            Create a discussion forum to allow members of this group to
            communicate in a structured, bulletin-board style fashion.
          </p>
          <label className="flex items-center mt-6">
            <Field
              type="checkbox"
              name="agree"
              className="h-4 w-4 text-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm  text-[var(--highlight)]">
            Yes, I want this group to have a discussion forum.
              
            </span>
          </label>
         
        </Form>
      )}
    </Formik>
  );
}
