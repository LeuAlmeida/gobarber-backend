# Execuções e dependências do Docker

#### MongoDB

```js
$ sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```
#### MongoDB

```js
$ sudo docker run --name mongobarber -p 27017:27017 -d -t mongo
```

#### Redis

```js
$ docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```
