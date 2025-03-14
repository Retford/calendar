import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { useEffect } from 'react';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerEmail: '',
  registerName: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    handleInputChange: handleLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    handleInputChange: handleRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    // console.log({ loginEmail, loginPassword });
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Las contraseñas no son iguales', 'error');
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Correo'
                name='loginEmail'
                onChange={handleLoginInputChange}
                value={loginEmail}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='loginPassword'
                onChange={handleLoginInputChange}
                value={loginPassword}
              />
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Nombre'
                name='registerName'
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Correo'
                name='registerEmail'
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Contraseña'
                name='registerPassword'
                value={registerPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Repita la contraseña'
                name='registerPassword2'
                value={registerPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='d-grid gap-2'>
              <input type='submit' className='btnSubmit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
