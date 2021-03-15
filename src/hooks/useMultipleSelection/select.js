import React from 'react'
import {render} from 'react-dom'
import {useSelect, useMultipleSelection} from 'downshift'
import {
  items,
  menuMultipleStyles,
  selectedItemStyles,
  selectedItemIconStyles,
} from '../../shared'

function DropdownMultipleSelect() {
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({initialSelectedItems: [items[0], items[1]]})
  const getFilteredItems = (items) =>
    items.filter((item) => selectedItems.indexOf(item) < 0)
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useSelect({
    items: getFilteredItems(items),
    onStateChange: ({type, selectedItem}) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.MenuBlur:
          if (selectedItem) {
            addSelectedItem(selectedItem)
            selectItem(null)
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
      <button
        {...getToggleButtonProps(getDropdownProps({preventKeyAction: isOpen}))}
      >
        {selectedItem || 'Elements'}
      </button>
      <ul {...getMenuProps()} style={menuMultipleStyles}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
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
