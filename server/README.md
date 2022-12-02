> ## Running Locally
Create a copy of ```.env``` and make necessary changes

```bash
  cp .env.dist .env
  ```
edit ```.env``` file to match with your environment.

## Install dependencies
```bash
npm install
```

### Setting up Database
Use mariadb as the database server.
Easiest way to setup mariadb is with docker

```bash
docker run --name ws-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -d mariadb:latest
```
If you don't have docker [please read this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-18-04)

create database called "restaurant_app" locally

change Database.js file accordingly

### Run migrations

In the project directory, you can run:

```bash
npx sequelize-cli db:migrate
```

### Run database seeds

```bash
npx sequelize-cli db:seed:all
```

## Start project
```bash
node index.js
```
