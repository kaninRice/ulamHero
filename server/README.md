# ulamHero

Backend API server built using NodeJS and ExpressJS.


## Run Locally

Clone the project

```bash
  git clone https://github.com/kaninRice/ulamHero.git
```

Go to the project directory

```bash
  cd ulamHero
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLIENT_ORIGIN`

`SERVER_PORT`

`JWT_SECRET`

#### In src/db/default-uri.ts

`DEFAULT_MONGO_URI`

## API Reference

#### Get featured recipes

```http
  GET /featured-recipes
```

#### Get recipe information

```http
  GET /recipes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of recipe to fetch |

#### Search recipe based on keywords

```http
  GET /search/${query}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`   | `string` | Keywords                          |

#### Create user account

```http
  POST /register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**. Username of the account |
| `password`| `string` | **Required**. password of the account |

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`| `string` | **Required**. Username of the account |
| `password`| `string` | **Required**. password of the account |

#### APIs that require JWT Token

#### Get user bookmarks

```http
  GET /user/bookmarks/get
```
#### Bookmark recipe

```http
  PUT /user/bookmarks/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `recipeId`| `string` | **Required**. ID of recipe to add |

#### Remove bookmark

```http
  DELETE/user/bookmarks/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `recipeId`| `string` | **Required**. ID of recipe to remove |

#### Query if current user bookmarked the recipe

```http
  GET /recipes/verify-bookmark/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of recipe to check |

#### Delete user account

```http
  DELETE /user/delete
```
