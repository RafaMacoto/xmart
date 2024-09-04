import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Update from './Update';
import '../listaDeUsuarios.css'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleUpdate = () => {
    setEditingUserId(null);
   
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  };

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className='container'>
      <h2>Lista de usuários</h2>
      {editingUserId ? (
        <Update userId={editingUserId} onUpdate={handleUpdate} onCancel={handleCancelEdit} />
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleEditClick(user.id)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
