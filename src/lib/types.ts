import {z} from 'zod';

export type User = {
    email: string,
    name: string,
    id: number,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    permisos: Array<object>,
    roles: Array<object>,
    perms: Array<string>
};

export type Error = string|object|null

const singUpSchema = z.object({
    email: z.string().email('El email es requerido'),
    password: z.string().min(4, 'La contraseña debe poseer como mínimo 4 caracteres'),
    cpassword: z.string()
}).refine(data => data.password === data.cpassword, {
    message: 'Las contraseñas deben coincidir',
    path: ['cpassword']
})

type TSingUpSchema = z.infer<typeof singUpSchema>


