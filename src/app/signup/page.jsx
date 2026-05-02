"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const loading = toast.loading("Creating your account...");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    toast.dismiss(loading);

    console.log({ data, error });

    if (error) {
      const msg = error.message?.toLowerCase();

      if (msg?.includes("exist") || msg?.includes("already")) {
        toast.error("This email is already registered!");
      } else {
        toast.error(error.message || "Something went wrong!");
      }
      return;
    }

    toast.success("Account created successfully!");
    router.push("/");
  };

  const handleGoogleSignUp = async () => {
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
        <h1 className="text-center text-2xl font-bold">User Registration</h1>

        <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
          {/* Name */}
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type={showPassword ? "text" : "password"}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
            className="relative"
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            {/* EYE ICON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button type="submit">
              <Check />
              Register
            </Button>

            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>

          {/* Google Login */}
          <Button
            onClick={handleGoogleSignUp}
            type="button"
            variant="bordered"
            className="w-full"
          >
            <GrGoogle /> Continue with Google
          </Button>
        </Form>
      </Card>
    </>
  );
}
