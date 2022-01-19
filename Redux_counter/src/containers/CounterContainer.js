import Counter from '../components/Counter';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { getRandomColor} from '../utils';


// store 안의 state 값을 props 로 연결
const mapStateToProps = (state) => ({ // 상태를 연결시키는 함수 선언
    color : state.colorData.color,
    number : state.numberData.number
});


/* 
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/

const mapDispatchToProps = (dispatch) => ({ // 액션함수를 연결시키는 함수
    onIncrement : () => dispatch(actions.increment()),
    onDecrement : () => dispatch(actions.decrement()),
    onSetColor : () => {
        const color = getRandomColor();
        console.log("counter color :: " + color);
        dispatch(actions.setColor(color));
    }

});

// Counter 컴포넌트의 Container 컴포넌트
// Counter 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할 담당

const CounterContainer = connect ( 
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default CounterContainer;