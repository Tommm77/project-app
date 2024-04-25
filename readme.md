# Chat-APP

Application de chat par conversation type whatsapp

## Installation

Instructions pour installer le projet :

```bash
# Cloner le dépôt
git clone https://github.com/votre_utilisateur/nom_du_projet.git

# server api
cd ./backend/
npm install
npm start

# front
cd ./front/
npm install
npm run dev
```

## API routes

log:
login:  post    "<http://localhost:3001/api/v1/login>"          JSON: {username, password}
sing-up:post    "<http://localhost:3001/api/v1/registration>"   JSON: {username, password, email}

user:
getAll: get     "<http://localhost:3001/api/v1/users>"
getId:  get     "<http://localhost:3001/api/v1/user/{id}>"
create: post    "<http://localhost:3001/api/v1/user/{id}>       JSON: {username, password, email}
update: patch   "<http://localhost:3001/api/v1/user/{id}>       JSON: {?username, ?password, ?email, ?firstname, ?lastname, ?avatarUrl, ?isAdmin}
delete: delete  "<http://localhost:3001/api/v1/user/{id}>

conv:
getAll: get     "<http://localhost:3001/api/v1/convs>"
getId:  get     "<http://localhost:3001/api/v1/conv/{id}>"
create: post    "<http://localhost:3001/api/v1/conv/{id}>       JSON: {admins, members, messages}
update: patch   "<http://localhost:3001/api/v1/conv/{id}>       JSON: {?admins, ?members, ?messages}
delete: delete  "<http://localhost:3001/api/v1/conv/{id}>

msg:
getAll: get     "<http://localhost:3001/api/v1/messages>"
getId:  get     "<http://localhost:3001/api/v1/message/{id}>"
create: post    "<http://localhost:3001/api/v1/message/{id}>       JSON: {sender, receiver, content, date}
update: patch   "<http://localhost:3001/api/v1/message/{id}>       JSON: {?sender, ?receiver, ?content, ?date}
delete: delete  "<http://localhost:3001/api/v1/message/{id}>
