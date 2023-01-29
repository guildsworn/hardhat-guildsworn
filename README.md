# hardhat-guildsworn

Hardhat helper plugin for guildsworn projects


## Installation

Install dependency from NPM:

```bash
npm install hardhat-guildsworn hardhat
```

And add the following statement to your `hardhat.config.js`:

```js
require('hardhat-guildsworn')
```

Or, if you are using TypeScript, add this to your hardhat.config.ts:

```ts
import 'hardhat-guildsworn';
```

## Environment settings

Available env variables:
`STABLE_TOKEN_ADDRESS` for general, or use `STABLE_TOKEN_ADDRESS_[ChainId]` for network specific settings
`ELDFALL_TOKEN_ADDRESS` for general, or use `ELDFALL_TOKEN_ADDRESS_[ChainId]` for network specific settings
`CHARACTER_NFT_ADDRESS` for general, or use `CHARACTER_NFT_ADDRESS_[ChainId]` for network specific settings
`PRICE_RESOLVER_ORACLE_ADDRESS` for general, or use `PRICE_RESOLVER_ORACLE_ADDRESS_[ChainId]` for network specific settings