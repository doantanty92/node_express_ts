# Node Express TypeScript Starter Kit

## Usage

```bash
# Transpiles TypeScript code to JavaScript using the TypeScript compiler
$ yarn build

# Runs the application in development mode using ts-node-dev
$ yarn dev

# Executes the TypeORM CLI using TypeScript and CommonJS
$ yarn typeorm

# Generates migrations for added entities and applies them to the database
$ yarn migrate ./src/migrations/replace-name && yarn db:push

# Lints the TypeScript code using ESLint and automatically fixes the fixable issues
$ yarn lint

# Checks the TypeScript code for linting issues without fixing them
$ yarn lint:check

# Installs Husky to enable Git hooks
$ yarn prepare
```
