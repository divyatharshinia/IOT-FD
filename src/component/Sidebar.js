import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
// import { alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import DomainIcon from '@mui/icons-material/Domain';
// import CloudIcon from '@mui/icons-material/Cloud';
// import { BarChart, LineChart } from '@mui/x-charts';
import { Grid, Button, Card, CardActions, CardContent} from '@mui/material';

const Sidebar = ({ username }) => {


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   borderColor: '#387e8a',
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: 'auto',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#021816", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor: "#30333c"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard {username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ color: "white" }}>
  {['Home', 'Office'].map((text, index) => (
    <ListItem key={text} disablePadding>
      {index % 2 === 0 ? (
        <a href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </a>
      ) : (
        <a href="/office" style={{ textDecoration: 'none', color: 'inherit' }}>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
        </a>
      )}
    </ListItem>
  ))}
</List>

        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
        {/* <Grid container spacing={4} sx={{ maxHeight: "100%"}}>
      <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase sx={{border:"blue"}}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" href="#contained-buttons" sx={{ borderRadius: 70, backgroundColor: '#387e8a',ml:1 }}>
          Logout
        </Button>
        </Link>
      </Grid>
      <Grid item container xs={12} spacing={2} justifyContent="center">
  {jsonData.map(item => (
    <Grid key={item.id} item xs={12} sm={6} md={4}>
      <Card sx={{ minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box sx={{ display:'flex',justifyContent:'space-between',background: "linear-gradient(transparent, #387e8a 75%), linear-gradient(transparent, white 75%)" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {item.roomName}
          </Typography>
          <Typography variant="h5" component="div">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          {item.icon}
        </CardActions>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>
      <Grid item container xs={12} spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 300 }}>
            <Box sx={{ background: "linear-gradient(transparent, #387e8a 75%)"}}>
            <CardContent>
              <Typography variant="h5" component="div">
                My Bar Chart
              </Typography>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], color: '#0b1fa1' },
                ]}
                height={250}
                width={250}
                xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 300 }}>
            <Box sx={{ background: "linear-gradient(transparent, #387e8a 75%)"}}>
            <CardContent>
              <Typography variant="h5" component="div">
                My Line Chart
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                yAxis={[{ data: [10, 20, 30, 40, 50] }]}
                series={[
                  {
                    data: [35, 44, 24, 34],
                    color: '#0b1fa1'
                  },
                ]}
                width={300}
                height={250}
              />
            </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid> */}
       
      </Main>
    </Box>
  );
}

export default Sidebar;

// const jsonData = [
//   { id: 1, roomName: 'Total Places', description: ' 2', icon: <DomainIcon /> },
//   { id: 2, roomName: 'Weather Today', description: '25°C', icon: <CloudIcon /> },
// ];