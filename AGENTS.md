## IMPORTANT

- No ejecutes comandos como `build`, `dev`, `start`, `install` o `test` sin que el usuario lo solicite explicitamente.
- Para validacion solo ejecuta `lint` (`pnpm lint`) para buscar errores en el codigo escrito.
- Si necesitas validar cambios, usa solo herramientas de lectura (`read_file`, `grep_search`, `get_errors`).
- Un hook de VS Code (`PreToolUse`) requiere aprobacion automatica para estos comandos.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
