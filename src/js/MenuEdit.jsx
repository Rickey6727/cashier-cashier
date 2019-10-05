import React from 'react';
import request from 'superagent';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-left: 50px;
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

const DeleteButton = styled(Button)`
    position: absolute;
    padding: 10px;
    background-color: red;
    color: white;
    border-radius: 10px;
    min-width: 100px;
    top: 40%;
    right: 50px;
`

const AddButton = styled(Button)`
    padding: 10px;
    background-color: green;
    color: white;
    border-radius: 10px;
    width: 100%;
`

const List = styled.ul`
    list-style: none;
    border: solid 1px #2D2D2C;
    border-radius: 10px;
    background-color: #F3F3ED;
    width: 60vw;
    max-height: 80vh;
    overflow: scroll;
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
    border: solid 1px #2D2D2C;
    border-radius: 10px;
    background-color: #F3F3ED;
`

const AddMenuForm = styled.form`
    width: 100%;
`

const AddMenuLabel = styled.label`
    width: 100%;
`

const AddMenuInput = styled.input`
    width: 100%;
    margin: 10px 0;
`

const AddMenuTextarea = styled.textarea`
    width: 100%;
    min-height: 100px;
    margin: 10px 0;
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
    selectMenu() {
		request
			.get('https://cashier-app-back.herokuapp.com/menu')
			.end((err, res) => {
				var menus = res.body;
				this.setState({ menus });
            });
    }
    addMenu() {
		request
			.post('https://cashier-app-back.herokuapp.com/edit/addMenu')
            .type('form')
            .send({
                name: this.state.newMenuName,
                price: this.state.newMenuPrice,
                memo: this.state.newMenuMemo,
            })
			.end((err, res) => {
                console.log('通信完了');
            });
    }
    deleteMenu(targetId) {
		request
			.post('https://cashier-app-back.herokuapp.com/edit/deleteMenu')
            .type('form')
            .send({
                id: targetId,
            })
			.end((err, res) => {
                console.log('通信完了');
                this.selectMenu();
            });
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
                <Title>SETTING</Title>
                <AddMenuFormWrapper>
                    <AddMenuForm>
                        <AddMenuLabel>
                            <AddMenuInput type='text' name='MenuName' value={this.state.newMenuName} onChange={this.handleChange} placeholder='メニュー名称'/>
                        </AddMenuLabel>
                        <AddMenuLabel>
                            <AddMenuInput type='number' name='MenuPrice' value={this.state.newMenuPrice} onChange={this.handleChange} placeholder='設定価格'/>
                        </AddMenuLabel>
                        <AddMenuLabel>
                            <AddMenuTextarea type='text' name='MenuMemo' value={this.state.newMenuMemo} onChange={this.handleChange} placeholder='メモ'/>
                        </AddMenuLabel>
                        <AddButton type='submit' onClick={this.addMenu}>追加</AddButton>
                    </AddMenuForm>
                </AddMenuFormWrapper>
                <List>
                    {this.state.menus.map((menu, index) => (
                    <ListContent key={index}>
                        <ListContentName>{menu.item_name} ( ¥{menu.item_price}- )</ListContentName>
                        <p>{menu.memo}</p>
                        <DeleteButton onClick={() => this.deleteMenu(menu.id)}>削除</DeleteButton>
                    </ListContent>
                    ))}
                </List>
            </Wrapper>
        )
    }
}