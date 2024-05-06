"use client";

import * as z from 'zod';
import CardWrap from "./cardWrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from 'react';
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { ResetPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formerror';
import { FormSuccess } from '../formsuccess';
import { resetPassword } from '@/actions/resetPassword';



const ResetPasswordForm = () => {
   
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof ResetPasswordSchema>>(
        {
            resolver: zodResolver(ResetPasswordSchema),
            defaultValues: {
                email: '',
            }
        }
    );

    const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
       setError("");
       setSuccess("");

       console.log(data);
       
        startTransition(() => {
            resetPassword(data)
            .then((data) =>{
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }


    return (
        
        <CardWrap headLabel="Forgot your password?" backbuttonLabel="Back to Login" backbuttonHref= "/auth/login" >
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
                        
                    </div>
                    <FormError message = {error }/>
                    <FormSuccess message = {success} />
                    <Button type="submit" className='w-full'>
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrap>
    );
}

export default ResetPasswordForm;