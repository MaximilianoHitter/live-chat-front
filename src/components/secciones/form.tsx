import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {useForm} from 'react-hook-form';
import { singUpSchema, TSingUpSchema } from "@/lib/types";
import {zodResolver} from '@hookform/resolvers/zod';
import AuthUser from "@/lib/AuthUser";

export default function Form(){
    const {http} = AuthUser();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<TSingUpSchema>({
        resolver: zodResolver(singUpSchema),
    });

    const onSubmit = async(data: TSingUpSchema)=>{
        await http.post('/form', data)
        .then((res)=>{
            console.log(res.data.data);
            reset();
        })
        .catch((e)=>{
            console.log(e.response.data.error);
        })
        //await new Promise((resolve)=>setTimeout(resolve, 1000));
    }

    return (
        <div className="flex justify-center pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-96">
                <fieldset className="flex flex-col gap-y-2 " disabled={isSubmitting}>
                <Input
                    {...register('email')} 
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 rounded"
                />
                {errors.email && (
                    <p className="text-destructive">{`${errors.email.message}`}</p>
                )}

                <Input 
                    {...register('password')}
                    type="password"
                    placeholder="Contraseña"
                    className="px-4 py-2 rounded"
                />
                {errors.password && (
                    <p className="text-destructive">{`${errors.password.message}`}</p>
                )}

                <Input 
                    {...register('cpassword')}
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="px-4 py-2 rounded"
                />
                {errors.cpassword && (
                    <p className="text-destructive">{`${errors.cpassword.message}`}</p>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >Submit</Button>
                </fieldset>
            </form>
        </div>
    )
}