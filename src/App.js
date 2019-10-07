import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navi from './js/Navi';
import Menu from './js/Menu';
import MenuEdit from './js/MenuEdit';
import Order from './js/Order';
import Top from './js/Top';
import OrderHistory from './js/OrderHistory';
import Research from './js/Research';

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      menus: [],
      historys: [],
      new_item_name: "",
      new_item_price: "",
      new_memo: ""
    }
  }
  render(){
    return (
      <BrowserRouter>
        <div>
          <Navi/>
          <Route exact path='/' component={Top} />
          <Route path='/menu' component={Menu} />
          <Route path='/menu-edit' component={MenuEdit} />
          <Route path='/order' component={Order} />
          <Route path='/order-history' component={OrderHistory} />
          <Route path='/research' component={Research} />
        </div>
      </BrowserRouter>
    );
  }
}
