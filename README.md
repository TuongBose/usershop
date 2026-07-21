## Overview

This repository contains a NestJS backend for the usershop application. The backend is implemented in TypeScript and uses Prisma as the ORM for database access.

## Code structure

- `usershop-backend/`
  - `src/`
    - `app.module.ts` - root application module that imports feature modules.
    - `main.ts` - application bootstrap file that starts the NestJS server.
    - `auth/` - authentication controllers, services, strategies, guards, and decorators.
    - `user/` - user management controllers, modules, and services.
    - `note/` - note management controllers, modules, and services.
    - `prisma/` - Prisma module for database connection.
  - `prisma/` - Prisma schema and migration history.
  - `test/` - end-to-end tests for the backend.
  - `package.json` - npm scripts and dependencies.
  - `tsconfig.json` - TypeScript configuration.
  - `eslint.config.mjs` - ESLint configuration.
- `usershop-docker/` - Docker compose definitions for local deployment.

## Run locally

1. Open a terminal and navigate to the backend folder:

```bash
cd usershop-backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

4. The app listens on port `3000` by default, or on `PORT` when defined in the environment.

## Useful scripts

From `usershop-backend/`:

- `npm run start` - run the app in normal mode.
- `npm run start:dev` - start the app in watch mode for development.
- `npm run start:prod` - run the built production bundle.
- `npm run build` - compile TypeScript to JavaScript.
- `npm run lint` - run ESLint and fix issues when possible.
- `npm run format` - format source files with Prettier.
- `npm run test` - run Jest tests.
- `npm run test:e2e` - run end-to-end tests with `.env.test`.

## Code conventions

- Follow NestJS module architecture: controllers, services, modules, DTOs, and providers.
- Use `class-validator` and `class-transformer` DTOs for input validation.
- Apply global validation pipes from `main.ts` to enforce request validation.
- Use Prisma for database access through a dedicated `PrismaModule`.
- Keep source files in `src/` and use NestJS naming conventions like `*.module.ts`, `*.controller.ts`, `*.service.ts`, and DTO files in `*.dto.ts`.
- Maintain formatting with Prettier and lint with ESLint.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
