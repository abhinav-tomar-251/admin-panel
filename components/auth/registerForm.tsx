"use client";

import * as z from 'zod';
import CardWrap from "./cardWrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from 'react';
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { RegisterSchema } from '@/schemas';
import { resolve } from 'path';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formerror';
import { FormSuccess } from '../formsuccess';
import { register } from '@/actions/register';

const RegisterForm = () => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>(
        {
            resolver: zodResolver(RegisterSchema),
            defaultValues: {
                email: '',
                password: '',
                name: ''
            }
        }
    );

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
       setError("");
       setSuccess("");
       
        startTransition(() => {
            register(data)
            .then((data) =>{
                setError(data.error);
                setSuccess(data.success);
            })
        })
    }


    return (
        <CardWrap headLabel="Create an account" backbuttonLabel="Already have an account?" backbuttonHref= "/auth/login" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input  {...field} placeholder="Enter your name" disabled={isPending} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                        <FormField  control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input  {...field} placeholder="Enter your email" type="email" disabled={isPending}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input  {...field} placeholder="Enter your password" type="password" disabled={isPending} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )} />
                    </div>
                    <FormError message = {error}/>
                    <FormSuccess message = {success} />
                    <Button type="submit" className='w-full'>
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrap>
    );
}

export default RegisterForm;