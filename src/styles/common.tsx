import styled from "styled-components";
import {themeProps} from "./theme"


export const ErrMsgBox = styled.div`
    height: 24px;
    color: ${({ theme }: themeProps) => theme.colors.common.error};
`

export const Buttons = styled.div`
    display: flex;
    justify-content: space-around;

    > * {
        margin: 0px 5px;
    }
`