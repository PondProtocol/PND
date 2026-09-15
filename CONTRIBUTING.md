# Contributing

This repository is documentation: the $PND token specification and the notes an integrator needs. There is no build step and no runtime dependency. The most valuable contributions are corrections, integration reports, and filled-in placeholders.

## What belongs here

- Corrections to the $PND spec, trust line model, or integration notes.
- Clarifications that came out of a real integration ("this failed until we read `delivered_amount`").
- Filling in a `TODO` with a value the maintainers have decided to publish.

## What belongs elsewhere

- Transaction builders, CLI commands, and on-ledger configuration: [`pondprotocol/rpnd`](https://github.com/pondprotocol/rpnd). Its `config/tokens.json` is the source of truth for every on-ledger parameter, so a change to a flag, tick size, or transfer rate starts there and is mirrored here.
- Protocol mechanics and design: [`pondprotocol/protocol`](https://github.com/pondprotocol/protocol).

## Two rules that matter more than style

**Do not invent facts.** No issuer address, supply number, launch date, price, listing, partnership, or audit claim goes into this repository unless a maintainer is publishing it as real. This is a token repo; a plausible-looking address in a README is a phishing vector, and a supply figure copied from a rehearsal config becomes a quoted statistic.

**Mark unknowns explicitly.** When a value is not known, write `TODO` with a short description of what is missing, and add a row to [`docs/open-questions.md`](docs/open-questions.md) pointing at the file. That file is the single index of everything unresolved, and it is where a reader goes to find out what this project has not decided.

## Style

Follow what is already here: prose over bullet soup, tables for enumerable facts, no emoji, and no marketing language. Explain the ledger behavior rather than asserting a property — "the issuer has not set `asfNoFreeze`, so freezing remains available" is useful, "$PND is freeze-free" would be wrong.

Use backticks for on-ledger field names (`TrustSet`, `TransferRate`, `asfDefaultRipple`) so they can be searched against XRPL documentation.

## Checks

```bash
node scripts/check-docs.mjs
```

This validates that relative Markdown links resolve and prints how many `TODO` placeholders exist. CI runs the same command on every pull request.

## Commits and pull requests

Write commit subjects in the imperative, sentence case, describing the change rather than the file touched — for example `Document freeze policy decision for the mainnet issuer`. Keep one logical change per commit.

In the pull request description, say what changed and how you know it is correct: a link to XRPL documentation, a transaction hash on Devnet, or the integration that surfaced the problem. For a filled-in `TODO`, say where the value came from.

## Security

Do not open a public issue for anything involving keys, the issuer account, or an impersonating token. Follow [`SECURITY.md`](SECURITY.md).
