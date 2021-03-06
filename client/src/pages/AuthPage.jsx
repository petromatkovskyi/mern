import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {
        ...form,
      });
      message(data.message); //pop message about successful created new user
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {
        ...form,
      });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1> short link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email </label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Sign in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
