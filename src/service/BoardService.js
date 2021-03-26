import axios from 'axios'; // axios 사용 정의

//Spring boot 통신 url 정의
//const BOARD_API_BASE_URL = "http://localhost:8080/api/board";
const BOARD_API_BASE_URL = "http://54.180.115.65:8080/api/board"; // 서버 올릴때

class BoardService {
    getBoard(p_num) {
        return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num);
    }

    createBoard(board) {
        console.log("createBoard :: " + JSON.stringify(board));
        return axios.post(BOARD_API_BASE_URL, board);
    }

    getOneBoard(no){
        return axios.get(BOARD_API_BASE_URL + "/" + no);
    }

    updateBoard(no, board){
        return axios.put(BOARD_API_BASE_URL + "/" + no, board);
    }

    deletBoard(no){
        return axios.delete(BOARD_API_BASE_URL + "/" + no);
    }
}


export default new BoardService();