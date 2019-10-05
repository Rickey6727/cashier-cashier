import React from 'react';
import request from 'superagent';
import styled from 'styled-components';
import CopyImage from '../images/copy.png';

const Wrapper = styled.div`
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
    padding: 2px 10px;
    background-color: red;
    color: white;
    border-radius: 10px;
    margin-left: 30px;
`

const DeleteForm = styled.div`
    margin: 0 auto;
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Table = styled.table`
    margin: 50px auto 0;
`

const TableHeader = styled.th`
    background-color: #31322A;
    color: #F3F3ED;
`

const TableBody = styled.td`
    padding: 10px;
`

const TableBodyRow = styled.tr`
    background-color: #F3F3ED;
    &:nth-child(odd) {
        background-color: #eee;
    }
`

const InputNoStyle = styled.input`
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
    font-size: 18px;
    width: 120px;
`

const CopyImg = styled.img`
    width: 18px;
    height: 18px;
`

export default class OrderHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            historys: [],
            deleteReceiptId: '',
        }
        this.handleDeleteReceiptIdChange = this.handleDeleteReceiptIdChange.bind(this);
        this.deleteReceipt = this.deleteReceipt.bind(this);
        this.selectHistory = this.selectHistory.bind(this);
        this.copyReceiptId = this.copyReceiptId.bind(this);
        this.selectHistory();
    }
    selectHistory() {
		request
			.get('https://cashier-app-back.herokuapp.com/history')
			.end((err, res) => {
				var historys = res.body;
				this.setState({ historys });
            });
    }
    handleDeleteReceiptIdChange(e) {
        this.setState({deleteReceiptId: e.target.value})
    }
    copyReceiptId(id) {
        var copyTarget = document.getElementById(id);
        copyTarget.select();
        document.execCommand("Copy");
    }
    deleteReceipt() {
        request
        .post('https://cashier-app-back.herokuapp.com/history/delete')
        .type('form')
        .send({
            receipt_id: this.state.deleteReceiptId,
        })
        .end((err, res) => {
            console.log('通信完了');
            this.setState({
                historys: [],
                deleteReceiptId: 0,
            })
            this.selectHistory();
        });
    }
    render(){
        return (
            <Wrapper>
                <Title>HISTORY</Title>
                <DeleteForm>
                    <input type='number' placeholder="レシート番号を入力" onChange={this.handleDeleteReceiptIdChange} value={this.state.deleteReceiptId}/>
                    <DeleteButton onClick={this.deleteReceipt}>返品</DeleteButton>
                </DeleteForm>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>商品名</TableHeader>
                            <TableHeader>購入点数</TableHeader>
                            <TableHeader>小計</TableHeader>
                            <TableHeader>合計</TableHeader>
                            <TableHeader>お釣り</TableHeader>
                            <TableHeader>日時</TableHeader>
                            <TableHeader>レシートID</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.historys.map((history, index) => (
                            <TableBodyRow key={index}>
                                <TableBody>{history.item_name}</TableBody>
                                <TableBody>{history.purchased_count}点</TableBody>
                                <TableBody>¥ {history.purchased_price} -</TableBody>
                                <TableBody>¥ {history.total_price} -</TableBody>
                                <TableBody>¥ {history.deposit_price} -</TableBody>
                                <TableBody>{history.create_date}</TableBody>
                                <TableBody><InputNoStyle id={history.receipt_id} value={history.receipt_id} readOnly></InputNoStyle><button onClick={() => this.copyReceiptId(history.receipt_id)}><CopyImg src={CopyImage}></CopyImg></button></TableBody>
                            </TableBodyRow>
                        ))}
                    </tbody>
                </Table>
            </Wrapper>
        )
    }
}
