import React, {useState} from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import {items, menuStyles, comboboxStyles} from '../../shared'

function stateReducer(state, actionAndChanges) {
  const {type, changes} = actionAndChanges
  // returning an uppercased version of the item string.
  switch (type) {
    case useCombobox.stateChangeTypes.InputChange:
      return {
        // return normal changes.
        ...changes,
        // but taking the change from default reducer and uppercasing it.
        inputValue: changes.inputValue.toUpperCase(),
      }
    // also on selection.
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.InputBlur:
      return {
        ...changes,
        // if we had an item highlighted in the previous state.
        ...(state.highlightedIndex > -1 && {
          // we will show it uppercased.
          inputValue: changes.inputValue.toUpperCase(),
        }),
      }
    default:
      return changes // otherwise business as usual.
  }
}
function DropdownCombobox() {
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
    stateReducer,
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

render(<DropdownCombobox />, document.getElementById('root'))
