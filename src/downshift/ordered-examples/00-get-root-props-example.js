import React from 'react'
import {render} from 'react-dom'
import Downshift from 'downshift'
import {items, menuStyles, comboboxStyles} from '../../shared'

render(
  <Downshift
    onChange={(selection) =>
      alert(selection ? `You selected ${selection}` : 'Selection Cleared')
    }
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
        <label {...getLabelProps()}>Choose an element:</label>
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
                .filter((item) => !inputValue || item.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>,
  document.getElementById('root'),
)
