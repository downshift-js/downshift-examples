import React from 'react'
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
} from '../../shared'
import Axios from './axios'

const baseEndpoint = 'https://api.github.com/search/repositories'

class AxiosExample extends React.Component {
  render() {
    return (
      <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
      >
        <Downshift>
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
          }) => {
            return (
              <div {...css({width: 250, margin: 'auto', position: 'relative'})}>
                <Label {...getLabelProps()}>Select a Github repository</Label>
                <div {...css({position: 'relative'})}>
                  <Input
                    {...getInputProps({
                      isOpen,
                      placeholder: 'Search repository',
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
                  {(() => {
                    if (!isOpen) {
                      return null
                    }

                    if (!inputValue) {
                      return (
                        <Item disabled>You have to enter a search query</Item>
                      )
                    }

                    return (
                      <Axios url={baseEndpoint} params={{q: inputValue}}>
                        {({loading, error, data: {items = []} = {}}) => {
                          if (loading) {
                            return <Item disabled>Loading...</Item>
                          }

                          if (error) {
                            return <Item disabled>Error! ${error}</Item>
                          }

                          if (!items.length) {
                            return <Item disabled>No repositories found</Item>
                          }

                          return items.map(({id, name: item}, index) => (
                            <Item
                              key={id}
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
                      </Axios>
                    )
                  })()}
                </Menu>
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }
}

export default AxiosExample
