import React from 'react'
import {render} from 'react-dom'
import {useSelect} from 'downshift'
import {items, menuStyles, toggleElementStyles} from '../../shared'

function stateReducer(state, actionAndChanges) {
  const {type, changes} = actionAndChanges
  switch (type) {
    case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
      const nextItemIndex = items.indexOf(state.selectedItem)
      if (nextItemIndex === items.length - 1) {
        return {selectedItem: items[0]}
      }
      return {selectedItem: items[nextItemIndex + 1]}
    case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
      const previousItemIndex = items.indexOf(state.selectedItem)
      if (previousItemIndex === 0) {
        return {selectedItem: items[items.length - 1]}
      }
      return {selectedItem: items[previousItemIndex - 1]}
    default:
      return changes // otherwise business as usual.
  }
}
function DropdownSelect() {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({items, stateReducer})
  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div style={toggleElementStyles} {...getToggleButtonProps()}>
        {selectedItem ?? 'Elements'}
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item: item, index})}
            >
              {item}
            </li>
          ))}
      </ul>
      {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens in codesandbox. */}
      <div tabIndex="0" />
    </div>
  )
}

render(<DropdownSelect />, document.getElementById('root'))
