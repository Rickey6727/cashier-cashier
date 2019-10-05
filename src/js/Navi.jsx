import React from 'react';
import { Link } from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import PosImage from '../images/pos.png';
import HistoryImage from '../images/history.png';
import MenuImage from '../images/menu.png';
import SettingImage from '../images/setting.png';
import ResearchImage from '../images/research.png';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
`

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
`

const ListWrapper = styled.ul`
    position: fixed;
    top: 0;
    left: 0;
    list-style: none;
    background-color: #ffffffd1;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    text-align: center;
    transition-duration: .3s;
    opacity: 0;
    transform: translateY(120vh);
`

const List = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
`

const ListContentWrapper = styled.div`
    width: 820px;
    margin: 0 auto;
`

const ListContent = styled.li`
    position: relative;
    float: left;
    margin: 0 50px;
`

const ListContentDisable = styled(ListContent)`
    opacity: 0.4;
`

const SampleButtonWrapper = styled.div`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, -50%);
`

const SampleButton = styled(Button)`
    position: relative;
    display: block;
    background-color: #676767;
    width: 30px;
    height: 30px;
    border: 1px solid #ffffff00;
    border-radius: 100px;
    margin: 0 auto;
`

const Pulsate = keyframes`
    0%   { transform: scale(1, 1); }
    50%  { opacity: 0.5; }
    100% { transform: scale(1.5, 1.5); opacity: 0.0; }
`

const SampleRing = styled.span`
    opacity: 0.5;
    background-color: #9c9c9c;
    position: absolute;
    z-index:-1;
    border-radius: 100px;
    height: 40px;
    width: 40px;
    top: -6px;
    left: -6px;
    animation: ${Pulsate}  0.7s ease-out;
    animation-iteration-count: infinite;
`

export default class Navi extends React.Component{
    constructor(props){
        super(props)
        this.state = {
			isNaviOpened: false,
        }
        this.changeNaveOpenClose = this.changeNaveOpenClose.bind(this);
        this.closeNavi = this.closeNavi.bind(this);
    }
    changeNaveOpenClose = () => {
        if (this.state.isNaviOpened === false) {
            this.setState({isNaviOpened: true});
            document.getElementById('nav_open').style.opacity = '1';
            document.getElementById('nav_open').style.transform = 'translateY(0)';
        } else {
            this.setState({isNaviOpened: false});
            document.getElementById('nav_open').style.opacity = '0';
            document.getElementById('nav_open').style.transform = 'translateY(120vh)';
        }
    }
    closeNavi = () => {
        this.setState({isNaviOpened: false});
        document.getElementById('nav_open').style.opacity = '0';
        document.getElementById('nav_open').style.transform = 'translateY(120vh)';
    }
    render(){
        return (
            <Wrapper>
                <ListWrapper id='nav_open'>
                    <List>
                        <ListContentWrapper>
                            <ListContent><Link to="/menu" onClick={this.closeNavi}><img src={MenuImage} alt='Menu' /></Link></ListContent>
                            <ListContent><Link to="/order" onClick={this.closeNavi}><img src={PosImage} alt='Pos' /></Link></ListContent>
                            <ListContent><Link to="/order-history" onClick={this.closeNavi}><img src={HistoryImage} alt='History' /></Link></ListContent>
                            {/* <ListContent><Link to="/research" onClick={this.closeNavi}><img src={ResearchImage} alt='Research' /></Link></ListContent> */}
                            <ListContentDisable><img src={ResearchImage} alt='Research' /></ListContentDisable>
                            <ListContent><Link to="/menu-edit" onClick={this.closeNavi}><img src={SettingImage} alt='Setting' /></Link></ListContent>
                        </ListContentWrapper>
                    </List>
                </ListWrapper>
                <SampleButtonWrapper>
                    <SampleButton onClick={this.changeNaveOpenClose}>
                        <SampleRing></SampleRing>
                    </SampleButton>
                </SampleButtonWrapper>
            </Wrapper>
        )
    }
}
