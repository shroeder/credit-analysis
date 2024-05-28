import { ResponsiveContainer, Pie, Cell, Tooltip, PieChart as PieChartReal } from "recharts";
import { colors } from "../../colors";

export interface PieChartProps {
    data: { name: string; value: number; }[];
    data2?: { name: string; value: number; }[];
    height?: number;
    width?: number;
    label?: (o: any) => string;
}

export const PieChart = (props: PieChartProps) => {
    const {
        data,
        data2,
        height,
        width,
        label
    } = props;

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
        <ResponsiveContainer width="100%" height="100%">
            <PieChartReal width={width || 400} height={height || 400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={!data2 ? (o) => {
                        if (o.value === 0) {
                            return ""
                        }
                        const percent = `${(parseFloat(o.percent || "") * 100).toFixed(2)}%`;
                        return `${o.name} $${o.value} (${percent})`
                    } : false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={useColors[index]} />
                    ))}
                </Pie>
                {data2 && (
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data2}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={90}
                        label={(o) => {
                            if (o.value === 0) {
                                return ""
                            }
                            if (label) {
                                return label(o);
                            } else {
                                const percent = `${(parseFloat(o.percent || "") * 100).toFixed(2)}%`;
                                return `${o.name} $${o.value} (${percent})`
                            }
                        }}
                    >
                        {data2.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={useColors[index]} />
                        ))}
                    </Pie>
                )}
                <Tooltip />
            </PieChartReal>
        </ResponsiveContainer>
    )
}