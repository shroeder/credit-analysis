import { useState } from "react";
import StyledMonthlyModule from "./monthly-module.style"
import useGroupImportData from "../../hooks/useGroupImportData";
import moment from "moment";
import RawList from "../raw-list/raw-list";
import { PieChart } from "../pie-chart/pie-chart";
import { ImportRecord } from "../../models/import-record.model";
import _ from "lodash";
import InsightsModule from "../insights-module/insights-module";

const MonthlyModule = () => {
    const [expanded, setExpanded] = useState(false);
    const { groupedByMonth, records } = useGroupImportData();
    const [expandedCharts, setExpandedCharts] = useState<number[]>([])

    const uniqueCategories = _.uniq(records.map(r => r.category));
    const categorySpendingByMonth: {
        [index: string]: {
            amounts: number[],
            average: number,
            sum: number,
            amount: number
        }
    } = {}
    uniqueCategories.map(category => {
        Object.keys(groupedByMonth).map(monthYear => {
            const value = groupedByMonth[monthYear]
            const monthRecords = Object.values(value.records).flatMap(r => r);
            const monthRecordsForThisCategory = monthRecords.filter(r => r.category === category)
            const sumOfMonthCategoryRecords = _.sum(monthRecordsForThisCategory.map(r => parseFloat(r.debit || "") || 0));
            if (!categorySpendingByMonth[category || ""]) {
                categorySpendingByMonth[category || ""] = {
                    amounts: [],
                    average: 0,
                    sum: 0,
                    amount: 0
                }
            }
            categorySpendingByMonth[category || ""].amounts.push(sumOfMonthCategoryRecords);
        })
    })

    Object.keys(categorySpendingByMonth).map(category => {
        const value = categorySpendingByMonth[category];
        const sum = _.sum(categorySpendingByMonth[category].amounts);
        const amount = categorySpendingByMonth[category].amounts.length;
        const average = sum / amount;
        categorySpendingByMonth[category] = {
            ...value,
            sum: parseFloat(sum.toFixed(2)),
            amount: parseFloat(amount.toFixed(2)),
            average: parseFloat(average.toFixed(2))
        }
    })

    const monthlyAverageData = Object.keys(categorySpendingByMonth).map(category => {
        const value = categorySpendingByMonth[category];
        return {
            name: category,
            value: value.average
        }
    })

    return (
        <StyledMonthlyModule>
            {expanded && (
                <div
                    className="expanded"
                    onClick={() => setExpanded(false)}
                >
                    <div className="expanded-title">Monthly</div>
                    {Object.keys(groupedByMonth).map((key, index) => {
                        const value = groupedByMonth[key]
                        const monthDate = moment(`${key.split("-")[0]}/01/${key.split("-")[1]}`).format("MM/DD/YYYY")
                        const monthRecords = Object.values(value.records).flatMap(r => r);
                        const groupedByCategory: { [index: string]: ImportRecord[] } = {}
                        const unqiueCategories = _.uniq(records.map(r => r.category))
                        unqiueCategories.map(category => {
                            const matchingRecords = monthRecords.filter(r => r.category === category);
                            groupedByCategory[category || ""] = matchingRecords
                        })
                        const monthlyData = Object.keys(groupedByCategory).map(key => {
                            const value = groupedByCategory[key];
                            const total = _.sum(value.map(r => parseFloat(r.debit || "")));
                            return {
                                name: key,
                                value: parseFloat(total.toFixed(2))
                            }
                        })
                        const chartExpanded = expandedCharts.includes(index)
                        return (
                            <div
                                className="month"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <div className="month-header">
                                    <div className="month-title">{moment(monthDate).format("MMMM YYYY")}</div>
                                    <div className="monthly-totals">
                                        <div className="monthly-total">Total: ${parseFloat(value.total || "").toFixed(2)}</div>
                                        <div className="monthly-total">Transactions: {value.transactions}</div>
                                        <div className="monthly-total">Average: ${parseFloat(value.average || "").toFixed(2)} / Day</div>
                                        <div className="monthly-total">Average: ${parseFloat(value.transactionAverage || "").toFixed(2)} / Transaction</div>
                                    </div>
                                </div>
                                <div className="monthly-details">
                                    <RawList
                                        records={monthRecords}
                                    />
                                    <>
                                        {chartExpanded && (
                                            <div
                                                className="monthly-charts expanded"
                                                onClick={() => setExpandedCharts(prev => {
                                                    return prev.filter(p => p !== index)
                                                })}
                                            >
                                                <div className="expanded-title">Charts</div>
                                                <div className="charts-contianer">
                                                    <div className="chart-container">
                                                        <div className="chart-label">By Category</div>
                                                        <PieChart
                                                            data={monthlyData}
                                                        />
                                                    </div>
                                                    <div className="chart-container">
                                                        <div className="chart-label">On Average</div>
                                                        <PieChart
                                                            data={monthlyAverageData}
                                                        />
                                                    </div>
                                                    <div className="chart-container">
                                                        <div className="chart-label">Above/Below Average</div>
                                                        <PieChart
                                                            data={monthlyAverageData}
                                                            data2={monthlyData}
                                                            label={(o) => {
                                                                const monthData = monthlyData[o.index];
                                                                const averageData = monthlyAverageData[o.index];
                                                                const difference = monthData.value - averageData.value;
                                                                let percent: any = Math.abs(difference) / averageData.value;
                                                                if (parseFloat(percent.toFixed(2)).toString() === "Infinity") {
                                                                    percent = "0"
                                                                } else {
                                                                    percent = `${difference < 0 ? "-" : ""}${parseFloat((percent * 100).toFixed(2))}`
                                                                }
                                                                return `${o.name} $${parseFloat(difference.toFixed(2))} ${percent}%`;
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {!chartExpanded && (
                                            <div
                                                className="collapsed"
                                                onClick={() => setExpandedCharts(prev => {
                                                    return [...prev, index]
                                                })}
                                            >
                                                Charts
                                            </div>
                                        )}
                                    </>
                                    <InsightsModule
                                        records={monthRecords}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {!expanded && (
                <div
                    className="collapsed"
                    onClick={() => setExpanded(true)}
                >
                    Monthly
                </div>
            )}
        </StyledMonthlyModule>
    )
}

export default MonthlyModule