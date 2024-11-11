"use client";
import React, { useActionState, useEffect, useState } from "react";

import Button from "@/components/common/Button";
import CheckInput from "@/components/common/form/CheckInput";
import Input from "@/components/common/form/Input";
import Link from "next/link";

import signup from "./signup.action";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function SignupForm() {
  const [state, action, isLoading] = useActionState(signup, undefined);

  const [error, setError] = useState("");

  useEffect(() => {
    setError(state?.error || "");
    setTimeout(() => {
      setError("");
    }, 2500);
  }, [state]);

  return (
    <form action={action} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your name
        </label>
        <Input
          type="name"
          name="name"
          id="name"
          required
          placeholder="Full Name"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="name@flowbite.com"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <Input type="password" name="password" id="password" required />
      </div>

      <ErrorMessage error={error} />

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <CheckInput id="remember" />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <Button loading={isLoading} type="submit">
        Register
      </Button>
      <div className="my-3">
        <Link
          href="/login"
          className="text-blue-500 hover:text-green-500 hover:underline text-sm"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
