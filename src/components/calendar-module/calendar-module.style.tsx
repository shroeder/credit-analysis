import styled from 'styled-components'
import { colors } from '../../colors'

const StyledCalendarModule = styled.div`
    padding: 12px;
    padding-top: 0;

    .days-container {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;

        .day {
            flex: 1 1 13.5%;
            width: 13.5%;
            max-width: 13.5%;
            min-width: 13.5%;
            padding: 4px 0 ;
            border: solid 1px ${colors.blue};
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            margin: 4px;
            color: ${colors.neutral0};

            &:hover {
                background-color: ${colors.neutral90};
            }

            .total {
                margin-left: 8px;
            }
        }
    }
`

export default StyledCalendarModule