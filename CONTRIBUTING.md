# Contributing to Tainted Kingdoms

Use Node 24 LTS and the pnpm version pinned in `package.json`. Install Git LFS before working with assets. Read the README and workspace architecture before adding dependencies.

Keep changes focused, use strict TypeScript, respect package dependency direction, and keep authored gameplay data separate from logic. Add tests for meaningful behavior and resource ownership. Do not add speculative gameplay systems or unapproved lore.

Before submitting changes, run `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:run`, and `pnpm build`. Include browser smoke-test results for rendering changes. Commit `.gitattributes` before binary assets, avoid generated files, and never migrate LFS history without an explicit plan. Licensing remains pending.
