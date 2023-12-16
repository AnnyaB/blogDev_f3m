import React, { useState, useEffect } from 'react'
import styles from './Login.module.css'
import { userAuthentication } from '../../hooks/userAuthentication'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  //#region Controller Services
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] =  useState('')
  const navigate = useNavigate()
  
  const {login, error: authError, loading} = userAuthentication()
  
  const handlerSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const user = {
      email,
      password
    }

    const res = await login(user)

    console.table(res)
    navigate('/CreatePost')
}
    useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  //#endregion  
  
  return (
    <div className={styles.login}>
    <h1>Entrar no BlogDev</h1>
    <p>Entre no ambiente do BlogDev, e começe a compartilhar suas ideias</p>
    <form onSubmit={handlerSubmit}>
      <label>
        <span>E-mail: </span>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entre com seu e-mail"></input>
      </label>
      <label>
        <span>Senha: </span>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entre com sua senha"></input>
      </label>
      {!loading && <button className="btn">Login</button>}
      {loading && <button className="btn">Aguarde...</button>}
      {error && <p className='error'>{error}</p>}
    </form>
  </div>
  )
}

export default Login