import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 250,
    overflowY: 'auto',
    position: 'absolute',
    margin: 0,
    borderTop: 0,
    zIndex: 1000,
  },
  highlighted: {
    backgroundColor: '#bde4ff',
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}))
const items = [
  {
    primary: 'Cecil Abshire',
    secondary: 'International Group Associate',
  },
  {
    primary: 'Adrain Lueilwitz',
    secondary: 'Senior Assurance Architect',
  },
  {
    primary: 'Caden Smitham',
    secondary: 'Direct Optimization Engineer',
  },
  {
    primary: 'Paula Kuhic',
    secondary: 'Future Creative Producer',
  },
  {
    primary: 'Stewart Schroeder',
    secondary: 'Senior Group Director',
  },
  {
    primary: 'Rosa Waters',
    secondary: 'Central Usability Liaison',
  },
  {
    primary: 'Sydney Johnston Jr.',
    secondary: 'Legacy Tactics Assistant',
  },
  {
    primary: 'Dianna Purdy',
    secondary: 'Principal Interactions Specialist',
  },
  {
    primary: 'Aurelio Smith',
    secondary: 'Dynamic Division Technician',
  },
  {
    primary: 'Cathy Schaefer',
    secondary: 'Product Optimization Engineer',
  },
  {
    primary: 'Ward Turner',
    secondary: 'Human Mobility Executive',
  },
]

export {items, useStyles}
