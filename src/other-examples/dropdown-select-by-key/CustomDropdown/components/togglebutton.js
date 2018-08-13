import React from "react";
import styled from "styled-components";

import ChevronUp from "../images/arrow_up.svg";
import ChevronDown from "../images/arrow_down.svg";

const ToggleButtonContainer = styled.div`
  position: absolute;
  z-index: 200;
  top: 416px;
  transform:translateX(166px);
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid lightgrey;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  &:focus {
    border: 1px solid #097E82;
    outline: none;
  }
`;

const ToggleButtonImg = styled.img`
  width: 12px;
`;

export const ToggleButton = props => {
  const { isOpen, getToggleButtonProps } = props;

  const arrowIcon = isOpen ? ChevronUp : ChevronDown;
  const altText = isOpen ? "Close" : "Open";

  return (
    <ToggleButtonContainer tabIndex="0" {...getToggleButtonProps()}>
      <ToggleButtonImg
        src={arrowIcon}
        alt={altText}
        id={`togglebutton-${altText}`}
      />
    </ToggleButtonContainer>
  );
};
