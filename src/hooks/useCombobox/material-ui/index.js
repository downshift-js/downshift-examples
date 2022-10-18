import * as React from 'react'
import {render} from 'react-dom'
import {useCombobox} from 'downshift'
import {
  Input,
  IconButton,
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {items, useStyles, comboboxStyles} from './utils'

function DropdownCombobox() {
  const classes = useStyles()
  const itemToString = (item) => (item ? item.primary : '')
  const [inputItems, setInputItems] = React.useState(items)
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
        items.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    },
  })
  return (
    <div>
      <FormLabel {...getLabelProps()}>Choose an employee:</FormLabel>
      <div style={comboboxStyles}>
        <Input
          placeholder="Employees"
          {...getInputProps({refKey: 'inputRef'})}
        />
        <IconButton
          color="secondary"
          className={classes.button}
          {...getToggleButtonProps()}
        >
          <ExpandMoreIcon className={classes.rightIcon} />
        </IconButton>
      </div>
      <List className={classes.root} {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => {
            return (
              <ListItem
                key={`${item.primary}-${index}`}
                className={
                  index === highlightedIndex ? classes.highlighted : undefined
                }
                {...getItemProps({
                  item,
                  index,
                })}
              >
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                />
              </ListItem>
            )
          })}
      </List>
    </div>
  )
}

render(<DropdownCombobox />, document.getElementById('root'))
