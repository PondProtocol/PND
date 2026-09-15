# Security

This repository holds documentation, not keys and not a service. The security surface that matters for $PND is therefore mostly about identity: whether the issuer address a user sees is the real one.

## Report privately

Do not open a public issue for any of the following:

- A token impersonating $PND: the same ticker from a different issuer, presented as the real asset.
- Documentation in this repository that names a wrong issuer address, domain, or metadata location, whether by mistake or by tampering.
- A suspected compromise of the issuer or operational account, or exposed seeds anywhere in the Pond Protocol repositories.
- A flaw in the issuance procedure in [`pondprotocol/rpnd`](https://github.com/pondprotocol/rpnd) that could let someone issue or move $PND unexpectedly.

Disclosure contact: **TODO — no security contact is published yet.** Until one exists, use GitHub's private vulnerability reporting on this repository if it is enabled, and do not post details publicly in the meantime.

## Out of scope

- Broken links, typos, and spec clarifications: open a normal issue or pull request.
- Vulnerabilities in the XRP Ledger itself: report to the XRPL project, not here.
- Third-party wallets, explorers, and exchanges that display $PND: report to that service.

## Verifying $PND yourself

Anyone can check the asset without trusting a listing page:

1. Read the issuer address from the trust line or amount object, not the currency code.
2. Compare every character against the issuer published here: `rPNDRmfNNrUZstkA23haCUkCp7qLEPnaYc`. An address beginning with `rPND` is not evidence of anything — vanity prefixes are cheap to generate, and a near-miss lookalike is the obvious attack.
3. Fetch the issuer account's `Domain` from the ledger and confirm that host serves `/.well-known/xrp-ledger.toml` listing the same address and the `PND` currency. No domain is published yet, so this step cannot pass today.

The issuing account is funded on mainnet but carries no configuration, and it has issued nothing: `account_lines` on it returns an empty list and `gateway_balances` reports no obligations. Until step 3 can be completed, any token presented as $PND should be treated as unverified — including one issued by the address above. A funded account is not evidence of a launch.

## Handling of seeds

No seed, secret, or private key belongs in any Pond Protocol repository, including in examples. Addresses in this repository are placeholders or documentation. If you find something that looks like a real family seed (`s...`) committed anywhere, report it privately as described above and assume the corresponding account is compromised.
