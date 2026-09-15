# PND

**$PND** is the IOU token of Pond Protocol: a classic XRP Ledger issued currency that holders keep on a trust line to the Pond Protocol issuing account.

This repository is the token-facing reference for $PND — what the asset is, how it is identified on ledger, and what a wallet, exchange, indexer, or holder needs in order to integrate it correctly. The transaction tooling that actually issues the token lives in [`pondprotocol/rpnd`](https://github.com/pondprotocol/rpnd).

| | |
| --- | --- |
| Ledger type | Issued currency (IOU) on a trust line |
| Currency code | `PND` (standard 3-character code) |
| Issuer (mainnet) | TODO — cold issuing account not published yet |
| Networks in use | XRPL Devnet for rehearsal; mainnet issuance is not live |
| Transfer fee | `TransferRate` 0 in the current issuer config |
| Display decimals | 6 (a metadata display hint, not a ledger limit) |
| Metadata | XLS-26 `xrp-ledger.toml` served from the issuer `Domain` — TODO: domain not published yet |

## What $PND is

On the XRP Ledger, an issued currency is a balance recorded on a trust line between two accounts. $PND is exactly that: the currency code `PND` issued by one specific Pond Protocol account. It is not a smart-contract token and it has no bytecode. Its identity is the pair (currency code, issuer address), so a `PND` balance issued by any other account is a different asset that happens to share a ticker.

Because an IOU is a claim on its issuer, three things matter more than the ticker: which account issues it, what that issuer promises to honor, and what flags the issuer set on itself. The first is a TODO below, the second is a policy question the owner has not published, and the third is documented in [`docs/token-spec.md`](docs/token-spec.md).

## Issuance and trust lines

The issuance model follows standard XRPL gateway practice, with a cold issuing account and a hot operational account:

1. The **cold issuer** sets its account flags once (`AccountSet`), then never holds inventory. It is the address that appears in every $PND amount.
2. The **operational (hot) account** opens a trust line to the issuer and receives the initial issuance, then distributes from there.
3. Any other **holder** must submit their own `TrustSet` for `PND` / issuer before they can receive the token. There is no way for the issuer to push $PND to an account that has not opened a trust line.
4. Issuance is a `Payment` from the issuer. New $PND exists the moment the issuer pays it out, and the outstanding amount is the sum of the issuer's negative trust line balances rather than a stored supply field.

[`docs/trust-lines.md`](docs/trust-lines.md) has the holder-side detail, including rippling, trust limits, and reserve implications. [`docs/integration.md`](docs/integration.md) covers the amount encoding and the mistakes that break integrations.

## Relationship to $rPND

Pond Protocol has two distinct XRPL assets. They are related by intent and documentation, not by any ledger primitive:

| | $PND | $rPND |
| --- | --- | --- |
| Ledger type | IOU / issued currency | Multi-Purpose Token (MPT) |
| Identifier | currency code `PND` + issuer address | `MPTokenIssuanceID` (ticker `RPND`) |
| Holder opt-in | `TrustSet` | `MPTokenAuthorize` |
| Amount shape | `{ currency, issuer, value }` | `{ mpt_issuance_id, value }` |

The $rPND metadata records `paired_iou_currency: "PND"`, which is a hint for indexers and operators. The ledger does not enforce any peg, conversion, or atomic binding between the two, and no conversion mechanism is specified yet — see [`docs/pnd-vs-rpnd.md`](docs/pnd-vs-rpnd.md).

## Repositories

| Repo | Role |
| --- | --- |
| [`pnd`](https://github.com/pondprotocol/pnd) | This repo — $PND token spec and integration reference |
| [`rpnd`](https://github.com/pondprotocol/rpnd) | Issuance toolkit and operator source of truth for on-ledger config for both $PND and $rPND |
| [`protocol`](https://github.com/pondprotocol/protocol) | Pond Protocol design and mechanics |

Where the two disagree about an on-ledger parameter, `rpnd`'s `config/tokens.json` wins; this repo describes it, it does not configure it. Please open an issue when you spot a mismatch.

## Docs

- [`docs/token-spec.md`](docs/token-spec.md) — asset identity, issuer flags, precision, and amount encoding
- [`docs/trust-lines.md`](docs/trust-lines.md) — how to hold, receive, and send $PND
- [`docs/integration.md`](docs/integration.md) — wallet, exchange, and indexer integration notes
- [`docs/pnd-vs-rpnd.md`](docs/pnd-vs-rpnd.md) — how the IOU and the MPT differ and where they overlap
- [`docs/open-questions.md`](docs/open-questions.md) — every unresolved value in this repo, in one list

## Status

$PND is pre-mainnet. No issuer address, supply figure, launch date, or listing is published in this repository, and nothing here has been audited. Values that are not yet decided appear as explicit `TODO` markers, all of them collected in [`docs/open-questions.md`](docs/open-questions.md). Treat any $PND-branded token you find on mainnet as unverified until an issuer address is published here and matched by an `xrp-ledger.toml` at the issuer's domain.

## Contributing

Documentation corrections and integration reports are welcome — see [`CONTRIBUTING.md`](CONTRIBUTING.md). For anything key-, issuer-, or impersonation-related, follow [`SECURITY.md`](SECURITY.md) instead of opening a public issue.

## License

Apache-2.0. See [`LICENSE`](LICENSE).
