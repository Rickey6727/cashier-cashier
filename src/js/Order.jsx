import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { addHistory } from './DatabaseConnection';

const Wrapper = styled.div`
    margin-left: 100px;
`

const Title = styled.h1`
    text-align: center;
    font-family: 'Papyrus';
    font-size: 1rem;
`

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
`

const PadsWrapper = styled.div`
`

const Pads = styled.div`
    width: 70vw;
    overflow: hidden;
`

const List = styled.ul`
    list-style: none;
`

const ListContent = styled.li`
    float:left;
    width: 200px;
    height: 200px;
    margin: 10px;
`

const Pad = styled(Button)`
    background-color: #F3F3ED;
    border: solid 1px #2D2D2C;
    border-radius: 10px;
    padding: 40px;
    margin-right: 10px;
    width: 200px;
    height: 200px;
`

const PurchaseItems = styled.div`
    position: fixed;
    top: 50px;
    right: 50px;
    width: 20vw;
`

const PurchaseItemsList = styled.ul`
    list-style: none;
    height: 60vh;
    background-color: #F3F3ED;
    border: solid 1px #2D2D2C;
    border-radius: 10px;
    overflow: scroll;
    padding: 0;
`

const PurchaseItemsListContent = styled.li`
    width: 90%;
    margin-left: 5%;
    height: 60px;
    border-bottom: dotted 1px #2D2D2C;
`

const PurchaseItemName = styled.p`
    float: left;
`

const PurchaseItemPrice = styled.p`
    float: right;
    margin-right: 50px;
`

const NextButton = styled(Button)`
    width: 100%;
    height: 60px;
    background-color: #4ABD4A;
    color: #F3F3ED;
    font-size: 24px;
    border-radius: 10px;
    margin: 10px;
`

const ClearButton = styled(Button)`
    width: 100%;
    height: 40px;
    background-color: grey;
    color: #F3F3ED;
    font-size: 24px;
    border-radius: 10px;
    margin: 10px;
`

const ConfirmWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #EAE8DA;
    transform: translateX(120vw);
    opacity: 0;
    transition: .3s
`

const Confirm = styled.div`
    position: fixed;
    width: 20vw;
    height: 325px;
    background-color: #F3F3ED;
    border: solid 1px #2D2D2C;
    border-radius: 10px;
    padding: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ConfirmButton = styled(Button)`
    width: 100%;
    height: 60px;
    background-color: #4ABD4A;
    color: #F3F3ED;
    font-size: 24px;
    border-radius: 10px;
    margin: 10px;
`

const NotConfirmButton = styled(Button)`
    width: 100%;
    height: 40px;
    background-color: grey;
    color: #F3F3ED;
    font-size: 24px;
    border-radius: 10px;
    margin: 10px;
