# Open questions

Every value in this repository that is not yet decided or not yet public, in one place. Each entry says where the placeholder appears so the edit is mechanical once the answer exists.

Nothing in this list has been filled in with a guess. If a number, address, or date is absent from the repo, it is because it is genuinely unknown, not because it was omitted for brevity.

## On-ledger identifiers

| # | Unknown | Appears in |
| --- | --- | --- |
| 1 | Mainnet cold issuer classic address for $PND | `README.md`, `docs/token-spec.md`, `docs/trust-lines.md`, `docs/integration.md` |
| 2 | Operational (hot) distribution address | `docs/token-spec.md` |
| 3 | Mainnet `MPTokenIssuanceID` for $rPND, once created | `docs/pnd-vs-rpnd.md` (referenced, not stated) |

## Issuer policy

| # | Unknown | Appears in |
| --- | --- | --- |
| 4 | Freeze policy: individual freeze, global freeze, or permanent `asfNoFreeze` | `docs/token-spec.md`, `docs/trust-lines.md` |
| 5 | Trust line clawback: whether the mainnet issuer will set `asfAllowTrustLineClawback` (only possible before the account's first trust line) | `docs/token-spec.md` |
| 6 | Target or maximum $PND supply, and how a cap would be enforced | `docs/token-spec.md` |
| 7 | What $PND represents: backing, redeemability, and the legal issuing entity | `README.md`, `docs/token-spec.md` |
| 8 | Whether `TransferRate` stays at 0 long term | `docs/integration.md` (integrators are told to read it from the ledger) |

## Publication and identity

| # | Unknown | Appears in |
| --- | --- | --- |
| 9 | Issuer `Domain` and the host serving `/.well-known/xrp-ledger.toml` | `README.md`, `docs/token-spec.md`, `docs/integration.md` |
| 10 | Canonical logo/icon asset and its public URL | `docs/integration.md` |
| 11 | Public website and community links | `README.md` |
| 12 | Security and disclosure contact | `SECURITY.md` |
| 13 | Listings and integration contact | `docs/integration.md` |

## Timeline and relationship to $rPND

| # | Unknown | Appears in |
| --- | --- | --- |
| 14 | Mainnet issuance date for $PND | `README.md`, `docs/token-spec.md` |
| 15 | Economic relationship between $PND and $rPND: conversion mechanism, operator, and which is the primary user-facing token | `docs/pnd-vs-rpnd.md` |
| 16 | Whether the `protocol` repo will specify $PND's role in protocol mechanics, and where that spec will live | `README.md` (relationship described only in general terms) |

## Deliberately absent

These are not TODOs. They are claims this repository will not make until they are true:

- No audit has been performed, so no audit status or report is referenced.
- No exchange listing or liquidity venue is named.
- No price, market cap, valuation, or yield figure appears anywhere.
- The `initialIssuance` value in `rpnd`'s config is a Devnet rehearsal default and is never presented as a supply figure.

## Closing an item

When a value becomes known: replace the `TODO` text in the files listed above, delete the row here, and note the change in the commit message. When an item is resolved as a deliberate decision rather than a value — for example choosing never to enable freeze — record the decision in `docs/token-spec.md` instead of simply removing the row, since holders care about the commitment.
