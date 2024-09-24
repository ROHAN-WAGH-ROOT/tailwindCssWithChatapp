import React from "react";
import Logo from "../../assets/Vector.png";

type ImageButtonProps = {
  onClick: () => void;
};

const ImageButton: React.FC<ImageButtonProps> = ({ onClick }) => {
  return (
    <div className="rounded-full cursor-pointer" onClick={onClick}>
      <img
        className="align-middle items-center justify-center m-auto flex w-auto p-3 rounded-full"
        src={Logo}
        alt="logo"
      />
    </div>
  );
};

export default ImageButton;
