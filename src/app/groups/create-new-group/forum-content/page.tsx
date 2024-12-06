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
          <h1 className="text-white mb-4 font-bold text-[20px]">Group Forum</h1>
          <p className="mt-4">
            Create a discussion forum to allow members of this group to
            communicate in a structured, bulletin-board style fashion.
          </p>
          <label className="flex items-center mt-6 customCheckbox">
            <input
              type="checkbox"
              name="agree"
            />
            <span></span>
            <b className="ml-2 text-white">
            Yes, I want this group to have a discussion forum.              
            </b>
          </label>
         
        </Form>
      )}
    </Formik>
  );
}
