import React from 'react'
import {render} from 'react-dom'
import {useSelect} from 'downshift'
import {items, menuStyles} from '../../shared'

function DropdownSelect() {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
  } = useSelect({items})
  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <button
        type="button"
        {...getToggleButtonProps({
          onMouseEnter: () => {
            openMenu()
          },
        })}
      >
        {selectedItem || 'Elements'}
      </button>
      <button
        type="button"
        tabindex={-1}
        onClick={() => {
          selectItem(null)
        }}
        aria-label="clear selection"
      >
        &#215;
      </button>
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
      {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens here. */}
      <div tabIndex="0" />
    </div>
  )
}

render(<DropdownSelect />, document.getElementById('root'))
