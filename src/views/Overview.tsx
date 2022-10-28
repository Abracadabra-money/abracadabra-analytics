import BarChart from "components/Charts/BarChart";
import { Box, Grid } from "@mui/material";
import StatisticCard from "components/Card/StatisticCard";
import useFeesChanges from "hooks/useFeesChanges";
import useFeesTotals from "hooks/useFeesTotals";
import useTvl from "hooks/useTvl";
import moment from "moment";
import useDefillama from "hooks/useDefillama";
import useMimBorrowed from "hooks/useMimBorrowed";
import useCollateraled from "hooks/useCollateraled";
import PieChart from "components/Charts/PieChart";
import { groupByNetworkBorrowed, groupByCauldronBorrowed, groupByAssetBorrowed, groupByAssetCollatered, groupByNetworkCollatered, groupByCauldronCollatered } from "helpers/group";
import useLoansOpen from "hooks/useLoansOpen";
import useLoansSize from "hooks/useLoansSize";
import useLoansOpenChanges from "hooks/useLoansOpenChanges";

export default function () {
    const tvl = useTvl();
    const feeTotals = useFeesTotals();
    const feeChanges = useFeesChanges();
    const defillama = useDefillama();
    const mimBorrowedNetwork = useMimBorrowed("network");
    const mimBorrowedCauldron = useMimBorrowed("cauldron");
    const mimBorrowedAsset = useMimBorrowed("asset");
    const collateralNetwork = useCollateraled("network");
    const collateralCauldron = useCollateraled("cauldron");
    const collateralAsset = useCollateraled("asset");
    const loansOpen = useLoansOpen();
    const loansSize = useLoansSize();
    const loansChanges = useLoansOpenChanges();

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs md={3}>
                    <StatisticCard lable="Total Value Locked ($)" type="currency" loading={tvl.loading} value={tvl.tvl} />
                </Grid>
                <Grid item xs md={3}>
                    <StatisticCard lable="Total Fees Generated ($)" type="currency" value={feeTotals.totalfees} loading={feeTotals.loading} />
                </Grid>
                <Grid item xs md={3}>
                    <StatisticCard lable="Total Open Loans" type="number" loading={loansOpen.loading} value={loansOpen.count} />
                </Grid>
                <Grid item xs md={3}>
                    <StatisticCard lable="Average Loan Size ($)" type="currency" loading={loansSize.loading} value={loansSize.amount} />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Total Value Locked ($)"
                        loading={defillama.loading}
                        data={defillama?.tvl.map(({ date, totalLiquidityUSD }) => ({
                            name: moment(date * 1000).format("D.MM.YY"),
                            Tvl: Number(totalLiquidityUSD.toFixed(2)),
                        }))}
                        barList={[{ dataKey: "Tvl", fill: "#8884d8" }]}
                    />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Total Fees Generated ($) - By Week"
                        loading={feeChanges.loading}
                        data={feeChanges?.changes.map(({ totalfees, week }) => ({
                            name: moment(week).format("D.MM.YY"),
                            "Total Fees": Number(totalfees.toFixed(2)),
                        }))}
                        barList={[{ dataKey: "Total Fees", fill: "#8884d8" }]}
                    />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Number of New Loans Opened - By Week"
                        loading={loansChanges.loading}
                        data={loansChanges?.changes.map(({ count, week }) => ({
                            name: moment(week).format("D.MM.YY"),
                            "Loans opened": count,
                        }))}
                        formatType="none"
                        barList={[{ dataKey: "Loans opened", fill: "#8884d8" }]}
                    />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total MIM Borrowed ($) - By Chain" loading={mimBorrowedNetwork.loading} data={groupByNetworkBorrowed(mimBorrowedNetwork.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total MIM Borrowed ($) - By Cauldron" loading={mimBorrowedCauldron.loading} data={groupByCauldronBorrowed(mimBorrowedCauldron.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total MIM Borrowed ($) - By Asset Type" loading={mimBorrowedAsset.loading} data={groupByAssetBorrowed(mimBorrowedAsset.changes)} />
                </Grid>

                <Grid item xs lg={6}>
                    <PieChart title="Total Collateral ($) - By Chain" loading={collateralNetwork.loading} data={groupByNetworkCollatered(collateralNetwork.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total Collateral ($) - By Cauldron" loading={collateralCauldron.loading} data={groupByCauldronCollatered(collateralCauldron.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total Collateral ($) - By Asset Type" loading={collateralAsset.loading} data={groupByAssetCollatered(collateralAsset.changes)} />
                </Grid>
            </Grid>
        </Box>
    );
}
