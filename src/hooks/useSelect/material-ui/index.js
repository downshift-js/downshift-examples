import React from 'react'
import {render} from 'react-dom'
import {useSelect} from 'downshift'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Button,
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

import {items, useStyles} from './utils'

function DropdownSelect() {
  const classes = useStyles()
  const itemToString = (item) => item.primary
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
  return (
    <div>
      <FormLabel {...getLabelProps()}>Choose an employee:</FormLabel>
      <Button
        component="div"
        variant="contained"
        color="secondary"
        className={classes.button}
        {...getToggleButtonProps()}
      >
        {selectedItem ? itemToString(selectedItem) : 'Employees'}
        <ExpandMoreIcon className={classes.rightIcon} />
      </Button>
      <List className={classes.root} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            return (
              <ListItem
                key={`${item.primary}-${index}`}
                className={
                  index === highlightedIndex ? classes.highlighted : undefined
                }
                {...getItemProps({
                  item: item,
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

render(<DropdownSelect />, document.getElementById('root'))
