## Getting Started

First, edit the .env file! (copy and rename .env.example => .env)

There is a .env file in web and bot folder

If needed you can refer to https://discord.com/developers/docs/intro to setup your discord app

## Setup dev environnment

# To run the web app (in /web folder):

npm install npx prisma migrate dev npx prisma generate

== ONLY DEV MODE == npm run next-dev

== DEV MODE + PRISMA STUDIO == npm run dev

== ONLY PRISMA STUDIO == npm prisma-studio

# To run the bot (in /bot folder) in another prompt:

npm install

#### WARNING

## If some issues with db, dont type "npx prisma migrate dev" in this folder

npx prisma db pull

npx prisma generate

npm run bot-dev

# To run both in the same terminal (not recommended) :

npm run app-dev

## Building app

npm web-build npm bot-build

## Production

# Dont forget to change .env fields

npm web-start npm bot-start
