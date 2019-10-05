import React from 'react';
import request from 'superagent';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-left: 100px;
`

const Title = styled.h1`
    text-align: center;
    font-family: 'Papyrus';
    font-size: 1rem;
`

export default class Research extends React.Component{
    constructor(props){
        super(props)
        this.state = {
			menus: []
        }
		request
			.get('https://cashier-app-back.herokuapp.com/menu')
			.end((err, res) => {
				var menus = res.body;
				this.setState({ menus });
			});
    }
    render(){
        return (
            <Wrapper>
                <Title>Research</Title>
            </Wrapper>
        )
    }
}