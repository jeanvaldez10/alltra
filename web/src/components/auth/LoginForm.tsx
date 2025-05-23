"use client";

import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import Auth from '../../../client/auth';
import { Icons } from '../global/icons';
import { Separator } from '../ui/separator';
const auth = new Auth();

const LoginForm = () => {
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
        <div className={cn("flex flex-col gap-6 w-full max-w-lg")}>
            <Card className="overflow-hidden bg-black/20 border-transparent">
                <CardContent className="">
                    <form className="p-2 py-6" onSubmit={FormSubmitHandler}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your Maytrade account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={HandleFormChange}
                                    value={formData.email}
                                    name='email'
                                    className='bg-zinc-950/50'
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input onChange={HandleFormChange}
                                    value={formData.password} placeholder='Must have at least 6 characters'
                                    className='bg-zinc-950/50' id="password" name='password' type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <div className='grid grid-cols-2 items-center'>
                                <Separator className='bg-neutral-800/50' />
                                <span className="relative z-10 text-center px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                                <Separator className='bg-neutral-800/50' />

                            </div>


                            <div className="grid grid-cols-3 gap-4">
                                <Button variant="outline" className="w-full bg-zinc-950/40 border-neutral-800/50">
                                    <Icons.apple />
                                    <span className="sr-only">Login with Apple</span>
                                </Button>
                                <Button variant="outline" className="w-full bg-zinc-950/40 border-neutral-800/50">
                                    <Icons.google />
                                    <span className="sr-only">Login with Google</span>
                                </Button>
                                <Button variant="outline" className="w-full bg-zinc-950/40 border-neutral-800/50">
                                    <Icons.discord />
                                    <span className="sr-only">Login with Discord</span>
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>

                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default LoginForm