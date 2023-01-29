# hardhat-guildsworn

Hardhat helper plugin for guildsworn projects


## Installation

# Installing the package
```shell
npm install @guildsworn/hardhat-guildsworn
```
or via yarn
```shell
yarn add @guildsworn/hardhat-guildsworn
```

And add the following statement to your `hardhat.config.js`:

```js
require('@guildsworn/hardhat-guildsworn')
```

## Environment settings

Available env variables:
`STABLE_TOKEN_ADDRESS` for general, or use `STABLE_TOKEN_ADDRESS_[ChainId]` for network specific settings
`ELDFALL_TOKEN_ADDRESS` for general, or use `ELDFALL_TOKEN_ADDRESS_[ChainId]` for network specific settings
`CHARACTER_NFT_ADDRESS` for general, or use `CHARACTER_NFT_ADDRESS_[ChainId]` for network specific settings
`PRICE_RESOLVER_ORACLE_ADDRESS` for general, or use `PRICE_RESOLVER_ORACLE_ADDRESS_[ChainId]` for network specific settings

## Publish the NPM package
```shell
yarn publish --access public
```