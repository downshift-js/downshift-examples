import React from 'react'
import ReactDOM from 'react-dom'
import {useVirtual} from 'react-virtual'
import {useSelect} from 'downshift'
import {items, menuStyles, toggleElementStyles} from '../../shared'

export default function App() {
  const listRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 2,
  })

  const {
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    selectedItem,
    getToggleButtonProps,
    isOpen,
  } = useSelect({
    items,
    scrollIntoView: () => {},
    onHighlightedIndexChange: ({highlightedIndex, type}) => {
      if (type !== useSelect.stateChangeTypes.MenuMouseLeave) {
        rowVirtualizer.scrollToIndex(highlightedIndex)
      }
    },
  })

  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div
        style={toggleElementStyles}
        data-testid="select-toggle-button"
        {...getToggleButtonProps()}
      >
        {selectedItem ?? 'Elements'}
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
