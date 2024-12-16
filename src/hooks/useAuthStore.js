import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage,
  handleChecking,
  handleLogin,
  handleLogout,
  handleLogoutCalendar,
} from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    // console.log({ email, password });
    dispatch(handleChecking());
    // console.log({ email, password });

    try {
      const { data } = await calendarApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(handleLogin({ name: data.name, uid: data.uid }));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      dispatch(handleLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    console.log({ name, email, password });

    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(handleLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(handleLogout(error.response?.data.msg || ''));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(handleLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(handleLogin({ name: data.name, uid: data.uid }));
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.clear();
      dispatch(handleLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(handleLogoutCalendar());
    dispatch(handleLogout());
  };

  return {
    //*Properties
    errorMessage,
    status,
    user,

    //* Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
