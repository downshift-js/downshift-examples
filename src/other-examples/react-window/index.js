import React, {PureComponent} from 'react'
import {FixedSizeList as List} from 'react-window'
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

class ItemRenderer extends PureComponent {
  render() {
    const {
      items,
      getItemProps,
      highlightedIndex,
      selectedItem,
    } = this.props.data
    const item = items[this.props.index]
    return (
      <Item
        {...getItemProps({
          style: this.props.style,
          item,
          index: this.props.index,
          isActive: highlightedIndex === this.props.index,
          isSelected: selectedItem === item,
        })}
      >
        {itemToString(item)}
      </Item>
    )
  }
}

class ExampleDownshift extends React.Component {
  listRef = React.createRef()

  scrollToItem = highlightedIndex => {
    if (this.listRef.current !== null) {
      this.listRef.current.scrollToItem(highlightedIndex)
    }
  }

  stateReducer = (state, changes) => {
    // this scrolls the react-window list to the highlightedIndex
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownArrowUp:
        this.scrollToItem(changes.highlightedIndex)
        return changes
      case Downshift.stateChangeTypes.keyDownArrowDown:
        this.scrollToItem(changes.highlightedIndex)
        return changes
      default:
        return changes
    }
  }
  render() {
    const {itemToString, items, ...rest} = this.props
    return (
      <Downshift
        itemToString={itemToString}
        itemCount={items.length}
        stateReducer={this.stateReducer}
        defaultHighlightedIndex={0}
        {...rest}
      >
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
                  onKeyDown: event => {
                    if (this.listRef.current !== null) {
                      this.listRef.current.scrollToItem(0 || highlightedIndex)
                    }
                  },
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
                <List
                  ref={this.listRef}
                  useIsScrolling
                  width={300}
                  height={items.length < 5 ? items.length * 42 : 200}
                  itemCount={items.length}
                  itemSize={42}
                  itemData={{
                    items,
                    getItemProps,
                    highlightedIndex,
                    selectedItem,
                    listRef: this.listRef,
                  }}
                >
                  {ItemRenderer}
                </List>
              </Menu>
            )}
          </div>
        )}
      </Downshift>
    )
  }
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
        <h2>Windowing with downshift and react-window</h2>
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
