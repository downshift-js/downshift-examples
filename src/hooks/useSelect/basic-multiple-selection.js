import React, {useState} from 'react'
import {render} from 'react-dom'
import {useSelect} from 'downshift'
import {items, menuStyles, toggleElementStyles} from '../../shared'

function stateReducer(state, actionAndChanges) {
  const {changes, type} = actionAndChanges
  switch (type) {
    case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
    case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
      }
    default:
      return changes
  }
}
function DropdownSelect() {
  const [selectedItems, setSelectedItems] = useState([])
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    stateReducer,
    selectedItem: null,
    onSelectedItemChange: ({selectedItem}) => {
      if (!selectedItem) {
        return
      }
      const index = selectedItems.indexOf(selectedItem)
      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ])
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)])
      } else {
        setSelectedItems([...selectedItems, selectedItem])
      }
    },
  })
  const buttonText = selectedItems.length
    ? `${selectedItems.length} elements selected`
    : 'Elements'
  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div style={toggleElementStyles} {...getToggleButtonProps()}>
        {buttonText}
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
                'aria-selected': selectedItems.includes(item),
              })}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                value={item}
                onChange={() => null}
              />
              <span />
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

render(<DropdownSelect />, document.getElementById('root'))
