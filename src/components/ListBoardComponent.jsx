import React, { Component } from 'react';
import BoardService from '../service/BoardService';


class ListBoardComponent extends Component {
    constructor(props){
        super(props)
        // # 1. 페이지에 표시될 극목록 데이터를 넣기위한 변수 boards를 this.state에 선언한다.

        this.state = {
            p_num : 1,
            paging : {},
            boards : [],
        }
        // 글 작성버튼 클릭시 동작하는 함수 바인딩
        this.createBoard = this.createBoard.bind(this);
    }

    // 리액트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져온다.
    // this.state에 선언한 변수의 값을 변경하기 위해선 setState를 사용해야함.
    componentDidMount(){
        BoardService.getBoard(this.state.p_num).then((res) => {
            console.log("data :: " + JSON.stringify(res.data));
            this.setState({
                p_num : res.data.pagingData.currentPageNum,
                paging : res.data.pagingData,
                boards : res.data.list
            });
        });
    }

    // 글 작성 페이지로 이동하는 함수 정의
    createBoard() {
        this.props.history.push('/create-board/_create');
    }

    readBoard(no) {
        this.props.history.push(`/read-board/${no}`); // 작은 따옴 표가 아니라 그레이브 악센트
    }

    listBoard(p_num){
        console.log("PageNum : " + p_num);
        BoardService.getBoard(p_num).then((res) => {
            console.log(res.data);

            this.setState({
                 p_num : res.data.pagingData.currentPageNum,
                 paging : res.data.pagingData,
                 boards : res.data.list
            });
        });
    }

    viewPaging() {
        const pageNum = [];

        for(let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++){
            pageNum.push(i);
        }

        return (pageNum.map((page) => 
            <li className="page-item" key={page.toString()}>
                <a className="page-link" onClick={() => this.listBoard(page)}>{page}</a>
            </li>
        ));
    }

    isPagingPrev()  {
        if(this.state.paging.prev){
            return (
            <li className="page-item">
                <a className="page-link" onClick={() => this.listBoard(this.state.paging.currentPageNum - 1)} tableindex="-1">Previous</a>
            </li>
            );
        }
    }

    isPagingNext(){
        if(this.state.paging.next){
            return (
            <li className="page-item">
                <a className="page-link" onClick={() => this.listBoard(this.state.paging.currentPageNum + 1)} tableindex="-1">Next</a>
            </li>
            );
        }
    }
    
    isMoveToFirstPage() {
        if (this.state.p_num != 1) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    isMoveToLastPage() {
        if (this.state.p_num != this.state.paging.pageNumCountTotal) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.listBoard( (this.state.paging.pageNumCountTotal) )} tabIndex="-1">LastPage({this.state.paging.pageNumCountTotal})</a>
                </li>
            );
        }
    }


    // render() 함수의 내용이 실제 웹페이지에 표시된다.
    // maps() 함수를 사용하여 board의 데이터를 출력.
    render() {
        return (
            <div>
                <h2 className="text-center">Boards List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.createBoard}>글 작성</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀 </th>
                                <th>작성자 </th>
                                <th>작성일 </th>
                                <th>갱신일 </th>
                                <th>좋아요 수 </th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.no}>
                                        <td> {board.no} </td>
                                        {/* <td> <a href=" " onClick = {() => this.readBoard(board.no)}>{board.title} </a></td> href="#  을 넣어 주어야 오류가 안생김 */}
                                        <td> <a href= " " onClick = {() => this.readBoard(board.no)}> {board.title} </a></td> {/*href="# " 을 넣어 주어야 오류가 안생김*/}
                                        <td> {board.memberNo} </td>
                                        <td> {board.createdTime} </td>
                                        <td> {board.updateTime} </td>
                                        <td> {board.likes} </td>
                                        <td> {board.counts} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <nav aria-label="Page navigation exam">
                        <ul className="pagination justify-content-center">
                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
           
        );
    }
}

export default ListBoardComponent;