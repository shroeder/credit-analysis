import styled from 'styled-components'
import { colors } from './colors'

const StyledApp = styled.div`
    .collapsed, .expanded {
        border: solid 1px ${colors.neutral70};
        border-radius: 4px;
        padding: 12px;
        cursor: pointer;
        margin-top: 12px;

        .expanded-title {
            margin-bottom: 8px;
        }

        &:hover {
            background-color: ${colors.neutral90};
        }
    }
`

export default StyledApp