import styled from 'styled-components'
import { colors } from '../../colors'

const StyledTotalsModule = styled.div`
    padding: 12px;
    padding-bottom: 0;

    .totals-top {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        color: ${colors.neutral100};
    }

    .total-module {
        background-color: ${colors.blue};
        border-radius: 4px;
        cursor: pointer;
        margin-right: 8px;
        padding: 12px;

        &:hover {
            background-color: ${colors.blueHover};
        }
    }

    .totals-bottom {
        height: 400px;
    }
`

export default StyledTotalsModule