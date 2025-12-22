import React from "react";
import styled from "styled-components";
import colors from "../context/color";


const NormalCard = ({ title, body, buttonText = "Read More", onClick }) => {
    return (
        <StyledCard>
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{body}</p>
            </div>
            <div className="card-footer">
                <button className="card-button" onClick={onClick}>
                    {buttonText}
                </button>
            </div>
        </StyledCard>
    );
};

const StyledCard = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15); /* ظل خفيف */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); /* ظل عند الهوفر */
  }

  .card-body {
    flex: 1;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #2d5a27;
  }

  .card-text {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.4;
  }

  .card-footer {
    margin-top: 15px;
    text-align: right;
  }

  .card-button {
    background-color: #008bf8;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 8px 14px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #006fd6;
      transform: scale(1.05);
    }
  }
`;

export default NormalCard;
