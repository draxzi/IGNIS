# Deployment guide

## GitHub

From the project root:

```bash
git init
git add .
git commit -m "Build IGNIS research cockpit"
git branch -M main
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main
```

Check that `.env.example` is present and `.env` files are absent before pushing. The `package-lock.json` should be committed so npm and Vercel use the tested dependency graph.

## Vercel

Import the GitHub repository, keep the Next.js framework preset, use `npm install` as the install command and `npm run build` as the build command. Do not set an output directory override. Add optional AI variables in Vercel project settings only if needed. No database or Manus integration is required.

## Standard Node.js hosting

Build with `npm run build` and serve with `npm start`. The application listens on the host-provided `PORT` through Next.js defaults. For a reverse proxy, forward requests to the Node process and keep `/api/assistant` on the same origin.

## Troubleshooting

If the assistant returns local answers, confirm the AI variables are set on the server environment and that the provider supports `POST /chat/completions`. If the build fails after a dependency update, remove `node_modules` and run `npm ci` from the committed lockfile. If charts are blank, verify that the selected CSV columns contain numeric cells and that the x/y selectors point to those columns.
