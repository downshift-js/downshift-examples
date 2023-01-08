import React from 'react'
import {render} from 'react-dom'
import {useSelect, useMultipleSelection} from 'downshift'
import {
  items as elements,
  menuMultipleStyles,
  selectedItemStyles,
  selectedItemIconStyles,
  toggleElementStyles,
} from '../../shared'

const initialSelectedItems = [elements[0], elements[1]]

function getFilteredItems(selectedItems) {
  return elements.filter((element) => !selectedItems.includes(element))
}

function DropdownMultipleSelect() {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({initialSelectedItems})
  const items = getFilteredItems(selectedItems)
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem: null,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    items,
    stateReducer: (state, actionAndChanges) => {
      const {changes, type} = actionAndChanges
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
        default:
          return changes
      }
    },
    onStateChange: ({type, selectedItem: newSelectedItem}) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          if (newSelectedItem) {
            addSelectedItem(newSelectedItem)
          }
          break
        default:
          break
      }
    },
  })
  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      {selectedItems.map((selectedItem, index) => (
        <span
          style={selectedItemStyles}
          key={`selected-item-${index}`}
          {...getSelectedItemProps({selectedItem, index})}
        >
          {selectedItem}
          <span
            style={selectedItemIconStyles}
            onClick={() => removeSelectedItem(selectedItem)}
          >
            &#10005;
          </span>
        </span>
      ))}
      <div
        style={toggleElementStyles}
        {...getToggleButtonProps(getDropdownProps({preventKeyAction: isOpen}))}
      >
        {selectedItem ?? 'Elements'}
      </div>
      <ul {...getMenuProps()} style={menuMultipleStyles}>
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

render(<DropdownMultipleSelect />, document.getElementById('root'))
