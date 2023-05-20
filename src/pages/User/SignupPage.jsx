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

    .fa-user-plus {
        font-size: 2.1rem;
        
        /* border: solid 2px #463f3a;
        padding: 2.3px;
        border-radius: 42%; */
    }

    .inputInform::placeholder {
        font-size: 4.8px;
        font-weight: bold;
    }

    .wrongName, .wrongId, .wrongPw, .wrongConfirm {
        border: 3.3px solid #dd2b2b;
        border-radius: 3px;
    }
`;

function SignupPage(props) {
    const navigate = useNavigate();

    const [successModalOn, setSuccessModalOn] = useState(false);
    const [duplicateErrorModalOn, setDuplicateErrorModalOn] = useState(false);
    const [confirmErrorModalOn, setConfirmErrorModalOn] = useState(false);

    const [nameValue, setNameValue] = useState("");
    const [loginIdValue, setLoginIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    const [isWrongName, setIsWrongName] = useState(false);
    const [isWrongId, setIsWrongId] = useState(false);
    const [isWrongPw, setIsWrongPw] = useState(false);
    const [isWrongConfirm, setIsWrongConfirm] = useState(false);

    const [isWrongResult, setIsWrongResult] = useState(false);

    const [tokenUserId, setTokenUserId] = useState();

    const handleChangeName = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9ㄱ-ㅎ가-힣]/gi, '');
        setNameValue(event.target.value);
    }

    const handleChangeLoginId = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9]/gi, '');
        setLoginIdValue(event.target.value);
    }

    const handleChangePw = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9!@#$%^&*()~]/gi, '');
        setPwValue(event.target.value);
    }

    const handleChangeConfirm = (event) => {
        event.target.value = event.target.value.replace(/[^a-z0-9!@#$%^&*()~]/gi, '');
        setConfirmValue(event.target.value);
    }

    const checkInput = (nameValue, loginIdValue, pwValue, confirmValue) => {
        if (nameValue.length < 2)
            setIsWrongName(true);
        else
            setIsWrongName(false);

        if (loginIdValue.length < 4 || 16 < loginIdValue.length)
            setIsWrongId(true);
        else
            setIsWrongId(false);

        if (pwValue.length < 8)
            setIsWrongPw(true);
        else
            setIsWrongPw(false);

        if (pwValue !== confirmValue)
            setIsWrongConfirm(true)
        else
            setIsWrongConfirm(false);
    }

    const handleSignupClick = async (nameValue, loginIdValue, pwValue, confirmValue, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        checkInput(nameValue, loginIdValue, pwValue, confirmValue);

        if (!(nameValue.length < 2 ||
            (loginIdValue.length < 4 || 16 < loginIdValue.length) ||
            pwValue.length < 8 ||
            pwValue !== confirmValue)) {

            await axios
                .post('/signup', {
                    loginId: loginIdValue,
                    firstPw: pwValue,
                    username: nameValue
                })
                .then((response) => {
                    setSuccessModalOn(true);
                    setIsWrongResult(false);
                    console.log(response);
                })
                .catch((error) => {
                    setDuplicateErrorModalOn(true);
                    console.log(error);
                })
        }
        else if (pwValue !== confirmValue) {
            setIsWrongResult(true);
            setConfirmErrorModalOn(true);
        }
        else {
            setIsWrongResult(true);
        }
    }

    async function checkLogin() {  // 로그인 상태 여부 확인하고 해당 사용자의 userId 반환
        await axios
            .get('/auth')
            .then((response) => {
                setTokenUserId(response.data.data.id);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
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
                환영합니다!&nbsp;&nbsp;<i className="fa fa-smile-o" aria-hidden="true"></i>
            </h2>
            <h2>
                <i className="fa fa-user-plus" aria-hidden="true"></i><br></br>
                회원가입<br></br>
                <hr></hr>
                <div className="flex-container">
                    &nbsp;&nbsp;이름:&nbsp;&nbsp;<input type="text" className={isWrongName ? 'wrongName inputInform' : 'inputInform'} placeholder=" 한글,영문,숫자 (2자 이상)" size="17" onChange={handleChangeName} />
                </div>
                <div className="flex-container">
                    &nbsp;&nbsp;id:&nbsp;&nbsp;<input type="text" className={isWrongId ? 'wrongId inputInform' : 'inputInform'} placeholder=" 영문,숫자 (4~16자)" maxLength="16" onChange={handleChangeLoginId} />
                </div>
                <div className="flex-container">
                    pw:&nbsp;&nbsp;<input type="text" className={isWrongPw ? 'wrongPw inputInform' : 'inputInform'} placeholder=" 영문,숫자,특수문자 (8자 이상)" onChange={handleChangePw} />
                </div>
                <div className="flex-container">
                    pw 확인:&nbsp;&nbsp;<input type="text" className={isWrongConfirm ? 'wrongConfirm inputInform' : 'inputInform'} placeholder=" pw 재입력" size="14" onChange={handleChangeConfirm} />
                </div>
                <div style={{ lineHeight: "40%" }}><br></br></div>
                <div className="flex-container">
                    <button onClick={(event) => handleSignupClick(nameValue, loginIdValue, pwValue, confirmValue)}>가입 완료</button>
                </div>
                {isWrongResult &&
                    <span style={{ fontSize: "1.35rem", color: "#dd2b2b" }}>!!! 입력 양식을 재확인해주세요 !!!</span>
                }
            </h2>
            {successModalOn && (
                <ConfirmModal closeModal={() => setSuccessModalOn(!successModalOn)}>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    <h2 className="successSignupModalTitle">
                        회원가입 성공.<br></br>
                        로그인 페이지로 이동합니다.
                    </h2>
                    <button style={{ fontSize: "1.5rem",  }} onClick={() => { setSuccessModalOn(false); navigate('/login'); }}>이동</button>
                </ConfirmModal>
            )}
            {duplicateErrorModalOn && (
                <ConfirmModal closeModal={() => setDuplicateErrorModalOn(!duplicateErrorModalOn)}>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">
                        이미 존재하는 id입니다.<br></br>
                        다시 입력해주세요.
                    </h2>
                    <button style={{ fontSize: "1.5rem" }} onClick={() => setDuplicateErrorModalOn(false)}>확인</button>
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
        </MoreWrapper>
    );
}

export default SignupPage;