import React, {useEffect, useState} from 'react'
import {render} from 'react-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
} from '@apollo/client'
import {useSelect} from 'downshift'
import {
  toggleElementStyles,
  menuStyles,
  SEARCH_CHARACTERS,
  gqlUri,
} from '../../shared'

const client = new ApolloClient({
  uri: gqlUri,
  cache: new InMemoryCache(),
})

function ApolloUseSelectExample() {
  return (
    <ApolloProvider client={client}>
      <ApolloUseSelect />
    </ApolloProvider>
  )
}

function ApolloUseSelect() {
  const {loading, error, data} = useQuery(SEARCH_CHARACTERS)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (data) {
      const {characters} = data
      setItems(characters.results)
    }
  }, [data])

  const itemToString = (item) => (item ? item.name : '')

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString,
  })

  if (error) return `Error! ${error.message}`

  return (
    <div>
      <label {...getLabelProps()}>Characters</label>
      <div style={toggleElementStyles} {...getToggleButtonProps()}>
        {selectedItem ? itemToString(selectedItem) : 'Elements'}
      </div>
      <ul style={menuStyles} {...getMenuProps()}>
        {isOpen && loading ? (
          <li>...Loading</li>
        ) : (
          isOpen &&
          items.map(({name: item}, index) => (
            <li
              style={{
                backgroundColor: highlightedIndex === index ? 'gray' : 'white',
                fontWeight: selectedItem === item ? 'bold' : 'normal',
              }}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

render(<ApolloUseSelectExample />, document.getElementById('root'))
