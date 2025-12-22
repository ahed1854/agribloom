// ThemedText.jsx
import React from "react";
import colors from "../context/color";

const ThemedText = ({ children, size = "16px", weight = "normal" }) => {
    return (
        <p
            style={{
                fontSize: size,
                fontWeight: weight,
                color: colors.text,
                lineHeight: "1.6",
            }}
        >
            {children}
        </p>
    );
};

export default ThemedText;
