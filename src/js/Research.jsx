import React from 'react';
import styled from 'styled-components';
import '../styles/circle.css';
import Circle from './utilities/Circle';

const Wrapper = styled.div`
`

export default class Research extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            percentage: 50,
            lists: [{menu_title:'コーヒー',per:0},{menu_title:'コーヒー',per:20},{menu_title:'コーヒーコーヒーコーヒーコーヒーコーヒーコーヒーコーヒー',per:40},{menu_title:'コーヒー',per:60},{menu_title:'コーヒー',per:80},{menu_title:'コーヒー',per:100},{menu_title:'コーヒー',per:20},{menu_title:'コーヒー',per:40},{menu_title:'コーヒー',per:60}],
        }
        this.plusPercentage = this.plusPercentage.bind(this);
    }
    plusPercentage(t,id) {
        let localList = this.state.lists;
        if(t===0){
            localList[id].per = localList[id].per + 10;
        }else{
            localList[id].per = localList[id].per - 10;
        }
        this.setState({ lists: localList });
    }
    calculate
    render(){
        return (
            <Wrapper>
                <List>
                    {this.state.lists.map((list, index) => {
                        return (
                            <ListContent key={index}>
                                <MenuTitle>{list.menu_title}</MenuTitle>
                                <Content>
                                    <Circle percentage={String(list.per)}/>
                                </Content>
                            </ListContent>
                        )
                    })}
                </List>
            </Wrapper>
        )
    }
}

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display:-webkit-box;
    display:-moz-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:-moz-flex;
    display:flex;
    -webkit-box-lines:multiple;
    -moz-box-lines:multiple;
    -webkit-flex-wrap:wrap;
    -moz-flex-wrap:wrap;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
`

const ListContent = styled.li`
    width: 240px;
    margin: 50px;
`

const MenuTitle = styled.div`
    text-align: center;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const Content = styled.div`
    width: 80%;
`