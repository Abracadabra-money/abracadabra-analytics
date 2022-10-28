import Box from "@mui/material/Box";
import useTotalNumberLiquidations from "hooks/useTotalNumberLiquidations";
import useTotalValueLiquidations from "hooks/useTotalValueLiquidations";
import useTotalAvgValueLiquidations from "hooks/useTotalAvgValueLiquidations";
import useTotalNumberLiqudationsChanges from "hooks/useTotalNumberLiqudationsChanges";
import useTotalValueLiquidationsChanges from "hooks/useTotalValueLiquidationsChanges";
import useTotalAvgValueLiquidationsChange from "hooks/useTotalAvgValueLiquidationsChange";
import { Grid } from "@mui/material";
import StatisticCard from "components/Card/StatisticCard";
import BarChart from "components/Charts/BarChart";
import moment from "moment";

export default function () {
    const totalLiquidations = useTotalNumberLiquidations();
    const totalNumberLiquidations = useTotalValueLiquidations();
    const totalAvgValueLiquidations = useTotalAvgValueLiquidations();
    const totalNumberLiqudationsChanges = useTotalNumberLiqudationsChanges();
    const totalValueLiquidationsChanges = useTotalValueLiquidationsChanges();
    const totalAvgValueLiquidationsChange = useTotalAvgValueLiquidationsChange();

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <StatisticCard lable="Total No. of Liquidations" type="number" value={totalLiquidations.count} loading={totalLiquidations.loading} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatisticCard lable="Total Value of Liquidations" type="currency" value={totalNumberLiquidations.amount} loading={totalNumberLiquidations.loading} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatisticCard lable="Avg Liquidations Amount" type="currency" value={totalAvgValueLiquidations.amount} loading={totalAvgValueLiquidations.loading} />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Total No. of Liquidations - By Week"
                        loading={totalNumberLiqudationsChanges.loading}
                        data={totalNumberLiqudationsChanges?.changes.map(({ count, week }) => ({
                            name: moment(week).format("MM.D.YY"),
                            "Liquidations count": count,
                        }))}
                        barList={[{ dataKey: "Liquidations count", fill: "#8884d8" }]}
                        formatType="none"
                    />
                </Grid>
                <Grid item xs lg={6}>
                    <BarChart
                        title="Total Value of Liquidations ($) - By Week & Category"
                        loading={totalValueLiquidationsChanges.loading}
                        data={totalValueLiquidationsChanges?.changes.map(({ amount, week }) => ({
                            name: moment(week).format("MM.D.YY"),
                            "Liquidations value": Number(Number(amount).toFixed(2)),
                        }))}
                        barList={[{ dataKey: "Liquidations value", fill: "#8884d8" }]}
                    />
                </Grid>
                <Grid item xs lg={12}>
                    <BarChart
                        title="Avg Liquidations Amount ($) - By Week"
                        loading={totalAvgValueLiquidationsChange.loading}
                        data={totalAvgValueLiquidationsChange?.changes.map(({ amount, week }) => ({
                            name: moment(week).format("MM.D.YY"),
                            "Liquidations avg value": Number(Number(amount).toFixed(2)),
                        }))}
                        barList={[{ dataKey: "Liquidations avg value", fill: "#8884d8" }]}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
