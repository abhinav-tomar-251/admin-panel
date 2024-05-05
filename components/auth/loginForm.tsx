"use client";

import * as z from 'zod';
import CardWrap from "./cardWrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from 'react';
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { LoginSchema } from '@/schemas';
import { resolve } from 'path';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formerror';
import { FormSuccess } from '../formsuccess';
import { login } from '@/actions/login';
import  { useSearchParams } from "next/navigation";


const LoginForm = () => {
   const searchParams = useSearchParams();
   const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with different provider.": "";

   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof LoginSchema>>(
        {
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    );

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
       setError("");
       setSuccess("");
       
        startTransition(() => {
            login(data)
            .then((data) =>{
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }


    return (
        <CardWrap headLabel="Login to your account" backbuttonLabel="Don't have an account?" backbuttonHref= "/auth/register" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
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
                    <FormError message = {error || urlError }/>
                    <FormSuccess message = {success} />
                    <Button type="submit" className='w-full'>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrap>
    );
}

export default LoginForm;