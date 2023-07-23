import { PieChart, Pie, Cell, Legend } from "recharts";
import { getRandomColor } from "../Random.Utils";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const CPieChart = (props: any) => {
    const data = props.data;
    const datakey = props.datakey;
    const { width, height } = props.size;

    return (
        <PieChart width={width || ""} height={height || ""}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey={datakey}
            >
                {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={getRandomColor()} />
                ))}
            </Pie>
            <Legend layout="vertical" />
        </PieChart>
    );
};

export default CPieChart;
