import React, {useState} from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import {menuStyles, comboboxStyles} from '../../shared'

export const items = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
  'Bohrium',
  'Hassium',
  'Meitnerium',
  'Darmstadtium',
  'Roentgenium',
  'Copernicium',
  'Nihonium',
  'Flerovium',
  'Moscovium',
  'Livermorium',
  'Tennessine',
  'Oganesson',
]

const filterByName = (userInput) => {
  return items.filter((item) => {
    return item.toLowerCase().indexOf(userInput.toLowerCase()) !== -1
  })
}

function DropdownCombobox() {
  const [inputItems, setInputItems] = useState(items)

  const stateReducer = (state, {type, changes}) => {
    switch (type) {
      case useCombobox.stateChangeTypes.InputChange:
        return {
          ...changes,
          userInput: true,
        }
      case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
      case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
        return {
          ...changes,
          inputValue: inputItems[changes.highlightedIndex],
          userInput: false,
        }
      default:
        return changes // return normal changes.
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({userInput, inputValue}) => {
      if (userInput) {
        setInputItems(filterByName(inputValue))
      }
    },
    stateReducer,
  })

  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div style={comboboxStyles} {...getComboboxProps()}>
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

render(<DropdownCombobox />, document.getElementById('root'))
