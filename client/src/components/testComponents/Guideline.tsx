import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { useAppSelector } from 'store/hooks';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}



function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UserInfo = () => {
    const [isOpen, setOpen] = useState(false);

    const provider = useAppSelector((state) => state.wallet.provider)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Add user</Button>
            <div className='mt-2'>
                <b>User Detail</b>
            </div>
            {/* Dialog Add User */}
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent sx={{
                                width: 500
                            }}>
                    <div className="py-3 flex flex-col">
                        <TextField
                            label="Wallet Address"
                            defaultValue=""
                            
                            margin="dense"
                        />
                        <TextField
                            label="User Name"
                            defaultValue=""
                            margin="dense"
                        />
                        <TextField
                            label="Image's CID"
                            defaultValue=""
                            margin="dense"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button onClick={handleChange}>Change</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export function Guideline() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="User Info" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}


