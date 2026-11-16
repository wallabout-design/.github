# Agent guidelines

The org-wide guidelines in `~/dev/AGENTS.md` apply (worktree per task, pull requests, claiming issues). This repo adds:

- This repo is public and holds the default community health files for `wallabout-design`: `PULL_REQUEST_TEMPLATE.md`, `ISSUE_TEMPLATE/`, `profile/` and `README.md`. It must stay public, or GitHub ignores it.
- The templates are copies. The sources are in `wallabout-design/standards` (`templates/`). Change them there first, then copy them here in the same piece of work. Never edit a template only here.
- Nothing private goes in this repo: no client names, no secrets, no internal links that explain a client's business.
- Its name begins with ".", so the remote build queue can't check it out. Ready issues here are built from a local session with `wallabout queue build --repo wallabout-design/.github`.
- Checks: the CI workflow (`.github/workflows/ci.yml`) confirms the files above exist and that every issue template has front matter. Run the same commands locally before a pull request.
