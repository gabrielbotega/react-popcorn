import { useState } from "react";
import { ButtonToggle } from "../Atoms/ButtonToggle";

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ButtonToggle onSetIsOpen={setIsOpen}>{isOpen ? "–" : "+"}</ButtonToggle>

      {isOpen && children}
    </div>
  );
}
