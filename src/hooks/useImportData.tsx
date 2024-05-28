import moment from "moment";
import { useGlobalState } from "../components/context";
import { ImportRecord } from "../models/import-record.model";
import { reclassifications } from "../reclassifications";

const useImportData = () => {
    const { setState } = useGlobalState();

    const importData = (data: string[][]) => {
        let dateIndex = -1;
        let descriptionIndex = -1;
        let categoryIndex = -1;
        let debitIndex = -1;
        let typeIndex = -1;
        data?.[0].map((header, headerIdx) => {
            if (header === "Transaction Date") {
                dateIndex = headerIdx;
            } else if (header === "Description") {
                descriptionIndex = headerIdx;
            } else if (header === "Category") {
                categoryIndex = headerIdx;
            } else if (header === "Debit" || header === "Amount") {
                debitIndex = headerIdx;
            } else if (header === "Type") {
                typeIndex = headerIdx;
            }
        })

        const importRecords: ImportRecord[] = data.slice(1)?.
            filter(l => l?.[typeIndex] !== "Credit")?.
            filter(l => l?.[categoryIndex] !== "Payment/Credit").
            filter(l => l?.[typeIndex] !== "Payment").
            map(line => {
                return {
                    category: line[categoryIndex],
                    date: moment(line[dateIndex]).format("MM/DD/YYYY"),
                    debit: Math.abs(parseFloat(line[debitIndex])).toFixed(2).toString(),
                    description: line[descriptionIndex]
                } as ImportRecord;
            })


        const reclassifiedRecords = importRecords.filter(r => parseInt(r.debit || "") > 0).map(record => {
            const reclassify = reclassifications.find(c => c.exactMatch ? record.description === c.search : record.description?.toLowerCase()?.includes(c.search.toLowerCase()));
            if (reclassify) {
                return {
                    ...record,
                    category: reclassify.classification,
                    description: reclassify.rename || record.description
                }
            } else {
                return record
            }
        })

        setState((prev) => {
            return {
                ...prev,
                records: [
                    ...prev.records,
                    ...reclassifiedRecords
                ]
            }
        })

        return reclassifiedRecords;
    }

    return {
        importData
    }
}

export default useImportData