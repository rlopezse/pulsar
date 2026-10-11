import type { FormEvent } from 'react'
import s from './Login.module.scss'

function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <main className={s.login}>
      <form className={s.login_form} onSubmit={handleSubmit}>
        <h1 className={s.login_title}>Iniciar sesión</h1>
        <label className={s.login_label} htmlFor="email">
          Correo electrónico
        </label>
        <input
          className={s.login_input}
          id="email"
          type="email"
          autoComplete="email"
          required
        />
        <label className={s.login_label} htmlFor="password">
          Contraseña
        </label>
        <input
          className={s.login_input}
          id="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <button className={s.login_button} type="submit">
          Ingresar
        </button>
      </form>
    </main>
  )
}

export default Login
