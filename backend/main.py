import json
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

usuarios = []

class Usuario:
    def __init__(self, id: int = None, name: str = "", email: str = ""):
        self.id = id
        self.name = name
        self.email = email

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)

def save():
    try:
        with open('usuarios.json', 'w') as f:
            json.dump([usuario.to_dict() for usuario in usuarios], f)
    except Exception as e:
        print(f"Erro ao salvar dados: {e}")

def read():
    global usuarios
    try:
        with open('usuarios.json', 'r') as f:
            content = f.read().strip()
            if not content:
                usuarios = []
            else:
                usuarios = [Usuario.from_dict(data) for data in json.loads(content)]
    except FileNotFoundError:
        usuarios = []

read()

@app.post('/users/')
async def create(request: Request):
    try:
        data = await request.json()
        usuario = Usuario(name=data['name'], email=data['email'])
        usuario.id = len(usuarios) + 1
        usuarios.append(usuario)
        save()
        return usuario.to_dict()
    except Exception as e:
        print(f"Erro ao criar usuário: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@app.get('/users/')
def read_users():
    return [usuario.to_dict() for usuario in usuarios]

@app.get('/users/{user_id}')
def get_user(user_id: int):
    for usuario in usuarios:
        if usuario.id == user_id:
            return usuario.to_dict()
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

@app.put('/users/{user_id}')
def update_user(user_id: int, request: Request):
    try:
        data = request.json()
        for usuario in usuarios:
            if usuario.id == user_id:
                usuario.name = data['name']
                usuario.email = data['email']
                save()
                return usuario.to_dict()
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except Exception as e:
        print(f"Erro ao atualizar usuário: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@app.delete('/users/{user_id}')
def delete(user_id: int):
    global usuarios
    try:
        usuarios = [usuario for usuario in usuarios if usuario.id != user_id]
        save()
        return [usuario.to_dict() for usuario in usuarios]
    except Exception as e:
        print(f"Erro ao deletar usuário: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")
