import React, {useState, useEffect} from 'react'
import {render} from 'react-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
} from '@apollo/client'
import {SEARCH_CHARACTERS, gqlUri} from '../../../shared'
import {useCombobox} from 'downshift'
import {menuStyles, comboboxStyles} from './utils'

const client = new ApolloClient({
  uri: gqlUri,
  cache: new InMemoryCache(),
})

function ApolloUseComboboxExample() {
  return (
    <ApolloProvider client={client}>
      <ApolloUseCombobox />
    </ApolloProvider>
  )
}

function ApolloUseCombobox() {
  const {loading, error, data} = useQuery(SEARCH_CHARACTERS)
  const [allItems, setAllItems] = useState([])
  const [inputItems, setInputItems] = useState([])

  useEffect(() => {
    if (data) {
      const {characters} = data
      setAllItems(characters.results)
      setInputItems(characters.results)
    }
  }, [data])

  const itemToString = (item) => (item ? item.name : '')

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        allItems.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    },
  })

  if (error) return `Error! ${error.message}`

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
        {isOpen && loading ? (
          <li>...Loading</li>
        ) : (
          isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {itemToString(item)}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

render(<ApolloUseComboboxExample />, document.getElementById('root'))
