import { useGlobalState } from "../components/context";
import _ from 'lodash';
import { ImportRecord } from "../models/import-record.model";
import moment from "moment";

const useGroupImportData = () => {
    const { state } = useGlobalState();
    const { records: unFilteredRecords } = state || {}
    const records = unFilteredRecords.filter(record => !state.ignoredCategories.includes(record.category || ""))

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

    const totalAmount = _.sum(records.map(r => parseFloat(r.debit || "") || 0));
    const unfilteredTotalAmount = _.sum(unFilteredRecords.map(r => parseFloat(r.debit || "") || 0));
    const transactions = records?.length || 0;
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

    const uniqueMonths = _.uniq(Object.keys(groupedByDay).map(key => {
        return `${moment(key).month() + 1}-${moment(key).year()}`;
    }));

    uniqueMonths.map(uniqueMonth => {
        const month = parseInt(uniqueMonth.split("-")[0]);
        const year = parseInt(uniqueMonth.split("-")[1]);
        const matches = records.filter(r => {
            const date = moment(r.date);
            return date.month() + 1 === month && date.year() === year;
        })
        const daysInMonth = moment(`${month}/01/${year}`).daysInMonth();
        const total = _.sum(matches.map(m => parseInt(m.debit || "") || 0))
        const average = total / daysInMonth;
        const transactions = matches.length;
        const monthsRecords: {
            [index: string]: ImportRecord[]
        } = {};
        matches.map(match => {
            const date = moment(match.date);
            const key = `${date.month() + 1}-${date.year()}`;
            if (!monthsRecords[key]) {
                monthsRecords[key] = [];
            }
            monthsRecords[key].push(match);
        })

        groupedByMonth[uniqueMonth] = {
            average: average.toString(),
            records: monthsRecords,
            total: total.toString(),
            transactions: transactions.toString(),
            transactionAverage: (total / transactions).toString()
        }
    });

    const average = totalAmount / daysBetween;

    const groupedByCategory: {
        [index: string]: {
            records: ImportRecord[],
            total: string;
            average: string;
            transactions: string;
            percent: string;
        }
    } = {

    }

    const uniqueCategories = _.uniq(records.map(r => r.category as string));

    uniqueCategories.map(category => {
        const matchingRecords = records.filter(r => r.category === category);
        const categoryTotal = _.sum(matchingRecords.map(r => parseFloat(r.debit || "0") || 0));
        const percent = totalAmount / categoryTotal;
        const transactions = matchingRecords.length;
        const categoryAverage = categoryTotal / transactions;
        groupedByCategory[category] = {
            records: matchingRecords,
            total: categoryTotal.toFixed(2),
            average: categoryAverage.toFixed(2),
            transactions: transactions.toString(),
            percent: percent.toFixed(2)
        }
    })

    const monthlyAverage = totalAmount / Object.keys(groupedByMonth).length;

    const transactionAverage = totalAmount / transactions;

    const categories = _.uniq(records.map(r => r.category));
    const unfilteredCategories = _.uniq(unFilteredRecords.map(r => r.category));

    return {
        groupedByDay,
        groupedByMonth,
        groupedByCategory,
        totalAmount,
        firstDate,
        lastDate,
        daysBetween,
        average,
        records,
        transactions,
        monthlyAverage,
        transactionAverage,
        categories,
        unFilteredRecords,
        unfilteredCategories,
        unfilteredTotalAmount
    }
}

export default useGroupImportData