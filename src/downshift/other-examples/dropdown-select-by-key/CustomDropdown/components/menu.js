import styled, {css} from 'styled-components'

export const MenuContainer = styled.div`
  width: 100%;
  height: 186px;
  display: flex;
  position: absolute;
  top:0;
  width: ${props => (props.width ? props.width : '100%')};
`

export const Menu = styled.div`
  width: 274px;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 200;
  height: 169px;
  position: absolute;
  left: 0;
  border: 1px solid #097e82;
  border-radius: 70%;
  margin-top: 16px;
  background-color: #fff;
  visibility: ${props => (!props.isOpen ? 'hidden' : 'visible')};
`

export const MenuItem = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.6875;
  padding: 5px;
  transition: background-color 0.2s ease;
  background-color: ${props => {
    const {selected, highlighted} = props
    return highlighted ? '#CCEAEC' : selected ? '#b5d5d7' : '#fff'
  }};

  &:hover {
    background-color: #CCEAEC;
    cursor: pointer;
  }

  border-bottom: solid 1px lightgrey;
  margin-bottom: 0;
  &:last-child {
    border-bottom: none;
  }
`

export const PointerWrap = styled.div`
  ${({tooltip}) => {
    if (tooltip) {
      return css`
          display: flex;
          height: 0;
          width: 100%;
          z-index: 9001;
          visibility: ${props => (!props.isOpen ? 'hidden' : 'visible')};
         
        `
    }
  }};

`

export const Pointer = styled.div`
  width:100%;
  transform-origin:10px 10px;
  transform: rotate(-152deg);
  top: 182px;
  left: 31px;
  position: absolute;
  &:before {
    border: 18px solid transparent;
    border-bottom-color: #097e82;
    content: '';
    position: absolute;
    top: 3px;
  }
  &:after {
    border: 18px solid transparent;
    border-bottom-color: white;
    transition: border-bottom-color 0.2s ease;
    content: '';
    position: absolute;
    top: 5px;
     ${({turnColorHighlighted, turnColorSelected}) => {
       if (turnColorHighlighted) {
         return css`
            border-bottom-color: #CCEAEC;
          `
       }
       if (turnColorSelected) {
         return css`
            border-bottom-color: #b5d5d7;
         `
       }
     }};
  }
`
