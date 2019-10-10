import React from 'react';
import styled from 'styled-components';
import { addMenu } from './DatabaseConnection';
import firebase from 'firebase';
import { NextLink, DeleteButton } from './utilities/Button';
import { Input, Textarea } from './utilities/Form';

const Wrapper = styled.div`
    margin-left: 50px;
`

const LocalDeleteButton = styled(DeleteButton)`
    position: absolute;
    top: 30px;
    right: 50px;
    width: 100px;
`

const List = styled.ul`
    position: fixed;
    top: 50px;
    left: 50px;
    list-style: none;
    border-radius: 10px;
    background-color: #F3F3ED;
    width: 60vw;
    max-height: 80vh;
    overflow: scroll;
    box-shadow: 0 0 8px gray;
    margin: 0;
    padding: 50px 0 50px 40px;
`

const ListContent = styled.li`
    position: relative;
    padding: 10px;
`
const ListContentName = styled.p`
    width: 70%;
    border-bottom: dotted 1px #2D2D2C;
`

const AddMenuFormWrapper = styled.div`
    position: fixed;
    width: 20vw;
    top: 50px;
    right: 50px;
    padding: 30px;
    border-radius: 10px;
    background-color: #F3F3ED;
    box-shadow: 0 0 8px gray;
`

const AddMenuForm = styled.form`
    width: 100%;
`

const AddMenuLabel = styled.label`
    width: 100%;
`

const AddMenuTextarea = styled(Textarea)`
`

export default class MenuEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menus: [],
            index: 0,
            newMenuName: '',
            newMenuPrice: '',
            newMenuMemo: '',
        }
        this.selectMenu = this.selectMenu.bind(this);
        this.addMenu = this.addMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);

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
    addMenu() {
        if(window.confirm('メニューの追加を完了します')){
            addMenu(this.state.newMenuName, this.state.newMenuPrice, this.state.newMenuMemo);
            this.setState({
                newMenuName: '',
                newMenuPrice: '',
                newMenuMemo: ''
            })
            this.selectMenu();
        }
    }
    deleteMenu(targetId) {
        if(window.confirm('メニューの削除を完了します')){
            const db = firebase.firestore();
            db.collection("menu").doc(targetId).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            this.selectMenu();
        }
    }
    handleChange(e) {
        if (e.target.name === 'MenuName') {
            this.setState({newMenuName: e.target.value});
        } else if (e.target.name === 'MenuPrice') {
            this.setState({newMenuPrice: e.target.value});
        } else if (e.target.name === 'MenuMemo') {
            this.setState({newMenuMemo: e.target.value});
        } else {
            console.log('err: 該当するカラムはありません');
        }
    }
    render(){
        return (
            <Wrapper>
                <List>
                    {this.state.menus.map((menu, index) => (
                    <ListContent key={index}>
                        <ListContentName>{menu.data.menu_title} ( ¥{menu.data.menu_price}- )</ListContentName>
                        <p>{menu.data.menu_memo}</p>
                        <LocalDeleteButton onClick={() => this.deleteMenu(menu.key)}>削除</LocalDeleteButton>
                    </ListContent>
                    ))}
                </List>
                <AddMenuFormWrapper>
                    <AddMenuForm>
                        <AddMenuLabel>
                            <Input type='text' name='MenuName' value={this.state.newMenuName} onChange={this.handleChange} placeholder='メニュー名称'/>
                        </AddMenuLabel>
                        <AddMenuLabel>
                            <Input type='number' name='MenuPrice' value={this.state.newMenuPrice} onChange={this.handleChange} placeholder='設定価格'/>
                        </AddMenuLabel>
                        <AddMenuLabel>
                            <AddMenuTextarea type='text' name='MenuMemo' value={this.state.newMenuMemo} onChange={this.handleChange} placeholder='メモ'/>
                        </AddMenuLabel>
                        { (this.state.newMenuName !== '' && this.state.newMenuPrice !== '' && this.state.newMenuMemo !== '') &&
                            <NextLink onClick={this.addMenu}>追加</NextLink>
                        }
                    </AddMenuForm>
                </AddMenuFormWrapper>
            </Wrapper>
        )
    }
}