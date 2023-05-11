import { useHooks, useWeb3 } from '../../providers/web3';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const _isEmpty = (data) => {
    return (
        data == null ||
        data === "" ||
        (Array.isArray(data) && data.length === 0) ||
        (data.constructor === Object && Object.keys(data).length === 0)
    );

};

const enchanceHook = (swrRes) => {
    const { data, error } = swrRes;

    const hasInitialResponse = data || error;

    return {
        ...swrRes,
        hasInitialResponse,
        isEmpty: hasInitialResponse && _isEmpty(data),
    };
};

export const useWeb3Contracts = () => {
    const swrRes = enchanceHook(useHooks((hooks) => hooks.useAccount)());

    return {
        account: swrRes,
    };
};

export const useSupplyAssets = () => {
    const swrRes = enchanceHook(useHooks((hooks) => hooks.useSupplyAssets)());

    return {
        tokens: swrRes,
    };
};

export const useBorrowAssets = () => {
    const swrRes = enchanceHook(useHooks((hooks) => hooks.useBorrowAssets)());

    return {
        tokensForBorrow: swrRes,
    };
};

export const useYourSupplies = () => {
    const swrRes = enchanceHook(useHooks((hooks) => hooks.useYourSupplies)());

    return {
        yourSupplies: swrRes,
    };
};

export const useYourBorrows = () => {
    const swrRes = enchanceHook(useHooks((hooks) => hooks.useYourBorrows)());

    return {
        yourBorrows: swrRes,
    };
};

export const useAdmin = ({ redirectTo }) => {
    const { account } = useAccount();
    const { requireInstall } = useWeb3();
    const router = useRouter();

    useEffect(() => {
        if (
            requireInstall || (
                account.hasInitialResponse && !account.isAdmin
            ) ||
            account.isEmpty
        ) {
            router.push(redirectTo);
        }
    }, [account, redirectTo, requireInstall, router]);

    return { account };
};

export const useNetwork = () => {
    const swrRes = enchanceHook(useHooks((hooks) => hooks.useNetwork)());

    return {
        network: swrRes,
    };
};

export const useWalletInfo = () => {
    const { network } = useNetwork();
    const { account } = useAccount();
    const hasConnectedWallet = !!(account.data && network.isSupported);

    const isConnecting = !account.hasInıtialResponse && !network.hasInitialResponse;

    return {
        network,
        account,
        hasConnectedWallet,
        isConnecting,
    };
};





