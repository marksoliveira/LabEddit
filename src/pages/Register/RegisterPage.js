import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Container, Content, Input, Button } from './styles';

const useForm = initialValues => {
  const[form, setForm] = useState(initialValues)

  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value}
    setForm(newForm)
  }

  return {form, onChange}
}

const RegisterPage = () => {
  const history = useHistory()
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token !== null) {
      history.push("/feed")
    }
  }, [history])

  const {form, onChange} = useForm ({
    username: "",
    email: "",
    password: "",
  })

  const handleInputChange = event => {
    const {name, value} = event.target

    onChange(name, value)
  }

  const goToLoginPage = () => {
    history.push("/")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${baseUrl}/signup`, form)

      localStorage.setItem("token", response.data.token)
      history.replace("/feed")
    } catch (e) {
      alert("Cadastro falhou :(")
    }
  }

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Nome de usuário</p>
            <Input 
              type="text"
              name="username"
              value={form.username}
              pattern="[A-Za-z0-9]{3,}"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <p>Email</p>
            <Input 
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <p>Senha</p>
            <Input 
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <span onClick={goToLoginPage}>Cancelar</span>
            <Button>Cadastrar</Button>
          </div>
        </form>
      </Content>
    </Container>
  );
}

export default RegisterPage;
