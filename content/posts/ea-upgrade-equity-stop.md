# ShaniGoldHybrid EA Upgrade Plan: Equity-Based Trailing Stop Enhancement

This document outlines the planned upgrade to the ShaniGoldHybrid EA (v1.20 -> v1.21). The focus is optimizing the Trailing Stop Loss (TSL) mechanism to follow a **Global Equity Take Profit (TP)** target rather than fixed Pips or ATR, aligning with professional position management strategies.

**Current Logic (v1.20 Summary):**
The EA manages positions using multi-stage entries and a global equity-based TP. The TSL currently trails based on fixed pips or ATR multipliers.

**Planned Upgrade (v1.21):**
The TSL will be dynamically adjusted based on the current *realized and unrealized* equity drawdown tolerance defined globally for the account session.

- **New TSL Anchor:** The stop will move up only when the current floating profit exceeds a threshold (e.g., 2x the largest single-trade initial stop loss value) *and* maintain a minimum distance defined by a small percentage of the current total account equity (e.g., 0.5% equity trailing).
- **Benefit:** This prevents premature stop loss movement during initial volatility while locking in profits aggressively as the overall position group nears the global equity TP goal.

This upgrade requires modifications to the MQL5 code in `ShaniGoldHybrid.mq5`. The deployment of the compiled `.ex5` file will follow standard Docker container rebuild procedures.