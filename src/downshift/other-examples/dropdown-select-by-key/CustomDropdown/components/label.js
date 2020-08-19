import * as React from 'react'
import styled from 'styled-components'

export const Label = ({getLabelProps}) => {
  return (
    <Wrapper>
      <label {...getLabelProps({onClick: e => e.preventDefault()})}>
        <h1>Downshift Dropdown</h1>
      </label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color:black;
  color: white;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
  letter-spacing: 0.5px;
  position: absolute;
  text-align: center;
  width: 180px;
  left: 50%;
  transform: translateX(-380px);
  top: 380px;
`
