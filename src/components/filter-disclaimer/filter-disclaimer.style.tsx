import styled from 'styled-components'
import { colors } from '../../colors'

const StyledFilterDisclaimer = styled.div`
    padding: 12px;
    display: flex;
    border: solid 1px ${colors.neutral70};
    border-radius: 4px;
    margin: 12px 8px 0px 8px;
    font-weight: bold;

    .disclaimer-title {
        margin-right: 24px;
    }
`

export default StyledFilterDisclaimer