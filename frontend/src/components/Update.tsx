import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Update = ({ userId, onUpdate, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/users/${userId}`, { name, email });
      onUpdate(); // Atualiza a lista de usuários após a edição
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div className="update-form-container">
      <h2>Atualizar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit" className="update-button">Atualizar</button>
        <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default Update;
