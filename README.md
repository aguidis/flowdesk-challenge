# Flowdesk Challenge

##  GOALS
Expose a REST API which gives us the global price index of the trading pair BTC/USDT, computed
from 3 different exchanges :

1. Binance
2. Krake
3. Huobi

## Requirements

- [x] Use NodeJS and Typescript
- [x] You will have to publish your source code in a VCS
- [x] You must fetch at least one order book with the websocket protocol

## Optimizations

- Define allowed currencies pairs and normalize them for each exchange (e.g. Kraken uses XBT instead of BTC)
- Suggestion for improving scalability:
  - Create a background job for fetching order books and compute global price index before storing it in a database. 
  - Our API endpoint would only fetch the latest data in the database.

## Tech Stack

- Node v18.8.0
- TypeScript v4.9.5
- Express v4.18.2
- ESLint v8.34.0
- Prettier v2.8.4

## Environment Variables

Copy the `.env.dist` file to `.env`.

```bash
cp .env.dist .env
```

## Installation + Run Locally

Go to the project directory

```bash
cd /path/to/flowdesk-challenge
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

Run ESLint

```bash
npm run lint
```

Run Prettier

```bash
npm run prettier:write
```

## API Reference

#### Get the global price index of the trading pair BTC/USDT

```http
GET /order-book/BTCUSDT/global-price-index
```
