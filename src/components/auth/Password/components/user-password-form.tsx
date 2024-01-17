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


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserPasswordForm({ className, ...props }: UserAuthFormProps) {
    const { http } = AuthUser();
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>(null)
    const [rta, setRta] = useState<string>('');


    const send = (e : any)=>{
        e.preventDefault();
        setError(null)
        setLoading(true);
        http.post('/password_reset_link', {
            email:email
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
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="juan@ejemplo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                        {error?.email && <ErrorInput text={error?.email}/>}
                    </div>
                    <Button disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Ingresar
                    </Button>
                </div>
            </form>
        </div>
    )
}