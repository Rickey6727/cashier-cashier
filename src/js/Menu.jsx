import React from 'react';
import styled from 'styled-components';
import LoadingImage from '../images/loading.gif';
import firebase from 'firebase';

const Wrapper = styled.div`
`

const Title = styled.h1`
    text-align: center;
    font-family: 'Papyrus';
    font-size: 1rem;
`

const ListWrapper = styled.div`
    width: 60%;
    margin: 0 auto;
    padding: 50px;
    min-height: 80vh;
    background-color: #F3F3ED;
    border-radius: 10px;
`

const List = styled.ul`
    list-style: none;
`

const ListContent = styled.li`
    position: relative;
    margin-bottom: 50px;
`

const MenuPrice = styled.p`
    position: absolute;
    top: 0;
    right: 50px;
`

const MenuTitle = styled.p`
    font-size: 24px;
    padding: 10px;
    border-bottom: dotted 1px #31322A;
`

const MenuMemo = styled.p`
    font-size: 16px;
    padding-left: 50px;
`

const Loading = styled.div `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menus: [],
            loading: true
        }
        this.selectMenu = this.selectMenu.bind(this);
        this.selectMenu();
    }
    async selectMenu() {
        const db = firebase.firestore();
        let menuList = [];
        const docRef = db.collection("menu");
        const doc = await docRef
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    menuList.push({key: doc.id, data: doc.data()});
                });
                console.log(menuList);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        if ( menuList !== null) {
            this.setState({
                menus: menuList,
                loading: false
            })
        }
    }
    render(){
        return (
            <Wrapper>
                <Title>MENU</Title>
                <ListWrapper>
                    <List>
                        {this.state.menus.map((menu, index) => (
                        <ListContent key={index}>
                            <MenuPrice>¥ {menu.data.menu_price} -</MenuPrice>
                            <MenuTitle>{menu.data.menu_title}</MenuTitle>
                            <MenuMemo>{menu.data.menu_memo}</MenuMemo>
                        </ListContent>
                        ))}
                    </List>
                </ListWrapper>
                {this.state.loading && (
                    <Loading>
                        <img src={LoadingImage} alt= 'loading...'/>
                    </Loading>
                )}
            </Wrapper>
        )
    }
}