"use client"
import { FacebookIcon, TwitterIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Icons } from "@/components/global/icons";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import Auth from "../../../client/auth";
import Link from "next/link";
const auth = new Auth();

const Login = () => {
  const [currentForm, setCurrentForm] = useState<number>(0);
  const _formData = {
    title: "Welcome To Tradeplex",
    subtitle: "Login to access your trading portal",
    fields: [
      { id: "email", label: "Email", type: "text" },
      { id: "password", label: "Password", type: "password" },
    ],
    buttonText: "Login",
  };
  // Social login options data
  const socialOptions = [
    {
      name: "Github",
      icon: <Icons.gitHub className="h-[15px] w-[15px]" />,
      alt: "FacebookIcon app symbol",
    },
    {
      name: "Apple",
      icon: <Icons.apple className="h-[15px] w-[15px]" />,
      alt: "Apple logo",
    },
    {
      name: "Discord",
      icon: <Icons.discord className="h-[15px] w-[15px]" />,
      alt: "Discord",
    },
    {
      name: "Twitter",
      icon: <Icons.twitter className="h-[15px] w-[15px] text-white" />,
      alt: "Twitter",
    },
  ];

  const [formData, setFormData] = useState<{ email: string, password: string }>({
    email: "",
    password: ""
  })
  const { toast } = useToast();

  const HandleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const FormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast({
        title: "Missing email or password!",
      })
    }

    if (formData.password.length < 8) {
      return toast({
        title: "Invalid password",
        description: "This password is less than 8 letters",
        action: (<ToastAction altText="Try Again">Try Again</ToastAction>)
      })
    }

    try {
      const response = await auth.login(formData.email, formData.password);
      if (response.code !== 200) {
        return toast({
          title: "Not Logged In",
          description: response.message,
          action: (<ToastAction altText="Try Again">Try Again</ToastAction>),
          variant: "destructive"
        })
      }

      toast({
        title: "Successfully",
        description: response.message,
      })
      window.location.replace('/dashboard')

    } catch (err) {
      console.log(err);
      return toast({
        title: "Unexpected Error",
        description: "An unexpected error happened.",
        action: (<ToastAction altText="Try Again">Try Again</ToastAction>),
        variant: "destructive"
      })
    }



  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#000033] to-blue-700 flex items-center justify-center">
      {currentForm == 0 &&
        <Card className="w-[342px] h-[410px] bg-[#00000066] rounded-[20px] backdrop-blur-[25px] border-none">
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            {/* Logo */}
            <img
              className="w-[49px] h-8 mt-6 mb-2 object-contain"
              alt="Search"
              src="/new-logo.svg"
            />

            {/* Welcome text */}
            <div className="text-center space-y-1">
              <h2 className="font-normal text-white ">
                Welcome To Tradeplex
              </h2>
              <p className="font-normal text-[#b7b7b7] text-xs">
                Login to access your trading portal
              </p>
            </div>

            {/* Google login button */}
            <Button className="w-full h-[49px] bg-[#1667ffe8] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#1667ff]">
              <Icons.google className="text-white" />
              <span className="font-normal text-white text-xs">
                Continue with Google
              </span>
            </Button>

            {/* Email login button */}
            <Button
              variant="outline"
              onClick={() => setCurrentForm(1)}
              className="w-full h-[49px] bg-[#00000026] rounded-[10px] border-[0.5px] border-solid border-[#19224e] text-white hover:bg-[#00000040]"
            >
              <span className="font-normal text-xs">Continue with Email</span>
            </Button>

            {/* Divider */}
            <div className="gap-2 flex w-full justify-center items-center">

              <span className="font-normal text-[#b7b7b7] text-xs text-center">
                Or continue with
              </span>

            </div>

            {/* Social login options */}
            <div className="flex justify-center gap-4">
              {socialOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="w-[60px] h-10 bg-[#00000026] rounded-[10px] border-[0.5px] border-solid border-[#19224e] hover:bg-[#00000040]"
                >
                  {option.icon}
                </Button>
              ))}
            </div>

            {/* Create account text */}
            <p className="font-normal text-[#b7b7b7] text-[9px] mt-2">
              Dont have an account?{" "}
              <Link href={"/signup"}><span className="underline cursor-pointer">Create Account</span></Link>
            </p>
          </CardContent>
        </Card>
      }

      {
        currentForm == 1 &&
        <Card className="w-[342px] bg-[#00000066] rounded-[20px] backdrop-blur-[25px] border-none">
          <CardContent className="pt-10 pb-6 px-6 flex flex-col items-center">
            {/* Logo */}
            <img
              className="w-[49px] h-8 mb-2 object-contain"
              alt="Search"
              src="/new-logo.svg"
            />

            {/* Title */}
            <h2 className="font-normal text-white text-sm text-center mb-2">
              {_formData.title}
            </h2>

            {/* Subtitle */}
            <p className="font-normal text-[#b7b7b7] text-[10px] text-center mb-6">
              {_formData.subtitle}
            </p>

            {/* Form Fields */}
            <form onSubmit={FormSubmitHandler} className="w-full space-y-4">
         
                {_formData.fields.map((field) => (
                  <div key={field.id} className="w-full">
                    <div className="relative">
                      <Input
                        type={field.type}
                        placeholder={field.label}
                        name={field.id}
                        onChange={HandleFormChange}
                        value={formData[field.id as "email" | "password"]}
                        className="w-full h-[49px] bg-[#00000026] text-[#b7b7b7] text-[10px] rounded-[10px] border-[0.5px] border-solid border-[#19224e] backdrop-blur-[2px] px-3"
                      />
                    </div>
                  </div>
                ))}

                {/* Login Button */}
                <Button
                type="submit"
                className="w-full h-[49px] bg-[#1667ffe8] hover:bg-[#1667ff] rounded-[10px] text-white text-[10px] backdrop-blur-[2px]">
                  {_formData.buttonText}
                </Button>
       
            </form>

          </CardContent>
        </Card>
      }

    </div>
  );
};


export default Login;