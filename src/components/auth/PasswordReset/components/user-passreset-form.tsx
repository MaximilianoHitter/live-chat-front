import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthUser from "@/lib/AuthUser"
import { ErrorInput } from "../../../error"
import { Error } from "@/lib/types"
import { Success } from "@/components/success"
import { useParams } from "react-router-dom"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserPassResetForm({ className, ...props }: UserAuthFormProps) {
    const { http } = AuthUser();
    const {token, email} = useParams();
    const [pass, setPass] = useState<string>('');
    const [passConfirmation, setPassConfirmation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>(null)
    const [rta, setRta] = useState<string>('');


    const send = (e : any)=>{
        e.preventDefault();
        setError(null)
        setLoading(true);
        http.post('/reset_password', {
            email:email?.replace('email=', ''),
            token:token?.replace('token=', ''),
            password: pass,
            password_confirmation: passConfirmation
        }).then((res)=>{
            setLoading(false);
            console.log(res.data);
            const {data, error} = res.data;
            if(data && !error){
                setRta(data);
                setError(null);
            }else{
                setError(error);
            }
        }).catch((e)=>{
            console.log(e);
            setLoading(false);
            setError(e.response.data.error);
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={(e)=>send(e)}>
                <div className="grid gap-2">
                    {error?.general && <ErrorInput text={error?.general}/>}
                    {rta && <Success text={rta}/>}
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="pass">
                            Contraseña
                        </Label>
                        <Input
                            id="pass"
                            type="password"
                            placeholder="Contraseña"
                            onChange={(e) => { setPass(e.target.value) }}
                            value={pass}
                        />
                        {error?.password && <ErrorInput text={error?.password}/>}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="passc">
                            Confirmar Contraseña
                        </Label>
                        <Input
                            id="passc"
                            type="password"
                            placeholder="Confirmar Contraseña"
                            onChange={(e) => { setPassConfirmation(e.target.value) }}
                            value={passConfirmation}
                        />
                        {error?.password && <ErrorInput text={error?.password}/>}
                    </div>
                    <Button disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Cambiar contraseña
                    </Button>
                </div>
            </form>
        </div>
    )
}