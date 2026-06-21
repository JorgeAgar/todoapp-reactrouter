import { Form, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
import { useRef } from "react";

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 dark bg-black">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");

  let navigate = useNavigate();

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await authClient.signUp.email(
      {
        email: emailRef.current,
        password: passwordRef.current,
        name: nameRef.current,
        callbackURL: `${window.location.origin}/tasks`
      },
      {
        onRequest: (ctx) => {
          // show loading state
        },
        onSuccess: (ctx) => {
          // console.log("User signed up successfully", ctx.data);
          navigate("/tasks");
        },
        onError: (ctx) => {
          alert(ctx.error);
        },
      },
    );
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={signUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                onChange={(e) => {
                  nameRef.current = e.target.value;
                }}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => {
                  emailRef.current = e.target.value;
                }}
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => {
                  passwordRef.current = e.target.value;
                }}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  );
}

