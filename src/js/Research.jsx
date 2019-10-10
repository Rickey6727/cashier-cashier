import React from 'react';
import request from 'superagent';
import styled from 'styled-components';

const Wrapper = styled.div`
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
            </Wrapper>
        )
    }
}