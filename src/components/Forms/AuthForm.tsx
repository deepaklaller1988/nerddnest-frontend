"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { AuthFormProps, AuthFormValues } from "@/types/authInterfaces";
import { useState } from "react";
import TermsOfServicePopup from "../Modals/Terms&Services";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdInformationCircleOutline } from "react-icons/io";

import InputField from "../core/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import Confirmationtext from "../Modals/Confirmationtext";
import { useApi } from "@/hooks/useAPI";
import { getErrorMessage } from "@/utils/errorHandler";
import { useDispatch } from "react-redux";

const AuthForm = <T extends AuthFormValues>({
  type,
  initialValues,
  validationSchema,
  onSubmit,
  isRegistered,
  isActivated,
  errorMessage,
  successMsg,
}: AuthFormProps<T>) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const Type = searchParams.get("type") || "";
  const { API } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleResendActivationEmail = async () => {
    try {
      const email = initialValues.email; 
      if (!email) {
        alert("Please enter your email to resend the activation link.");
        return;
      }
  
      const { success, data, error } = await API.post("auth/resend-activation-mail", {
        email,
      });
  
      if (success) {
        alert("Activation email has been resent successfully!");
      } else {
        const errorMessage = getErrorMessage(error?.code || "unknown_error");
        alert(`Failed to resend activation email: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error in resending activation email:", err);
      alert("An error occurred while trying to resend the activation email.");
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <div className="relative w-1/2 bg-black flex items-center justify-center">
        <Image
          src="/formImage.png"
          alt="Futuristic Avatar"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <div className="max-w-md w-full">
          <div className="flex mb-8">
            <Image
              src="/logo1.png"
              width={50}
              height={50}
              alt="Futuristic Avatar"
              className="rounded-full h-[50px] w-[50px] m-auto"
            />
          </div>

          {(token || successMsg) && (
            <Confirmationtext
              heading={"We’re almost there!"}
              text={successMsg ? successMsg : errorMessage || ""}
              buttontext={Type == "activation" ? "OK" : ""}
              type={Type}
              error={errorMessage}
            />
          )}
          {errorMessage == "User not verified Yet" && (
            <div className="p-4 bg-red-500 text-white rounded-xl">
              ERROR: Your account has not been activated. Check your email for
              the activation link.
              <p className="text-white">
                If you have not received an email yet,{" "}
                <span
                  className="underline cursor-pointer text-white"
                  onClick={()=>handleResendActivationEmail()}
                >
                  click here to resend it.
                </span>
              </p>
            </div>
          )}

          {!(token || isRegistered) ? (
            <>
              {type !== "forgot-password" && (
                <div className="flex justify-between items-center mb-6 mt-5">
                  <h2 className="text-xl">
                    {type === "login" ? "Sign In" : "Create an Account"}
                  </h2>
                  <Link
                    href={type === "login" ? "/auth/signup" : "/auth/login"}
                    className="text-sm text-gray-500 cursor-pointer"
                  >
                    {type === "login" ? (
                      <span className="hover:text-[var(--highlight-blue)]">
                        Create an Account
                      </span>
                    ) : (
                      <>
                        <span className="mr-1">or</span>
                        <span className="hover:text-[var(--highlight-blue)]">
                          Sign in
                        </span>
                      </>
                    )}
                  </Link>
                </div>
              )}
              {type == "forgot-password" && (
                <p className="mb-10 text-gray-600">
                  Please enter your username or email address. You will receive
                  an email message with instructions on how to reset your
                  password.
                </p>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form className="space-y-6">
                    {type !== "reset-password" && (
                      <InputField
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        icon={<FiMail className="text-gray-400 mr-2" />}
                      />
                    )}

                    {type === "signup" && (
                      <InputField
                        name="confirmemail"
                        type="email"
                        placeholder="Confirm Email Address"
                        icon={<FiMail className="text-gray-400 mr-2" />}
                      />
                    )}
                    {type !== "forgot-password" && (
                      <>
                        <div className="relative">
                          <InputField
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon={<FiLock className="text-gray-400 mr-2" />}
                          />
                        </div>
                        {(type === "signup" || type === "reset-password") && (
                          <InputField
                            name="confirmpassword"
                            type="password"
                            placeholder="Confirm Password"
                            icon={<FiLock className="text-gray-400 mr-2" />}
                          />
                        )}
                      </>
                    )}

                    {type == "signup" && (
                      <>
                        <InputField
                          name="firstname"
                          type="text"
                          placeholder="First Name"
                        />
                        <InputField
                          name="lastname"
                          type="text"
                          placeholder="Last Name"
                        />

                        <InputField
                          name="handle"
                          type="text"
                          placeholder="Handle"
                        />

                        <InputField
                          name="dob"
                          type="date"
                          placeholder="birthday"
                        />
                        <InputField
                          name="location"
                          type="text"
                          placeholder="Where are you from? (optional)"
                        />
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name="agree"
                            className="h-4 w-4 text-indigo-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            I agree to the
                            <span
                              onClick={openModal}
                              className="text-sm hover:text-blue-500 cursor-pointer ml-1"
                            >
                              Terms of Service.
                            </span>
                          </span>
                        </label>
                        <ErrorMessage
                          name="agree"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </>
                    )}

                    {type == "login" && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Remember Me
                          </span>
                        </label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm hover:text-[var(--highlight-blue)] cursor-pointer"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    )}
                    <button
                      type="submit"
                      // disabled={isLoading}
                      className="w-full p-3 rounded-lg font-semibold bg-[var(--highlight-blue)] cursor-pointer text-white"
                      // className={`w-full p-3 rounded-lg font-semibold bg-[var(--highlight-blue)] ${
                      //   "isLoading" ? "cursor-not-allowed" : "cursor-pointer"
                      // } text-white`}
                    >
                      {type === "login"
                        ? "Log In"
                        : type == "signup"
                        ? "Create an Account"
                        : type == "forgot-password"
                        ? "Request reset link"
                        : type == "reset-password"
                        ? "Reset Password"
                        : ""}
                    </button>
                    {type == "forgot-password" && (
                      <div className="flex items-center justify-between">
                        <Link
                          href="/auth/login"
                          className="text-sm hover:text-[var(--highlight-blue)] cursor-pointer"
                        >
                          Back to sign in
                        </Link>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
              {type !== "signup" && type !== "reset-password" && (
                <div
                  onClick={openModal}
                  className="text-center mt-4 text-xs font-bold text-black-400 hover:text-[var(--highlight-blue)] cursor-pointer"
                >
                  Terms of Service
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <TermsOfServicePopup isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default AuthForm;
