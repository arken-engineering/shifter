<div align="center">
  <br>

  <img src=".erb/img/logo.png" width="60%" />

  <br>
  <br>

  <h2><strong>Arken Shifter</strong> is a <code>free and open source db migration tool</code></h2>

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.arken.gg)

</div>

<br>

## Introduction

<p>
  Welcome to Arken Shifter, a database migrator for the Arken Realms omniverse open initiative. Currently it's taking data from various JSONs, Postgres, etc. and moving them to Mongo. In the future it'll do data syncing.
</p>

# Arken Shifter

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/arkenrealms/shifter.git your-project-name
cd your-project-name
rush update
```

**Having issues installing? See our [debugging guide](https://github.com/arkenrealms/shifter/issues/1)**

## Starting Development

Download the data here: https://github.com/arkenrealms/data

Folder structure:

```
./data
./shifter
```

## Requirements

1. MongoDB
2. Node 18
3. Rush

## Setup

```
nvm install 18
npm install -g rush ts-node-dev
rush update
rushx dev
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

## Docs

See our [docs and guides here](https://docs.arken.gg/installation)

## Quick Links

- 🌐 [Arken Discord](https://discord.arken.gg)
- 🌐 [Arken Telegram](https://telegram.arken.gg)
- 📺 [Arken Realms](https://arken.gg/)
- 📖 [Return Portal](http://return.gg/portal)
- 💻 [Return Portal Web](https://github.com/arkenrealms/portal-web)
- 💻 [Return Portal UI](https://github.com/arkenrealms/portal-ui)
- 🔗 [Arken Seer](https://github.com/arkenrealms/seer)
- 🔗 [Arken Cerebro](https://github.com/arkenrealms/cerebro)

## License

[MIT](LICENSE)

[github-actions-status]: https://github.com/arkenrealms/shifter/workflows/Test/badge.svg
[github-actions-url]: https://github.com/arkenrealms/shifter/actions
[github-tag-image]: https://img.shields.io/github/tag/arkenrealms/shifter.svg?label=version
[github-tag-url]: https://github.com/arkenrealms/shifter/releases/latest
