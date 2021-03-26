import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ReadBoardComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            no : this.props.match.params.no,
            board : {}
        }

    }

    // 페이지가 로딩될 때  API 와 통신하여 글 객체를 받아와서 state에 담아준다.
    componentDidMount(){
        console.log("componentDidMount");
        BoardService.getOneBoard(this.state.no).then(res => {
            console.log(JSON.stringify(res.data));
            this.setState({board : res.data});
        });
    }


    returnBoardType(typeNo){
        let type = null;
        
        if(typeNo == 1){
            type = "자유게시판";
        } else if(typeNo == 2){
            type = "질문과 답변 게시판";
        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "row">
                <label>Board Type : </label> {type}
            </div>
        );
    }

    returnDate(cTime, uTime){
        return(
            <div className = "row">
                <label> 생성일 : [{cTime}] / 최종 수정일 : [{uTime}]</label>
            </div>
        );
    }

    goToList(){
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault(); 
        this.props.history.push(`/create-board/${this.state.no}`);
    }

    deleteView = async function () {
        if(window.confirm("정말로 글을 삭제하시겠습니까? \n삭제된 글은 복구 할 수 없습니다.")){
            BoardService.deletBoard(this.state.no).then (res => {
                console.log("delete result => " + JSON.stringify(res));

                if(res.status == 200){
                    this.props.history.push('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
                
            });
        }
        
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center"> Read Detail</h3>
                <div className = "card-body">
                    {/* 게시판 타입 호출 */}
                    {this.returnBoardType(this.state.board.type)}
                    
                    <div className = "row">
                        <label> Title </label> : {this.state.board.type}
                    </div>

                    <div className = "row">
                        <label> Contents </label> : <br/>
                        <textarea value={this.state.board.contents} readOnly></textarea>
                    </div>
                    <div className = "row">
                        <label> MemberNo </label> :
                        {this.state.board.memberNo}
                    </div>

                    {this.returnDate(this.state.board.createdTime, this.state.board.updateTime)}

                    <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft : "10px"}}>글 목록</button>
                    <button className="btn btn-info" onClick={this.goToUpdate.bind(this)} style={{marginLeft : "10px"}}>글 수정하기</button>
                    <button className="btn btn-danger" onClick={() => this.deleteView()}  style={{marginLeft : "10px"}}>글 삭제하기</button>
                </div>
                </div>
            </div>
        );
    }
}

export default ReadBoardComponent;