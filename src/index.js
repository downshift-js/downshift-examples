import React from 'react'
import {render} from 'react-dom'

function App() {
  return (
    <div>
      <h1>downshift examples 🏎</h1>
      <div>
        <p>{`
          This is an example project of how to use downshift to build
          enhanced input experiences (autocomplete, dropdown, etc).
          Open a file in the examples directory within codesandbox and
          then toggle the "Current Module View" in the upper-right of
          the browser preview.
        `}</p>
        <p>
          <a href="https://codesandbox.io/s/github/kentcdodds/downshift-examples">
            Open this in CodeSandbox
          </a>{' '}
          to play around with things. You can also use the codesandbox to
          contribute to{' '}
          <a href="https://github.com/kentcdodds/downshift-examples">
            the project on GitHub
          </a>
          !
        </p>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
