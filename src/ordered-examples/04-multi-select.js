// You'll find that downshift is a primitive component and
// you'll be most successful wrapping it with another component
// like the MultiDownshift one you see here:

import React from 'react'
import Downshift from 'downshift'
import {Menu, ControllerButton, Item, ArrowIcon, css, getItems} from '../shared'

class MultiDownshift extends React.Component {
  state = {selectedItems: []}

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const {onSelect, onChange} = this.props
      const {selectedItems} = this.state
      if (onSelect) {
        onSelect(selectedItems, this.getStateAndHelpers(downshift))
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift))
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem = (item, cb) => {
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
    const {getRemoveButtonProps, removeItem} = this
    return {
      getRemoveButtonProps,
      removeItem,
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
  input = React.createRef()
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
        <h1 {...css({textAlign: 'center'})}>Multi-selection example</h1>
        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}
        >
          {({
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            // note that the getRemoveButtonProps prop getter and the removeItem
            // action are coming from MultiDownshift composibility for the win!
            getRemoveButtonProps,
            removeItem,

            isOpen,
            inputValue,
            selectedItems,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{width: 500, margin: 'auto', position: 'relative'}}>
              <div
                {...css({
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: '6px',
                  borderTopRadius: 6,
                  borderBottomRightRadius: isOpen ? 0 : 6,
                  borderBottomLeftRadius: isOpen ? 0 : 6,
                  padding: 10,
                  paddingRight: 50,
                  boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
                  borderColor: '#96c8da',
                  borderTopWidth: '1',
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderStyle: 'solid',
                })}
                onClick={() => {
                  toggleMenu()
                  !isOpen && this.input.current.focus()
                }}
              >
                <div
                  {...css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  })}
                >
                  {selectedItems.length > 0
                    ? selectedItems.map(item => (
                        <div
                          key={item.id}
                          {...css({
                            margin: 2,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 8,
                            paddingRight: 8,
                            display: 'inline-block',
                            wordWrap: 'none',
                            backgroundColor: '#ccc',
                            borderRadius: 2,
                          })}
                        >
                          <div
                            {...css({
                              display: 'grid',
                              gridGap: 6,
                              gridAutoFlow: 'column',
                              alignItems: 'center',
                            })}
                          >
                            <span>{item.name}</span>
                            <button
                              {...getRemoveButtonProps({item})}
                              {...css({
                                cursor: 'pointer',
                                lineHeight: 0.8,
                                border: 'none',
                                backgroundColor: 'transparent',
                                padding: '0',
                                fontSize: '16px',
                              })}
                            >
                              𝘅
                            </button>
                          </div>
                        </div>
                      ))
                    : 'Select a value'}
                  <input
                    {...getInputProps({
                      ref: this.input,
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                      ...css({
                        border: 'none',
                        marginLeft: 6,
                        flex: 1,
                        fontSize: 14,
                        minHeight: 27,
                      }),
                    })}
                  />
                </div>
                <ControllerButton
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              </div>
              <Menu {...getMenuProps({isOpen})}>
                {isOpen
                  ? getItems(inputValue).map((item, index) => (
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
                    ))
                  : null}
              </Menu>
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}

export default App
