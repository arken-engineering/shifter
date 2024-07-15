# Arken Shifter

Arken Shifter migrates data between systems. Currently it's taking data from various JSONs, Postgres, etc. and moving them to Mongo. In the future it'll do data syncing.

## Data

You can find the data here: https://github.com/arken-engineering/data

Folder structure:

```
./data
./shifter
```

## Requirements

1. MongoDB
2. Node 18

## Setup

```
nvm install 18
npm install -g yarn ts-node-dev
yarn install
yarn run dev
```

Add this to .env

```
PORT=9009
DATABASE_URL="postgresql://user:pass@localhost:5432/arken"
MONGO_ENDPOINT="mongodb://user:pass@localhost:27017/arken"
```

## Connecting to MongoDB

```
docker exec -it mongodb bash
```
