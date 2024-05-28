import styled from 'styled-components'
import { colors } from '../../colors'

const StyledIgnoreController = styled.div`
    user-select: none;
    padding: 12px;
    padding-bottom: 0;
    display: flex;
    border: solid 1px ${colors.neutral70};
    border-radius: 4px;
    margin: 8px 8px 0 8px;

    .ignore-label {
        font-size: 18px;
        font-weight: bold;
        color: ${colors.neutral20};
        margin-right: 8px;
        margin-top: 8px;
    }

    .ignore-categories {
        display: flex;
        flex-wrap: wrap;
    }

    .ignore-category {
        position: relative;
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${colors.blue};
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        color: ${colors.neutral100};
        margin-right: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
        border: solid 1px ${colors.blue};

        &:hover {
            background-color: ${colors.blueHover};
        }

        &.ignored {
            background-color: unset;
            color: ${colors.neutral40};
            border-color: ${colors.neutral40};

            .category-amount, .category-percent {
                color: ${colors.neutral40};
            }
        }

        .category-amount {
            font-size: 11px;
            color: ${colors.neutral70};
        }

        .category-percent {
            font-size: 11px;
            color: ${colors.neutral70};
        }
    }
`

export default StyledIgnoreController