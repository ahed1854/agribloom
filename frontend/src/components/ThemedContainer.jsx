// ThemedContainer.jsx
import React from "react";
import colors from "../context/color";

const ThemedContainer = ({ children }) => {
    return (
        <div style={{ backgroundColor: colors.beig, maxWidth: "100%", margin: "0 auto", padding: "0px" }}>
            {children}
        </div>
    );
};

export default ThemedContainer;
