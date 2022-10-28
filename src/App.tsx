import { usePollTime } from "state/currentTime/hooks";
import Menu from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuspenseWithChunkError from "components/SuspenseWithChunkError";
import { HOME_PATH, OVERVIEW_PATH, FEE_STATISTICS_PATH, LIQUIDATIONS_OVERVIEW_PATH, LIQUIDATIONS_LOANS_AT_RISK, LIQUIDATIONS_ACCOUNT, CAULDRONS_PATH } from "config/paths";
import Redirect from "./components/Redirect";
import { lazy } from "react";
import { Box } from "@mui/material";
import Loader from "components/Loader";

function LoaderWrap() {
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Loader size={120} />
        </Box>
    );
}

const Overview = lazy(() => import("./views/Overview"));
const FeeStatistics = lazy(() => import("./views/FeeStatistics"));
const Liquidation = lazy(() => import("./views/Liquidations"));
const LiquidationLoansAtRisk = lazy(() => import("./views/Liquidations/LoansAtRisk"));
const LiquidationAccount = lazy(() => import("./views/Liquidations/Account"));
const Cauldrons = lazy(() => import("./views/Cauldrons"));

function App() {
    usePollTime();

    return (
        <BrowserRouter>
            <Menu>
                <SuspenseWithChunkError fallback={<LoaderWrap />}>
                    <Routes>
                        <Route path={HOME_PATH} element={<Redirect to={OVERVIEW_PATH} />} />

                        <Route path={OVERVIEW_PATH} element={<Overview />} />
                        <Route path={FEE_STATISTICS_PATH} element={<FeeStatistics />} />
                        <Route path={LIQUIDATIONS_OVERVIEW_PATH} element={<Liquidation />} />
                        <Route path={LIQUIDATIONS_LOANS_AT_RISK} element={<LiquidationLoansAtRisk />} />
                        <Route path={LIQUIDATIONS_ACCOUNT} element={<LiquidationAccount />} />
                        <Route path={CAULDRONS_PATH} element={<Cauldrons />} />

                        <Route path="*" element={<Redirect to={OVERVIEW_PATH} />} />
                    </Routes>
                </SuspenseWithChunkError>
            </Menu>
        </BrowserRouter>
    );
}

export default App;
