import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthUser from "@/lib/AuthUser"
import { Error } from "@/lib/types"
import { ErrorInput } from "../../../error"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
    const { http, setToken } = AuthUser();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error>(null);



    const send = (e :any)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        http.post('/register', {
            email:email,
            password:pass,
            name: name
        }).then((res)=>{
            setLoading(false);
            console.log(res.data);
            setToken(res.data.data.user, res.data.data.access_token);
            setError(null);
        }).catch((e:any)=>{
            setLoading(false);
            setError(e.response.data.error)
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={(e) => send(e)}>
                <div className="grid gap-2">
                    {error?.general && <ErrorInput text={error?.general}/>}
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            placeholder="Juan Perez"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                        />
                        {error?.name && <ErrorInput text={error?.name}/>}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="juan@ejemplo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                        />
                        {error?.email && <ErrorInput text={error?.email}/>}
                    </div>
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
                    <Button disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>
    )
}