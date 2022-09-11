import React from 'react'
import {render} from 'react-dom'
import {useSelect} from 'downshift'
import Frame, {FrameContextConsumer} from 'react-frame-component'
import {items, menuStyles, toggleElementStyles} from '../../shared'

function DropdownSelect({environment}) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({items, environment})
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
      {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens here. */}
      <div tabIndex="0" />
    </div>
  )
}

render(
  <Frame style={{height: 300}}>
    <FrameContextConsumer>
      {
        // Callback is invoked with iframe's window and document instances
        ({document, window}) => (
          // Render Children
          <DropdownSelect environment={window} />
        )
      }
    </FrameContextConsumer>
  </Frame>,
  document.getElementById('root'),
)
