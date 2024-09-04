import React from 'react';
import UserForm from './components/Formulario';
import UserList from './components/ListaUsuarios';
import './index.css';

const App = () => {
  const usuarioCriado = (user) => {
    console.log('Usuário criado:', user);
  };

  return (
    <div>
      <h1>Gerenciamento de usuários</h1>
      <UserForm usuarioCriado={usuarioCriado} /> 
      <UserList />
    </div>
  );
};

export default App;