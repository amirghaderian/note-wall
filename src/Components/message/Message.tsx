import React, { ReactNode } from "react";

interface MessageProps {
  children: ReactNode; 
}

const Message: React.FC<MessageProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Message;
