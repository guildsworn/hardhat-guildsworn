const { extendEnvironment } = require('hardhat/config');
const { lazyObject } = require("hardhat/plugins");

const STABLE_TOKEN_CONTRACT_NAME = "ERC20MockContract";
const ELDFALL_TOKEN_CONTRACT_NAME = "EldfallTokenContract";
const CHARACTER_NFT_CONTRACT_NAME = "CharacterNftContract";
const PRICERESOLVER_ORACLE_CONTRACT_NAME = "PriceResolverOracleContract";
const CHARACTER_STORE_CONTRACT_NAME = "CharacterStoreContract";

async function getEnvironmentSetting(hre, key, defaultValue, warn = true) {
    const { getChainId } = hre;
    const chainId = await getChainId()
    let networkKey = key + '_' + chainId;
    let envValue = process.env[networkKey] ?? process.env[key];
    if (envValue) {
        return envValue;
    } else {
        if (warn)
            console.log(`No environment value for ${networkKey} or ${key} found. Please add it, for now I will use ${defaultValue}.`)
        return defaultValue;
    }
}

async function getStableTokenAddress(hre, warn = true)
{
    const network = hre.network;
    const deployments = hre.deployments;
    // 1. Check if we have stable token address in evnironment
    let stableTokenAddress = await getEnvironmentSetting(hre, "STABLE_TOKEN_ADDRESS", undefined, false);
    if (stableTokenAddress) {
        return stableTokenAddress;
    }

    if (!network.live) {
        // 2. Check if we have test stable token in deployments
        try {
            let stableTokenInstance = await deployments.get(STABLE_TOKEN_CONTRACT_NAME);
            return stableTokenInstance.address;
        } catch (e) {}

        // 3. Check if we have local test stable token
        try {
            let stableTokenInstance = await ethers.getContract(STABLE_TOKEN_CONTRACT_NAME);
            return stableTokenInstance.address;
        }catch (e) {}
    }
    if (warn)
        console.log("No stable token address found. Please add it, for now I will use 0x0.")
    return "0x0000000000000000000000000000000000000000";
}

async function getEldfallTokenAddressByName(hre, env_key, contract_name, warn = true)
{
    const deployments = hre.deployments;

    // 1. Check if we have token address in environment
    let tokenAddress = await getEnvironmentSetting(hre, env_key, undefined, false);
    if (tokenAddress) {
        return tokenAddress;
    }

    // 2. Check if we have already deployed token in deployments
    try {
        let tokenInstance = await deployments.get(contract_name);
        return tokenInstance.address;
    }catch (e) {}

    // 3. Check if we have local token
    try {
        let tokenInstance = await ethers.getContract(contract_name);
        return tokenInstance.address;
    }catch (e) {}

    if (warn)
        console.log(`No ${contract_name} address found. Please deploy it or add address into environment, for now I will use 0x0.`);
    return "0x0000000000000000000000000000000000000000";
}

async function getEldfallTokenAddress(hre, warn = true)
{
    return await getEldfallTokenAddressByName(hre, "ELDFALL_TOKEN_ADDRESS", ELDFALL_TOKEN_CONTRACT_NAME, warn);
}

async function getCharacterNftAddress(hre, warn = true)
{
    return await getEldfallTokenAddressByName(hre, "CHARACTER_NFT_ADDRESS", CHARACTER_NFT_CONTRACT_NAME, warn);
}

async function getPriceRosolverOracleAddress(hre, warn = true)
{
    return await getEldfallTokenAddressByName(hre, "PRICE_RESOLVER_ORACLE_ADDRESS", PRICERESOLVER_ORACLE_CONTRACT_NAME, warn);
}

async function getCharacterStoreAddress(hre, warn = true)
{
    return await getEldfallTokenAddressByName(hre, "CHARACTER_STORE_ADDRESS", CHARACTER_STORE_CONTRACT_NAME, warn);
}

extendEnvironment((hre) => {
    hre.guildsworn = lazyObject(() => {
        return {
            getStableTokenAddress: async (warn = true) => await getStableTokenAddress(hre, warn),    
            getEldfallTokenAddress: async (warn = true) => await getEldfallTokenAddress(hre, warn),
            getCharacterNftAddress: async (warn = true) => await getCharacterNftAddress(hre, warn),
            getPriceRosolverOracleAddress: async (warn = true) => await getPriceRosolverOracleAddress(hre, warn),
            getCharacterStoreAddress: async (warn = true) => await getCharacterStoreAddress(hre, warn),
            getEnvironmentSetting: async (key, defaultValue, warn = true) => await getEnvironmentSetting(hre, key, defaultValue, warn),
        }
    });
});