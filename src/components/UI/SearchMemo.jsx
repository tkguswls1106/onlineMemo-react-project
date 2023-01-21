import React, { useState } from "react";
import styled from "styled-components";
import '../../App.css';

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
            <input type="text" value={value} placeholder="검색" onChange={handleChange} />
            &nbsp;<button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
    );
}

export default SearchMemo;