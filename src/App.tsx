import { ModeToggle } from './components/mode-toggle'
import { NavbarCustom } from './components/navbar/navbar'
import { UserOptions } from './components/navbar/user-options'
import AuthUser from './lib/AuthUser'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './components/secciones/home'
import Login from './components/auth/Login/login'
import { Button } from './components/ui/button'
import Register from './components/auth/Register/register'
import Password from './components/auth/Password/password'
import PasswordReset from './components/auth/PasswordReset/password-reset'
import VerificationEmail from './components/auth/Verification/verification-email'

function App() {
  const { getToken, getUser } = AuthUser();

  return (
    <div className="pt-3 w-full flex-col flex">
      <div className="border-b w-full">
        <div className="flex flex-row mb-3 px-4">
          <div className="mr-auto ml-20 flex items-center space-x-4 col-auto">
            <Link to={'/'}>Template</Link>
          </div>
          <NavbarCustom className='mx-6 col-auto' />
          <div className="ml-auto mr-20 flex items-center space-x-4 flex-end">
            {!getToken() && !getUser() ?
              <div>
                <Button className='mx-2'>
                  <Link to={"/login"}>Ingresar</Link>
                </Button>
                <Button className='' variant={"outline"}>
                  <Link to={"/register"}>Registrarse</Link>
                </Button>
              </div>
              :
              <UserOptions />
            }
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/password_reset" element={<Password/>}/>
          <Route path={"/response-password-reset/:token/:email"} element={<PasswordReset/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verificar-email/:token/:email" element={<VerificationEmail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
