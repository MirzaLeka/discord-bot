
## P2C Bot

Discord.js bot for P2C Server

### ✨ Features

* Greet users
* Get links to social sites
* Get server time & date
* Get prayer times
* Warn users
* Delete chat history
* Role based commands

### 💻 Setup

Install dependencies

``` npm i```

Create .env file & add the following environment variables

```
DISCORD_TOKEN=[value]
REDIS_PORT=[value]
REDIS_HOST=[value]
REDIS_PASSWORD=[value]
```

Run in development mode

```npm run dev```

Run in production mode

```npm start```

### 📦 Redis

Install dependencies

``` npm i -g redis-commander```

Open a new terminal and type

```redis-commander```

Open the localhost printed in the terminal and add new connection

```
REDIS_PORT=[value]
REDIS_HOST=[value]
REDIS_PASSWORD=[value]
```

Refresh the screen frequently

### 🗺️ Mind Map

```
|
└───src
│   │   app.ts
|   |
|   └───discord
|   |   |   emit-message.discord.ts
|   |   |
|   |   └───embeds
|   |   |   create-embed.discord.ts
|   |   |   emit-embed.discord.ts
|   |   |
|   |   └───recepients
|   |   |   emit-action.discord.ts
|   |   |   emit-author.discord.ts
|   |   |   emit-channel.discord.ts
|   |   |
|   |
|   └───enums
|   |   |   bot-commands.enum.ts
|   |   |   bot-responses.enum.ts
|   |   |   client-events.enum.ts
|   |   |   colors.enum.ts
|   |   |   date-types.enum.ts
|   |   |   env.enum.ts
|   |   |   log-indentation.enum.ts
|   |   |   log-level.enum.ts
|   |   |   message-recepient.enum.ts
|   |   |   prayer-times.enum.ts
|   |   |   roles.enum.ts
|   |   |   special-chars.enum.ts
|   |   |
|   |
|   └───handlers
|   |   |   dynamic-data.handler.ts
|   |   |   response-message.handler.ts
|   |   |   user-input.handler.ts
|   |   |
|   |
|   └───models
|   |   |   bot-cmd-to-prayer-model.ts
|   |   |   log-format.model.ts
|   |   |   prayers-info.model.ts
|   |   |   response-message.model.ts
|   |   |
|   |
|   └───services
|   |   |   logger.service.ts
|   |   |   prayers.service.ts
|   |   |   redis.service.ts
|   |   |   user.service.ts
|   |   |
|   |
|   └───startup
|   |   |   start.ts
|   |   |
|   |
|   └───utils
|   |   |   capitalize.ts
|   |   |   format-message.ts
|   |   |
|   |
|   .env
│   .gitignore
|   README.md
│   package.json
|   package-lock.json
|   Procfile
|   tsconfig.json
|
```

### 🚀 Road Map

* Test environment
* Lint
* !help will print you a list of commands applicable to your role
* !kick will allow you to kick members
* !ban to ban them
* !createChannel
* !deleteChannel
* more embed options
