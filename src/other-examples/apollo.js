import React from 'react'
import {ApolloProvider, Query} from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
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
} from '../shared'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cj5k7w90bjt2i0122z6v0syvu',
})

const SEARCH_COLORS = gql`
  query AllColors($inputValue: String!) {
    allColors(filter: {name_contains: $inputValue}) {
      name
    }
  }
`

function ApolloAutocomplete() {
  return (
    <Downshift onChange={selectedItem => alert(selectedItem)}>
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
          <Label {...getLabelProps()}>Select a color</Label>
          <div {...css({position: 'relative'})}>
            <Input
              {...getInputProps({
                isOpen,
                placeholder: 'Enter a color',
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
                query={SEARCH_COLORS}
                variables={{
                  inputValue,
                }}
              >
                {({loading, error, data: {allColors = []} = {}}) => {
                  if (loading) {
                    return <Item disabled>Loading...</Item>
                  }

                  if (error) {
                    return <Item disabled>Error! ${error.message}</Item>
                  }

                  return allColors.map(({name: item}, index) => (
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

export default ApolloExample
