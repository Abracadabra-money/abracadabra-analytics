import { Box, Grid } from "@mui/material";
import StatisticCard from "components/Card/StatisticCard";
import useFeesTotals from "hooks/useFeesTotals";
import useFeesChanges from "hooks/useFeesChanges";
import moment from "moment";
import { defaultNetworkList } from "config/blockchain";
import { defaultAssetTypeList } from "config/types";
import { groupByNetworks, groupByAsset, groupByNetworksTotals, groupByAssetTotals, groupByCauldronTotals } from "helpers/group";
import useFeesTotalsGroup from "hooks/useFeesTotalsGroup";
import BarChart from "components/Charts/BarChart";
import PieChart from "components/Charts/PieChart";

export default function () {
    const feeTotals = useFeesTotals();
    const feeChanges = useFeesChanges();
    const feeChangesAsset = useFeesChanges("asset");
    const feeChangesNetwork = useFeesChanges("network");
    const feeTotalsNetwork = useFeesTotalsGroup("network");
    const feeTotalsAsset = useFeesTotalsGroup("asset");
    const feeTotalsCauldron = useFeesTotalsGroup("cauldron");

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard lable="Total Fees Generated ($)" type="currency" value={feeTotals.totalfees} loading={feeTotals.loading} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard lable="Borrowing Fees ($)" type="currency" value={feeTotals.borrowfees} loading={feeTotals.loading} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard lable="Interest Fees ($)" type="currency" value={feeTotals.interestfees} loading={feeTotals.loading} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard lable="Liquidation Fees ($)" type="currency" value={feeTotals.liquidationfee} loading={feeTotals.loading} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total Fees Generated ($) - By Chain" loading={feeTotalsNetwork.loading} data={groupByNetworksTotals(feeTotalsNetwork.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total Fees Generated ($) - By Asset Type" loading={feeTotalsAsset.loading} data={groupByAssetTotals(feeTotalsAsset.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart title="Total Fees Generated ($) - By Cauldron" loading={feeTotalsCauldron.loading} data={groupByCauldronTotals(feeTotalsCauldron.changes)} />
                </Grid>
                <Grid item xs lg={6}>
                    <PieChart
                        title="Total Fees Generated ($) - By Category"
                        loading={feeTotals.loading}
                        data={
                            feeTotals?.interestfees && feeTotals?.liquidationfee && feeTotals?.borrowfees
                                ? [
                                      { name: "Interest Fees", value: feeTotals?.interestfees ?? 0 },
                                      { name: "Liquidation Fees", value: feeTotals?.liquidationfee ?? 0 },
                                      { name: "Borrow Fees", value: feeTotals?.borrowfees ?? 0 },
                                  ]
                                : []
                        }
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
                        title="Total Fees Generated ($) - By Week & Category"
                        loading={feeChanges.loading}
                        data={feeChanges?.changes.map(({ interestfees, liquidationfee, borrowfees, week }) => ({
                            name: moment(week).format("D.MM.YY"),
                            "Interest Fees": Number(interestfees.toFixed(2)),
                            "Liquidation Fees": Number(liquidationfee.toFixed(2)),
                            "Borrow Fees": Number(borrowfees.toFixed(2)),
                        }))}
                        barList={[
                            { dataKey: "Interest Fees", fill: "#53b5aa" },
                            { dataKey: "Liquidation Fees", fill: "#3a4649" },
                            { dataKey: "Borrow Fees", fill: "#eb6d64" },
                        ]}
                        legend
                    />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Total Fees Generated ($) - By Week & Chain"
                        loading={feeChangesNetwork.loading}
                        data={groupByNetworks(feeChangesNetwork?.changes)}
                        barList={defaultNetworkList.map(({ name }) => ({ dataKey: name }))}
                        legend
                    />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Total Fees Generated ($) - By Week & Asset Type"
                        loading={feeChangesAsset.loading}
                        data={groupByAsset(feeChangesAsset?.changes)}
                        barList={defaultAssetTypeList.map(({ name }) => ({ dataKey: name }))}
                        legend
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
