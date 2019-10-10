import styled from 'styled-components';

const SimpleInput = styled.input`
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #FBFBFB;
    background-image: none;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    box-sizing: border-box;
    color: inherit;
    font-family: inherit;
    font-size: 1em;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    &:focus {
        border: 1px solid #00ce38;
        box-shadow: 0 0 8px #00ce38;
        outline: none;
    }
`

export const Input = styled(SimpleInput)`
`

const SimpleTextarea = styled.textarea`
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #FBFBFB;
    background-image: none;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    box-sizing: border-box;
    color: inherit;
    font-family: inherit;
    font-size: 1em;
    height: 100px;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    &:focus {
        border: 1px solid #00ce38;
        box-shadow: 0 0 8px #00ce38;
        outline: none;
    }
`

export const Textarea = styled(SimpleTextarea)`
`