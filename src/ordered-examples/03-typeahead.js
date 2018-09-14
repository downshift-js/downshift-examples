// A typeahead component is one which accepts whatever value
// the user types as the selectedItem in addition to allowing
// the user to select a shown menu item.
import React from 'react'
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
  getStringItems,
} from '../shared'

class App extends React.Component {
  state = {value: ''}
  handleStateChange = changes => {
    if (changes.hasOwnProperty('selectedItem')) {
      this.setState({value: changes.selectedItem})
    } else if (changes.hasOwnProperty('inputValue')) {
      this.setState({value: changes.inputValue})
    }
  }
  render() {
    const {value} = this.state
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
          textAlign: 'center',
        })}
      >
        <div>
          <div>Current Value:</div>
          <div>{value || '[start typing...]'}</div>
        </div>
        <Downshift selectedItem={value} onStateChange={this.handleStateChange}>
          {({
            getLabelProps,
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            getItemProps,
            isOpen,
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
                  <ControllerButton {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </ControllerButton>
                )}
              </div>
              <div {...css({position: 'relative'})}>
                <Menu {...getMenuProps({isOpen})}>
                  {isOpen
                    ? getStringItems(inputValue).map((item, index) => (
                        <Item
                          key={item.id}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item,
                          })}
                        >
                          {item}
                        </Item>
                      ))
                    : null}
                </Menu>
              </div>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

export default App
