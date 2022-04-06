import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#131A22',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },
  brand: {
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
    backgroundColor: '#232F3E',
    color: '#FFFFFF',
    marginTop: 10,
    minHeight: '4rem',
    padding: '1rem',
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export default useStyles;
