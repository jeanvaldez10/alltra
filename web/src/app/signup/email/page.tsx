"use client";

import { Suspense } from "react"; // Import Suspense
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { FormDataType } from "../../../../@types";
import Auth from "../../../../client/auth";
const auth = new Auth();

const PageContent = () => {
  const params = useSearchParams();
  const { toast } = useToast();
  useEffect(() => {
    if (!params.has("value")) {
      redirect("/signup");
    }
  }, []);

  const email = params.get("value");

  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    username: "",
    email: email as string,
    password: "",
    verification_code: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upperLower: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    // Update password in the form data
    setFormData((prev) => ({
      ...prev,
      password,
    }));

    // Check password strength
    setPasswordChecks({
      length: password.length >= 8,
      upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const HandleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    if (!formData.first_name.trim()) {
      return toast({
        title: "Form Submission Failed",
        description: "First name is required.",
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
      });
    }
    if (!formData.last_name.trim()) {
      return toast({
        title: "Form Submission Failed",
        description: "Last name is required.",
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
      });
    }
    if (!formData.username.trim()) {
      return toast({
        title: "Form Submission Failed",
        description: "Username is required.",
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
      });
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return toast({
        title: "Form Submission Failed",
        description: "A valid email address is required.",
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
      });
    }
    if (!passwordChecks.length || !passwordChecks.upperLower || !passwordChecks.number || !passwordChecks.special) {
      return toast({
        title: "Form Submission Failed",
        description:
          "Password must meet all requirements: at least 8 characters, include uppercase/lowercase letters, numbers, and special characters.",
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
      });
    }
    if (!formData.verification_code.trim()) {
      return toast({
        title: "Form Submission Failed",
        description: "Verification code is required.",
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
      });
    }

    const response = await auth.signup(formData);
    if (response.data.code !== 201) {
      return toast({
        title: "Form Submission Failed",
        description: response.data.message,
        action: <ToastAction altText="Try Again">Retry</ToastAction>,
        variant: "destructive",
      });
    }
    toast({
      title: "Signed Up Successfully",
      description: response.data.message,
    });
    redirect("/login");
  };

  const HandleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gradient-to-tl from-blue-950/50 via-zinc-950 to-black">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <h1 className="text-xl">Complete your signing up information</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={HandleFormSubmit}>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <Label>First Name</Label>
                <Input
                  placeholder="What's your First Name?"
                  id="first_name"
                  name="first_name"
                  onChange={HandleSignUpFormChange}
                  value={formData.first_name}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  placeholder="What's your Last Name?"
                  id="last_name"
                  name="last_name"
                  onChange={HandleSignUpFormChange}
                  value={formData.last_name}
                />
              </div>
            </div>
            <div>
              <Label>Username</Label>
              <Input
                placeholder="What's your username?"
                id="username"
                name="username"
                onChange={HandleSignUpFormChange}
                value={formData.username}
              />
            </div>
            <div>
              <Label className="text-zinc-400">Email</Label>
              <Input
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                value={email as string}
                readOnly
                className="bg-zinc-900 text-zinc-500 cursor-default focus-visible:ring-0"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                placeholder="Create a password"
                id="password"
                name="password"
                type="password"
                onChange={handlePasswordChange}
                value={formData.password}
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.length ? (
                    <Check className="text-green-500 w-5" />
                  ) : (
                    <X className="text-red-500 w-5" />
                  )}
                  At least 8 characters
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.upperLower ? (
                    <Check className="text-green-500 w-5" />
                  ) : (
                    <X className="text-red-500 w-5" />
                  )}
                  Includes uppercase and lowercase letters
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.number ? (
                    <Check className="text-green-500 w-5" />
                  ) : (
                    <X className="text-red-500 w-5" />
                  )}
                  Includes numbers
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {passwordChecks.special ? (
                    <Check className="text-green-500 w-5" />
                  ) : (
                    <X className="text-red-500 w-5" />
                  )}
                  Includes special characters (!, @, #, etc.)
                </div>
              </div>
            </div>
            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground bg-zinc-950">
                  Email Verification
                </span>
              </div>
            </div>
            <div>
              <Label>Verification Code</Label>
              <Input
                placeholder="Put the verification code"
                id="verification_code"
                name="verification_code"
                onChange={HandleSignUpFormChange}
                value={formData.verification_code}
              />
              <p className="text-sm mt-2 ml-1">
                Didn't receive?{" "}
                <span className="text-blue-600 hover:text-blue-700 cursor-pointer duration-75">
                  Resend.
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label htmlFor="terms2" className="text-sm font-medium leading-none">
                Accept terms and conditions
              </label>
            </div>
            <Button type="submit">Confirm</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-2 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking confirm, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
