// You'll find that downshift is a primitive component and
// you'll be most successful wrapping it with another component
// like the MultiDownshift one you see here:

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
  itemToString,
  getItems,
} from '../shared'

class MultiDownshift extends React.Component {
  state = {selectedItems: []}

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          isOpen: true,
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      if (this.props.onSelect) {
        this.props.onSelect(
          this.state.selectedItems,
          this.getStateAndHelpers(downshift),
        )
      }
      if (this.props.onChange) {
        this.props.onChange(
          this.state.selectedItems,
          this.getStateAndHelpers(downshift),
        )
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem(item, cb) {
    this.setState(({selectedItems}) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      }
    }, cb)
  }
  addSelectedItem(item, cb) {
    this.setState(
      ({selectedItems}) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  getRemoveButtonProps = ({onClick, item, ...props} = {}) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.removeItem(item)
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const {selectedItems} = this.state
    const {getRemoveButtonProps} = this
    return {
      getRemoveButtonProps,
      selectedItems,
      ...downshift,
    }
  }
  render() {
    const {render, children = render, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={null}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}

class App extends React.Component {
  itemToString = item => (item ? item.name : '')
  handleChange = selectedItems => {
    console.log({selectedItems})
  }
  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
      >
        <h1>CONTRIBUTION OPPORTUNITY</h1>
        <p>
          This example needs some styling help. I never got around to finishing
          it.
        </p>
        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}
        >
          {({
            getButtonProps,
            getRemoveButtonProps,
            isOpen,
            inputValue,
            selectedItems,
            getItemProps,
            highlightedIndex,
          }) => (
            <div style={{width: 500, margin: 'auto'}}>
              <ControllerButton {...getButtonProps()}>
                <div {...css({display: 'flex', marginRight: 8})}>
                  {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <div
                          key={item.id}
                          {...css({marginRight: 4, backgroundColor: '#ccc'})}
                        >
                          {item.name}{' '}
                          <span {...getRemoveButtonProps({item})}>x</span>
                        </div>
                      ))
                    : 'Select a value'}
                </div>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
              {!isOpen ? null : (
                <Menu>
                  {getItems().map((item, index) => (
                    <Item
                      key={item.id}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItems.includes(item),
                      })}
                    >
                      {item.name}
                    </Item>
                  ))}
                </Menu>
              )}
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}

export default App
