const { extendEnvironment } = require('hardhat/config');
const { lazyObject } = require("hardhat/plugins");

async function getStableTokenAddress(hre, warn = true)
{
    const { getChainId } = hre;
    const chainId = await getChainId()
    const network = hre.network;
    const deployments = hre.deployments;
    // 1. Check if we have stable token address in network config
    let stableTokenAddress = process.env['STABLE_TOKEN_ADDRESS_' + chainId] ?? process.env.STABLE_TOKEN_ADDRESS;
    if (stableTokenAddress) {
        return stableTokenAddress;
    }

    if (!network.live) {
        // 2. Check if we have test stable token in deployments
        try {
            let stableTokenInstance = await deployments.get("ERC20MockContract");
            return stableTokenInstance.address;
        } catch (e) {}

        // 3. Check if we have local test stable token
        try {
            let stableTokenInstance = await ethers.getContract("ERC20MockContract");
            return stableTokenInstance.address;
        }catch (e) {}
    }
    if (warn)
        console.log("No stable token address found. Please add it, for now I will use 0x0.")
    return "0x0000000000000000000000000000000000000000";
}

async function getEldfallTokenAddress(hre, warn = true)
{
    const { getChainId } = hre;
    const chainId = await getChainId()
    const network = hre.network;
    const deployments = hre.deployments;

    // 1. Check if we have eld token address in network config
    let eldfallTokenAddress = process.env['ELDFALL_TOKEN_ADDRESS_' + chainId] ?? process.env.ELDFALL_TOKEN_ADDRESS;
    if (eldfallTokenAddress) {
        return eldfallTokenAddress;
    }

    // 2. Check if we have already deployed eld token in deployments
    try {
        let eldfallTokenInstance = await deployments.get("EldfallTokenContract");
        return eldfallTokenInstance.address;
    }catch (e) {}

    if (!network.live) {
        // 3. Check if we have local test stable token
        try {
            let eldfallTokenInstance = await ethers.getContract("EldfallTokenContract");
            return eldfallTokenInstance.address;
        }catch (e) {}
    }
    if (warn)
        console.log("No eldfall token address found. Please add it, for now I will use 0x0.")
    return "0x0000000000000000000000000000000000000000";
}

async function getCharacterNftAddress(hre, warn = true)
{
    const { getChainId } = hre;
    const chainId = await getChainId()
    const network = hre.network;
    const deployments = hre.deployments;

    // 1. Check if we have nft contract address in network config
    let characterNftAddress = process.env['CHARACTER_NFT_ADDRESS_' + chainId] ?? process.env.CHARACTER_NFT_ADDRESS;
    if (characterNftAddress) {
        return characterNftAddress;
    }

    // 2. Check if we have already deployed character nft in deployments
    try {
        let characterNftInstance = await deployments.get("CharacterNftContract");
        return characterNftInstance.address;
    }catch (e) {}

    if (!network.live) {
        // 3. Check if we have local test character nft contract
        try {
            let characterNftInstance = await ethers.getContract("CharacterNftContract");
            return characterNftInstance.address;
        }catch (e) {}
    }
    if (warn)
        console.log("No character nft address found. Please add it, for now I will use 0x0.")
    return "0x0000000000000000000000000000000000000000";
}

async function getPriceRosolverOracleAddress(hre, warn = true)
{
    const { getChainId } = hre;
    const chainId = await getChainId()
    const network = hre.network;
    const deployments = hre.deployments;
    
    // 1. Check if we have nft contract address in network config
    let priceResolverOracleAddress = process.env['PRICE_RESOLVER_ORACLE_ADDRESS_' + chainId] ?? process.env.PRICE_RESOLVER_ORACLE_ADDRESS;
    if (priceResolverOracleAddress) {
        return priceResolverOracleAddress;
    }

    // 2. Check if we have already deployed price resolver oracle in deployments
    try {
        let priceResolverOracleInstance = await deployments.get("PriceResolverOracleContract");
        return priceResolverOracleInstance.address;
    }catch (e) {}

    if (!network.live) {
        // 3. Check if we have local test price resolver
        try {
            let priceResolverOracleInstance = await ethers.getContract("PriceResolverOracleContract");
            return priceResolverOracleInstance.address;
        }catch (e) {}
    }
    if (warn)
        console.log("No price resolver address found. Please add it, for now I will use 0x0.")
    return "0x0000000000000000000000000000000000000000";
}

extendEnvironment((hre) => {
    hre.guildsworn = lazyObject(() => {
        return {
            getStableTokenAddress: async (warn = true) => await getStableTokenAddress(hre, warn),    
            getEldfallTokenAddress: async (warn = true) => await getEldfallTokenAddress(hre, warn),
            getCharacterNftAddress: async (warn = true) => await getCharacterNftAddress(hre, warn),
            getPriceRosolverOracleAddress: async (warn = true) => await getPriceRosolverOracleAddress(hre, warn),
        }
    });
});