## Setup
### create `.env` from `.env.example`

- get ngrok token
- get telegram bot api token
- make up password
- put it into `.env`


## Run:
```sh
npm i
npm run start
```

## Bot command:
```
/ip {password}
```

where `{password}` is the password in `.env`

### bot reply example
```
ssh -o IdentitiesOnly=yes XXX@4.tcp.ngrok.io -p 11084
```