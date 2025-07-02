import React, { ReactNode } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";


interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
