import React, {useState} from 'react'
import {render} from 'react-dom'
import {useSelect} from 'downshift'
import {items, menuStyles, toggleElementStyles} from '../../shared'

function DropdownSelect({selectedItem, handleSelectedItemChange}) {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
  })
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
              {...getItemProps({item, index})}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}
function ControlledComboboxes() {
  const [selectedItem, setSelectedItem] = useState(null)
  function handleSelectedItemChange({selectedItem}) {
    setSelectedItem(selectedItem)
  }
  return (
    <div>
      <DropdownSelect
        selectedItem={selectedItem}
        handleSelectedItemChange={handleSelectedItemChange}
      />
      <DropdownSelect
        selectedItem={selectedItem}
        handleSelectedItemChange={handleSelectedItemChange}
      />
    </div>
  )
}

render(<ControlledComboboxes />, document.getElementById('root'))
