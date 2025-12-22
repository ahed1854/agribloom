// import React, { useState, useEffect } from "react";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import colors from "../context/color";


// const ThemedButton = ({ children, onClick, type = "primary" }) => {
//     const getColor = () => {
//         switch (type) {
//             case "secondary":
//                 return colors.red;
//             case "danger":
//                 return colors.danger;
//             default:
//                 return colors.primary;
//         }
//     };

//     return (
//         <button
//             style={{
//                 backgroundColor: getColor(),
//                 color: colors.text,
//                 padding: "10px 18px",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//             }}
//             onClick={onClick}
//         >
//             {children}
//         </button>
//     );
// };

// export default ThemedButton;



import React, { useState } from "react";
import colors from "../context/color";

const ThemedButton = ({ children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            style={{
                backgroundColor: isHovered ? "#ffffff" : "#703030", // يتغير اللون عند hover
                color: isHovered ? "#703030" : "#ffffff",           // النص يتغير عند hover
                padding: "10px 18px",
                border: `2px solid ${isHovered ? "#703030" : "transparent"}`,
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                transform: isHovered ? "scale(1.1)" : "scale(1)", // يكبر عند hover
                transition: "all 0.3s ease", // حركة سلسة
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}   // عند دخول الماوس
            onMouseLeave={() => setIsHovered(false)}  // عند خروج الماوس
        >
            {children}
        </button>
    );
};

export default ThemedButton;

