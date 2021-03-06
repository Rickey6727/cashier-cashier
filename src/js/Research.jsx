import React from 'react';
import styled from 'styled-components';
import '../styles/circle.css';
import Circle from './utilities/Circle';
import firebase from 'firebase';

const Wrapper = styled.div`
`

export default class Research extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            percentage: 50,
            lists: [],
            totalPrice: 0,
            totalCount: 0,
        }
        this.plusPercentage = this.plusPercentage.bind(this);
        this.searchOrderHistory = this.searchOrderHistory.bind(this);
        this.searchOrderHistory();
    }
    async searchOrderHistory() {
        const db = firebase.firestore();
        let result = [];
        let items = [];
        let counts = {};
        let price = {};
        let c = 0;
        let p = 0;
        const docRef = db.collection("history");
        await docRef
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let purchased_item_lists = doc.data().purchased_item_list;
                    for (let list in purchased_item_lists) {
                        for(let i=0; i<purchased_item_lists[list].purchased_count; i++){
                            items.push({menu_title:purchased_item_lists[list].menu_title,menu_price:purchased_item_lists[list].menu_price});
                            c = c + 1;
                            p = p + purchased_item_lists[list].menu_price;
                        }
                    }
                });
                for(let i=0;i< items.length;i++){
                  let key = items[i].menu_title;
                  counts[key] = (counts[key])? counts[key] + 1 : 1 ;
                  price[key] = items[i].menu_price; 
                }
                for (let key in counts) {
                    result.push({menu_title: key, per: Math.round(counts[key]/c * 100), count: counts[key], price: price[key] * counts[key]});
                }
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        if ( result !== null) {
            console.log(result);
            this.setState({
                lists: result,
                totalPrice: p,
                totalCount: c,
            });
        }
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
    render(){
        return (
            <Wrapper>
                {this.state.lists.length > 0 &&
                    <SummaryWrapper>
                        <div>総売上： ¥ {this.state.totalPrice} -</div>
                        <div>総販売個数：{this.state.totalCount}点</div>
                    </SummaryWrapper>
                }
                <List>
                    {this.state.lists.map((list, index) => {
                        return (
                            <ListContent key={index}>
                                <MenuTitle>{list.menu_title}</MenuTitle>
                                <MenuTitle>{list.count}個</MenuTitle>
                                <MenuTitle>¥ {list.price} -</MenuTitle>
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
    margin: 25px;
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

const SummaryWrapper = styled.div`
    width: 80%;
    margin: 30px auto;
    color: #444444;
    border: solid 2px #444444;
    border-radius: 10px;
    padding: 30px;
    font-size: 30px;
    background-color: #f9faff;
`