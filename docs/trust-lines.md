# Holding $PND

$PND lives on trust lines. This is the holder-side view: how to opt in, what a limit means, and what happens when you want out.

Every address below is a placeholder until the issuer is published (TODO — mainnet issuer classic address).

## Opening a trust line

A holder opts in with a `TrustSet` naming the currency, the issuer, and a limit:

```json
{
  "TransactionType": "TrustSet",
  "Account": "rHOLDER_ADDRESS",
  "LimitAmount": {
    "currency": "PND",
    "issuer": "TODO_ISSUER_ADDRESS",
    "value": "1000000"
  }
}
```

The limit is the maximum balance you are willing to accept from that issuer. Payments that would push your balance above it fail rather than partially settling, so set the limit at or above the largest balance you expect to hold. The operational account in the issuance toolkit uses a limit of `1000000000`; a normal holder has no reason to copy that number.

Until the trust line exists, no one can send you $PND. An issuer `Payment` to an account with no line fails with a path error (`tecPATH_DRY`), and one that would exceed your limit fails as an incomplete path (`tecPATH_PARTIAL`). This is the ledger working as intended: an IOU cannot be forced onto an unwilling account.

The issuer does not require holder authorization (`asfRequireAuth` is not set), so opening the line is enough. You do not need approval from Pond Protocol to hold $PND.

## Reserves

Each trust line is an object owned by your account, and each owned object raises your account's owner reserve — XRP that stays locked in your account while the object exists. Check the current reserve values in the [XRPL reserves documentation](https://xrpl.org/reserves.html) rather than assuming a figure, since they are set by validator vote and have changed over time.

You reclaim the reserve by deleting the trust line, which the ledger does automatically once the line is back in its default state: zero balance, zero limit, and no non-default flags.

## Sending and receiving

With `asfDefaultRipple` enabled on the issuer, holders can pay each other in $PND directly, and the balance ripples through the issuer. In practice:

- Sending to another holder who has a $PND trust line with room under their limit works as a plain `Payment` with a $PND amount.
- Sending to an account with no trust line does not work. Wallets that silently retry as an XRP payment or as a path payment through another asset are doing something different from what you asked; check the delivered amount.
- Returning $PND to the issuer redeems it. The obligation disappears from the issuer's balance sheet rather than moving to a treasury address, since the issuer cannot hold its own IOU.

If you set the `NoRipple` flag on your side of the line you block rippling through your account, which is a reasonable default for an end user but breaks intermediary or market-making behavior.

## Exchanges and custodians

An exchange holding $PND for customers typically keeps one trust line and separates customers by destination tag. Two consequences for holders:

- Withdrawing to an exchange without the tag it asked for can lose the deposit.
- The exchange's line, not yours, is what the ledger sees. Custodial $PND is a claim on the exchange, which is a claim on a claim.

The issuing account does not require destination tags (`tfRequireDestTag` is not set), so tags matter for third-party services rather than for the issuer.

## Verifying you hold the real thing

The ticker is not the asset. Before trusting a $PND balance:

1. Read the issuer address on the trust line, not the currency code.
2. Compare it with the address published in this repository — TODO, not published yet.
3. Confirm the issuer account's `Domain` resolves to a host serving `/.well-known/xrp-ledger.toml` that lists the same address.

Anything that fails those checks is a different token that shares a ticker, whatever a wallet or listing page calls it.

## Freeze exposure

The issuer has not committed to a freeze policy (TODO). Since `asfNoFreeze` is not set, the issuer retains the technical ability to freeze individual trust lines or to apply a global freeze. Holders who need certainty on this point should treat it as unresolved until the policy is published here.