`

export default class Order extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menus: [],
            isConfirmWindowOpend: false,
            purchaseItems: [],
            purchasePrice: 0,
            deposit: 0,
            purchaseCount: 0,
            returnMoney: -10,
        }
        this.changeConfirmWindowState = this.changeConfirmWindowState.bind(this);
        this.addPurchaseMenu = this.addPurchaseMenu.bind(this);
        this.handleDepositChange = this.handleDepositChange.bind(this);
        this.purchaseCompleted = this.purchaseCompleted.bind(this);
        this.purchaseNotCompleted = this.purchaseNotCompleted.bind(this);
        this.clearPurchaseItems = this.clearPurchaseItems.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this.selectMenu();
    }
    async selectMenu() {
        const db = firebase.firestore();
        let menuList = [];
        const docRef = db.collection("menu");
        await docRef
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
            })
        }
    }
    changeConfirmWindowState() {
        if (this.state.isConfirmWindowOpend === false) {
            this.setState({isConfirmWindowOpend: true});
            document.getElementById('confirm_open').style.opacity = '1';
            document.getElementById('confirm_open').style.transform = 'translateX(0)';
        } else {
            this.setState({ isConfirmWindowOpend: false});
            document.getElementById('confirm_open').style.opacity = '0';
            document.getElementById('confirm_open').style.transform = 'translateX(120vw)';
        }
    }
    clearPurchaseItems() {
        this.setState({
            purchaseItems: [],
            purchasePrice: 0,
            purchaseCount: 0,
        });
    }
    addPurchaseMenu(item_id, item_name, item_price) {
        var purchaseItems = this.state.purchaseItems;
        purchaseItems.push({item_id, item_name, item_price});
        var purchasePrice = this.state.purchasePrice + item_price;
        var purchaseCount = this.state.purchaseCount + 1;
        this.setState({
            purchaseItems: purchaseItems,
            purchasePrice: purchasePrice,
            purchaseCount: purchaseCount,
        });
    }
    handleDepositChange(e) {
        this.setState({
            deposit: e.target.value,
            returnMoney: e.target.value - this.state.purchasePrice,
        })
    }
    purchaseCompleted() {
        if(window.confirm('会計処理を完了します')){
            let list = [];
            for (var i=0; i < this.state.purchaseItems.length; i++) {
                list.push({
                    menu_title: this.state.purchaseItems[i].item_name,
                    menu_price: this.state.purchaseItems[i].item_price,
                    purchased_count: 1,
                })
            }
            addHistory(this.state.purchasePrice, this.state.deposit, list);
            this.setState({
                purchaseItems: [],
                purchasePrice: 0,
                deposit: 0,
                returnMoney: -10,
                purchaseCount: 0,
                isConfirmWindowOpend: false,
            })
            document.getElementById('confirm_open').style.opacity = '0';
            document.getElementById('confirm_open').style.transform = 'translateX(120vw)';
        }
    }
    purchaseNotCompleted() {
        this.setState({
            isConfirmWindowOpend: false,
            returnMoney: -10,
            deposit: 0,
        });
        document.getElementById('confirm_open').style.opacity = '0';
        document.getElementById('confirm_open').style.transform = 'translateX(120vw)';
    }
    render(){
        return (
            <Wrapper>
                <Title>POS</Title>
                <PadsWrapper>
                    <Pads>
                        <List>
                            {this.state.menus.map((menu, index) => (
                            <ListContent key={index}>
                                <Pad onClick={ () => this.addPurchaseMenu(menu.key, menu.data.menu_title, menu.data.menu_price) }>
                                    <p>{menu.data.menu_title}（¥{menu.data.menu_price}-）</p>
                                </Pad>
                            </ListContent>
                            ))}
                        </List>
                    </Pads>
                    <PurchaseItems>
                        <PurchaseItemsList>
                            {this.state.purchaseItems.map((item, index) => (
                                <PurchaseItemsListContent key={index}>
                                    <PurchaseItemName>{item.item_name}</PurchaseItemName>
                                    <PurchaseItemPrice>¥ {item.item_price} -</PurchaseItemPrice>
                                </PurchaseItemsListContent>
                            ))}
                        </PurchaseItemsList>
                        <p>小計　　¥ {this.state.purchasePrice} -　（{this.state.purchaseCount} 点）</p>
                        {this.state.purchaseCount > 0 &&
                            <NextButton onClick={this.changeConfirmWindowState}>next</NextButton>
                        }
                        {this.state.purchaseCount > 0 &&
                            <ClearButton onClick={this.clearPurchaseItems}>clear</ClearButton>
                        }
                    </PurchaseItems>
                </PadsWrapper>
                <ConfirmWrapper id='confirm_open'>
                    <Confirm>
                        <h2>注文金額：¥ {this.state.purchasePrice} -</h2>
                        <h2>お預かり：<input type="tel" value={this.state.deposit} onChange={this.handleDepositChange}/></h2>
                        {this.state.returnMoney > 0 ?
                            <h2>お釣り: ¥ {this.state.returnMoney}</h2>
                            :
                            <h2>お釣り: ¥ 0</h2>
                        }
                        {this.state.returnMoney >= 0 &&
                            <ConfirmButton onClick={this.purchaseCompleted}>完了</ConfirmButton>
                        }
                        {this.state.returnMoney >= 0 &&
                            <NotConfirmButton onClick={this.purchaseNotCompleted}>戻る</NotConfirmButton>
                        }
                    </Confirm>
                </ConfirmWrapper>
            </Wrapper>
        )
    }
}