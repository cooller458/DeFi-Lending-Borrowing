import useSWR from 'swr'

import {
    useEffect
} from 'react'


const NETWORKS = {
    1: "Ethereum Mainnet",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    97: "Binance Smart Chain Testnet",
    1337: "Localhost 8545",

};

export const handler = (web3) => () => {
    const { data, error, mutate, ...rest } = useSWR(
       async () => {
            const chainId = await web3.eth.getChainId();

            if (!chainId) {
                throw new Error("No chainId found");
            }

            return NETWORKS[chainId];
        }
    );

    const targetNetwork = NETWORKS[97];

    return {
        data,
        error,
        ...rest,
        target: targetNetwork,
        isSupported: data === targetNetwork,
    };
}
