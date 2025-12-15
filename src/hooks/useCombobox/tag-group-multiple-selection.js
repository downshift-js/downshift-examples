import React from 'react'
import {render} from 'react-dom'
import {useTagGroup, useCombobox} from 'downshift'

import {
  items as elements,
  tagGroupStyle,
  tagRemoveButtonStyle,
  tagStyle,
  activeTagStyle,
  comboboxStyles,
  menuStyles,
} from '../../shared'

function TagGroup() {
  const initialItems = elements.slice(0, 5)

  const [inputValue, setInputValue] = React.useState('')
  const {
    addItem,
    getTagProps,
    getTagRemoveProps,
    getTagGroupProps,
    items,
    activeIndex,
  } = useTagGroup({initialItems})
  const itemsToAdd = elements.filter(
    (item) =>
      !items.includes(item) &&
      (inputValue === '' ||
        item.toLowerCase().startsWith(inputValue.toLowerCase())),
  )
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: itemsToAdd,
    inputValue,
    onInputValueChange: ({inputValue}) => {
      setInputValue(inputValue)
    },
    onSelectedItemChange({selectedItem}) {
      if (selectedItem) {
        addItem(selectedItem)
      }
    },
    selectedItem: null,
    stateReducer(_state, {changes}) {
      if (changes.selectedItem) {
        return {...changes, inputValue: '', highlightedIndex: 0, isOpen: true}
      }

      return changes
    },
  })
  return (
    <div>
      <div
        {...getTagGroupProps({'aria-label': 'tag group basic example'})}
        style={tagGroupStyle}
      >
        {items.map((color, index) => (
          <span
            key={color}
            {...getTagProps({index, 'aria-label': color})}
            style={{
              ...tagStyle,
              ...(activeIndex === index ? activeTagStyle : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            onFocus={(e) => (e.currentTarget.style.backgroundColor = 'red')}
            onBlur={(e) => (e.currentTarget.style.backgroundColor = 'green')}
          >
            {color}
            <button
              type="button"
              {...getTagRemoveProps({index, 'aria-label': 'remove'})}
              style={tagRemoveButtonStyle}
            >
              &#10005;
            </button>
          </span>
        ))}
      </div>
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
          itemsToAdd.map((item, index) => (
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
      {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens here. */}
      <div tabIndex="0" />
    </div>
  )
}

render(<TagGroup />, document.getElementById('root'))
