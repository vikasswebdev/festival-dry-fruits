import React from "react";

const Message = ({ children, varient }) => {
  return (
    <div className={`message ${varient}`}>
      <p style={{ textAlign: "center", textTransform: "uppercase" }}>
        {children}
      </p>
    </div>
  );
};

export default Message;
