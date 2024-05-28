import _ from "lodash";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Label,
    LabelList
} from "recharts";
import { colors } from "../../colors";

const renderCustomizedLabel = (props: any) => {
    const { content, ...rest } = props;
    // console.log(props)
    return <Label {...rest} value={`$${props.value.toFixed(2)}`} fontSize="12" fill={colors.neutral90} />;
};

export interface HorizontalBarChartProps {
    data: {
        name: string;
        [key: string]: number | string;
    }[]
}

const HorizontalBarChart = (props: HorizontalBarChartProps) => {
    const { data } = props
    const uniqueKeys = _.uniq(data.flatMap(d => Object.keys(d)).filter(f => f !== "name"))

    const useColors = [
        colors.blue,
        colors.darkBlue,
        colors.green,
        colors.blueHover,
        colors.magenta,
        colors.orange,
        colors.darkBlueHover,
        colors.purple,
        colors.red,
        colors.greenHover,
        colors.teal,
        colors.yellow,
        colors.magentaHover,
        colors.orangeHover,
        colors.purpleHover,
        colors.tealHover,
        colors.yellowHover,
    ]

    return (
        <ResponsiveContainer height={uniqueKeys.length * 70} width={"100%"}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{ left: 50, right: 50 }}
                stackOffset="expand"
                barCategoryGap={40}
            >
                <XAxis hide type="number" />
                <YAxis
                    type="category"
                    dataKey="name"
                    stroke={colors.neutral0}
                    fontSize="12"
                />
                <Tooltip />
                {uniqueKeys.map((key, index) => {
                    return (
                        <>
                            <Bar
                                dataKey={key}
                                fill={useColors[index]}
                                stackId="a"
                            >
                                <LabelList
                                    dataKey={key}
                                    position="center"
                                    content={renderCustomizedLabel}
                                />
                            </Bar>
                        </>
                    )
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default HorizontalBarChart