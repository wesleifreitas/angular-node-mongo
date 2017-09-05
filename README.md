# angular-node-mongo

## Building

* Instale as dependências do projeto

```bash
npm install && bower install
```

* Execute o script dev
```bash
npm run dev
```

Acesse http://localhost:3000 no navegador

**Adicionar usuário**

```javascript
POST http://localhost:3000/myApp/api/users/

{
  "user": {
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "admin"
  }
}
```