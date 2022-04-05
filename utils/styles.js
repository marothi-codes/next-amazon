import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#232f3e',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },
  brand: {
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
});

export default useStyles;
