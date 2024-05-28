import { useEffect, useState } from "react"
import useGroupImportData from "../../hooks/useGroupImportData"
import StyledRawList from "./raw-list.style"
import _ from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { ImportRecord } from "../../models/import-record.model"

export interface RawListProps {
    records?: ImportRecord[]
}

const RawList = (props?: RawListProps) => {
    const { records: recordsProps } = props || {}
    const { records: importRecords } = useGroupImportData()
    const records = recordsProps || importRecords
    const [expanded, setExpanded] = useState(false);
    const [sort, setSort] = useState<undefined | string>();
    const [sortedRecords, setSortedRecords] = useState(records)
    const [sortDescending, setSortDescending] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState<undefined | string>()
    const [descriptionFilter, setDescriptionFilter] = useState<undefined | string>()

    useEffect(() => {
        const isDebit = sort === "Debit";
        let sorted: ImportRecord[] = [];

        if (isDebit) {
            sorted = _.sortBy(records, (o) => parseFloat(o.debit || "")) as ImportRecord[];
        } else {
            sorted = _.sortBy(records, [sort?.toLowerCase()]) as ImportRecord[];
        }

        if (sortDescending) {
            sorted.reverse();
        }
        sorted = sorted.filter(s => s.category?.toLowerCase().includes(categoryFilter?.toLowerCase() || ""))
        sorted = sorted.filter(s => s.description?.toLowerCase().includes(descriptionFilter?.toLowerCase() || ""))
        setSortedRecords(sorted)
    }, [JSON.stringify(records), sort, sortDescending, categoryFilter, descriptionFilter])

    return (
        <StyledRawList
            className="raw-list"
        >
            {expanded && (
                <div
                    className="expanded"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpanded(false)
                    }}
                >
                    <div className="expanded-title">Raw List</div>
                    <div
                        className="header-row"
                    >
                        {["Date", "Description", "Debit", "Category"].map(header => {
                            const value = header === "Category" ? categoryFilter : header === "Description" ? descriptionFilter : "";
                            const onChange = header === "Category" ? setCategoryFilter : header === "Description" ? setDescriptionFilter : () => null;
                            return (
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (sort === header) {
                                            setSortDescending(!sortDescending);
                                        }
                                        setSort(header)
                                    }}
                                    className="cell"
                                >
                                    <div className="cell-text">
                                        {header}
                                    </div>
                                    {sort === header && (
                                        <FontAwesomeIcon icon={sortDescending ? faArrowDown : faArrowUp} />
                                    )}
                                    {(header === "Category" || header === "Description") && (
                                        <div className="search">
                                            <input
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                }}
                                                value={value}
                                                onChange={(e) => onChange(e.target?.value || "")}
                                            />
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {sortedRecords.map(record => {
                        return (
                            <div
                                className="row"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <div className="cell">
                                    {record.date}
                                </div>
                                <div className="cell">
                                    {record.description}
                                </div>
                                <div className="cell">
                                    ${record.debit}
                                </div>
                                <div className="cell">
                                    {record.category}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {!expanded && (
                <div
                    className="collapsed"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setExpanded(true)
                    }}
                >
                    Raw List
                </div>
            )}
        </StyledRawList>
    )
}

export default RawList