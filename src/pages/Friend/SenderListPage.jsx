import React, { useState, useEffect } from "react";
import styled from "styled-components";
import '../../App.css';
import { useNavigate, useParams } from "react-router-dom";
import BasicWrapper from "../../components/Styled/BasicWrapper";
import FriendOptionDropdownCenter from "../../components/UI/FriendOptionDropdownCenter";
import SenderList from "../../components/List/SenderList";
import { CheckToken } from "../../utils/CheckToken";

const MoreWrapper = styled(BasicWrapper)`
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

    .fa-users {
        font-size: 1.65rem;
    }

    h2 {
        text-align: center;
        font-size: 2rem;
        color: #463f3a;

        margin-top: 8px;
        margin-bottom: 18.5px;
    }

    button {
        background-color: #463f3a;
        color: white;
        border-radius: 5px;
        font-family: "jua";
        font-size: 1.8rem;

        &:hover {
            cursor: pointer;
            background-color: #463f3aa4;
        }
    }

    .acceptButton {
        background-color: #a1c4df;
        color: #463f3a;
        font-size: 1.7rem;

        &:hover {
            background-color: #a1c4dfa4;
        }

        @media(max-width: 381px) {
            font-size: 1.35rem;
        }
    }

    .refuseButton {
        background-color: #dfafa1;
        color: #463f3a;
        font-size: 1.7rem;

        &:hover {
            background-color: #dfb1a1a4;
        }

        @media(max-width: 381px) {
            font-size: 1.35rem;
        }
    }
`;

function SenderListPage(props) {
    const navigate = useNavigate();

    const { userId } = useParams();

    const dropItemsFriends = [
        {
            name: "> 친구 목록",
            link: `/users/${userId}/friends`,
        },
        {
            name: "+ 친구 요청",
        },
    ]

    useEffect(() => {
        CheckToken();
    }, []);

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>
                &nbsp;&nbsp;
                받은 친구요청 목록
                &nbsp;&nbsp;
                <FriendOptionDropdownCenter
                    dropMain={<span><button><i className="fa fa-users" aria-hidden="true"></i>&nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i></button></span>}
                    dropItems={dropItemsFriends}
                />
            </h2>
            <SenderList userId={userId} />
        </MoreWrapper>
    );
}

export default SenderListPage;