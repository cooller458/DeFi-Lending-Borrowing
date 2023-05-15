import { createContext, useContext, useState, useEffect, useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
import { loadContract } from "../../../utils/loadContract";


const Web3Context = createContext(null);

const setListeners = (provider) => {
    provider.on("chainChanged", (_) => window.location.reload());
};

export default function Web3Provider({ children }) {
    const createWeb3State = ({ web3, provider, contract, isLoading }) => {
        return {
            web3,
            provider,
            contract,
            isLoading,
            hooks: setupHooks({ web3, provider, contract }),
        };
    };


    const [web3Api, setWeb3Api] = useState(
        createWeb3State({
            web3: null,
            provider: null,
            contract: null,
            isLoading: true,
        })
    );

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const web3 = new Web3(provider);
                const contract = await loadContract("LendingAndBorrowing", web3);
                setWeb3Api(
                    createWeb3State({
                        web3,
                        provider,
                        contract,
                        isLoading: false,
                    })
                );
                setListeners(provider);
            } else {
                console.log("Please install MetaMask!");
                setWeb3Api(
                    (prevWeb3Api) => ({
                        ...prevWeb3Api,
                        isLoading: false,
                    }),
                )
            }
        };
    }, []);

    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading, contract } = web3Api;
        return {
            ...web3Api,
            requireInstall: !isLoading && !web3,
            connect: provider ? async () => {
                try {
                    console.log("Trying to connect");
                    await provider.request({ method: "eth_requestAccounts" });
                } catch {
                    console.log("Error connecting");
                    location.reload();
                }
            }
                : () => console.log("Cannot find provider"),
        }
    }, [web3Api]);

    return (
        <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
    );
}
export function useWeb3() {
    return useContext(Web3Context);
}
export function useHooks(callback) {
    const { hooks } = useWeb3();
    return callback(hooks);
}