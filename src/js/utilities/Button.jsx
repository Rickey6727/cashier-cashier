import styled from 'styled-components';

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    width: 100%;
    font-size: 24px;
    border-radius: 10px;
    margin: 10px 0;
    color: #F3F3ED;
    box-shadow: 0 0 8px gray;
`

export const NextButton = styled(Button)`
    height: 60px;
    background-color: #4ABD4A;
    border-bottom: 5px solid #329A00;
`

export const BackButton = styled(Button)`
    height: 40px;
    background-color: #756868;
    border-bottom: 5px solid #4A4949;
`

export const DeleteButton = styled(Button)`
    height: 40px;
    background-color: #EF2727;
    border-bottom: 5px solid #C32424;
`

export const PadButton = styled(Button)`
    width: 200px;
    height: 200px;
    color: #000000;
    background-color: #F3F3ED;
    padding: 40px;
    margin: 0 10px 0 0;
    font-size: 12px;
`

const Link = styled.a`
    display: block;
    color: #F3F3ED;
    border-radius: 10px;
    width: 100%;
    height: 43px;
    font-size: 24px;
    margin: 10px 0;
    padding: 10px 0;
    text-align: center;
    box-shadow: 0 0 8px gray;
`

export const NextLink = styled(Link)`
    background-color: #4ABD4A;
    border-bottom: 5px solid #329A00;
`

export const BackLink = styled(Link)`
    background-color: #756868;
    border-bottom: 5px solid #4A4949;
`

export const DeleteLink = styled(Link)`
    background-color: #EF2727;
    border-bottom: 5px solid #C32424;
`