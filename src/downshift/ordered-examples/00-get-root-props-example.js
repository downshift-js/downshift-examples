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
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      getRootProps,
    }) => (
      <div>
        <label {...getLabelProps()}>Enter a fruit:</label>
        <div
          style={comboboxStyles}
          {...getRootProps({}, {suppressRefError: true})}
        >
          <input {...getInputProps()} />
          <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
            &#8595;
          </button>
        </div>
        <ul {...getMenuProps()} style={menuStyles}>
          {isOpen
            ? items
                .filter((item) => !inputValue || item.value.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.value}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>,
  document.getElementById('root'),
)
