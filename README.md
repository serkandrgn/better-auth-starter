# Better Auth Starter

A Next.js starter template with authentication and authorization using Better Auth, TypeScript, Tailwind CSS, Drizzle, and PostgreSQL.

## Security Note

This project implements a secure, multi-layered authentication approach:

1. **Page-Level Authentication**: Each protected route verifies authentication at the page component level using server components
2. **AuthGuard Component**: A reusable component that provides consistent authentication verification
3. **Server-Side Session Validation**: Sessions are validated on the server side

This approach helps mitigate security vulnerabilities like [CVE-2025-29927](https://www.picussecurity.com/resource/blog/cve-2025-29927-nextjs-middleware-bypass-vulnerability), which can affect Next.js applications that rely solely on middleware for authentication.

## Features

- Secure authentication with Better Auth
- Email/password authentication
- Social provider authentication (GitHub, Google)
- Passkey support
- Responsive UI with Tailwind CSS and shadcn/ui
- PostgreSQL database with Drizzle ORM
- Route protection with page-level authentication

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file based on the `.env.example` template and fill in your own values.

## Authentication

This project uses Better Auth for authentication. The main files to know about:

- `lib/auth.ts`: Server-side authentication configuration
- `lib/auth-client.ts`: Client-side authentication hooks and functions
- `components/auth/*`: Authentication components and guards

## Learn More

To learn more about the technologies used in this template:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better Auth Documentation](https://better-auth.com)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).
