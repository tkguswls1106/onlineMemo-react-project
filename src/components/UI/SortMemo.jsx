import React, {useState} from "react";
import styled from "styled-components";
import '../../App.css';

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
            <select value={value} onChange={handleChange}>
                <option value="all-memo">전체 메모</option>
                <option value="private-memo">개인 메모</option>
                <option value="group-memo">공동 메모</option>
                <option value="star-memo">즐겨찾기 메모</option>
            </select>
            &nbsp;<button type="submit">정렬</button>
        </form>
    );
}

export default SortMemo;