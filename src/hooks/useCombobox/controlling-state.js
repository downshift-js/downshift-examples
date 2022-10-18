import React, {useState} from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import {items, menuStyles, comboboxStyles} from '../../shared'

function DropdownCombobox({selectedItem, handleSelectedItemChange}) {
  const [inputItems, setInputItems] = useState(items)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    },
  })
  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div style={comboboxStyles}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          inputItems.map((item, index) => (
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
      <DropdownCombobox
        selectedItem={selectedItem}
        handleSelectedItemChange={handleSelectedItemChange}
      />
      <DropdownCombobox
        selectedItem={selectedItem}
        handleSelectedItemChange={handleSelectedItemChange}
      />
    </div>
  )
}

render(<ControlledComboboxes />, document.getElementById('root'))
