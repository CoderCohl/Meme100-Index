
<img src="meme100.png" alt="Meme100 Index" width="180" />

# Meme100 Index

Meme100 Index is a deterministic token distribution mechanism that converts a single purchase event into exposure across the top 100 memecoins.

The system operates mechanically.

There is no discretionary logic.
There is no price targeting.
There is no portfolio management.
There is no yield promise.

A user acquires the Meme100 Index token.
A bot executes a split purchase across a defined basket of memecoins.
The acquired tokens are sent directly back to the user.

The index token is a trigger, not a vault.

---

## Core Concept

Meme100 Index functions as a one-click router.

1. User purchases Meme100 Index token
2. Bot detects purchase event on-chain
3. Purchase amount is normalized
4. Capital is split across 100 predefined memecoins
5. Each asset is purchased via market swap
6. Resulting tokens are transferred directly to the purchaser wallet

The system does not custody user funds.
The system does not rebalance holdings.
The system does not track performance.

---

## Design Philosophy

Meme100 Index is built for users who understand execution.

It assumes:
- Volatility is accepted
- Slippage is expected
- Holdings are unmanaged after distribution

The protocol does not attempt to optimize outcomes.
It executes instructions.

---

## Index Composition

The Meme100 basket is defined off-chain and versioned.

Each index version contains:
- Token mint address
- Chain identifier
- Liquidity source
- Weighting rule

Default weighting is equal-weight.

Example schema:

```json
{
  "indexVersion": "v1",
  "assets": [
    {
      "symbol": "DOGE",
      "chain": "ethereum",
      "weight": 0.01,
      "router": "uniswap_v2"
    }
  ]
}
```

Index membership can be updated between versions.
Users always receive assets based on the active version at execution time.

---

## Execution Bot Architecture

The bot operates as a stateless executor.

Components:
- Chain listener
- Swap router
- Transfer dispatcher

### Event Detection

The bot subscribes to token transfer events of the Meme100 Index token.

When a qualifying purchase is detected, the bot extracts:
- Buyer address
- Purchase amount
- Transaction hash

### Normalization

The raw purchase amount is normalized after:
- Router fee
- Gas buffer
- Safety margin

### Split Execution

The normalized amount is divided equally across 100 assets.

Each swap is executed independently.
Failures do not halt the full batch.

---

## Example Execution Logic (TypeScript)

```ts
for (const asset of indexAssets) {
  try {
    const amount = totalAmount * asset.weight;
    const swapTx = await router.swap({
      fromToken: baseToken,
      toToken: asset.mint,
      amount,
      recipient: buyerAddress
    });
    await confirm(swapTx);
  } catch (err) {
    logFailure(asset.symbol, err);
  }
}
```

---

## Security Model

- No pooled custody
- No user approvals beyond swap execution
- No private key reuse across chains

Keys are rotated.
Execution limits are enforced.
Transaction simulation is performed before broadcast.

---

## Non-Goals

Meme100 Index does not:
- Guarantee returns
- Act as an ETF
- Track price indices
- Optimize allocations
- Provide financial advice

This is a mechanical routing system.

---

## Intended Audience

This project is designed for:
- On-chain power users
- Trench participants
- Engineers experimenting with execution primitives

It is not designed for retail onboarding.

---

## License

MIT
