import * as React from 'react'
import Downshift from 'downshift'

import Display from './components/display'
import {
  MenuContainer,
  Menu,
  MenuItem,
  PointerWrap,
  Pointer,
} from './components/menu'
import {ToggleButton} from './components/togglebutton'
import {Label} from './components/label'
import SelectOnKeyPressContainer from './selectOnKeyPressContainer'

const render = props => downshiftProps => {
  const {tooltip, width, items, renderItem, itemToString} = props

  const {
    isOpen,
    toggleMenu,
    getItemProps,
    selectedItem,
    highlightedIndex,
    openMenu,
    getInputProps,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
  } = downshiftProps

  const menuProps = {
    width,
    isOpen,
    items,
    getItemProps,
    selectedItem,
    renderItem,
    itemToString,
    highlightedIndex,
    tooltip,
    getMenuProps,
  }

  return (
    <div>
      <Label getLabelProps={getLabelProps} />
      <Display
        toggleMenu={toggleMenu}
        getInputProps={getInputProps}
        openMenu={openMenu}
        isOpen={isOpen}
      />
      <ToggleButton
        getToggleButtonProps={getToggleButtonProps}
        isOpen={isOpen}
        toggleMenu={toggleMenu}
      />
      {generateMenu(menuProps)}
    </div>
  )
}

const generateMenu = menuProps => {
  const {
    width,
    isOpen,
    items,
    getItemProps,
    selectedItem,
    renderItem,
    itemToString,
    highlightedIndex,
    tooltip,
    getMenuProps,
  } = menuProps
  const lastIndex = items.length - 1

  const defaultItemToString = item => (item === null ? '' : String(item))

  const resolveItemAsString = (itemToString = defaultItemToString, item) => {
    return itemToString(item)
  }

  const list = items.map((item, index) => {
    const isLast = lastIndex === index

    const itemString = resolveItemAsString(itemToString, item)

    const props = {
      highlighted: highlightedIndex === index,
      selected: selectedItem === item,
      isLast,
      key: `${itemString}-${index}`,
      item,
    }

    return (
      <MenuItem {...getItemProps({...props})}>
        {renderItem(item, index)}
      </MenuItem>
    )
  })
  return (
    <MenuContainer isOpen={isOpen} width={width}>
      <PointerWrap tooltip={tooltip} isOpen={isOpen}>
        <Pointer
          turnColorHighlighted={highlightedIndex === items.length - 1}
          turnColorSelected={selectedItem === items[items.length - 1]}
          isOpen={isOpen}
        />
      </PointerWrap>
      <Menu {...getMenuProps()} isOpen={isOpen}>
        {list}
      </Menu>
    </MenuContainer>
  )
}

const CustomDropdown = props => {
  const {...restProps} = props
  return (
    <Downshift {...props.downShiftProps}>
      {downshiftProps => {
        return (
          <div>
            <SelectOnKeyPressContainer
              items={props.items}
              itemToString={props.downShiftProps.itemToString}
              downshiftProps={downshiftProps}
              children={render(restProps)(downshiftProps)}
            />
          </div>
        )
      }}
    </Downshift>
  )
}

export default CustomDropdown
