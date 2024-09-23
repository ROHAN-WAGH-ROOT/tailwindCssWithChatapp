import React, { ReactNode } from "react";

type card = {
  className: string;
  children: ReactNode;
};

export default function Card({ className, children }: card) {
  return <div className={className}>{children}</div>;
}
