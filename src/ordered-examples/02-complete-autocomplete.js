// This is a more complete example of an autocomplete component
// with custom styling, filtering of objects, and more.
// Much of the irrelevant bits are in the ../shared file.
// which you may also want to become familiar with as many
// examples will use those as well.
import React, {Component} from 'react'
import matchSorter from 'match-sorter'
import starWarsNames from 'starwars-names'
import Downshift from 'downshift'
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css,
  itemToString,
  getItems,
} from '../shared'

class App extends React.Component {
  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
      >
        <Downshift
          onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={itemToString}
        >
          {({
            getLabelProps,
            getInputProps,
            getButtonProps,
            getItemProps,
            isOpen,
            toggleMenu,
            clearSelection,
            selectedItem,
            inputValue,
            highlightedIndex,
          }) => (
            <div {...css({width: 250, margin: 'auto'})}>
              <Label {...getLabelProps()}>Find a Star Wars character</Label>
              <div {...css({position: 'relative'})}>
                <Input
                  {...getInputProps({
                    isOpen,
                    placeholder: 'Enter a name',
                  })}
                />
                {selectedItem ? (
                  <ControllerButton
                    onClick={clearSelection}
                    aria-label="clear selection"
                  >
                    <XIcon />
                  </ControllerButton>
                ) : (
                  <ControllerButton {...getButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </ControllerButton>
                )}
              </div>
              <div {...css({position: 'relative'})}>
                {!isOpen ? null : (
                  <Menu>
                    {getItems(inputValue).map((item, index) => (
                      <Item
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem === item,
                        })}
                      >
                        {itemToString(item)}
                      </Item>
                    ))}
                  </Menu>
                )}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

export default App
