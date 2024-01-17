import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Error } from "@/lib/types";
import AuthUser from "@/lib/AuthUser";
import { Icons } from "@/components/icons"
import { Success } from "@/components/success";
import { ErrorInput } from "@/components/error";

import { Button } from "@/components/ui/button"

export default function VerificationEmail() {
    const [loading, setLoading] = useState<boolean>(false);
    const { token, email } = useParams();
    const { http } = AuthUser();
    const [error, setError] = useState<Error>(null);
    const [rta, setRta] = useState<string>('')

    const send = () => {
        setError(null)
        setLoading(true);
        http.post('/verification', {
            email_token: token?.replace('token=', ''),
            email: email?.replace('email=', '')
        }).then((res) => {
            setLoading(false);
            console.log(res.data);
            const { data, error } = res.data;
            if (data && !error) {
                setRta(data)
                setError(null);
            } else {
                setError(error);
            }
        }).catch((e) => {
            console.log(e);
            setLoading(false);
            setError(e.response.data.error);
        })
    }
/* 
    useEffect(() => {
        send;
    }, [token, email]) */


    return (
        <>
            <div className="container relative flex items-center justify-center md:grid lg:flex lg:px-0">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                        {rta && !error ? 
                            <Success text={rta} />
                            :
                            <ErrorInput text={error}/>
                            }
                        <Button onClick={()=>send} disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Verificar Email
                        </Button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}