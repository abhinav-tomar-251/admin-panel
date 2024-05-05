import { Header } from "./header";
import { BackButton } from "./backButton";
import { Card, CardHeader, CardFooter } from '../ui/card'
import CardWrap from "./cardWrap";
import { FaExclamationCircle } from "react-icons/fa";

export const ErrorCard = () => {
    return (
        <CardWrap headLabel="Something went wrong" backbuttonHref="/auth/login" backbuttonLabel="Back to login">
          <div className="w-full flex justify-center  items-center ">   
            <FaExclamationCircle className="text-destructive w-5 h-5" /> 
          </div>
        </CardWrap>
    )
};