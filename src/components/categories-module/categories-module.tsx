import { useState } from "react"
import StyledCategoriesModule from "./categories-module.style"
import useGroupImportData from "../../hooks/useGroupImportData";
import _ from "lodash";
import moment from "moment";
import HorizontalBarChart from "../horizontal-bar-chart/horizontal-bar-chart";

const CategoriesModule = () => {
    const [expanded, setExpanded] = useState(false);
    const { records, groupedByMonth } = useGroupImportData();

    const uniqueCategories = _.uniq(records.map(r => r.category));
    const categorySpendingByMonth: {
        [index: string]: {
            amounts: {
                amount: number;
                monthYear: string;
            }[],
            average: number,
            sum: number,
            amount: number,
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
                    amount: 0,
                }
            }
            categorySpendingByMonth[category || ""].amounts.push({
                amount: sumOfMonthCategoryRecords,
                monthYear
            });
        })
    })

    const barData = Object.keys(categorySpendingByMonth).map(category => {
        const barItem: {
            name: string;
            [index: string]: string | number;
        } = {
            name: category
        };
        const categoryObject = categorySpendingByMonth[category];
        let calendarData: {
            [index: string]: number;
        } = {};
        categoryObject.amounts.map(amountData => {
            const month = moment(`${amountData.monthYear.split("-")[0]}/01/${amountData.monthYear.split("-")[1]}`).format("MMMM")
            barItem[month] = amountData.amount
        });
        return barItem;
    })

    return (
        <StyledCategoriesModule
            className="categories"
        >
            {expanded && (
                <div
                    className="expanded"
                    onClick={() => setExpanded(false)}
                >
                    <div className="expanded-title">Categories</div>
                    <div className="categories-content">
                        <HorizontalBarChart
                            data={barData}
                        />
                    </div>
                </div>
            )}
            {!expanded && (
                <div
                    className="collapsed"
                    onClick={() => setExpanded(true)}
                >
                    Categories
                </div>
            )}
        </StyledCategoriesModule>
    )
}

export default CategoriesModule