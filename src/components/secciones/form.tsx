import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {useForm} from 'react-hook-form';
import { singUpSchema, TSingUpSchema } from "@/lib/types";
import {zodResolver} from '@hookform/resolvers/zod';
import AuthUser from "@/lib/AuthUser";
import { useToast } from "../ui/use-toast";

export default function Form(){

    const {toast} = useToast();
    const {http} = AuthUser();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        setError,
        setFocus
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
            const error = e.response.data.error;
            if(e.response.status == 422){
                if(error?.general){
                    toast({
                        title: 'Error papi',
                    })
                }else{
                    Object.entries(error).forEach((err, i) => {
                        setError(err[0], { type: err[0], message: err[1][0] });
                    });
                }
            }else{
                toast({
                    title: 'Error papi',
                    description: e.response.data.error.general
                })
            }

            
        })
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
                    <p className="text-destructive text-center">{`${errors.email.message}`}</p>
                )}

                <Input 
                    {...register('password')}
                    type="password"
                    placeholder="Contraseña"
                    className="px-4 py-2 rounded"
                />
                {errors.password && (
                    <p className="text-destructive text-center">{`${errors.password.message}`}</p>
                )}

                <Input 
                    {...register('cpassword')}
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="px-4 py-2 rounded"
                />
                {errors.cpassword && (
                    <p className="text-destructive text-center">{`${errors.cpassword.message}`}</p>
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