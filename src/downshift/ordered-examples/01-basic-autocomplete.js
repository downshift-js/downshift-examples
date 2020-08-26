import React from 'react'
import {render} from 'react-dom'
import Downshift from 'downshift'
import {menuStyles, comboboxStyles} from '../../shared'

const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

render(
  <Downshift
    onChange={(selection) =>
      alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
    }
    itemToString={(item) => (item ? item.value : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      getLabelProps,
      getToggleButtonProps,
      inputValue,
      highlightedIndex,
      selectedItem,
      isOpen,
    }) => (
      <div style={comboboxStyles}>
        <label {...getLabelProps()}>Enter a fruit:</label>
        <input {...getInputProps()} />
        <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
          &#8595;
        </button>
        <ul {...getMenuProps()} style={menuStyles}>
          {isOpen &&
            items
              .filter((item) => !inputValue || item.value.includes(inputValue))
              .map((item, index) => (
                <li
                  {...getItemProps({
                    key: `${item.value}${index}`,
                    item,
                    index,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item.value}
                </li>
              ))}
        </ul>
      </div>
    )}
  </Downshift>,
  document.getElementById('root'),
)
