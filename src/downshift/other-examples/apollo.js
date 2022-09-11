import React from 'react'
import {render} from 'react-dom'
import {ApolloProvider, Query} from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Downshift from 'downshift'
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css,
  gqlUri,
  SEARCH_CHARACTERS,
} from '../../shared'

const client = new ApolloClient({
  uri: gqlUri,
})

function ApolloAutocomplete() {
  return (
    <Downshift onChange={(selectedItem) => alert(selectedItem)}>
      {({
        inputValue,
        getInputProps,
        getLabelProps,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
        selectedItem,
        highlightedIndex,
        isOpen,
        clearSelection,
      }) => (
        <div {...css({width: 250, margin: 'auto', position: 'relative'})}>
          <Label {...getLabelProps()}>Choose a character</Label>
          <div {...css({position: 'relative'})}>
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Mr. Nimbus',
              })}
            />
            {selectedItem ? (
              <ControllerButton
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </div>
          <Menu {...getMenuProps({isOpen})}>
            {isOpen && (
              <Query
                query={SEARCH_CHARACTERS}
                variables={{
                  inputValue,
                }}
              >
                {({loading, error, data = {}}) => {
                  if (loading) {
                    return <Item disabled>Loading...</Item>
                  }

                  if (error) {
                    return <Item disabled>Error! ${error.message}</Item>
                  }

                  const {results} = data.characters

                  if (!results || !results.length) {
                    return <Item disabled>No characters found...</Item>
                  }

                  return results.map(({name: item}, index) => (
                    <Item
                      key={item}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItem === item,
                      })}
                    >
                      {item}
                    </Item>
                  ))
                }}
              </Query>
            )}
          </Menu>
        </div>
      )}
    </Downshift>
  )
}

function ApolloExample() {
  return (
    <ApolloProvider client={client}>
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
      >
        <ApolloAutocomplete />
      </div>
    </ApolloProvider>
  )
}

render(<ApolloExample />, document.getElementById('root'))
