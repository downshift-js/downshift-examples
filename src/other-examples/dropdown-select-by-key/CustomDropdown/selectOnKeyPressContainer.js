// 3rd-party imports

import * as React from "react";

class SelectOnKeyPressContainer extends React.Component {
  onKeyPress = event => {
    const { items, itemToString } = this.props;

    const {
      isOpen,
      highlightedIndex,
      setHighlightedIndex
    } = this.props.downshiftProps;
    if (isOpen) {
      const keyDownValue = String(event.key);
      let indexValue = 0;
      indexValue = items.findIndex((item, index) => {
        let dropDownItem = "";
        if (itemToString) {
          dropDownItem = itemToString(item).trim();
        } else {
          dropDownItem = String(item).trim();
        }
        const firstCharacter = dropDownItem.charAt(0).toLowerCase();
        return firstCharacter === keyDownValue;
      });

      if (indexValue >= 0 && indexValue !== highlightedIndex) {
        setHighlightedIndex(indexValue);
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keypress", this.onKeyPress, true);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.onKeyPress, true);
  }

  render() {
    return this.props.children;
  }
}

export default SelectOnKeyPressContainer;
