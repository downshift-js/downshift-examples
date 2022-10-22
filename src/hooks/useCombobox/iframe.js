import React, {useState} from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import Frame, {FrameContextConsumer} from 'react-frame-component'
import {items, menuStyles, comboboxStyles} from '../../shared'

function DropdownCombobox({environment}) {
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
    environment,
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

render(
  <Frame style={{height: 300}}>
    <FrameContextConsumer>
      {
        // Callback is invoked with iframe's window and document instances
        ({document, window}) => (
          // Render Children
          <DropdownCombobox environment={window} />
        )
      }
    </FrameContextConsumer>
  </Frame>,
  document.getElementById('root'),
)
