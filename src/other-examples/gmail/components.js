import React from 'react'
import {css} from '../../shared'

function ComposeMail({children}) {
  return (
    <div {...css({border: '1px solid gray'})}>
      <div
        {...css({
          backgroundColor: '#404040',
          color: 'white',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <div>New Message</div>
        <div
          {...css({
            display: 'flex',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textAlign: 'right',
          })}
        >
          <div {...css({width: 20, cursor: 'pointer'})}>_</div>
          <div {...css({width: 20, cursor: 'pointer'})}>X</div>
        </div>
      </div>
      <div {...css({padding: 10})}>
        <div
          {...css({
            display: 'flex',
            alignItems: 'center',
            paddingBottom: 10,
          })}
        >
          <div {...css({marginRight: 10})}>To</div>
          <div {...css({flex: '1'})}>{children}</div>
        </div>
        <div
          {...css({
            borderTop: '1px solid #cfcfcf',
            borderBottom: '1px solid  #cfcfcf',
            marginLeft: -10,
            marginRight: -10,
          })}
        >
          <input
            placeholder="Subject"
            {...css({
              paddingTop: 10,
              paddingBottom: 10,
              width: '100%',
              paddingLeft: 10,
              paddingRight: 10,
              border: 'none',
              outline: 'none',
            })}
          />
        </div>
        <div {...css({paddingTop: 10})}>
          <textarea
            {...css({
              border: 'none',
              width: '100%',
              height: '100%',
              minHeight: 200,
              outline: 'none',
              resize: 'none',
            })}
          />
        </div>
      </div>
    </div>
  )
}

class Recipient extends React.Component {
  static defaultProps = {
    isValid: true,
  }
  button = React.createRef()
  focusButton = () => this.button.current.focus()
  render() {
    const {children, onRemove, isValid} = this.props
    return (
      <div
        onClick={this.focusButton}
        {...css({
          backgroundColor: '#f5f5f5',
          fontSize: '0.9em',
          border: '1px solid',
          borderColor: isValid ? '#d9d9d9' : '#d61111',
          borderRadius: 4,
          paddingTop: 2,
          paddingBottom: 2,
          paddingRight: 6,
          paddingLeft: 6,
          marginLeft: 4,
          marginRight: 4,
          display: 'flex',
          cursor: 'pointer',
        })}
      >
        {children}
        {onRemove ? (
          <button
            ref={this.button}
            {...css({
              WebkitAppearance: 'none',
              marginLeft: 6,
              color: '#868686',
              backgroundColor: '#f5f5f5',
              border: 'none',
              cursor: 'pointer',
              padding: 2,
            })}
            onClick={onRemove}
          >
            x
          </button>
        ) : null}
      </div>
    )
  }
}

export {ComposeMail, Recipient}
