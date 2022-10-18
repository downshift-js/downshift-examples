import React from 'react'
import {render} from 'react-dom'
import {
  InstantSearch,
  Highlight,
  connectAutoComplete,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import {useCombobox} from 'downshift'

function RawAutoComplete({refine, hits}) {
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    selectedItem,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    items: hits,
    itemToString: (item) => item.name,
    onInputValueChange: ({inputValue}) => refine(inputValue),
    onChange: (item) => alert(JSON.stringify(item)),
  })

  return (
    <div>
      <div>
        <input {...getInputProps()} />
        <div {...getMenuProps()}>
          {isOpen &&
            hits.map((item, index) => (
              <div
                key={item.objectID}
                {...getItemProps({
                  index,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? 'gray' : 'white',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                  },
                })}
              >
                <Highlight attribute="name" hit={item} tagName="mark" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const AutoCompleteWithData = connectAutoComplete(RawAutoComplete)

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76',
)

function Example() {
  return (
    <InstantSearch indexName="actors" searchClient={searchClient}>
      Algolia{' '}
      <a href="https://community.algolia.com/react-instantsearch/">
        React InstantSearch
      </a>{' '}
      example
      <AutoCompleteWithData />
    </InstantSearch>
  )
}
render(<Example />, document.getElementById('root'))
