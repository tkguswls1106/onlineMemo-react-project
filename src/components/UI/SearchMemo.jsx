import React, { useState } from "react";
import styled from "styled-components";
import '../../App.css';

const Button = styled.button`
    background-color: #645b56;
    color: white;
    border-radius: 5px;
    // font-family: "jua";
    font-size: 1.64rem;
`;

function SearchMemo(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        // 이 내부 코드는 실험용이다.
        alert('검색한 텍스트: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" value={value} placeholder="검색" onChange={handleChange}
                style={{ border:"solid 2px #645b56", borderRadius:"3px",
                    width: "91px", height: "18.2px", fontSize: "1.5rem", fontFamily: "jua", color:"#463f3a"}}
            />
            &nbsp;<Button type="submit"><i className="fa fa-search" aria-hidden="true"></i></Button>
        </form>
    );
}

export default SearchMemo;