import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme)=> ({
      [theme.breakpoints.down("xs")] : {
        container: {
          flexDirection: "column-reverse",
  
        }
      },
      pagination: {
        borderRadius: 4,
        marginTop: "1rem",
        padding: "16px"
      },
      appBarSearch: {
        borderRadius: 4,
        marginBottom: "1rem",
        display: "flex",
        padding: "16px"
      },
      paper: {
        padding: theme.spacing(),
        height: "4%",
        marginTop: "1%", 
        width: "70vw"
      },
      [theme.breakpoints.up("xl")] : {
        paper: {
          width: "20vw"
        }
      },
      signInDiv: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
      },
      chipInput: {
        margin: "10px 0",
      } 
}));
