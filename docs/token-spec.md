# $PND token specification

$PND is an XRP Ledger issued currency (IOU). This file describes the asset as it is configured today. The on-ledger parameters are set by [`pondprotocol/rpnd`](https://github.com/pondprotocol/rpnd) from its `config/tokens.json`; that file is the operator source of truth, and this document tracks it.

## Asset identity

| Field | Value |
| --- | --- |
| Currency code | `PND` |
| Code form | standard 3-character (not the 160-bit hex form) |
| Issuer (cold account) | TODO — mainnet classic address unpublished |
| Operational (hot) account | TODO — distribution address unpublished |
| Asset class (XLS-26) | `other` |
| Display decimals | 6 |

An IOU is identified by both its currency code and its issuer. `PND` from a different issuer is a different asset. Any integration that keys off the currency code alone will conflate them, so always compare the issuer address too.

## Issuer account configuration

The issuer's `AccountSet` establishes the token's behavior. Current values:

| Setting | Value | Effect |
| --- | --- | --- |
| `asfDefaultRipple` | enabled | Trust lines to the issuer allow rippling by default, so holders can pay each other in $PND without extra setup |
| `TransferRate` | `0` | No transfer fee; sending 100 $PND delivers 100 $PND |
| `TickSize` | `5` | Order book prices for $PND pairs are rounded to 5 significant digits, which keeps DEX offers from splitting into dust levels |
| `tfDisallowXRP` | enabled | Advisory flag asking clients not to send XRP to the issuing account. It is not enforced by the ledger |
| `tfRequireDestTag` | not set | The issuing account does not require destination tags |
| `Domain` | TODO | Must be set to the host serving `/.well-known/xrp-ledger.toml` before the metadata is treated as authoritative |

Two policy flags are deliberately not covered here because they have not been decided:

- **Freeze.** Whether the issuer will use individual freeze, global freeze, or permanently give up freezing via `asfNoFreeze` is a TODO. The issuance toolkit does not set any freeze flag today, which means freezing remains technically available to the issuer.
- **Trust line clawback.** `asfAllowTrustLineClawback` is not set by the toolkit, and it can only be set on an account that has never had a trust line. Whether the mainnet issuer will enable it is a TODO. Note that this differs from $rPND, where clawback is permanently disabled at creation.

Both flags materially affect what a holder is exposed to, so they should be resolved and documented before mainnet issuance.

## Amounts and precision

$PND amounts are objects, never strings (a bare string means drops of XRP):

```json
{
  "currency": "PND",
  "issuer": "TODO_ISSUER_ADDRESS",
  "value": "125.5"
}
```

`value` is a decimal string. Issued currencies carry 15 decimal digits of significant precision with a wide exponent range, so $PND is not a fixed-point integer token and must not be parsed into a 64-bit integer or an IEEE-754 double. Use a decimal library and keep the string form when relaying values.

The `displayDecimals` value of 6 is a presentation hint published in XLS-26 metadata. It tells interfaces how many fractional digits to show; it does not truncate or round what the ledger stores.

## Supply

The XRP Ledger does not store a supply figure for an IOU. The outstanding amount of $PND at any moment is the sum of the balances the issuer owes across its trust lines, which is what the `gateway_balances` API call reports as obligations.

Supply is therefore a policy question, not a ledger field:

- Target or maximum $PND supply: TODO.
- The `initialIssuance` value in `rpnd`'s config is a rehearsal default used on Devnet. It is not a supply commitment and should not be quoted as one.
- Whether the issuer will publish a supply cap and how it would be enforced (issuer key policy, blackholing, or nothing) is a TODO.

## Backing and redemption

An IOU is a liability of its issuer. What $PND represents, what if anything backs it, and whether it is redeemable are not defined in this repository. The legal issuing entity is also a TODO. Do not infer a peg or a redemption right from this document.

## Metadata publication

$PND discovery uses XLS-26: the issuer sets its `Domain`, and the matching host serves `/.well-known/xrp-ledger.toml` with `[[ACCOUNTS]]`, `[[CURRENCIES]]`, and `[[TOKENS]]` entries for the issuer and for `PND`. `rpnd` ships a template and a `render-toml` command that fills it in.

Until both halves exist — the `Domain` on the account and the file on the host — the metadata is unverified, because the pairing between the two is exactly what proves the domain and the account belong to the same operator.

## Networks

| Network | Status |
| --- | --- |
| Devnet | Used for rehearsal issuance. Devnet is periodically reset; balances there are disposable |
| Testnet | Usable for IOU work. $rPND is not issued there because the MPT amendment is absent |
| Mainnet | Not issued yet. TODO — issuance date and issuer address |

Devnet and Testnet keys must never be reused on mainnet.
