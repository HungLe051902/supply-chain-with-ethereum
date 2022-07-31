import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { shortenAddress } from "../utils/shortenAddress";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/inboxContract/inboxContract";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const SideBar = () => {
    const { ethereum } = window;
    if (!ethereum) alert('Please connect to MetaMask')
    // eslint-disable-next-line
    const provider = new ethers.providers.Web3Provider(ethereum);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [msgPopup, setMsgPopup] = useState('');

    const [currentAccount, setCurrentAccount] = useState({ address: '', balance: 0 });
    const [msg, setMsg] = useState('');

    const getAccountInfo = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("You haven't connect to MetaMask");
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });

        let balance = await provider.getBalance(accounts[0]);
        let bal = ethers.utils.formatEther(balance);

        setCurrentAccount({ address: accounts[0], balance: parseFloat(bal) });
    };

    const createEthereumContract = () => {
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        return transactionsContract;
    };

    const changeMessage = async () => {
        var contract = createEthereumContract();
        await contract.functions.setMessage(msgPopup);

        contract.on("MessageChanged", (newMsg: string) => {
            setMsg(newMsg);
        });
    }

    const handleChange = () => {
        changeMessage();
    }

    const onChangeInput = (e: any) => {
        setMsgPopup(e.target.value);
    }

    const getMessage = async () => {
        var contract = createEthereumContract();
        console.log("CONTRACT", contract);
        
        var msg = await contract.functions.message();
        setMsg(msg);
    }

    const setup = async () => {
        await getAccountInfo();
        getMessage();
    }

    useEffect(() => {
        setup()
     // eslint-disable-next-line
    }, []);

    // Listen for MetaMask change account or chain
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                getAccountInfo();
            });
            window.ethereum.on('accountsChanged', () => {
                getAccountInfo();
            })
        }
    });

    return (<div id="side-bar" className="w-60 h-screen">
        <div className="flex">
            <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold text-white">Dashboard</h2>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <button
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Home</span>
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Inbox</span>
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Orders</span>
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Settings</span>
                                </button>
                            </li>
                            <li className="rounded-sm">
                                <button
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* Account Info section */}
                    <div className="text-white">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold">Account Info</h2>
                        </div>
                        <div><b>Address</b>: {shortenAddress(currentAccount.address)}</div>
                        <div><b>Balance</b>: {currentAccount.balance}</div>
                    </div>
                    {/* Inbox Message */}
                    <div className="text-white">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={changeMessage}>Set Message</button>

                        <div>current message: {msg}</div>
                    </div>
                    {/* Dialog Set Message*/}
                    <div>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Open form dialog
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Change Message</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Message"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    value={msgPopup}
                                    onChange={onChangeInput}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleChange}>Change</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}