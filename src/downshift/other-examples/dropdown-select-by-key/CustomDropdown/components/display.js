import React from "react";
import styled from "styled-components";
import whatInput from "what-input";

import { PointerWrap, Pointer } from "./menu";

const DialogBubble = styled.div`
  width: 274px;
  overflow-x: hidden;
  overflow-y: visible;
  position: absolute;
  left: 0;
  height: 169px;
  border: 1px solid #097e82;
  border-radius: 70%;
  margin-top: 16px;
  background-color: transparent;

`;

const DisplayField = styled.input`
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 40px;
  cursor: pointer;
  width: 200px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 1.33;
  height: 20px;
  text-align: center;
  border: none;
  background-color: transparent;
  padding-left: 0;
  padding-right: 8px;
  &::placeholder {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.2px;
  }

`;

export const DialogWrapper = styled.div`
  width: 100%;
  height: 186px;
  display: flex;
  position: relative;
`;

export default ({ openMenu, getInputProps, onClick, isOpen, toggleMenu }) => {
  return (
    <DialogWrapper isOpen={isOpen}>
      <PointerWrap tooltip={true} isOpen={!isOpen}>
        <Pointer />
      </PointerWrap>
      <DialogBubble />
      <DisplayField
        {...getInputProps({
          onClick: event => {
            toggleMenu();
          },
          "aria-label": "Social Media Dropdown"
        })}
        readOnly
        tabIndex="0"
        placeholder="Click to pick a Social Media"
        onFocus={() => {
          if (whatInput.ask() === "keyboard") {
            openMenu();
          }
        }}
      />
    </DialogWrapper>
  );
};
