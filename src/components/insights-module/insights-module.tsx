import { useState } from "react"
import StyledInsightsModule from "./insights-module.style"
import { ImportRecord } from "../../models/import-record.model";
import useGroupImportData from "../../hooks/useGroupImportData";
import _ from "lodash";
import InsightItem from "../insight-item/insight-item";
import moment from "moment";

export interface InsightsModuleProps {
    records?: ImportRecord[];
}

const InsightsModule = (props: InsightsModuleProps) => {
    const { records: recordsProps } = props || {}
    const { records: importRecords } = useGroupImportData()
    const records = recordsProps || importRecords;
    const [expanded, setExpanded] = useState(false);

    const uniqueDates = _.uniq(records?.map(r => r.date)) as string[];
    const groupedByDay: {
        [index: string]: ImportRecord[];
    } = {};
    const groupedByMonth: {
        [key: string]: {
            records: {
                [index: string]: ImportRecord[];
            }
            total: string;
            average: string;
            transactions: string;
            transactionAverage: string;
        }
    } = {
    };
    uniqueDates?.map(uniqueDate => {
        const matchingRecords = records?.filter(r => r.date === uniqueDate)
        groupedByDay[uniqueDate] = matchingRecords;
    });
    const sortedDates = Object.keys(groupedByDay).sort(function compare(a, b) {
        const dateA: any = new Date(a);
        const dateB: any = new Date(b);
        return dateA - dateB;
    });
    const firstDay = sortedDates[0];
    const lastDay = sortedDates[sortedDates.length - 1]
    const firstDate = new Date(firstDay);
    const lastDate = new Date(lastDay);
    const daysBetween = Math.floor(Math.abs((lastDate.getTime() - firstDate.getTime()) / 1000 / 60 / 60 / 24));
    const uniqueTransactions = _.uniq(records.map(r => r.description));
    const groupedByTransaction = uniqueTransactions.map(transaction => {
        const matching = records.filter(r => r.description === transaction);
        const sum = _.sum(matching.map(r => parseFloat(r.debit || "")))
        return {
            transaction,
            sum,
            average: sum / matching.length,
            amount: matching.length,
            averageAmount: matching.length / daysBetween
        }
    })
    const transactionsBySum = _.orderBy(groupedByTransaction, ["sum"]).reverse();
    const transactionsByAverage = _.orderBy(groupedByTransaction, ["average"]).reverse();
    const transactionsByAverageOver2Amount = transactionsByAverage.filter(t => t.amount > 2);
    const transactionsByAmount = _.orderBy(groupedByTransaction, ["amount"]).reverse();
    const transactionsByAverageAmountDaily = _.orderBy(groupedByTransaction, ["averageAmount"]).reverse();

    const uniqueCategories = _.uniq(records.map(r => r.category));
    const groupedByCategory = uniqueCategories.map(category => {
        const matching = records.filter(r => r.category === category)
        const sum = _.sum(matching.map(r => parseFloat(r.debit || "")));
        return {
            category,
            sum,
            average: sum / matching.length,
            amount: matching.length,
            averageAmount: matching.length / daysBetween
        }
    })
    const categoriesbySum = _.orderBy(groupedByCategory, ["sum"]).reverse();
    const categoriesByAverage = _.orderBy(groupedByCategory, ["average"]).reverse();
    const categoriesByAverageOver2Amount = categoriesByAverage.filter(t => t.amount > 2);
    const categoriesByAmount = _.orderBy(groupedByCategory, ["amount"]).reverse();
    const categoriesByAverageAmountDaily = _.orderBy(groupedByCategory, ["averageAmount"]).reverse();

    const uniqueDays = _.uniq(records.map(r => moment(r.date).format("dddd")));
    const groupedByDayOfWeek = uniqueDays.map(day => {
        const matching = records.filter(r => moment(r.date).format("dddd") === day)
        const sum = _.sum(matching.map(r => parseFloat(r.debit || "")));
        return {
            day,
            sum,
            average: sum / matching.length,
            amount: matching.length,
            averageAmount: matching.length / daysBetween
        }
    })
    const daysbySum = _.orderBy(groupedByDayOfWeek, ["sum"]).reverse();
    const daysByAverage = _.orderBy(groupedByDayOfWeek, ["average"]).reverse();
    const daysByAmount = _.orderBy(groupedByDayOfWeek, ["amount"]).reverse();
    const daysByAverageAmountDaily = _.orderBy(groupedByDayOfWeek, ["averageAmount"]).reverse();

    return (
        <StyledInsightsModule
            className="insights-module"
        >
            {expanded && (
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpanded(false)
                    }}
                    className="expanded"
                >
                    <div className="expanded-title">Insights</div>
                    <div
                        className="insights"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <div className="insights-row">
                            <InsightItem
                                label="Top Transactions By Occurrence"
                                array={transactionsByAmount}
                                name={(t) => t.transaction}
                                value={(t) => t.amount}
                            />
                            <InsightItem
                                label="Top Transactions By Sum"
                                array={transactionsBySum}
                                name={(t) => t.transaction}
                                value={(t) => `$${t.sum.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Transactions By Average"
                                array={transactionsByAverage}
                                name={(t) => t.transaction}
                                value={(t) => `$${t.average.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Transactions By Average (3+ occurrences)"
                                array={transactionsByAverageOver2Amount}
                                name={(t) => t.transaction}
                                value={(t) => `$${t.average.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Transactions By Daily Occurrence"
                                array={transactionsByAverageAmountDaily}
                                name={(t) => t.transaction}
                                value={(t) => `${t.averageAmount.toFixed(2)}`}
                            />
                        </div>
                        <div className="insights-row">
                            <InsightItem
                                label="Top Categories By Occurrence"
                                array={categoriesByAmount}
                                name={(t) => t.category}
                                value={(t) => t.amount}
                            />
                            <InsightItem
                                label="Top Categories By Sum"
                                array={categoriesbySum}
                                name={(t) => t.category}
                                value={(t) => `$${t.sum.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Categories By Average"
                                array={categoriesByAverage}
                                name={(t) => t.category}
                                value={(t) => `$${t.average.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Categories By Average (3+ occurrences)"
                                array={categoriesByAverageOver2Amount}
                                name={(t) => t.category}
                                value={(t) => `$${t.average.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Categories By Daily Occurrence"
                                array={categoriesByAverageAmountDaily}
                                name={(t) => t.category}
                                value={(t) => `${t.averageAmount.toFixed(2)}`}
                            />
                        </div>
                        <div className="insights-row">
                            <InsightItem
                                label="Top Days By Transactions"
                                array={daysByAmount}
                                name={(t) => t.day}
                                value={(t) => t.amount}
                            />
                            <InsightItem
                                label="Top Days By Sum"
                                array={daysbySum}
                                name={(t) => t.day}
                                value={(t) => `$${t.sum.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Days By Average"
                                array={daysByAverage}
                                name={(t) => t.day}
                                value={(t) => `$${t.average.toFixed(2)} (${t.amount})`}
                            />
                            <InsightItem
                                label="Top Days By Daily Occurrence"
                                array={daysByAverageAmountDaily}
                                name={(t) => t.day}
                                value={(t) => `${t.averageAmount.toFixed(2)}`}
                            />
                        </div>
                    </div>
                </div>
            )}
            {!expanded && (
                <div
                    className="collapsed"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpanded(true)
                    }}
                >
                    Insights
                </div>
            )}
        </StyledInsightsModule>
    )
}

export default InsightsModule

// show comparison in charts
// show category by month spending [0: 0, 1: 200,  3: 0 etc]
// show lowest month and highest month
// make a timeline control
// import checking