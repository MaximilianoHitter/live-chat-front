import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthUser from "@/lib/AuthUser"
import { ErrorInput } from "../../../error"
import { Error } from "@/lib/types"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>(null)


    const send = (e : any)=>{
        e.preventDefault();
        setError(null)
        setLoading(true);
        http.post('/login', {
            email:email,
            password:pass
        }).then((res)=>{
            setLoading(false);
            console.log(res.data);
            const {data, error} = res.data;
            if(data && !error){
                setToken(res.data.data.user, res.data.data.access_token);
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
                    <div className="grid gap-1">
                        <Label htmlFor="pass">
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