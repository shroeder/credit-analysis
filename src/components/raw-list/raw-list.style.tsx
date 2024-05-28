import styled from 'styled-components'
import { colors } from '../../colors'

const StyledRawList = styled.div`
    padding: 0 12px;

    .header-row, .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-row {
        .cell {
            display: flex;
            align-items: center;
            border-bottom: 0;
            user-select: none;

            .cell-text {
                margin-right: 8px;
            }

            .search {
                margin-left: 8px;

                input {
                    margin-right: 8px;
                }
            }
        }
    }

    .row {
        &:not(&:last-of-type) {
            .cell {
                border-bottom: 0;
            }
        }
    }

    .cell {
        padding: 8px;
        border: solid 1px ${colors.neutral70};
        width: 100%;

        &:not(&:last-of-type) {
            border-right: 0;
        }
    }

`

export default StyledRawList

