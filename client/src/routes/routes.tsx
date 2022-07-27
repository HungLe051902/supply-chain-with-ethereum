
import { Route, Routes } from "react-router-dom";
import {
    HomePage
} from "../pages/home-page";

import { FeatureA } from "../components/FeatureA";
import { FeatureB } from "../components/FeatureB";

const BaseRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />}>
                <Route path="feature_a" element={<FeatureA />} />
                <Route path="feature_b" element={<FeatureB />} />
            </Route>
        </Routes>
    );
};

export { BaseRoutes };