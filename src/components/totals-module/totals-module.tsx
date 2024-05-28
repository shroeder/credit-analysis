import { useState } from "react";
import useGroupImportData from "../../hooks/useGroupImportData"
import { PieChart } from "../pie-chart/pie-chart"
import StyledTotalsModule from "./totals-module.style"

const TotalsModule = () => {
    const [expanded, setExpanded] = useState(false);
    const { totalAmount, daysBetween, average, groupedByCategory, transactions, monthlyAverage, transactionAverage } = useGroupImportData()

    const categoryPie1 = Object.keys(groupedByCategory).map(key => {
        const value = groupedByCategory[key];
        return {
            name: `${key}`,
            value: parseFloat(value.total)
        }
    })

    return (
        <StyledTotalsModule>
            <div className="totals-top">
                <div className="total-module">
                    Total Amount: ${totalAmount.toFixed(2)}
                </div>
                <div className="total-module">
                    Total days: {daysBetween}
                </div>
                <div className="total-module">
                    Transactions: {transactions}
                </div>
                <div className="total-module">
                    Average: ${average.toFixed(2)} / Day
                </div>
                <div className="total-module">
                    Average: ${monthlyAverage.toFixed(2)} / Month
                </div>
                <div className="total-module">
                    Average: ${transactionAverage.toFixed(2)} / Transaction
                </div>
            </div>
            {expanded && (
                <div
                    className="totals-bottom expanded"
                    onClick={() => setExpanded(false)}
                >
                    <div className="expanded-title">Charts</div>
                    <PieChart
                        data={categoryPie1}
                    />
                </div>
            )}
            {!expanded && (
                <div
                    className="collapsed"
                    onClick={() => setExpanded(true)}
                >
                    Charts
                </div>
            )}
        </StyledTotalsModule>
    )
}

export default TotalsModule