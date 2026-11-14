---
name: Onboard a site
about: Bring a new or existing site into wallabout-design, maintainer steps first. File it in wallabout-design/standards.
title: "Onboard <site id> (<domain>) into wallabout-design"
labels: ["status:blocked", "complexity:large", "priority:p1-important"]
---

<!-- processes/onboarding.md is the full checklist; this issue is one run of it.
     Worked example: wallabout-design/standards#164 (gme).
     Fill in every <...>. Delete the steps that don't apply, and say why in one line.
     Look up the facts first and write them into the steps (DNS records, what deploys
     from where, which accounts exist) so the maintainer never has to look them up.
     No person's name: say "a maintainer" or "the client". -->

### Problem

<!-- What the site is, where it lives now (repo, hosting, DNS, mail, APIs), who owns it,
     and which parts of the site contract it misses (`sites.json` adopted flags). Up to 4 sentences. -->

### Solution

The work alternates between a maintainer and an agent in four stages. The build queue can't run it, because onboarding changes several repos and the queue works inside one. So this issue stays `status:blocked` throughout: the next step is always the maintainer's, either doing a stage or starting the agent's session with the command given at the end of the stage before.

| Stage | Who | Time |
| --- | --- | --- |
| 1. Accounts, repo, DNS, routines | A maintainer | <estimate> |
| 2. Worker, repo setup, `sites.json`, secrets | An agent, in a session the maintainer starts on their Mac | <estimate> |
| 3. Builds and the domain switch | A maintainer | <estimate> |
| 4. Clean-up, contract gaps, portal | An agent, in a session the maintainer starts; then one merge by a maintainer | <estimate> |

Each stage ends with a comment "Stage N done", plus any output it asks for.

#### Stage 1: a maintainer, before any agent work

<!-- Every step: what to do, the exact command or dashboard link, and a check
     (a command whose output shows it worked). Keep only what applies:
     - a new client: `wallabout client add` happens in stage 2, but the client's own
       accounts are made here: Cloudflare (sign-up, two-factor, card), Resend, Sentry;
     - the repo transfer out of a personal account, and its visibility;
     - DNS: export from the old host, import to Cloudflare, list today's records to compare,
       keep mail records, turn off Web Analytics automatic setup, DNSSEC off, then nameservers;
     - the domain owner's approval, if email will be set up;
     - adding the repo to the build-queue and feedback routines in claude.ai;
     - anything the agent needs to know that only the maintainer can see (which Fly org, which account). -->

1. **<step>.**

   ```sh
   <command>
   ```

   Check: `<command>` prints `<expected>`.

**When stage 1 is done:** comment "Stage 1 done", with <anything asked for above>. Then start stage 2 from a terminal on the Mac:

```sh
cd ~/dev/wallabout/standards && claude "Do stage 2 of https://github.com/wallabout-design/standards/issues/<this issue>"
```

#### Stage 2: an agent, in a local session on the maintainer's Mac

<!-- processes/onboarding.md steps 1 to 5, with this site's facts: `client add` and `site add`,
     `repo protect`, the Worker and preview Worker (named `<id>-site`, `<id>-preview`), the first
     `wrangler deploy` to workers.dev only, secrets with `wallabout secret put`, and the repo's
     own AGENTS.md and README. Each change is a PR in the repo it belongs to. -->

1. <step, with its check>

Last step: comment "Stage 2 done", with the `workers.dev` URL and the PR links, then stop. Stage 3 is the maintainer's.

#### Stage 3: a maintainer, once the Worker exists

<!-- Workers Builds (authorise the GitHub app, connect, branch previews on); switching the domain
     to the Worker (remove the old records, add the custom domains); staff login (Access) and
     email approval if the site needs them. Every step has a check. -->

1. <step, with its check>

**When stage 3 is done:** comment "Stage 3 done", then start stage 4 the same way:

```sh
cd ~/dev/wallabout/standards && claude "Do stage 4 of https://github.com/wallabout-design/standards/issues/<this issue>"
```

#### Stage 4: an agent

1. Remove what the old host served from (for example GitHub Pages and its workflow), once the domain answers from Cloudflare.
2. Run `wallabout doctor <id>`. File one issue in the site's repo for each `FAIL`, and for each row of `standards/site-contract.md` that doctor doesn't check. Each stays in one repo, so the build queue can build them.
3. Register the site in the portal with a migration in `wallabout-design/site`. Label the PR `status:needs-human-review`, because merging it applies a production migration.
4. Set each `adopted` flag that is now live, update the site's row in `site-contract.md`, and add anything this run taught to `processes/onboarding.md` and to this template.
5. Check: `wallabout doctor <id>` reports no `FAIL` without an open issue, and `wallabout site check` says "valid". Then close this issue.

### Consequences

<!-- Cost (Actions minutes if private, new accounts), what moves (DNS, mail), what stays
     (APIs on other hosts), and anything the client or maintainer will notice. -->
