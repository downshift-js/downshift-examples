import React from 'react'
import Downshift from 'downshift'
import {List} from 'react-virtualized'
import debounce from 'debounce-fn'
import {fetchContacts} from './utils'
import {ComposeMail, Recipient} from './components'
import {css} from '../../shared'

class RecipientInput extends React.Component {
  input = React.createRef()
  state = {selectedContacts: []}
  handleChange = (selectedContact, downshift) => {
    this.setState(
      ({selectedContacts}) => ({
        selectedContacts: [...selectedContacts, selectedContact],
      }),
      () => {
        downshift.reset()
        this.props.onChange(this.state.selectedContacts)
      },
    )
  }
  removeContact(contact) {
    this.setState(
      ({selectedContacts}) => ({
        selectedContacts: selectedContacts.filter(c => c !== contact),
      }),
      () => {
        this.input.current.focus()
        this.props.onChange(this.state.selectedContacts)
      },
    )
  }
  handleInputKeyDown = ({
    event,
    isOpen,
    selectHighlightedItem,
    highlightedIndex,
    reset,
    inputValue,
  }) => {
    if (event.key === 'Backspace' && !event.target.value) {
      // remove the last input
      this.setState(
        ({selectedContacts}) => ({
          selectedContacts: selectedContacts.length
            ? selectedContacts.slice(0, selectedContacts.length - 1)
            : [],
        }),
        () => {
          reset()
          this.props.onChange(this.state.selectedContacts)
        },
      )
    } else if (isOpen && ['Tab', ',', ';'].includes(event.key)) {
      event.preventDefault()
      if (highlightedIndex != null) {
        selectHighlightedItem()
      } else {
        this.setState(
          ({selectedContacts}) => ({
            selectedContacts: [
              ...selectedContacts,
              {
                id: inputValue.toLowerCase(),
                email: inputValue,
                name: inputValue,
              },
            ],
          }),
          () => {
            reset()
            this.props.onChange(this.state.selectedContacts)
          },
        )
      }
    }
  }
  itemToString = i => {
    return i ? (i.name === i.email ? i.name : `${i.name} (${i.email})`) : ''
  }
  render() {
    const {selectedContacts} = this.state
    return (
      <Downshift
        itemToString={this.itemToString}
        selectedItem={null}
        onChange={this.handleChange}
        defaultHighlightedIndex={0}
      >
        {({
          getLabelProps,
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          toggleMenu,
          clearSelection,
          highlightedIndex,
          selectHighlightedItem,
          setHighlightedIndex,
          reset,
          inputValue,
          clearItems,
          setItemCount,
        }) => (
          <div>
            <label {...getLabelProps({style: {display: 'none'}})}>
              Select your recipients
            </label>
            <div
              {...css({
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              })}
            >
              {selectedContacts.map(c => (
                <Recipient
                  key={c.id}
                  isValid={c.email.includes('@')}
                  onRemove={() => this.removeContact(c)}
                >
                  {this.itemToString(c)}
                </Recipient>
              ))}
              <input
                {...getInputProps({
                  ref: this.input,
                  onKeyDown: event =>
                    this.handleInputKeyDown({
                      event,
                      selectHighlightedItem,
                      highlightedIndex,
                      isOpen,
                      reset,
                      inputValue,
                    }),
                  placeholder: 'Enter recipient',
                  ...css({
                    flex: 1,
                    border: 'none',
                    paddingTop: 10,
                    paddingBottom: 10,
                    outline: 'none',
                    width: '100%',
                    minWidth: '100',
                  }),
                })}
              />
            </div>
            {!isOpen ? null : (
              <ul {...getMenuProps({style: {padding: 0, margin: 0}})}>
                <FetchContacts
                  searchValue={inputValue}
                  omitContacts={selectedContacts}
                  onLoaded={({contacts}) => {
                    clearItems()
                    if (contacts) {
                      setHighlightedIndex(contacts.length ? 0 : null)
                      setItemCount(contacts.length)
                    }
                  }}
                >
                  {({loading, contacts, error}) => (
                    <div
                      {...css({
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: 300,
                        maxHeight: 280,
                        overflow: 'scroll',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(0,0,0,.2)',
                      })}
                    >
                      {loading ? (
                        <div {...css({padding: 10})}>loading...</div>
                      ) : error ? (
                        <div {...css({padding: 10})}>error...</div>
                      ) : contacts.length ? (
                        <ContactList
                          highlightedIndex={highlightedIndex}
                          getItemProps={getItemProps}
                          contacts={contacts}
                        />
                      ) : (
                        <div {...css({padding: 10})}>no results...</div>
                      )}
                    </div>
                  )}
                </FetchContacts>
              </ul>
            )}
          </div>
        )}
      </Downshift>
    )
  }
}

function ContactList({highlightedIndex, getItemProps, contacts}) {
  const rowHeight = 40
  const fullHeight = contacts.length * rowHeight
  return (
    <List
      width={300}
      scrollToIndex={highlightedIndex || 0}
      height={fullHeight > 280 ? 280 : fullHeight}
      rowCount={contacts.length}
      rowHeight={rowHeight}
      rowRenderer={({key, index, style}) => (
        <li
          key={contacts[index].id}
          {...getItemProps({
            item: contacts[index],
            index,
            style,
            ...css({
              cursor: 'pointer',
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: highlightedIndex === index ? '#eee' : 'white',
            }),
          })}
        >
          <div>{contacts[index].name}</div>
          <div {...css({fontSize: '0.8em', marginLeft: 2})}>
            {contacts[index].email}
          </div>
        </li>
      )}
    />
  )
}

class FetchContacts extends React.Component {
  static initialState = {loading: false, error: null, contacts: []}
  requestId = 0
  state = FetchContacts.initialState
  mounted = false
  reset(overrides) {
    this.setState({...FetchContacts.initialState, ...overrides})
  }
  fetch = debounce(
    () => {
      if (!this.mounted) {
        return
      }
      const {omitContacts, limit} = this.props
      this.requestId++
      fetchContacts(this.props.searchValue, {
        omitContacts,
        limit,
        requestId: this.requestId,
      }).then(
        ({response: {data: contacts, requestId}}) => {
          if (this.mounted && requestId === this.requestId) {
            this.props.onLoaded({contacts})
            this.setState({loading: false, contacts})
          }
        },
        ({response: {error, requestId}}) => {
          if (this.mounted && requestId === this.requestId) {
            this.props.onLoaded({error})
            this.setState({loading: false, error})
          }
        },
      )
    },
    {wait: 300},
  )
  prepareFetch() {
    this.reset({loading: true})
  }
  componentDidMount() {
    this.mounted = true
    this.prepareFetch()
    this.fetch()
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.omitContacts !== this.props.omitContacts
    ) {
      this.prepareFetch()
      this.fetch()
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  render() {
    return this.props.children(this.state)
  }
}

class App extends React.Component {
  state = {selection: null}
  render() {
    return (
      <div>
        <ComposeMail>
          <RecipientInput onChange={selection => this.setState({selection})} />
        </ComposeMail>
        <hr />
        Selection: <pre>{JSON.stringify(this.state.selection, null, 2)}</pre>
      </div>
    )
  }
}

export default App
