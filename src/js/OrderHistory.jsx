import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { DeleteLink } from './utilities/Button';
import { Input } from './utilities/Form';

const Wrapper = styled.div`
`

const LocalDeleteLink = styled(DeleteLink)`
    position: absolute;
    top: 8px;
    left: 208px;
    height: 13px;
    width: 50px;
    padding: 3px 0;
    font-size: 10px;
`

const DeleteForm = styled.div`
    margin: 0 auto;
    position: fixed;
    top: 20px;
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
    async selectHistory() {
        const db = firebase.firestore();
        let historys = [];
        const docRef = db.collection("history");
        await docRef
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.data().create_date);
                    console.log(doc.data().purchased_item_list);
                    let data = [];
                    let d = new Date( doc.data().create_date.seconds * 1000 );
                    let year  = d.getFullYear();
                    let month = d.getMonth() + 1;
                    let day  = d.getDate();
                    let hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
                    let min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
                    let sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
                    let create_date = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
                    data.purchased_item_list = doc.data().purchased_item_list;
                    data.create_date = create_date;
                    data.acc_deposit = doc.data().acc_deposit;
                    data.acc_return = doc.data().acc_return;
                    data.acc_total = doc.data().acc_total;
                    historys.push({key: doc.id, data: data});
                    console.log(data.purchased_item_list);
                    console.log(data.create_date);
                });
                console.log(historys);
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        if ( historys !== null) {
            this.setState({ historys });
        }
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
        if(window.confirm('レシート情報を削除します')){
            const db = firebase.firestore();
            db.collection("history").doc(this.state.deleteReceiptId).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            this.selectHistory();
            this.setState({
                deleteReceiptId: '',
            })
        }
    }
    render(){
        return (
            <Wrapper>
                <DeleteForm>
                    <Input type='text' placeholder="レシート番号を入力" onChange={this.handleDeleteReceiptIdChange} value={this.state.deleteReceiptId}/>
                    <LocalDeleteLink onClick={this.deleteReceipt}>返品</LocalDeleteLink>
                </DeleteForm>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>レシートID</TableHeader>
                            <TableHeader>購入日</TableHeader>
                            <TableHeader>購入品目</TableHeader>
                            <TableHeader>合計</TableHeader>
                            <TableHeader>支払</TableHeader>
                            <TableHeader>釣銭</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.historys.map((history, index) => (
                            <TableBodyRow key={index}>
                                <TableBody>{history.key}</TableBody>
                                <TableBody>{history.data.create_date}</TableBody>
                                    <TableBody>
                                        {this.state.historys[index].data.purchased_item_list.map((item, index) => (
                                            <p key={index}>{item.menu_title} ¥{item.menu_price}- x{item.purchased_count}</p>
                                        ))}
                                    </TableBody>
                                <TableBody>{history.data.acc_total}</TableBody>
                                <TableBody>{history.data.acc_deposit}</TableBody>
                                <TableBody>{history.data.acc_return}</TableBody>
                            </TableBodyRow>
                        ))}
                    </tbody>
                </Table>
            </Wrapper>
        )
    }
}
