import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  paper: {
    padding: theme.spacing(),
    marginBottom: "1rem",
  },
  type1: {
    fontFamily: "Tangerine", 
    fontSize: "30px", 
    fontWeight: "bold",
  },
  textField1: {
    margin: "0 0 7px 0",
  },
}));