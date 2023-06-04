import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';

const Button = styled.button`
    background-color: #645b56;
    color: white;
    border-radius: 5px;
    // font-family: "jua";
    font-size: 1.64rem;

    &:hover {
        cursor: pointer;
        background-color: #4a433f;
    }
`;

function SearchMemo(props) {
    const navigate = useNavigate();

    const { userId } = props;

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSearchClick = (event) => {
        navigate(`/users/${userId}/memos?search=${value}`);
    }

    return (
        <div>
            <input 
                type="text" value={value} placeholder="검색" onChange={handleChange}
                style={{ border:"solid 2px #645b56", borderRadius:"3px",
                    width: "91px", height: "18.2px", fontSize: "1.5rem", fontFamily: "jua", color:"#463f3a"}}
            />
            &nbsp;<Button onClick={handleSearchClick}><i className="fa fa-search" aria-hidden="true"></i></Button>
        </div>
    );
}

export default SearchMemo;