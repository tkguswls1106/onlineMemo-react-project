import React, {useState} from "react";
import styled from "styled-components";
import '../../App.css';

const Button = styled.button`
    background-color: #645b56;
    color: white;
    border-radius: 5px;
    font-family: "jua";
    font-size: 1.7rem;
`;

function SortMemo(props) {
    const [value, setValue] = useState('all-memo');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        // 이 내부 코드는 실험용이다.
        alert('선택된 정렬방식: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <select 
                value={value} onChange={handleChange}
                style={{ border: "solid 2px #645b56", borderRadius: "3px",
                    height: "23px", weight: "102px", fontSize: "1.5rem", fontFamily: "jua", color:"#463f3a" }}
            >
                <option value="all-memo">전체 메모</option>
                <option value="private-memo">개인 메모</option>
                <option value="group-memo">공동 메모</option>
                <option value="star-memo">즐겨찾기 개인메모</option>
            </select>
            &nbsp;<Button type="submit">정렬</Button>
        </form>
    );
}

export default SortMemo;