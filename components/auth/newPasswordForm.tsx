"use client";

"use client";

import * as z from 'zod';
import CardWrap from "./cardWrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from 'react';
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { NewPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { FormError } from '../formerror';
import { FormSuccess } from '../formsuccess';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/newPassword';



const NewPasswordForm = () => {
   const searchParams = useSearchParams();
    const token = searchParams.get('token');
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof NewPasswordSchema>>(
        {
            resolver: zodResolver(NewPasswordSchema),
            defaultValues: {
                password: '',
            }
        }
    );

    const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
       setError("");
       setSuccess("");

       console.log(data);
       
        startTransition(() => {
            newPassword(data, token)
            .then((data) =>{
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }


    return (
        
        <CardWrap headLabel="Change your password" backbuttonLabel="Back to Login" backbuttonHref= "/auth/login" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField  control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input  {...field} placeholder="Enter your password" type="password" disabled={isPending}/>
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

export default NewPasswordForm;