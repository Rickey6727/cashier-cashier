import React from 'react';
import '../../styles/circle.css';

export default class Circle extends React.Component{
    render() {
        let _className = 'c100 p' + this.props.percentage + ' big';
        return (
            <div className={_className}>
                <span>{this.props.percentage}%</span>
                <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                </div>
            </div>
        )
    }
}
