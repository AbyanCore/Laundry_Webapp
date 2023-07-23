import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { getRandomColor } from "../Random.Utils";

const CStackBar = (props: any) => {
    const data = props.data;
    const Xdatakey = props.Xdatakey;
    const datakeys: Array<string> = props.datakeys;
    const { width, height } = props.size;
    const stackoffset = props.stackoffset;
    const tickFormatter = props.tickFormatter;

    return (
        <BarChart
            width={width || ""}
            height={height || ""}
            data={data}
            stackOffset={stackoffset || "sign"}
            margin={{
                top: 20,
                right: 30,
                left: 60,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Xdatakey} />
            <YAxis tickFormatter={tickFormatter} />
            <Tooltip />
            <Legend align="left" layout="horizontal" />
            {datakeys.map((key: any) => (
                <Bar dataKey={key} stackId="a" fill={getRandomColor()} />
            ))}
        </BarChart>
    );
};

export default CStackBar;
