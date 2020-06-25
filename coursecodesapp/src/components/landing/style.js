import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
	
	//HomePage 
	hero: {
		height: "500px",
		width: '100%',
		backgroundPosition: "center",
		backgroundSize: "cover",
		position: "relative",
		marginTop:"-120px",
		display: 'flex',
		[theme.breakpoints.down("sm")]: {
			height:300,
			fontSize: "3em"
		}
	},
	hero2: {
		height: "100vh",
		width: '100%',
		backgroundPosition: "center",
		backgroundSize: "cover",
		position: "relative",
		marginTop:"-120px",
		display: 'inline-block',
	},
	header: {
		marginLeft:'10vw',
		marginTop: '20vh',
		color:"#37474f",
		fontFamily: 'monospace',
		fontWeight: '500',
		fontSize:"4rem",
	},
	sub: {
		marginLeft:'20vw',
		marginTop: '5vh',
		color:"#37474f",
		fontWeight: '500',
		fontFamily: 'monospace',
		fontSize:"2rem",
	},
	features: {
		paddingTop: theme.spacing(3),
		marginTop: '-10vh',
		height: '60vh',
	},
	about: {
		paddingTop: theme.spacing(3),
		height: '90vh'
	},
	card: {
		maxWidth: "80%",
	},
	media: {
		height: 200
	},
	cardAbout: {
		variant: 'outlined',
		maxWidth: "80%",
		margin: 'auto',
		position: 'relative',
		marginTop: '10vh',
		backgroundColor: 'transparent'
	},

	//SignUp and SignIn 
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '10vh'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		border: '4',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	welcome: {
		height: "500px",
		width: '100%',
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: 'no-repeat',
		position: "relative",
		margin:'0',
		display: 'flex',
	},

	//Navbar
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		backgroundColor: 'inherit',
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		variant: "subtitle1",
		fontSize: '2em',
		textAlign: 'left',
		flexGrow: 1,
		color: '#37474f'
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: '#ffff',
		variant: "button",
		fontWeight: 'bold',
		fontSize: '1.5em',
		fontFamily: 'monospace'
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}))

export default useStyles;