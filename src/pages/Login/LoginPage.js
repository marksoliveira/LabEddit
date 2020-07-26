import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Container, Content, Input, Button, ErrorWarning } from './styles';

const LoginPage = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token !== null) {
      history.push("/feed")
    }
  }, [history])

  const goToRegisterPage = () => {
    history.push("/register")
  }

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, body)

      localStorage.setItem("token", response.data.token)
      history.replace("/feed")
    } catch (e) {
      if (e.response.status === 401) {
        setError("Login ou senha inválido(a)")
      } else {
        alert("Login falhou :(")
      }
    }
  }

  return (
    <Container>
      <Content>
        {error && <ErrorWarning>{error}</ErrorWarning>}
        <div>
          <p>Email</p>
          <Input 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Senha</p>
          <Input 
            type="password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <span onClick={goToRegisterPage}>Criar Conta</span>
          <Button onClick={handleLogin}>Entrar</Button>
        </div>
      </Content>
    </Container>
  );
}

export default LoginPage;