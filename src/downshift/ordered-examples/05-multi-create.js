import React from 'react'
import {render} from 'react-dom'
import matchSorter from 'match-sorter'
import {usePopper} from 'react-popper'
import {useCombobox, useMultipleSelection} from 'downshift'
import {useDeepCompareEffect} from 'react-use'
import Highlighter from 'react-highlight-words'
import cc from 'classcat'

const fruits = [
  {value: 'apple', label: 'Apple'},
  {value: 'banana', label: 'Banana'},
  {value: 'mango', label: 'Mango'},
  {value: 'kiwi', label: 'Kiwi'},
]

function defaultOptionFilterFunc(items, inputValue) {
  return matchSorter(items, inputValue, {keys: ['value', 'label']})
}

function defaultItemRenderer(selected) {
  return selected.label
}

function CreateablePicker(props) {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer = defaultItemRenderer,
    placeholder,
    onCreateItem,
    selectedItems,
    ...downshiftProps
  } = props

  const [isCreating, setIsCreating] = React.useState(false)
  const [inputItems, setInputItems] = React.useState(items)
  const disclosureRef = React.useRef(null)
  const popoverRef = React.useRef(null)
  const {styles, attributes, forceUpdate} = usePopper(
    disclosureRef.current,
    popoverRef.current,
    {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
  )

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    activeIndex,
  } = useMultipleSelection({
    ...downshiftProps,
    selectedItems,
    stateReducer: (_, actionAndChanges) => {
      const {type, changes} = actionAndChanges
      switch (type) {
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          return {
            ...changes,
            activeIndex: null,
          }
        default:
          return changes
      }
    },
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
    setHighlightedIndex,
    inputValue,
  } = useCombobox({
    selectedItem: null,
    items: inputItems,
    onInputValueChange: ({inputValue}) => {
      const filteredItems = optionFilterFunc(items, inputValue || '')

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false)
      }

      setInputItems(filteredItems)
    },
    stateReducer: (state, actionAndChanges) => {
      const {changes, type} = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: '',
          }
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: true,
            inputValue: '',
          }
        default:
          return changes
      }
    },
    onStateChange: ({type, selectedItem}) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem)
            } else {
              if (onCreateItem && isCreating) {
                onCreateItem(selectedItem)
                setIsCreating(false)
                setInputItems(items)
              } else {
                addSelectedItem(selectedItem)
              }
            }

            selectItem(null)
          }
          break
        default:
          break
      }
    },
  })

  React.useEffect(() => {
    if (
      inputItems.length === 0 &&
      activeIndex === -1 &&
      inputValue.length > 0
    ) {
      setIsCreating(true)
      // @ts-ignore
      setInputItems([{label: `${inputValue}`, value: inputValue}])
      setHighlightedIndex(0)
    }
  }, [inputItems, setIsCreating, setHighlightedIndex, inputValue, activeIndex])

  useDeepCompareEffect(() => {
    setInputItems(items)
  }, [items])

  React.useEffect(() => {
    if (selectedItems && forceUpdate) {
      forceUpdate()
    }
  }, [selectedItems, forceUpdate])

  const selectedItemValues = selectedItems.map((item) => item.value)

  return (
    <div className="relative w-full">
      <label
        {...getLabelProps({
          className: 'font-medium text-gray-700 text-xs mb-2 block',
        })}
      >
        Choose some fruits:
      </label>
      <div>
        <div className="my-2">
          {selectedItems.map((selectedItem, index) => (
            <span
              key={`selected-item-${index}`}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium leading-4 bg-indigo-100 text-indigo-800 focus:outline-none focus:shadow-outline mr-2"
              {...getSelectedItemProps({selectedItem, index})}
            >
              {selectedItem.label}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeSelectedItem(selectedItem)
                }}
                type="button"
                className="flex-shrink-0 ml-1 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                aria-label="Remove small badge"
              >
                &#10005;
              </button>
            </span>
          ))}
        </div>
        <div className="relative">
          <input
            {...getInputProps(
              getDropdownProps({
                className:
                  'w-full p-2 text-sm focus:outline-none focus:shadow-outline rounded border border-gray-400',
                placeholder,
                onClick: isOpen ? () => {} : openMenu,
                onFocus: isOpen ? () => {} : openMenu,
                ref: disclosureRef,
              }),
            )}
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
            <button
              className="text-gray-600 px-3 h-full focus:outline-none focus:shadow-outline"
              {...getToggleButtonProps()}
              aria-label={'toggle menu'}
            >
              &#8595;
            </button>
          </div>
        </div>
        <div
          style={styles.popper}
          {...attributes.popper}
          {...getMenuProps({ref: popoverRef, className: ' w-full'})}
        >
          <ul className="bg-white shadow-md">
            {isOpen &&
              inputItems.map((item, index) => (
                <li
                  className={cc({
                    'p-2 text-sm bg-white border-b': true,
                    'bg-gray-100': highlightedIndex === index,
                  })}
                  key={`${item.value}${index}`}
                  {...getItemProps({item, index})}
                >
                  {isCreating ? (
                    <p>
                      <span>Create</span>{' '}
                      <span className="font-medium bg-yellow-300 text-yellow-900">
                        {item.label}
                      </span>
                    </p>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {selectedItemValues.includes(item.value) && (
                        <span role="img" aria-label="Selected">
                          ✅
                        </span>
                      )}
                      <Highlighter
                        autoEscape
                        searchWords={[inputValue || '']}
                        textToHighlight={itemRenderer(item)}
                        highlightClassName="bg-yellow-300"
                      ></Highlighter>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [pickerItems, setPickerItems] = React.useState(fruits)
  const [selectedItems, setSelectedItems] = React.useState([])

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  return (
    <CreateablePicker
      placeholder="Type name of fruit"
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  )
}

render(
  <div className="font-sans bg-gray-100 h-screen flex p-4">
    <link
      rel="stylesheet"
      href="https://unpkg.com/tailwindcss@1.8.8/dist/tailwind.min.css"
    />

    <App />
  </div>,
  document.getElementById('root'),
)
