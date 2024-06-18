import styled from 'styled-components/native';

interface ContainerTextProps {
    color ?: string;
    customMargin ?: string;
    fontSize : string;
    fontFamily : 'Poppins-Bold' | 'Poppins-SemiBold' | 'Poppins-Light' | 'Poppins-Regular';
}

export const ContainerText = styled.Text<ContainerTextProps>`
    ${(props) => (props.color ? `color: ${props.color};` : '')};
    ${(props) => (props.customMargin ? `margin: ${props.customMargin};` : '')};

    padding-top: 3px;
    font-family: ${(props) => props.fontFamily};
    font-size: ${(props) => props.fontSize};
`