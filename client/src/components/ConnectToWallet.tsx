import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";

const { ethereum } = window;

export const ConnectToWallet = () => {
    let navigate = useNavigate();

    const [haveMetamask, sethaveMetamask] = useState(true);
    const [accountAddress, setAccountAddress] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    // const [provider, setProvider] = useState(null);

    // if (!ethereum) {
    //     alert("Haven't install Metamask");
    // }
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    var provider: any = null;

    useEffect(() => {
        const { ethereum } = window;

        if (ethereum) {
            // const checkMetamaskAvailability = async () => {
            //     if (!ethereum) {
            //         sethaveMetamask(false);
            //     }
            //     sethaveMetamask(true);
            // };
            // checkMetamaskAvailability();
            // setProvider(new ethers.providers.Web3Provider(ethereum));
            provider = new ethers.providers.Web3Provider(ethereum);
        }
        else {
            alert("Haven't install Metamask");
        }
    }, []);

    // const checkIfWalletIsConnected = async () => {
    //     try {
    //         if (!ethereum) return alert("Please install MetaMask");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                sethaveMetamask(false);
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            let balance = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balance);

            setAccountAddress(accounts[0]);
            setAccountBalance(bal);
            setIsConnected(true);

            navigate("../home", { replace: true });
        } catch (error) {
            setIsConnected(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                {haveMetamask ? (
                    <div className="App-header">
                        {isConnected ? (
                            <div className="card">
                                <div className="card-row">
                                    <h3>Wallet Address:</h3>
                                    <p>
                                        {accountAddress.slice(0, 4)}...
                                        {accountAddress.slice(38, 42)}
                                    </p>
                                </div>
                                <div className="card-row">
                                    <h3>Wallet Balance:</h3>
                                    <p>{accountBalance}</p>
                                </div>
                            </div>
                        ) : (
                            <div>Not thing</div>
                        )}

                        {isConnected ? (
                            <p className="info">🎉 Connected Successfully</p>
                        ) : (
                            <button className="btn" onClick={connectWallet}>
                                Connect
                            </button>
                        )}
                    </div>
                ) : (
                    <p>Please Install MataMask</p>
                )}
            </header>
        </div>
    );
};