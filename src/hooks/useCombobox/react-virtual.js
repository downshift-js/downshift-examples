import React from 'react'
import ReactDOM from 'react-dom'
import {useVirtual} from 'react-virtual'
import {useCombobox} from 'downshift'
import {items, menuStyles} from '../../shared'

function getItems(search) {
  return items.filter((n) => n.toLowerCase().includes(search))
}

export default function App() {
  const [inputValue, setInputValue] = React.useState('')
  const items = getItems(inputValue)

  const listRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 2,
  })

  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    selectedItem,
    isOpen,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    scrollIntoView: () => {},
    onHighlightedIndexChange: ({highlightedIndex, type}) => {
      if (type !== useCombobox.stateChangeTypes.MenuMouseLeave) {
        rowVirtualizer.scrollToIndex(highlightedIndex)
      }
    },
  })

  return (
    <div>
      <div>
        <label {...getLabelProps()}>Choose an element:</label>
        <div>
          <input {...getInputProps({type: 'text'})} />
        </div>
      </div>
      <ul
        {...getMenuProps({
          ref: listRef,
          style: menuStyles,
        })}
      >
        {isOpen && (
          <>
            <li key="total-size" style={{height: rowVirtualizer.totalSize}} />
            {rowVirtualizer.virtualItems.map((virtualRow) => (
              <li
                key={items[virtualRow.index].id}
                {...getItemProps({
                  index: virtualRow.index,
                  item: items[virtualRow.index],
                  style: {
                    backgroundColor:
                      highlightedIndex === virtualRow.index
                        ? 'lightgray'
                        : 'inherit',
                    fontWeight:
                      selectedItem &&
                      selectedItem.id === items[virtualRow.index].id
                        ? 'bold'
                        : 'normal',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  },
                })}
              >
                {items[virtualRow.index]}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
