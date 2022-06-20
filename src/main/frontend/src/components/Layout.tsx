import React, { ReactElement } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactElement;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
