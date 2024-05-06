import { Navbar } from "./_components/navbar";



interface ProtectedLayoutProps {
    children: React.ReactNode;
}


const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return ( 
        <div className="h-full w-full flex flex-col items-center justify-start gap-y-10 p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 to-slate-600">
            <Navbar />
            {children}
        </div>
     );
}
 
export default ProtectedLayout;