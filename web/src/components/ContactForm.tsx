"use client";

import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ContactFormType, ContactFormProps, ContactFormInit } from '../../@types';
import ContactSubmit from '../../client/contact';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel, SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const ContactForm: React.FC<ContactFormProps> = ({isLoggedIn, user}) => {
    const [formData, setFormData] = useState<ContactFormType>(ContactFormInit);

    // Init Page
    useEffect(() => {
        if (isLoggedIn && user) {
            setFormData((prev) => {
                return {...prev, name: user.full_name, email: user.email}
            })
        }
    }, [])

    // Input Change Handler
    const ContactFormInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    // Form Submit Handler
    const OnFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await ContactSubmit(formData);
        if (!response.isValid) {
            return toast({
                title: "Contact Request Failed",
                description: response.message,
                variant: "destructive",
                action: (<ToastAction altText="Try Again">Try Again</ToastAction>)
            })
        }
        return toast({
            title: "Contact Request Sent",
            description: response.message,
            action: (<ToastAction altText="Try Again">Undo</ToastAction>)
        })
        
    }


    return (
        <div className="mb-32 w-full max-w-5xl mx-auto flex mt-16">
            <div className="flex grid-cols-2 justify-center w-full">
                <div className='p-6 w-full'>
                    <h1 className='text-8xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent'>Let's talk!</h1>
                    <div className='mt-10 flex flex-col gap-6'>
                        <div className=''>
                            <h1 className='bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent'>Open Times:</h1>
                            <p className='text-sm'>Monday - Friday: 9:00 AM - 8:00 PM</p>
                            <p className='text-sm'>Saturday: 10:00 AM - 6:00 PM</p>
                            <p className='text-sm'>Sunday: Closed</p>
                        </div>
                        <Separator />
                        <div className=''>
                            <h1 className='bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent'>Email:</h1>
                            <p className='text-4xl'>mayahi@info.com
                            </p>
                        </div>
                        <Separator />
                        <div className=''>
                            <h1 className='bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent'>Phone:</h1>
                            <p className='text-4xl'>+31 (0) 20 343 9223
                            </p>
                        </div>
                    </div>
                </div>
                <div className='p-6 w-full'>
                    <form className='flex flex-col w-full gap-5' onSubmit={OnFormSubmit}>
                        <div>
                            <Label className='mb-1 text-neutral-200'>Name</Label>
                            <Input className=" bg-neutral-950/40 w-full" value={formData.name} onChange={ContactFormInputChangeHandler} placeholder='John Doe' name='name' disabled={isLoggedIn}></Input>
                        </div>
                        <div>
                            <Label className='mb-1 text-neutral-200'>Email</Label>
                            <Input className=" bg-neutral-950/40 w-full" value={formData.email} disabled={isLoggedIn} onChange={ContactFormInputChangeHandler} placeholder='john@example.com' name='email' type='email' ></Input>
                        </div>
                        <div>
                            <Label className='mb-1 text-neutral-200'>Phone</Label>
                            <Input className=" bg-neutral-950/40 w-full" value={formData.phone} onChange={ContactFormInputChangeHandler} placeholder='+31 (0) 20 343 9223' name='phone' ></Input>
                        </div>
                        <div>
                            <Label >Reason</Label>
                            <Select onValueChange={(e) => {
                                setFormData((prev) => {
                                    const value = parseInt(e);
                                    return {...prev, reason: value}
                                })
                            }}>
                                <SelectTrigger className="w-full ">
                                    <SelectValue placeholder="Please select your topic." />
                                </SelectTrigger>
                                <SelectContent defaultValue={formData.reason} className="bg-black/50 backdrop-blur">
                                    <SelectGroup>
                                        <SelectItem value="0">Billing/Payment</SelectItem>
                                        <SelectSeparator  ></SelectSeparator>
                                        <SelectItem value="1">Report a Website Bug</SelectItem>
                                        <SelectSeparator ></SelectSeparator>
                                        <SelectItem value="2">Feedback/Suggestions</SelectItem>
                                        <SelectSeparator  ></SelectSeparator>
                                        <SelectItem value="3">other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className='mb-1 text-neutral-200'>Message</Label>
                            <Textarea value={formData.message} onChange={ContactFormInputChangeHandler} className=" bg-neutral-950/40 w-full" rows={4} cols={4} placeholder='Write a message here' name='message' ></Textarea>
                        </div>
                        <Button type='submit' className='bg-neutral-950/40 text-white border border-neutral-900/50 hover:bg-white hover:text-black duration-75'>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactForm