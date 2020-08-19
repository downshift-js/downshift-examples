import React from 'react'
import VirtualList from 'react-tiny-virtual-list'
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
  getItems,
  itemToString,
} from '../../shared'

function ExampleDownshift({itemToString, items, ...rest}) {
  return (
    <Downshift itemToString={itemToString} itemCount={items.length} {...rest}>
      {({
        getLabelProps,
        getInputProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div {...css({width: 250, margin: 'auto', position: 'relative'})}>
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
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </div>
          {!isOpen || !items.length ? null : (
            <Menu>
              <VirtualList
                width={300}
                scrollToIndex={highlightedIndex || 0}
                scrollToAlignment="auto"
                height={items.length < 5 ? items.length * 42 : 200}
                itemCount={items.length}
                itemSize={42}
                renderItem={({index, style}) => (
                  <Item
                    key={items[index].id}
                    {...getItemProps({
                      style,
                      item: items[index],
                      index,
                      isActive: highlightedIndex === index,
                      isSelected: selectedItem === items[index],
                    })}
                  >
                    {itemToString(items[index])}
                  </Item>
                )}
              />
            </Menu>
          )}
        </div>
      )}
    </Downshift>
  )
}

class App extends React.Component {
  allItems = starWarsNames.all.map(s => ({name: s, id: s.toLowerCase()}))
  state = {items: this.allItems}
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({items: getItems(changes.inputValue)})
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  }
  handleChange = (selectedItem, downshiftState) => {
    this.setState({items: this.allItems})
    // handle the new selectedItem here
  }

  render() {
    return (
      <div
        {...css({
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        })}
      >
        <h2>Windowing with downshift and react-tiny-virtual-list</h2>
        <ExampleDownshift
          onStateChange={this.handleStateChange}
          onChange={this.handleChange}
          items={this.state.items}
          itemToString={itemToString}
        />
      </div>
    )
  }
}

export default App
