"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { AuthFormProps, AuthFormValues } from "@/types/authInterfaces";
import { useState } from "react";
import TermsOfServicePopup from "../Modals/Terms&Services";
import { Formik, Form, Field, ErrorMessage } from "formik";

import InputField from "../core/InputField";
import {  usePathname, useSearchParams } from "next/navigation";
import Confirmationtext from "../Modals/Confirmationtext";


const AuthForm = <T extends AuthFormValues>({
  type,
  initialValues,
  validationSchema,
  onSubmit,
  isRegistered,
  errorMessage,
  successMsg,
  handleResendActivationEmail,
  sucessActivationEmail,
  isLoading
}: AuthFormProps<T>) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const Type = searchParams.get("type") || "";
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


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

      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-[var(--sections)]">
        <div className="max-w-md w-full">
          <div className="flex mb-8">
            <Image
              src="/Nerdlogo.png"
              width={100}
              height={100}
              alt="Futuristic Avatar"
              className="h-[100px] w-[100px] m-auto"
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
          {!sucessActivationEmail && errorMessage == "User not verified Yet"&& pathname=="/auth/login" &&(
            <div className="p-4 bg-red-500 text-white rounded-xl">
              ERROR: Your account has not been activated. Check your email for
              the activation link.
            {type !=="forgot-password" && 
             <p className="text-white">
             If you have not received an email yet,{" "}
             <span
               className="underline cursor-pointer text-white"
               onClick={() => handleResendActivationEmail()}
             >
               click here to resend it.
             </span>
           </p>
            } 
            
            </div>
          )}

          {sucessActivationEmail &&
          <Confirmationtext
          text={sucessActivationEmail || "Activation email resent! Please check your inbox or spam folder." }
         
        />
          }

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
                <p className="mb-10 mt-5">
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
                        <label className="flex items-center customCheckbox gap-2">
                          <Field
                            type="checkbox"
                            name="agree"
                            className="h-4 w-4 text-indigo-500 border-gray-300 rounded"
                          />
                          <span>
                          </span>
                            I agree to the
                            <b
                              onClick={openModal}
                              className="text-sm text-white hover:text-[var(--highlight-blue)] cursor-pointer"
                            >
                              Terms of Service.
                            </b>
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
                        <label className="flex items-center customCheckbox gap-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-500 border-gray-300 rounded"
                          />
                          <span></span>
                            Remember Me
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
                      disabled={isLoading}
                      className={`w-full p-3 rounded-lg font-semibold bg-[var(--highlight-blue)] ${
                        isLoading ? "cursor-not-allowed" : "cursor-pointer"
                      } text-white`}
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
