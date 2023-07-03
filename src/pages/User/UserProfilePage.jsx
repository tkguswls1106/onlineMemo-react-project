import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import axios from 'axios'
import HelloWrapper from "../../components/Styled/HelloWrapper"
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { CheckToken } from "../../utils/CheckToken";

const MoreWrapper = styled(HelloWrapper)`
    .flex-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        line-height: 142%;
    }

    .fa-arrow-left {
        border: solid 2.3px;
        border-radius: 6px;
        padding: 1px 6.7px;

        &:hover {
            cursor:pointer;
            background-color: #463f3a;
            color: #bcb8b1;
            border-color: #463f3a;
        }
    }

    .fa-user-circle {
        font-size: 2.65rem;
    }

    .divideHr {
        width: 24vw;
        background-color: #463f3a;
        height: 0.5px;

        margin-top: 12px;
        margin-bottom: 12px;
    }

    button {
        font-size: 1.47rem;
    }

    .deleteUserButton {
        background-color: #dfafa1;
        color: #463f3a;

        &:hover {
            background-color: #dfb1a1a4;
        }
    }

    .copyButton {
        color: #463f3a;        
        border: solid 1.8px #463f3a;
        border-radius: 6px;
        background-color: #f4f3ee;
        padding: 2.3px 4.8px;

        &:hover {
            cursor: pointer;
            background-color: #f4f3eea4;
        }
    }

    .fa-check {
        color: #3fb950;
    }

    .saveNameButton {
        background-color: #a1c4df;
        color: #463f3a;

        &:hover {
            background-color: #a1c4dfa4;
        }
    }

    .inputInform {
        border: "1px solid #463f3a";
    }
    .inputInform::placeholder {
        font-size: 9px;
        font-weight: bold;
    }

    .wrongName {
        border: 3.3px solid #dd2b2b;
    } 
    .wrongName::placeholder {
        font-size: 9px;
        font-weight: bold;
    }
`;

function UserProfilePage(props) {
    const navigate = useNavigate();

    const { userId } = useParams();

    const [copyClassName, setCopyClassName] = useState('fa fa-clone');

    const [user, setUser] = useState();
    const [nameValue, setNameValue] = useState("");
    const [purpose, setPurpose] = useState("read");

    const [isWrongName, setIsWrongName] = useState(false);

    const [modalOn, setModalOn] = useState(false);

    const handleChangeName = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9ㄱ-ㅎ가-힣]/gi, '');
        setNameValue(event.target.value);
    }

    const handleClickCopy = (event) => {
        window.navigator.clipboard.writeText(user.loginId);

        setCopyClassName('fa fa-check');
        setTimeout(() => {
            setCopyClassName('fa fa-clone');
        }, 2000); // 2초 딜레이 후에 다시 아이콘 변경.
    }

    const handleEditClick = (event) => {
        setPurpose("edit");
    }

    const handleUpdateSaveClick = async (nameValue, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        if (nameValue.length < 2) {
            setIsWrongName(true);
        }
        else {
            await axios
                .put(`${process.env.REACT_APP_DB_HOST}/users/${userId}`, {
                    username: nameValue,
                })
                .then((response) => {
                    //console.log(response);

                    setIsWrongName(false);
                    setPurpose("read");
                })
                .catch((error) => {
                    setIsWrongName(false);
                    //console.log(error);
                })
        }
    }

    const handleDeleteClick = async (e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .delete(`${process.env.REACT_APP_DB_HOST}/users/${userId}`)
            .then((response) => {
                //console.log(response);

                localStorage.removeItem('token');
                localStorage.removeItem('expirationTime');
                navigate('/login');
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    async function getUser() {  // 사용자 회원정보 조회
        await axios
            .get(`${process.env.REACT_APP_DB_HOST}/users/${userId}`)
            .then((response) => {
                setUser(response.data.data);
                setNameValue(response.data.data.username)
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    useEffect(() => {
        CheckToken();

        getUser();
    }, [purpose]);

    let purposeText;
    let nameComponent;
    let saveComponent;
    if (purpose == "edit") {
        purposeText = "edit";

        nameComponent = <input type="text" className={isWrongName ? 'wrongName' : 'inputInform'} value={user && nameValue} onChange={handleChangeName} placeholder="2자 이상 입력."
            style={{ width: "60px", textAlign: "center", paddingTop: "4.5px", paddingBottom: "2.5px", marginBottom: "4px", backgroundColor: "#f4f3ee", borderRadius: "5px" }} />

        saveComponent = <button className="saveNameButton" style={{ width: "51.6px" }} onClick={(event) => handleUpdateSaveClick(nameValue)}>저장</button>
    }
    else {  // (purpose == "read") 일때
        purposeText = "read";

        nameComponent = <span>{user && user.username}</span>

        saveComponent = <button onClick={handleEditClick}>수정&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button>
    }

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>&nbsp;&nbsp;회원정보
            </h2>
            <h2>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <span style={{ lineHeight: "175%" }}><br></br></span>
                <div>
                    <div className="flex-container">
                        <span>이름:&nbsp;&nbsp;{nameComponent}</span>
                        {isWrongName &&
                            <span style={{ fontSize: "1.35rem", color: "#dd2b2b" }}>!!! 2자 이상 입력하세요 !!!</span>
                        }
                        {saveComponent}
                    </div>
                    <hr className="divideHr"></hr>
                    <div className="flex-container">
                        <span>초대 id:&nbsp;&nbsp;<span>{user && user.loginId}</span></span>
                        <button className="copyButton" onClick={handleClickCopy}>복사&nbsp;<i className={copyClassName} aria-hidden="true"></i></button>
                    </div>
                    <hr className="divideHr"></hr>
                    <button className="deleteUserButton" onClick={() => setModalOn(!modalOn)}>회원 탈퇴&nbsp;&nbsp;<i className="fa fa-user-times" aria-hidden="true"></i></button>
                </div>
            </h2>
            {modalOn && (
                <ConfirmModal closeModal={() => setModalOn(!modalOn)}>
                    <br></br>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">정말 탈퇴하시겠습니까?</h2>
                    <br></br>
                    <div style={{ float: "right" }}>
                        <button className="confirmDeleteButton" onClick={handleDeleteClick}>확인</button>&nbsp;&nbsp;
                        <button className="cancelButton" onClick={() => setModalOn(!modalOn)}>취소</button>
                    </div>
                </ConfirmModal>
            )}
        </MoreWrapper>
    );
}

export default UserProfilePage;