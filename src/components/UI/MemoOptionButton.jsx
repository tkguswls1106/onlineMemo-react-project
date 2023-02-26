import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'

function MemoOptionButton(props) {

    return (
        <div style={{ display: "inline-block" }}>
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
    );
}

export default MemoOptionButton;