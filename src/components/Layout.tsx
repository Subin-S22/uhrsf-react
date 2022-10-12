import React from "react";

interface Props {
  children: React.ReactNode;
  name: string;
}

export default function Layout({ children, name }: Props) {
  return <>{children}</>;
}
