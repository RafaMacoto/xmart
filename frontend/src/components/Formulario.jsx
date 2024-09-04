import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ usuarioCriado }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/', { name, email });
      usuarioCriado(response.data); 
      setName('');
      setEmail('');
    } catch (erro) {
      console.error('Erro ao criar usuário', erro);
    }
  };

  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
          <button type="submit">Criar usuário</button>
        </form>
    </div>
  );
};

export default UserForm;
