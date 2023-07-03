import React, { useState, useEffect } from "react";
import axios from 'axios'
import { CheckToken } from "../../utils/CheckToken";

function IsStarButton(props) {
    const { memoId } = props;

    const [memo, setMemo] = useState();
    const [isStar, setIsStar] = useState();

    async function getMemo() {  // 해당 사용자의 메모 1개 조회
        await axios
            .get(`${process.env.REACT_APP_DB_HOST}/memos/${memoId}`)
            .then((response) => {
                setMemo(response.data.data);
                setIsStar(response.data.data.isStar);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    useEffect(() => {
        CheckToken();

        getMemo();  // 출생시점에 getMemo 한번 실행.
    }, []);

    const handleIsStarClick = async (starValue, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)
        setIsStar(starValue);  // toggle

        await axios
            .put(`${process.env.REACT_APP_DB_HOST}/memos/${memo.id}/star`, {
                isStar: starValue
            })
            .then((response) => {
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    let isStarButton;
    if (memo && memo.memoHasUsersCount > 1) {  // 개인메모가 아닌 공동메모일 경우에는, 별이 아닌 다른 그림을 보여주어 즐겨찾기 기능 사용불가하도록 해제시킴.
        isStarButton = <i className="fa fa-users" aria-hidden="true"></i>;
    }
    else {  // 개인메모일 경우에는, 별 그림을 보여주어 즐겨찾기 기능 사용가능하도록 함.
        isStar && isStar
            ? isStarButton = <i className="fa fa-star" aria-hidden="true" onClick={(event) => handleIsStarClick(0, event)}></i>  // isStar이 1이면 꽉찬 별 버튼
            : isStarButton = <i className="fa fa-star-o" aria-hidden="true" onClick={(event) => handleIsStarClick(1, event)}></i>  // isStar이 0이면 속이빈 별 버튼
    }

    return (
        <div style={{display: "inline-block"}}>
            {isStarButton}
        </div>
    );
}

export default IsStarButton;