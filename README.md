# NobleApp

## What is this ?

This is a fun bot designed to add some silly functionalities (e.g., playing a sound when a user
joins a voice chat). It is customizable for each Discord server as well as for each user via a
dashboard.

### Features

-   **Fun Slash Commands**: Enjoy fun slash commands between gaming sessions.
-   **"Sound on Action"** : Users can configure the bot to play their chosen sound when they join or
    leave a voice chat, or start or end a stream.

## Getting Started

First, edit the .env file! (copy and rename .env.example => .env)

There is a .env file in web and bot folder

If needed you can refer to https://discord.com/developers/docs/intro to setup your discord app

### _You have to configure your application in the discord dev_ :

Add "http://localhost:3000/api/auth/callback/discord" in the redirect field in your dev portal
discord

## Setup dev environnment

### In the web folder:

```bash
cd web/
npm install
npx prisma migrate dev
npx prisma generate
```

_ONLY DEV MODE_

```bash
npm run next-dev
```

_DEV MODE + PRISMA STUDIO_

```bash
npm run dev
```

_ONLY PRISMA STUDIO_

```bash
npm prisma-studio
```

### In the bot folder :

```bash
cd bot/
npm install
```

#### **WARNING**

### If you have somes issues with database, dont type _npx prisma migrate dev_ in this folder.

```bash
npx prisma db pull

npx prisma generate

npm run serve
```

## To run both in the same prompt (not recommended) :

```bash
npm run app-dev
```

## Building app

```bash
npm web-build
npm bot-build
```

## Contributing

Contributions are welcome! If you have ideas for improvements or want to add new features, feel free
to fork the repository and submit a pull request.
