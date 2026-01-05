# Copilot Instructions for GraphQL Project

## Project Overview
This is a GraphQL server project built with **Bun runtime**, Express, and the official `graphql` library. The architecture uses Express with `graphql-http` middleware for handling GraphQL queries.

## Critical Developer Workflows

### Build & Run
- **Runtime**: Always use Bun, not Node.js
  - Run: `bun run index.ts`
  - Install dependencies: `bun install`
  - Testing: `bun test` (see `CLAUDE.md` for test patterns)
  - Build: `bun build` (for assets/bundles)

### Dependencies
- `express@5.2.1` - HTTP server framework (configured but CLAUDE.md recommends `Bun.serve()` as the modern alternative)
- `graphql@16.12.0` - Core GraphQL execution and schema utilities
- `graphql-http@1.22.4` - Middleware for HTTP transport layer (handles `/graphql` POST requests)
- `@types/bun` (dev) - TypeScript definitions for Bun APIs

## Architecture Patterns

### Server Setup
The project uses Express with GraphQL HTTP middleware. When extending the server:
1. Define GraphQL schema using `graphql` library's `buildSchema()` or `GraphQLSchema`
2. Mount the GraphQL endpoint via `graphql-http` middleware on Express
3. Reference: See `CLAUDE.md` for Bun-native patterns using `Bun.serve()` which is preferred over Express

### Bun-First Conventions
Per `CLAUDE.md`, this team prefers Bun's built-in solutions:
- ✅ Use `Bun.serve()` instead of Express for new endpoints
- ✅ Use `bun:sqlite` for databases (not other DB clients)
- ✅ Use built-in `WebSocket` for real-time features
- ✅ Bun auto-loads `.env` files (no `dotenv` package needed)

Note: Current codebase uses Express, but new features should consider migrating to Bun.serve() following the patterns in `CLAUDE.md`.

## Project Structure
- `index.ts` - Entry point (currently minimal, serves as starting point for server setup)
- `package.json` - Dependencies and configuration with `"type": "module"` (ES modules)
- `tsconfig.json` - TypeScript configuration for Bun
- `CLAUDE.md` - Bun conventions and API guidelines (authoritative for this team)

## TypeScript Configuration
- Module system: ES modules (`"type": "module"` in package.json)
- Target: TypeScript 5+ via peer dependency
- Bun handles transpilation automatically

## Testing
Follow `CLAUDE.md` testing pattern:
```ts
import { test, expect } from "bun:test";

test("test name", () => {
  expect(result).toBe(expected);
});
```
Run with `bun test`.

## Key Files to Reference
- `CLAUDE.md` - Team conventions and Bun best practices
- `README.md` - Basic setup instructions
- `package.json` - Dependency versions and module configuration
