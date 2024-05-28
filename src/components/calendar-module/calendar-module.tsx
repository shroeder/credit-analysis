import _ from "lodash";
import useGroupImportData from "../../hooks/useGroupImportData"
import StyledCalendarModule from "./calendar-module.style"
import moment from "moment";
import { useState } from "react";

const CalendarModule = () => {
    const { groupedByMonth } = useGroupImportData();
    const [expanded, setExpanded] = useState(false)

    return (
        <StyledCalendarModule>
            {expanded && (
                <div
                    className="expanded"
                    onClick={() => setExpanded(false)}
                >
                    <div className="months-container">
                        {Object.keys(groupedByMonth).map(monthYear => {
                            const month = monthYear.split("-")[0]
                            const year = monthYear.split("-")[1]
                            const daysInMonth = moment(`${month}/1/${year}`).daysInMonth();
                            const firstDate = moment(`${month}/01/${year}`).toDate();
                            const groupedByDay = groupedByMonth[monthYear].records;
                            return (
                                <div className="month-container">
                                    <div className="month-label">{monthYear}</div>
                                    <div className="days-container">
                                        {Array.from(Array(daysInMonth || 0).keys()).map(add => {
                                            const targetDate = new Date(firstDate.getTime() + (add * (1000 * 60 * 60 * 24)));
                                            const matching = groupedByDay[moment(targetDate).format("MM/DD/YYYY")]
                                            const total = _.sum(matching?.map(m => parseFloat(m.debit || "0") || 0)).toFixed(2);
                                            return (
                                                <div className="day">
                                                    <div>
                                                        {moment(targetDate).format("ddd MM/DD/YYYY")}
                                                    </div>
                                                    {matching && (
                                                        <div className="day-info">
                                                            <div className="total">
                                                                ${total || 0}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
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
        </StyledCalendarModule>
    )
}

export default CalendarModule