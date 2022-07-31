import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "src/utils/inboxContract/inboxContract";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const InboxMessage = () => {
    /**
     * State region
     */
    const [open, setOpen] = React.useState(false);
    const [msgPopup, setMsgPopup] = useState('');
    const [msg, setMsg] = useState('');

    const { ethereum } = window;
    if (!ethereum) alert('Please connect to MetaMask')
    // eslint-disable-next-line
    const provider = new ethers.providers.Web3Provider(ethereum);

    /**
     * Function region
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = () => {
        changeMessage();
    }

    const onChangeInput = (e: any) => {
        setMsgPopup(e.target.value);
    }

    const changeMessage = async () => {
        var contract = createEthereumContract();
        await contract.functions.setMessage(msgPopup);

        contract.on("MessageChanged", (newMsg: string) => {
            setMsg(newMsg);
        });
    }

    const createEthereumContract = () => {
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        return transactionsContract;
    };

    return (
        <div id="inbox-message">
            {/* Dialog Set Message*/}
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Change message
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
    )
}