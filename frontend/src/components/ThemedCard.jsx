// // ThemedCard.jsx
// import React from "react";
// import colors from "../context/color";


// const ThemedCard = ({ title, children }) => {
//     return (
//         <div
//             style={{
//                 border: `1px solid ${colors.green}`,
//                 backgroundColor: colors.lightblue,
//                 borderRadius: "8px",
//                 padding: "20px",
//                 margin: "15px 0",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//         >
//             <h3 style={{ color: colors.primary }}>{title}</h3>
//             <div>{children}</div>
//         </div>
//     );
// };

// export default ThemedCard;


import React from "react";
import styled from "styled-components";

const ThemedCard = ({ title, children }) => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="bg" />
                <div className="blob" />
                <div className="content">
                    {title && <h3>{title}</h3>}
                    <p>{children}</p>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 250px;
    height: 300px;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 10px 10px 40px #fff7e9, -10px -10px 40px #eae0be;
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 240px;
    height: 290px;
    z-index: 1;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    outline: 2px solid white;
  }

  .blob {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #703030;
    filter: blur(12px);
    animation: blob-bounce 5s infinite ease;
  }

  .content {
    position: relative;
    z-index: 3; /* النص فوق الخلفية والبلوب */
    text-align: center;
    padding: 20px;
  }

  .content h3 {
    margin-bottom: 10px;
    color: #4a6048;
  }

  .content p {
    color: #333;
    font-size: 14px;
  }

  @keyframes blob-bounce {
    0% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
    25% {
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }
    50% {
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }
    75% {
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }
    100% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }
`;

export default ThemedCard;
