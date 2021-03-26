// 의존하는 패키지 및 최상위 컴포넌트 정리
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoradComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

// App() 함수에 최상위 컴포넌 트 정리
function App() {
  return (
    <div>
        <Router> {/* react-route 적용 대상의 컴포넌트를 Router로 감싼다. */}
          <HeaderComponent/> {/*웹페이지 헤더 컴포넌트 정의 */}
            <div className='container'> 
              <Switch>
                <Route path="/" exact component = {ListBoardComponent}></Route>
                <Route path="/board" component = {ListBoardComponent}></Route>
                <Route path="/create-board/:no" component = {CreateBoardComponent}></Route>
                <Route path="/read-board/:no" component = {ReadBoardComponent}></Route>
              </Switch>
            </div>
            <FooterComponent/>
        </Router>
    </div>
  );
}

export default App;
