import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import '../../App.css';
import { useNavigate } from "react-router-dom";
import HelloWrapper from "../../components/Styled/HelloWrapper"
import ConfirmModal from "../../components/Modal/ConfirmModal";

const MoreWrapper = styled(HelloWrapper)`
    .flex-container {
        line-height: 130%;
    }

    .fa-arrow-left {
        border: solid 2.3px ;
        border-radius: 6px;
        padding: 1px 6.7px;

        &:hover {
            cursor:pointer;
            background-color: #463f3a;
            color: #bcb8b1;
            border-color: #463f3a;
        }
    }

    .change {
        text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
    }

    .inputInform::placeholder {
        font-size: 4.8px;
        font-weight: bold;
    }

    .wrongId, .wrongPw, .wrongNewPw, .wrongConfirm {
        border: 3.3px solid #dd2b2b;
        border-radius: 3px;
    }
`;

function ChangePwPage(props) {
    const navigate = useNavigate();

    const [successModalOn, setSuccessModalOn] = useState(false);
    const [confirmErrorModalOn, setConfirmErrorModalOn] = useState(false);
    const [samePwErrorModalOn, setSamePwErrorModalOn] = useState(false);
    const [loginErrorModalOn, setLoginErrorModalOn] = useState(false);

    const [loginIdValue, setLoginIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");
    const [newPwValue, setNewPwValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    const [isWrongId, setIsWrongId] = useState(false);
    const [isWrongPw, setIsWrongPw] = useState(false);
    const [isWrongNewPw, setIsWrongNewPw] = useState(false);
    const [isWrongConfirm, setIsWrongConfirm] = useState(false);

    const [isWrongResult, setIsWrongResult] = useState(false);

    const [tokenUserId, setTokenUserId] = useState();

    const handleChangeLoginId = (event) => {
        setLoginIdValue(event.target.value);
    }

    const handleChangePw = (event) => {
        setPwValue(event.target.value);
    }

    const handleChangeNewPw = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9!@#$%^&*()~]/gi, '');
        setNewPwValue(event.target.value);
    }

    const handleChangeConfirm = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9!@#$%^&*()~]/gi, '');
        setConfirmValue(event.target.value);
    }

    const handleUpdatePwClick = async (loginIdValue, pwValue, newPwValue, confirmValue, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        if (newPwValue === confirmValue) {
            if (newPwValue.length < 8 && pwValue !== newPwValue) {
                setIsWrongId(false);
                setIsWrongPw(false);
                setIsWrongNewPw(true);
                setIsWrongConfirm(false);
                setIsWrongResult(true);
            }
            else if (newPwValue.length < 8 && pwValue === newPwValue) {
                setIsWrongId(false);
                setIsWrongPw(false);
                setIsWrongNewPw(true);
                setIsWrongConfirm(false);
                setIsWrongResult(true);

                setSamePwErrorModalOn(true);  // 새로운 비밀번호와 입력한 이전 비밀번호가 일치함 에러.
            }
            else if (newPwValue.length >= 8 && pwValue === newPwValue) {
                setIsWrongId(false);
                setIsWrongPw(false);
                setIsWrongNewPw(true);
                setIsWrongConfirm(false);
                setIsWrongResult(true);

                setSamePwErrorModalOn(true);  // 새로운 비밀번호와 입력한 이전 비밀번호가 일치함 에러.
            }
            else {  // 만약 (newPwValue.length >= 8 && pwValue !== newPwValue) 일때를 의미함.
                await axios
                    .put(process.env.REACT_APP_DB_HOST + '/password', {
                        loginId: loginIdValue,
                        firstPw: pwValue,
                        newFirstPw: newPwValue
                    })
                    .then((response) => {
                        setIsWrongId(false);
                        setIsWrongPw(false);
                        setIsWrongNewPw(false);
                        setIsWrongConfirm(false);
                        setIsWrongResult(false);

                        setSuccessModalOn(true);
                        //console.log(response);
                    })
                    .catch((error) => {
                        setIsWrongId(true);
                        setIsWrongPw(true);
                        setIsWrongNewPw(false);
                        setIsWrongConfirm(false);
                        setIsWrongResult(true);

                        setLoginErrorModalOn(true);  // 로그인 정보가 불일치함 에러.
                        //console.log(error);
                    })
            }
        }
        else {
            if (newPwValue.length < 8) {
                setIsWrongId(false);
                setIsWrongPw(false);
                setIsWrongNewPw(true);
                setIsWrongConfirm(true);
                setIsWrongResult(true);
            }
            else {
                setIsWrongId(false);
                setIsWrongPw(false);
                setIsWrongNewPw(false);
                setIsWrongConfirm(true);
                setIsWrongResult(true);

                setConfirmErrorModalOn(true);  // pw 확인이 불일치함 에러.
            }
        }
    }

    async function checkLogin() {  // 로그인 상태 여부 확인하고 해당 사용자의 userId 반환
        await axios
            .get(process.env.REACT_APP_DB_HOST + '/auth')
            .then((response) => {
                setTokenUserId(response.data.data.id);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedExpirationDate = localStorage.getItem('expirationTime') || '0';

        if (storedToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

            const remainingTime = storedExpirationDate - String(new Date().getTime());
            if (remainingTime <= '1000') {  // 토큰 잔여만료시간이 1초 이하라면
                localStorage.removeItem('token');
                localStorage.removeItem('expirationTime');

                navigate('/login');
            }

            checkLogin();
            if (tokenUserId) {
                navigate(`/users/${tokenUserId}/memos`);
            }
        }
    }, [tokenUserId]);

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>&nbsp;&nbsp;
                pw를 변경하세요!&nbsp;&nbsp;<i className="fa fa-unlock-alt" aria-hidden="true"></i>
            </h2>
            <h2>
                <i className="fa fa-user-circle" aria-hidden="true"></i><br></br>
                비밀번호 변경<br></br>
                <hr></hr>
                <div className="flex-container">
                    &nbsp;&nbsp;현재 id:&nbsp;&nbsp;<input type="text" className={isWrongId ? 'wrongId inputInform' : 'inputInform'} style={{ width: "96px" }} size="15" maxLength="16" onChange={handleChangeLoginId} />
                </div>
                <div className="flex-container">
                    현재 pw:&nbsp;&nbsp;<input type="text" className={isWrongPw ? 'wrongPw inputInform' : 'inputInform'} style={{ width: "98px" }} size="15" onChange={handleChangePw} />
                </div>
                <div className="flex-container change">
                    바꿀 pw:&nbsp;&nbsp;<input type="text" size="15" className={isWrongNewPw ? 'wrongNewPw inputInform' : 'inputInform'} style={{ width: "97px" }} placeholder=" 영문,숫자,기호 (8자 이상)" onChange={handleChangeNewPw} />
                </div>
                <div className="flex-container change">
                    pw 확인:&nbsp;&nbsp;<input type="text" size="15" className={isWrongConfirm ? 'wrongConfirm inputInform' : 'inputInform'} style={{ width: "97px" }} placeholder=" pw 재입력" onChange={handleChangeConfirm} />
                </div>
                <div style={{ lineHeight: "40%" }}><br></br></div>
                <div className="flex-container">
                    <button onClick={(event) => handleUpdatePwClick(loginIdValue, pwValue, newPwValue, confirmValue)}>변경 완료</button>
                </div>
                {isWrongResult &&
                    <span style={{ fontSize: "1.35rem", color: "#dd2b2b" }}>!!! 입력하신 정보를 재확인해주세요 !!!</span>
                }
            </h2>
            {successModalOn && (
                <ConfirmModal closeModal={() => setSuccessModalOn(!successModalOn)}>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    <h2 className="successSignupModalTitle">
                        비밀번호 변경 성공.<br></br>
                        로그인 페이지로 이동합니다.
                    </h2>
                    <button style={{ fontSize: "1.5rem" }} onClick={() => { setSuccessModalOn(false); navigate('/login'); }}>이동</button>
                </ConfirmModal>
            )}
            {confirmErrorModalOn && (
                <ConfirmModal closeModal={() => setConfirmErrorModalOn(!confirmErrorModalOn)}>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">
                        비밀번호가 일치하지 않습니다.<br></br>
                        다시 입력해주세요.
                    </h2>
                    <button style={{ fontSize: "1.5rem" }} onClick={() => setConfirmErrorModalOn(false)}>확인</button>
                </ConfirmModal>
            )}
            {samePwErrorModalOn && (
                <ConfirmModal closeModal={() => setSamePwErrorModalOn(!samePwErrorModalOn)}>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">
                        이전 비밀번호와 동일합니다.<br></br>
                        다시 입력해주세요.
                    </h2>
                    <button style={{ fontSize: "1.5rem" }} onClick={() => setSamePwErrorModalOn(false)}>확인</button>
                </ConfirmModal>
            )}
            {loginErrorModalOn && (
                <ConfirmModal closeModal={() => setLoginErrorModalOn(!loginErrorModalOn)}>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">
                        로그인 정보가 틀립니다.<br></br>
                        다시 입력해주세요.
                    </h2>
                    <button style={{ fontSize: "1.5rem" }} onClick={() => setLoginErrorModalOn(false)}>확인</button>
                </ConfirmModal>
            )}
        </MoreWrapper>
    );
}

export default ChangePwPage;