import { UserRegisterForm } from "./components/user-register-form"

export default function Register() {
  return (
    <>
      <div className="container relative flex items-center justify-center md:grid lg:flex lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crear una cuenta
              </h1>
            </div>
            <UserRegisterForm/>
          </div>
        </div>
      </div>
    </>
  )
}