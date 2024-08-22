"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "./AuthForm";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/nifo_logo.svg";

const FormWrap = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/job-list");
      }
    };

    checkUser();
  }, [router, supabase]);

  const handleSignIn = () => {
    // This function will be called after successful sign-in
    router.push("/job-list");
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full">
        <Image alt="Your Company" src={Logo} className="mx-auto h-10 w-auto" />
        <h1 className="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-white">
          JOB APPLICATION TRACKER
        </h1>
        <h2 className="mt-4 text-center text-xl font-normal leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
      <AuthForm onSignIn={handleSignIn} />
      <div className="mt-20 text-center text-sm text-gray-500">
        <p>
          Built and designed by{" "}
          <Link
            href="https://nickf.io"
            className="text-white transition hover:text-indigo-500"
          >
            Nick F
          </Link>
        </p>
        <p className="mt-2 text-[0.6rem]">
          Tutorial by{" "}
          <Link
            href="https://www.youtube.com/watch?v=_XM9ziOzWk4"
            className="text-white transition hover:text-indigo-500"
          >
            Code Ryan
          </Link>
        </p>
        <p className="mt-2 text-[0.6rem]">Debugging assisted by Claude AI</p>
      </div>
    </div>
  );
};

export default FormWrap;
