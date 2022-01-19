import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

const Counter = ({number, color, onIncrement, onDecrement, onSetColor}) => {
    return (
        <div
            className="Counter"
            onClick={onIncrement}
            onContextMenu= { // 우클릭 메뉴 오픈 이벤트
                (e) =>{
                    e.preventDefault(); // 메뉴 열리는거 막는 함수
                    onDecrement();
                }
            }
            onDoubleClick = {onSetColor}
            style= {{backgroundColor : color}}>
                {number}
        </div>
    );
};

Counter.propTypes = {
    number : PropTypes.number,
    color : PropTypes.string,
    onIncrement : PropTypes.func,
    onDecrement : PropTypes.func,
    onSetColor : PropTypes.func
}

Counter.defaultProps = {
    number : 0,
    color : 'black',
    onIncrement :  () => console.warn('onIncrement not defined'),
    onDecrement : () => console.warn('onDecrement not defined'),
    onSetColor : () => console.warn('onSetColor not defined')
}

export default Counter;