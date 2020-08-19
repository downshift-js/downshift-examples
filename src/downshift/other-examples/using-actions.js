// here's an example of how to use action helpers to make state changes
// you want to change how downshift works based on custom event handlers
// In this example, we use the `openMenu` action and the `onFocus` event
// handler to make the menu automatically open whenever the user focuses
// on the input.

// The `onFocus` property we pass to `getInputProps` is a normal event handler
// function. We pass it the value `openMenu` because that happens to be what
// we want to run, but we could also do:
// {
//   onFocus: event => {
//     openMenu()
//     // whatever else we want to do
//   }
// }
import React from 'react'
import Downshift from 'downshift'

const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

export default () => (
  <Downshift
    onChange={selection => {
      if (selection) {
        alert(`You selected ${selection.value}`)
      } else {
        alert('selection cleared')
      }
    }}
    itemToString={item => (item ? item.value : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      openMenu,
    }) => (
      <div>
        <label {...getLabelProps()}>Enter a fruit</label>
        <input
          {...getInputProps({
            // here's the interesting part
            onFocus: openMenu,
          })}
        />
        <ul {...getMenuProps()}>
          {isOpen
            ? items
                .filter(item => !inputValue || item.value.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : null,
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
  </Downshift>
)
