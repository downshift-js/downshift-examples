import React, {Component} from 'react'
import {render} from 'react-dom'
import {
  Downshift,
  DownshiftInput,
  DownshiftLabel,
  DownshiftButton,
  DownshiftItem,
  withDownshift,
} from './downshift-hoc'

import {
  css,
  getItems,
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
} from '../../shared'

const MyDownshiftButton = withDownshift(
  ({downshift: {selectedItem, isOpen, clearSelection}}) =>
    selectedItem ? (
      <ControllerButton onClick={clearSelection} aria-label="clear selection">
        <XIcon />
      </ControllerButton>
    ) : (
      <DownshiftButton component={ControllerButton}>
        <ArrowIcon isOpen={isOpen} />
      </DownshiftButton>
    ),
)

const MyDownshiftInput = withDownshift(({downshift: {isOpen}}) => (
  <DownshiftInput
    component={Input}
    placeholder="Enter a name"
    isOpen={isOpen}
  />
))

const MyDownshiftMenu = withDownshift(
  ({
    downshift: {
      inputValue,
      isOpen,
      highlightedIndex,
      selectedItem,
      itemToString,
    },
  }) => (
    <Menu isOpen={isOpen}>
      {getItems(inputValue).map(
        (item, index) =>
          isOpen ? (
            <DownshiftItem
              component={Item}
              key={item.id}
              item={item}
              index={index}
              isActive={highlightedIndex === index}
              isSelected={selectedItem === item}
            >
              {itemToString(item)}
            </DownshiftItem>
          ) : null,
      )}
    </Menu>
  ),
)

function ExampleDownshift({items, ...rest}) {
  return (
    <Downshift
      {...css({width: 250, margin: 'auto', position: 'relative'})}
      downshiftOptions={rest}
    >
      <DownshiftLabel>Find a Star Wars character</DownshiftLabel>
      <div style={{position: 'relative'}}>
        <MyDownshiftInput />
        <MyDownshiftButton />
      </div>
      <MyDownshiftMenu items={items} />
    </Downshift>
  )
}

function App() {
  return (
    <div
      {...css({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      })}
    >
      <h2>Downshift HOC + Compound Components example</h2>
      <Downshift
        onChange={selection =>
          selection ? alert(`You selected ${selection.name}`) : null
        }
        itemToString={item => (item ? item.name : '')}
      >
        <div {...css({width: 250, margin: 'auto', position: 'relative'})}>
          <DownshiftLabel>Find a Star Wars character</DownshiftLabel>
          <div style={{position: 'relative'}}>
            <MyDownshiftInput />
            <MyDownshiftButton />
          </div>
          <MyDownshiftMenu />
        </div>
      </Downshift>
    </div>
  )
}

export default App
