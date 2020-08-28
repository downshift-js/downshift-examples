import React, {useEffect, useState} from 'react'
import {render} from 'react-dom'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client'
import {useSelect} from 'downshift'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cj5k7w90bjt2i0122z6v0syvu',
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
  const {loading, error, data} = useQuery(SEARCH_COLORS)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (data) {
      const {allColors} = data
      setItems(allColors)
    }
  }, [data])

  const itemToString = item => (item ? item.name : '')

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
      <label {...getLabelProps()}>Colors</label>
      <br />
      <button type="button" {...getToggleButtonProps()}>
        {selectedItem ? itemToString(selectedItem) : 'Elements'}
      </button>
      <ul {...getMenuProps()}>
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

const SEARCH_COLORS = gql`
  query AllColors {
    allColors {
      name
    }
  }
`

render(<ApolloUseSelectExample />, document.getElementById('root'))
