# $PND and $rPND

Pond Protocol has two XRP Ledger assets. They share a naming family and nothing else on ledger. This file exists so that nobody has to infer the relationship from the tickers.

## Side by side

| | $PND | $rPND |
| --- | --- | --- |
| Ledger type | Issued currency (IOU) | Multi-Purpose Token (MPT) |
| Identifier | currency code `PND` + issuer address | `MPTokenIssuanceID` from `MPTokenIssuanceCreate` |
| Ticker in metadata | `PND` | `RPND` (XLS-89) |
| Holder opt-in | `TrustSet` | `MPTokenAuthorize` |
| Amount shape | `{ currency, issuer, value }` | `{ mpt_issuance_id, value }` |
| Precision model | 15 significant decimal digits; `displayDecimals` 6 is a hint | fixed `AssetScale` of 6, set permanently at creation |
| Supply | no ledger field; obligations only | `MaximumAmount` fixed at creation |
| Metadata | XLS-26 file at the issuer's domain | XLS-89 JSON stored on ledger in `MPTokenMetadata` |
| Clawback | not enabled today; policy undecided (TODO) | permanently disabled at creation via `ImmutableFlags` |
| Freeze / lock | freeze policy undecided (TODO) | lockable (`tfMPTCanLock` set) |
| Amendment requirement | none; IOUs are core ledger functionality | requires the MPTokens amendment, so not available on every network |

The practical consequence of the last row: $PND can be issued anywhere, while $rPND only exists on MPT-capable networks. The issuance toolkit defaults to Devnet for that reason and marks Testnet as not MPT-capable.

## What "paired" means

The $rPND metadata sets `additional_info.paired_iou_currency` to `PND`. That is a documentation field for indexers and operators. It is not a ledger primitive, and it creates:

- no peg between the two assets,
- no atomic conversion or redemption path,
- no shared supply accounting,
- no guarantee the two are issued by the same account, beyond the operator choosing to do so.

Anything that behaves as if $rPND is a wrapped or redeemable form of $PND is asserting a mechanism that does not exist on ledger today.

## Undecided

The economic relationship between the two assets is a TODO. Specifically: whether a conversion mechanism will exist, who would operate it, whether either asset is intended to track the other's value, and which of the two is the primary user-facing token. Until that is written down, treat them as two independent assets from one operator.

## Where each is configured

Both are configured from `config/tokens.json` in [`pondprotocol/rpnd`](https://github.com/pondprotocol/rpnd), which also holds the issuance procedure. This repository documents the $PND side; `rpnd`'s `docs/tokens.md` documents both from the operator's point of view.
