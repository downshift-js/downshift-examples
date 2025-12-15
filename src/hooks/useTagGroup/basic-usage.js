import React from 'react'
import {render} from 'react-dom'
import {useTagGroup} from 'downshift'

import {
  items as elements,
  tagGroupStyle,
  tagRemoveButtonStyle,
  tagStyle,
  itemToAddStyle,
  activeTagStyle,
} from '../../shared'

function TagGroup() {
  const initialItems = elements.slice(0, 5)
  const {
    addItem,
    getTagProps,
    getTagRemoveProps,
    getTagGroupProps,
    items,
    activeIndex,
  } = useTagGroup({initialItems})
  const itemsToAdd = elements.filter((color) => !items.includes(color))

  return (
    <div>
      <div
        {...getTagGroupProps({'aria-label': 'tag group basic example'})}
        style={tagGroupStyle}
      >
        {items.map((color, index) => (
          <span
            key={color}
            {...getTagProps({index, 'aria-label': color})}
            style={{
              ...tagStyle,
              ...(activeIndex === index ? activeTagStyle : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            onFocus={(e) => (e.currentTarget.style.backgroundColor = 'red')}
            onBlur={(e) => (e.currentTarget.style.backgroundColor = 'green')}
          >
            {color}
            <button
              type="button"
              {...getTagRemoveProps({index, 'aria-label': 'remove'})}
              style={tagRemoveButtonStyle}
            >
              &#10005;
            </button>
          </span>
        ))}
      </div>
      <div>Add more items:</div>
      <ul>
        {itemsToAdd.map((item) => (
          <li key={item}>
            <button
              tabIndex={0}
              style={itemToAddStyle}
              onClick={() => addItem(item)}
              onKeyDown={({key}) => key === 'Enter' && addItem(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

render(<TagGroup />, document.getElementById('root'))
