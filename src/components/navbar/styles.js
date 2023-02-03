import { makeStyles } from "@material-ui/core"
import { deepPurple } from "@material-ui/core/colors"
import { width } from "@mui/system"
import { signIn } from "../../api"


export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 100,
        margin: '30px 0',
        padding: "10px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "orange",
      },
      heading: {
        color: 'black',
        fontSize: "4vw",
        textDecorationLine: "none",
        fontFamily: "Tangerine", 
        fontSize: "5vw",
        marginRight: "2vw",
        fontWeight: "bold"
      },
      image: {
        width: "12%",
        borderRadius: "50%"
      },
      toolbar : {
        display: "flex",
        justifyContent: "flex-end",
        width: "20vw",
      },
      profile: {
        display: "flex",
        justifyContent: "space-between",
        width: "400px",
      },
      userName: {
        display: "flex",
        alignItems: "center",
        fontSize: "1.3vw",
        marginRight: "2vw"
      },
      brandContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        marginRight: "2vw"
      },
      details: {
        display: "flex", 
        justifyContent: "flex-end", 
        alignItems: "center"
      },
      [theme.breakpoints.down("xs")] : {
        purple: {
          width: "7vw",
          height: "auto",
          marginRight: "2vw"
          
        },
        details: {
          justifyContent: "space-between"
        },
        userName: {
          marginRight: "2vw",
          fontSize: "2.5vw",
        },
        logout: {
          fontSize: "2vw",
          height: "4vh",
          marginRight: "2vw"
        },
        signIn: {
          fontSize: "2vw",
          height: "4vh",
          marginRight: "2vw",
          width: "30%"
        },
        heading: {
          fontSize: "10vw"
        }
      },
}))
   