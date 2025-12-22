// ThemedHeading.jsx
import React from "react";
import colors from "../context/color";


const ThemedHeading = ({ children, level = 1 }) => {
    const Tag = `h${level}`;
    return (
        <Tag style={{ color: colors.green, fontWeight: "bold", marginBottom: "20px" }}>
            {children}
        </Tag>
    );
};

export default ThemedHeading;
