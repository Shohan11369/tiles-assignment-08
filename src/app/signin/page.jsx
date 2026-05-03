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
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const loading = toast.loading("Signing you in...");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      toast.dismiss(loading);

      console.log({ data, error });

      //  ERROR HANDLING
      if (error) {
        if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
          toast.error("Invalid email or password!");
        } else {
          toast.error(error.message || "Login failed!");
        }
        return;
      }

      //  SUCCESS
      toast.success("Signed in successfully!");

      if (data) {
        window.location.href = "/";
      }
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Something went wrong!");
    }
  };

  //  GOOGLE LOGIN 
  const handlGoogleSignIn = async () => {
    const loading = toast.loading("Redirecting to Google...");

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      toast.dismiss(loading);

      if (error) {
        toast.error(error.message || "Google sign-in failed!");
        return;
      }

      toast.success("Google login successful!");
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Google sign-in failed!");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <Card className="border mx-auto w-[500px] py-10 mt-5">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>

        <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
          {/* EMAIL */}
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
          >
            <Label>Password</Label>

            <Input placeholder="Enter password" />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-20 bottom-42"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            <FieldError />
          </TextField>

          {/* SUBMIT */}
          <Button type="submit">
            <Check />
            Sign in
          </Button>
        </Form>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handlGoogleSignIn}
          type="button"
          variant="bordered"
          className="w-full mt-4"
        >
          <GrGoogle />
          Continue with Google
        </Button>
      </Card>
    </>
  );
}
