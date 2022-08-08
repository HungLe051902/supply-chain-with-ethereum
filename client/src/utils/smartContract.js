import { ethers } from 'ethers';

export const getWalletInfo = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
    });

    let balance = await provider.getBalance(accounts[0]);
    let bal = ethers.utils.formatEther(balance);

    return {
        provider,
        account: accounts[0],
        balance: parseFloat(bal)
    }
}

export const createEthereumContract = (signer, contractAbi, contractAddress) => {
    const transactionsContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
    );

    return transactionsContract;
};