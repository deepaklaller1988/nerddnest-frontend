"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { AuthFormProps } from "@/types/authInterfaces";
import { useState } from "react";
import TermsOfServicePopup from "../Modals/Terms&Services";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  return (
    <div className="flex min-h-screen">
      <div className="relative w-1/2 bg-black flex items-center justify-center">
        <Image
          src="/formimage.webp"
          alt="Futuristic Avatar"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="max-w-md w-full">
          <div className="flex mb-8">
            <Image
              src="/logo1.png"
              width={50}
              height={50}
              alt="Futuristic Avatar"
              className="opacity-90"
            />
          </div>
          {type !== "forgot-password" && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl">
                {type === "login" ? "Sign In" : "Create an Account"}
              </h2>
              <Link
                href={type === "login" ? "/auth/signup" : "/auth/login"}
                className="text-sm text-gray-500 cursor-pointer"
              >
                {type === "login" ? (
                  <span className="hover:text-blue-500">Create an Account</span>
                ) : (
                  <>
                    <span className="mr-1">or</span>
                    <span className="hover:text-blue-500">Sign in</span>
                  </>
                )}
              </Link>
            </div>
          )}
          {type == "forgot-password" && (
            <p className="mb-10 text-gray-600">
              Please enter your username or email address. You will receive an
              email message with instructions on how to reset your password.
            </p>
          )}
          <form className="space-y-6">
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full p-2 focus:outline-none"
                placeholder="Email Address"
              />
            </div>

            {type == "signup" && (
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  className="w-full p-2 focus:outline-none"
                  placeholder="Confirm Email Address"
                />
              </div>
            )}
            {type !== "forgot-password" && (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                  <FiLock className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    className="w-full p-2 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
                {type === "signup" && (
                  <div className="flex items-center border border-gray-300 rounded-lg p-2">
                    <FiLock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      className="w-full p-2 focus:outline-none"
                      placeholder="Confirm Password"
                    />
                  </div>
                )}
              </>
            )}

            {type == "signup" && (
              <>
                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                  <input
                    type="name"
                    className="w-full p-2 focus:outline-none"
                    placeholder="First Name"
                  />
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                  <input
                    type="name"
                    className="w-full p-2 focus:outline-none"
                    placeholder="Last Name"
                  />
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                  <input
                    type="name"
                    className="w-full p-2 focus:outline-none"
                    placeholder="Handle"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                  <input
                    type="name"
                    className="w-full p-2 focus:outline-none"
                    placeholder="birthday"
                  />
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                  <input
                    type="name"
                    className="w-full p-2 focus:outline-none"
                    placeholder="Where are you from? (optional)"
                  />
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
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
                  className="text-sm hover:text-blue-500 cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-lg font-semibold"
            >
              {type === "login"
                ? "Log In"
                : type == "signup"
                ? "Create an Account"
                : type == "forgot-password"
                ? "Request reset link"
                : ""}
            </button>
            {type == "forgot-password" && (
              <div className="flex items-center justify-between">
                <Link
                  href="/auth/login"
                  className="text-sm hover:text-blue-500 cursor-pointer"
                >
                  Back to sign in
                </Link>
              </div>
            )}
          </form>
          {type !== "signup" && (
            <div
              onClick={openModal}
              className="text-center mt-4 text-xs font-bold text-black-400 hover:text-blue-500 cursor-pointer"
            >
              Terms of Service
            </div>
          )}
        </div>
      </div>
      <TermsOfServicePopup isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default AuthForm;
