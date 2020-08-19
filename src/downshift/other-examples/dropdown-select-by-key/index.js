import React from 'react'
import CustomDropdown from './CustomDropdown/index'
import FeatherIcon from 'feather-icons-react'
import styled from 'styled-components'
import {itemsArray} from './data'
import PenguinImage from './CustomDropdown/images/penguin.png'

const renderSocial = socialMedia => {
  return (
    <Item>
      <Name>{socialMedia.name}</Name>
      <FeatherIcon
        icon={socialMedia.icon}
        style={{fill: 'none', stroke: socialMedia.styleColor}}
        size={20}
      />
    </Item>
  )
}

function App() {
  return (
    <Wrapper role="main">
      <CustomDropdown
        height="fit-content"
        tooltip={true}
        items={itemsArray}
        renderItem={renderSocial}
        downShiftProps={{
          itemToString: selectedItem => {
            if (selectedItem && selectedItem.name) {
              return String(selectedItem.name)
            }
          },
        }}
      />
      <Penguin>
        <img src={PenguinImage} alt="Penguin" />
      </Penguin>
    </Wrapper>
  )
}

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Name = styled.div`
  font-size: 14px;
  letter-spacing: -0.2px;
  color: black;
  padding-right: 8px;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const Penguin = styled.div`
  width: 400px;
  img {
    width: 100%;
  }
`

export default App
