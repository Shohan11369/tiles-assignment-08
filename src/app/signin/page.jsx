"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const loading = toast.loading("Signing you in...");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    toast.dismiss(loading);

    console.log({ data, error });

    if (error) {
      toast.error(error.message || "Invalid email or password!");
      return;
    }

    toast.success("Signed in successfully!");
  };

  const handlGoogleSignIn = async () => {
    try {
      const loading = toast.loading("Redirecting to Google...");

      await authClient.signIn.social({
        provider: "google",
      });

      toast.dismiss(loading);
    } catch (err) {
      toast.error("Google sign-in failed!");
    }
  };

  return (
    <>
      {/* Toast container */}
      <Toaster position="top-center" />

      <Card className="border mx-auto w-[500px] py-10 mt-5">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>

        <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter password" />
            <FieldError />
          </TextField>

          <Button type="submit">
            <Check />
            Sign in
          </Button>
        </Form>

        {/* Google Login */}
        <Button
          onClick={handlGoogleSignIn}
          type="button"
          variant="bordered"
          className="w-full"
        >
          <GrGoogle /> Continue with Google
        </Button>
      </Card>
    </>
  );
}
