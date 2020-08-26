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
      getMenuProps,
      getLabelProps,
      getToggleButtonProps,
      inputValue,
      highlightedIndex,
      selectedItem,
      isOpen,
    }) => (
      <div style={comboboxStyles}>
        <label {...getLabelProps()}>Choose an element:</label>
        <input {...getInputProps()} />
        <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
          &#8595;
        </button>
        <ul {...getMenuProps()} style={menuStyles}>
          {isOpen &&
            items
              .filter((item) => !inputValue || item.includes(inputValue))
              .map((item, index) => (
                <li
                  {...getItemProps({
                    key: `${item}${index}`,
                    item,
                    index,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item}
                </li>
              ))}
        </ul>
      </div>
    )}
  </Downshift>,
  document.getElementById('root'),
)
