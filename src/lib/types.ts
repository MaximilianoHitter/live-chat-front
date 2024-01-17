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


