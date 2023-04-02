import React, { useState } from "react";
import styled from "styled-components";
import '../../App.css';

function Checkbox({ friend, friendId, checkedList, checkHandler }) {  // (props) 대신 적어주었음.

    return (
        <label>
            <input
                type="checkbox"
                id={`friend${friendId}`}
                checked={checkedList.includes(friend)}
                onChange={(e) => checkHandler(friend, e)}
                style={{ accentColor: "#8e4c22" }}
            />
        </label>
    );
}

export default Checkbox;