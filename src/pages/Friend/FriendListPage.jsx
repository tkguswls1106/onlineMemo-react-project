import React from "react";
import styled from "styled-components";
import '../../App.css';
import { useNavigate, useParams } from "react-router-dom";
import BasicWrapper from "../../components/Styled/BasicWrapper";
import FriendList from "../../components/List/FriendList";
import FriendOptionDropdownCenter from "../../components/UI/FriendOptionDropdownCenter";

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

    .deleteFriendButton {
        background-color: #dfafa1;
        color: #463f3a;
        font-size: 1.7rem;

        &:hover {
            background-color: #dfb1a1a4;
        }

        @media(max-width: 375px) {
            font-size: 1.4rem;
        }
    }
`;

function FriendListPage(props) {
    const navigate = useNavigate();

    const { userId } = useParams();

    const dropItemsFriends = [
        {
            name: "> 수신 목록",
            link: `/users/${userId}/senders`,
        },
        {
            name: "+ 친구 요청",
            link: "#",
        },
    ]

    return (
        <MoreWrapper>
            <h2>
                <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>
                &nbsp;&nbsp;
                친구 목록
                &nbsp;&nbsp;
                <FriendOptionDropdownCenter
                    dropMain={<span><button><i className="fa fa-users" aria-hidden="true"></i>&nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i></button></span>}
                    dropItems={dropItemsFriends}
                />
            </h2>
            <FriendList userId={userId} />
        </MoreWrapper>
    );
}

export default FriendListPage;