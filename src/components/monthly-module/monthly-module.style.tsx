import styled from 'styled-components'
import { colors } from '../../colors'

const StyledMonthlyModule = styled.div`
    padding: 0 12px;

    .month-header {
        display: flex;
        align-items: center;
    }

    .month-title {
        margin-right: 12px;
        font-weight: bold;
        font-size: 18px;
        color: ${colors.neutral20};
    }

    .month {
        padding: 12px 24px;
        border: solid 1px ${colors.neutral70};
        border-radius: 4px;
        cursor: pointer;

        &:not(&:last-of-type) {
            margin-bottom: 12px;
        }

        &:hover {
            background-color: ${colors.neutral80};
        }
    }

    .monthly-totals {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .monthly-total {
        margin-right: 8px;
        border-radius: 4px;
        padding: 12px;
        background-color: ${colors.blue};
        cursor: pointer;
        color: ${colors.neutral100};

        &:hover {
            background-color: ${colors.blueHover};
        }
    }

    .raw-list, .insights-module {
        padding: 0;
    }

    .charts-contianer {
        display: flex;
        align-items: center;
    }

    .chart-label {
        font-weight: bold;
        text-align: center;
    }
    
    .chart-container {
        border: solid 1px ${colors.neutral70};
        border-radius: 4px;
        padding: 12px;
        width: 32%;
        height: 300px;

        &:not(&:last-of-type) {
            margin-right: 12px;
        }
    }
`

export default StyledMonthlyModule