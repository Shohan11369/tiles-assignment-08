"use client";

import { authClient } from "@/lib/auth-client";
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

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    // form data

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
  
      email,
      password,
      callbackURL: "/"

    });

    console.log({ data, error });
  };

  return (
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
    </Card>
  );
}
