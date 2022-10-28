import ChartWrap from "./ChartWrap";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";
import { SetStateAction, useState } from "react";
import stc from "string-to-color";
import { format } from "helpers/format";

interface PieChartProps {
    loading: boolean;
    title: string;
    data: { name: string; value: number }[];
}

export default function ({ loading, title, data }: PieChartProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const changeIndexHandler = (_: any, index: SetStateAction<number>) => setActiveIndex(index);

    const renderActiveShape = (props: {
        cx: any;
        cy: any;
        midAngle: any;
        innerRadius: any;
        outerRadius: any;
        startAngle: any;
        endAngle: any;
        fill: any;
        payload: any;
        percent: any;
        value: any;
        name: string;
    }) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {name}
                </text>
                <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
                <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">
                    {`$${format("number", value)}`}
                </text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    return (
        <ChartWrap title={title} loading={loading} empty={!data.length}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        onMouseEnter={changeIndexHandler}
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={100}
                        outerRadius={150}
                        isAnimationActive={false}
                    >
                        {data.map(({ name }, index) => (
                            <Cell key={`cell-${index}`} fill={stc(name)} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </ChartWrap>
    );
}
