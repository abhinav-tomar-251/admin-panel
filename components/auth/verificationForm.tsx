"use client";

import { CardWrap } from "@/components/auth/cardWrap"
import { useSearchParams } from "next/navigation";
import { BounceLoader }  from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerfication } from "@/actions/verification";
import { FormError } from "../formerror";
import { FormSuccess } from "../formsuccess";

export const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleClick = useCallback(() => {

       if(success || error) return;
        
        if(!token){
            setError("No token");
            return;
        }
        newVerfication(token)
         .then((data) => {
            setSuccess(data?.success);
            setError(data?.error);
         })  
        .catch((error) => {
            setError("something went wrong");
        });
    }, [token, success, error]);

    useEffect(() => {
        handleClick();
    }, [handleClick]);
    return (
        <CardWrap
            headLabel="Confirming your verification"
            backbuttonHref="/auth/login"
            backbuttonLabel="Back to login"
        >
            <div className="flex w-full justify-center items-center">
                {!success && !error && (<BounceLoader  size={50} />)}
                <FormSuccess message={success} />
                {!success && ( <FormError message={error} />  )}    
            </div>
        </CardWrap>
    )
 };
