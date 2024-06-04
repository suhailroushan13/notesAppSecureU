## Objective:

Develop a simple SaaS application backend that allows users to register, log in, and manage a
personal notes system. The backend should be built using Node.js, express RESTful APIs, and
MongoDB, and deployed on AWS. The application must include secure authentication and
authorization mechanisms

### Clone the Repository

```bash
git clone git@github.com:suhailroushan13/notesAppSecureU.git
cd notesAppSecureU
```

### Run Backend

```bash
cd server
npm install
npm start
```

## User API Reference

### Register User

#### Route

```http
  POST /api/user/register
```

#### Request Body

```json
{
  "firstName": "Suhail",
  "lastName": "Roushan",
  "email": "suhail@code.in",
  "phone": "9618211626",
  "password": "suhail"
}
```

### User Login

#### Route

```http
  POST /api/user/login
```

#### Request Body

```json
{
  "email": "suhail@code.in",
  "password": "suhail"
}
```

### Update User Profile

#### Route

```http
  PUT /api/user/profile
```

#### Request Body

```json
{
  "lastName": "Ali"
}
```

### Delete User Profile

#### Route

```http
  DELETE /api/user/profile
```

## Notes API Reference

### Create Note

#### Route

```http
  POST /api/notes/notes
```

#### Request Body

```json
{
  "title": "Shopping List",
  "description": "Milk, Bread, Eggs"
}
```

### Get All Notes

#### Route

```http
  GET /api/notes/notes
```

### Update Note

#### Route

```http
  PUT /api/notes/notes/:id
```

#### Request Body

```json
{
  "title": "Wedding List",
  "description": "Milk, Bread, Buns"
}
```

### Delete Note

#### Route

```http
  DELETE /api/notes/notes/:id
```

### Run Client

```bash
cd client
npm install

```

#### Change config.json with Your Local URL

```json
{
  "URL": "http://172.20.160.178:5000"
}
```

```bash
npm start
```

## Tech Stack

**Client:** React, Ant Design, react-router-dom

**Server:** Node, Express, MongoDB

**Deployment:** Digital Ocean
