# Bot Discord de modération (Node.js)

Un bot Discord simple de modération avec commandes dans le dossier `commands` et configuration dans un fichier `.env`.

## Prérequis

- Node.js 18+
- Un bot Discord créé via le portail développeur

## Installation

```bash
npm install
```

## Configuration

1. Copie le fichier `.env.example` en `.env`.
2. Remplis les variables :

```env
DISCORD_TOKEN=remplace-ton-token-ici
PREFIX=!
```

## Démarrage

```bash
npm start
```

## Commandes disponibles

- `!ban @membre raison`
- `!kick @membre raison`
- `!mute @membre 10 raison`
- `!purge 20`

> Adapte le préfixe via la variable `PREFIX`.
