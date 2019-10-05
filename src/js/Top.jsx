import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-left: 220px;
`

const Title = styled.h1`
    margin-top: 40vh;
    text-align: right;
    padding: 70px 50px 0 0;
`

export default class Top extends React.Component{
    render(){
        return (
            <Wrapper>
                <Title>Cashier Cashier</Title>
            </Wrapper>
        )
    }
}