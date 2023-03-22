import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import axios from 'axios'
import HelloWrapper from "../../components/Styled/HelloWrapper"

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
`;

function UserProfilePage(props) {
    const navigate = useNavigate();

    const { userId } = useParams();

    const [user, setUser] = useState();

    const handleClickCopy = (event) => {
        window.navigator.clipboard.writeText(user.loginId);
    }

    async function getUser() {  // 사용자 회원정보 조회
        await axios
            .get(`/users/${userId}`)
            .then((response) => {
                setUser(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>&nbsp;&nbsp;회원정보
            </h2>
            <h2>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                <span style={{ lineHeight: "175%" }}><br></br></span>
                <div>
                    <div className="flex-container">
                        <span>이름:&nbsp;&nbsp;<span>{user && user.username}</span></span>
                        <button>수정&nbsp;<i className="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                    <hr className="divideHr"></hr>
                    <div className="flex-container">
                        <span>초대 id:&nbsp;&nbsp;<span>{user && user.loginId}</span></span>
                        <button className="copyButton" onClick={handleClickCopy}>복사&nbsp;<i className="fa fa-clone" aria-hidden="true"></i></button>
                    </div>
                    <hr className="divideHr"></hr>
                    <button>pw 변경&nbsp;&nbsp;<i className="fa fa-unlock-alt" aria-hidden="true"></i></button>
                    &nbsp;&nbsp;<button className="deleteUserButton">회원 탈퇴&nbsp;&nbsp;<i className="fa fa-user-times" aria-hidden="true"></i></button>
                </div>
            </h2>
        </MoreWrapper>
    );
}

export default UserProfilePage;