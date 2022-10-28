import ChartWrap from "./ChartWrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "helpers/format";
import stc from "string-to-color";

interface BarChartProps {
    loading: boolean;
    data: any[];
    title: string;
    legend?: boolean;
    barList: { dataKey: string; fill?: string }[];
    formatType?: "number" | "currency" | "none";
}

export default function ({ loading, data, title, legend = false, barList, formatType = "currency" }: BarChartProps) {
    const formater = formatType !== "none" ? (value: any) => `${formatType === "currency" ? "$" : ""}${format("number", value)}` : undefined;

    return (
        <ChartWrap title={title} loading={loading} empty={!data.length}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formater} />
                    <Tooltip formatter={formater} />
                    {barList.map(({ dataKey, fill }, index) => (
                        <Bar key={index} stackId="a" dataKey={dataKey} fill={fill ?? stc(dataKey)} />
                    ))}
                    {legend && <Legend />}
                </BarChart>
            </ResponsiveContainer>
        </ChartWrap>
    );
}
