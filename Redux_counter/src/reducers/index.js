
// 초기상태 정의
// const initialState = {
//     color : 'black',
//     number : 0
// }

/* 
    리듀서 함수를 정의합니다. 리듀서는 state 와 action 을 파라미터로 받습니다.
    state 가 undefined 일때 (스토어가 생성될때) state 의 기본값을 initialState 로 사용합니다.
    action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환합니다.
    이 때 주의 할 점은 state 를 직접 수정하면 안되고,
    기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야합니다.
*/

// function counter(state = initialState, action){
//     switch(action.type) {
//         case types.INCREMENT : 
//             return {
//                 ...state,
//                 number : state.number + 1
//             };
//         case types.DECREMENT :
//             return {
//                 ...state, 
//                 number : state.number -1
//             };
//         case types.SET_COLOR : 
//             return {
//                 ...state,
//                 color : action.color
//             };
//         default : 
//             return state;
//     }
// };
// export default counter;


import numebr from './number';
import color from './color';

import { combineReducers} from 'redux';


/*
    서브 리듀서들을 하나로 합칩니다.
    combineReducers 를 실행하고 나면, 나중에 store의 형태가 파라미터로 전달한 객체의 모양대로 만들어집니다.
    지금의 경우:
    {
        numberData: {
            number: 0
        },
        colorData: {
            color: 'black'
        }
    }
    로 만들어집니다.
*/

const reducers = combineReducers({
    numberData : numebr,
    colorData : color
});

export default reducers;