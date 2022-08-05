
import { Route, Routes } from "react-router-dom";
import {
    HomePage
} from "../pages/home-page";

import { FeatureA } from "../components/FeatureA";
import { FeatureB } from "../components/FeatureB";
import { ConnectToWallet } from "../components/ConnectToWallet";
import { InboxMessage } from "../components/InboxMessage";
import { Counter } from "features/counter/Counter";
import { UploadIPFSFile } from "components/UploadIPFSFile";

const BaseRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ConnectToWallet />} />
            <Route path="/home" element={<HomePage />}>
                <Route path="feature_a" element={<FeatureA />} />
                <Route path="feature_b" element={<FeatureB />} />
                <Route path="inbox" element={<InboxMessage />} />
                <Route path="counter" element={<Counter />} />
                <Route path="ipfs" element={<UploadIPFSFile />} />
            </Route>
        </Routes>
    );
};

export { BaseRoutes };