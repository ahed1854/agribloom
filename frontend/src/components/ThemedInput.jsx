import React from 'react';
import styled from 'styled-components';

const Input = () => {
    return (
        <StyledWrapper>
            <div className="coolinput">
                <label htmlFor="input" className="text">Name:</label>
                <input type="text" placeholder="Write here..." name="input" className="input" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
.coolinput {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: static;
    max-width: 240px;
}

.coolinput label.text {
    font-size: 0.75rem;
    color: #4a6048;
    font-weight: 700;
    position: relative;
    top: 0.5rem;
    margin: 0 0 0 7px;
    padding: 0 3px;
    background: #e8e8e8;
    width: fit-content;
}

.coolinput input[type=text].input {
    padding: 11px 10px;
    font-size: 0.75rem;
    border: 2px #4a6048 solid;
    border-radius: 5px;
    background: #eef3fd;
}

.coolinput input[type=text].input:focus {
    outline: none;
}`;

export default Input;
