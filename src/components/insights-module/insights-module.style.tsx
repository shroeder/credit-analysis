import styled from 'styled-components'
import { colors } from '../../colors';

const StyledInsightsModule = styled.div`
    user-select: none;
    padding: 0 12px;

    .insights-row {
        display: flex;
        flex-wrap: wrap;

        &:not(&:last-of-type) {
            margin-bottom: 12px;
        }
    }

    .insight-label {
        font-weight: bold;
        margin-bottom: 2px;
    }

    .insight {
        padding: 12px;
        border: solid 1px ${colors.neutral70};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &:not(&:last-of-type) {
            margin-right: 12px;
        }

        .insight-values {
            display: flex;
            flex-direction: column;
            align-items: center;    
        }
    }

    .insight-value {
        display: flex;

        > div:first-of-type {
            margin-right: 8px;
        }

        > div:nth-of-type(2) {
            font-weight: bold;
        }
    }

    .show-more {
        text-decoration: underline;
        cursor: pointer;

        &:hover {
            font-weight: bold;
        }
    }
`

export default StyledInsightsModule;