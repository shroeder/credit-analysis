import useGroupImportData from "../../hooks/useGroupImportData";
import { useGlobalState } from "../context"
import StyledFilterDisclaimer from "./filter-disclaimer.style"

const FilterDisclaimer = () => {
    const { state } = useGlobalState();
    const { totalAmount, unfilteredTotalAmount } = useGroupImportData()

    if (!state.ignoredCategories.length) {
        return <></>
    }

    return (
        <StyledFilterDisclaimer>
            <div className="disclaimer-title">{state.ignoredCategories.length} Categories Hidden</div>
            <div className="disclaimer-title">Seeing ${parseFloat(totalAmount.toString()).toFixed(2)} of ${parseFloat(unfilteredTotalAmount.toString()).toFixed(2)} spent</div>
            <div className="disclaimer-title">Seeing {((totalAmount / unfilteredTotalAmount) * 100).toFixed(2)}% of spending</div>
        </StyledFilterDisclaimer>
    )
}

export default FilterDisclaimer