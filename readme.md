# Chat-APP

**Application de chat par conversation type WhatsApp**

## Installation

Pour installer le projet, suivez les instructions ci-dessous :

```bash
# Cloner le dépôt
git clone https://github.com/votre_utilisateur/nom_du_projet.git

# Backend (API)
cd ./backend/
npm install
npm start

# Frontend
cd ./front/
npm install
npm run dev
```

## API routes

### Log :

**Login :**
- **Method** : `POST`
- **Endpoint** : `<http://localhost:3001/api/v1/login>`
- **JSON** : `{username, password}`

**Sing-up :**
- **Method** : `POST`
- **Endpoint** : `<http://localhost:3001/api/v1/registration>`
- **JSON** : `{username, password, email}`

### User :

**getAll :**
- **Method** : `GET`
- **Endpoint** : `<http://localhost:3001/api/v1/users>`

**getId :**
- **Method** : `GET`
- **Endpoint** : `<http://localhost:3001/api/v1/user/{id}>`

**create :**
- **Method** : `POST`
- **Endpoint** : `<http://localhost:3001/api/v1/user>`
- **JSON** : `{username, password, email}`

**update :**
- **Method** : `PATCH`
- **Endpoint** : `<http://localhost:3001/api/v1/user/{id}>`
- **JSON** : `{?username, ?password, ?email, ?firstname, ?lastname, ?avatarUrl, ?isAdmin}`

**delete :**
- **Method** : `DELETE`
- **Endpoint** : `<http://localhost:3001/api/v1/user/{id}>`

### Conv :

**getAll :**
- **Method** : `GET`
- **Endpoint** : `<http://localhost:3001/api/v1/convs>`

**getId :**
- **Method** : `GET`
- **Endpoint** : `<http://localhost:3001/api/v1/conv/{id}>`

**create :**
- **Method** : `POST`
- **Endpoint** : `<http://localhost:3001/api/v1/conv>`
- **JSON** : `{admins, members, messages}`

**update :**
- **Method** : `PATCH`
- **Endpoint** : `<http://localhost:3001/api/v1/conv/{id}>`
- **JSON** : `{?admins, ?members, ?messages}`

**delete :**
- **Method** : `DELETE`
- **Endpoint** : `<http://localhost:3001/api/v1/conv/{id}>`

### Msg :

**getAll :**
- **Method** : `GET`
- **Endpoint** : `<http://localhost:3001/api/v1/messages>`

**getId :**
- **Method** : `GET`
- **Endpoint** : `<http://localhost:3001/api/v1/message/{id}>`

**create :**
- **Method** : `POST`
- **Endpoint** : `<http://localhost:3001/api/v1/message>`
- **JSON** : `{sender, receiver, content}`

**update :**
- **Method** : `PATCH`
- **Endpoint** : `<http://localhost:3001/api/v1/message/{id}>`
- **JSON** : `{?sender, ?receiver, ?content}`

**delete :**
- **Method** : `DELETE`
- **Endpoint** : `<http://localhost:3001/api/v1/message/{id}>`
