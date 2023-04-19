import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    postCard: {
        display: "flex", 
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    },
    buttonBase: {
        display: "block",
    },
    cardMedia: {
        height: "200px", 
        objectFit: "cover",
    },
    postFirstDiv: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    postSecondDiv: {
        position: 'absolute',
        top: '20px',
        right: '5px',
        color: 'white',
    },
    postButton1: {
        color: 'white',
    },
    postThirdDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 10px', 
        overflow: "hidden",
    },
    postCardContent: {
        height: "7vh", 
        overflow: "hidden",
    },
    postTyp1: {
        display: "flex",
    },
    postTyp2: {
        display: "flex", 
        whiteSpace: "pre-line",
    },
    postCardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}));