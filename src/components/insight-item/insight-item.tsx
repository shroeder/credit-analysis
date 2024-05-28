import { useState } from "react";

export interface InsightItemProps {
    label: string;
    array: any[];
    name: (item: any) => string;
    value: (item: any) => string;
}

const InsightItem = (props: InsightItemProps) => {
    const { label, array, name, value } = props
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="insight">
            <div className="insight-label">{label}:</div>
            <div className="insight-values">
                {array.slice(0, expanded ? array.length : Math.min(10, array.length)).map(item => {
                    return (
                        <div className="insight-value">
                            <div>{name(item)}:</div>
                            <div>{value(item)}</div>
                        </div>
                    )
                })}
                <div
                    onClick={() => setExpanded(!expanded)}
                    className="show-more"
                >
                    Show {expanded ? "Less" : "More"}
                </div>
            </div>
        </div>
    )
}

export default InsightItem