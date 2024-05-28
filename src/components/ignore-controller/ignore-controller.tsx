import _ from "lodash";
import useGroupImportData from "../../hooks/useGroupImportData";
import { useGlobalState } from "../context"
import StyledIgnoreController from "./ignore-controller.style"

const IgnoreController = () => {
    const { state, setState } = useGlobalState();
    const { unfilteredCategories, unFilteredRecords, unfilteredTotalAmount } = useGroupImportData();
    const categories = _.orderBy(unfilteredCategories, (category) => {
        const matches = unFilteredRecords.filter(r => r.category === category)
        const sum = _.sum(matches.map(m => parseFloat(m.debit || "") || 0));
        return sum;
    }).reverse();

    return (
        <StyledIgnoreController>
            <div className="ignore-label">Active Categories</div>
            <div className="ignore-categories">
                {categories?.map(category => {
                    const amount = _.sum(unFilteredRecords.filter(r => r.category === category).map(r => parseFloat(r.debit || "") || 0))
                    const percent = `${((amount / unfilteredTotalAmount) * 100).toFixed(2)}%`;
                    const ignored = state.ignoredCategories.includes(category || "");
                    return (
                        <div
                            className={`ignore-category ${ignored ? "ignored" : ""}`}
                            onClick={() => {
                                if (ignored) {
                                    setState(prev => {
                                        return {
                                            ...prev,
                                            ignoredCategories: prev.ignoredCategories.filter(c => c !== category)
                                        }
                                    })
                                } else {
                                    setState(prev => {
                                        return {
                                            ...prev,
                                            ignoredCategories: [...prev.ignoredCategories, category || ""]
                                        }
                                    })
                                }
                            }}
                        >
                            <div>
                                <div className="category-amount">${amount.toFixed(2)}</div>
                                <div className="category-percent">{percent}</div>
                            </div>
                            <div>{category}</div>
                        </div>
                    )
                })}
            </div>
        </StyledIgnoreController>
    )
}

export default IgnoreController