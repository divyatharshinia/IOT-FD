import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from "axios";
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
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import DomainIcon from '@mui/icons-material/Domain';
import CloudIcon from '@mui/icons-material/Cloud';
// import { BarChart, LineChart } from '@mui/x-charts';
import { Grid, Button, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../App.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

let userId = Cookies.get('userId');


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
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  borderColor: '#387e8a',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Home = ({ username }) => {
  const [userId, setUserId] = useState(null);
  // const userId = localStorage.getItem("id");


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [newRoomName, setNewRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [ismodalIsOpen, setIsModalOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
 const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchRooms(storedUserId);
    } else {
      toast.error('User ID not found. Please log in.');
    }
  }, []);


  const openModal = (roomId) => {
    setSelectedRoomId(roomId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoomId(null);
    setNewRoomName('');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  // const handleAddRoom = () => {
  //   setNewRoomName(''); // Clear the input field
  //   toast.info('Enter the room name in the input field below.');
  // };


  const fetchRooms = async (userId) => {
    try {
      // const response = await axios.get(`http://192.168.1.5:8000/adminpanel/api/getrooms`);
      const response = {
        "status":200
      }
      // const response = await axios.get(`http://192.168.1.8:8000//userpanel/room/getallrooms/17`);
      if (response.status === 200) {
        // setRooms(response.data); // Set rooms state with fetched data
        setRooms(
          [
            {
                "room": "living room",
                "added_by": 6
            },
            {
                "room": "new room",
                "added_by": 6
            },
          
          
            {
                "room": "Bed Rooom",
                "added_by": 6
            },
           
            {
                "room": "Rest room6",
                "added_by": 6
            },
          
            {
                "room": "kitchen",
                "added_by": 5
            }
        ]
        )
        // jsonData[0].description=response.data.length;
      } else {
        toast.error('Failed to fetch rooms');
      }
    } catch (error) {
      toast.error('Error fetching rooms: ' + error.message);
    }
  };

  const handleAllRoomsClick = () => {
   fetchRooms();
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!newRoomName) {
  //     toast.error('Please enter a room name');
  //     return;
  //   }
  //   try {
  //     const response = await axios.post('http://192.168.1.14:8000/adminpanel/api/homeroom/add', { room: newRoomName });
  //     if (response.status === 201) {
  //       toast.success('Room added successfully!');
  //       const newRoom = { id: response.data.id, name: newRoomName };
  //       setRooms([...rooms, newRoomName]);
  //       closeModal();
  //     } else {
  //       toast.error('Error adding room');
  //     }
  //   } catch (error) {
  //     toast.error('Error adding room: ' + error.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newRoomName) {
      toast.error('Please enter a room name');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/homeroom/add ', { room: newRoomName,added_by:localStorage.getItem("id") },
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type' : 'application/json'
        }
      }
    );
      console.log(response);
   
      if (response.status === 201) {
        toast.success('Room added successfully!');
        fetchRooms();
        closeModal();
        // window.location.href = 'http://192.168.1.8:8000/userpanel/room/getallrooms'; // Change the URL accordingly
      } else {
        toast.error('Error adding room');
      }
    } catch (error) {
      toast.error('Error adding room: ' + error.message);
    }
  };


  const handleUpdate = async (roomId, newRoomName) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/homeroom/edit/${roomId}`, { room: newRoomName });
      if (response.status === 200) {
        toast.success('Room updated successfully!');
        fetchRooms();
      } else {
        toast.error('Error updating room');
      }
    } catch (error) {
      toast.error('Error updating room: ' + error.message);
    }
  };
  const handleOpenModal = (roomId) => {
    const selectedRoom = rooms.find(room => room.id === roomId);
    if (selectedRoom) {
      setSelectedRoomId(roomId);
      setNewRoomName(selectedRoom.room); // Set the newRoomName state to the selected room's name
      setModalIsOpen(true);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(`http://192.168.1.21:8000/adminpanel/api/homeroom/delete/${roomId}`);
      if (response.status === 204) {
        toast.success('Room deleted successfully!');
        fetchRooms();
      } else {
        toast.error('Error deleting room');
      }
    } catch (error) {
      toast.error('Error deleting room: ' + error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: "120vh", backgroundColor: "black" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#30333c" }}>
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
            Home {username}
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
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  {index % 2 === 0 ? <HomeIcon /> : <BusinessIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <List sx={{ color: "white" }}>
    {rooms.map(room => (
      <ListItem key={room.id} disablePadding>
        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={room.name} />
        </ListItemButton>
      </ListItem>
    ))}
  </List> */}
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

        <Grid container spacing={4} sx={{ maxHeight: "100%" }}>
          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button variant="contained" onClick={openModal} sx={{ borderRadius: 70, backgroundColor: '#387e8a', ml: 1 }}>
              AddRoom
            </Button>

            <Modal
              isOpen={ismodalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Add Room Modal"
            >
              <div>
                <CloseIcon onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} />
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Enter Room Name"
                    value={newRoomName}
                    onChange={(event) => setNewRoomName(event.target.value)}
                    style={{
                      width: '80%',
                      padding: '10px',
                      marginTop: '20px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                    }}
                  />
                  <br></br><br></br>
                  <button type="submit" style={{
                    backgroundColor: '#387e8a',
                    color: 'white',
                    padding: '10px 20px',
                    marginTop: '20px',
                    borderRadius: '5px',
                    border: 'none',
                    fontSize: '16px',
                  }}>Submit</button>
                </form>
              </div>
            </Modal>

            {/* Render buttons for existing rooms */}


          </Grid>
          <Grid item container xs={12} spacing={2} justifyContent="center">
            {jsonData.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: item.id == 1 ? "pointer" : "" }}>
                  <CardContent onClick={item.id === 1 ? handleAllRoomsClick : null}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', background: "linear-gradient(transparent, #387e8a 75%), linear-gradient(transparent, white 75%)" }}>
                      <Typography variant="h5" component="div">
                        {item.roomName}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {item.id === 1?rooms?.length:item.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* {selectedRoomName && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Typography variant="contained" sx={{ borderRadius: 10, backgroundColor: 'skyblue', color: 'white', marginRight: 1 }}>
                {selectedRoomName}</Typography>
            </Box>
          )} */}
          {/* <Grid item container xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ minWidth: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 300 }}>
                <Box sx={{ background: "linear-gradient(transparent, #387e8a 75%)" }}>
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
                <Box sx={{ background: "linear-gradient(transparent, #387e8a 75%)" }}>
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
          </Grid> */}
{rooms?.map((room) => (
  <Box key={room.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
    <Typography
      variant="contained"
      sx={{ borderRadius: 10, backgroundColor: 'skyblue', color: 'white', marginRight: 1 }}
      onClick={() => openModal(room.id)}
    >
      {room.room}
    </Typography>
  </Box>
))}
<Modal
  isOpen={setIsModalOpen}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Room Modal"
>
  <div>
    <CloseIcon onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} />
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Enter Room Name"
        value={newRoomName}
        onChange={(event) => setNewRoomName(event.target.value)}
        style={{
          width: '80%',
          padding: '10px',
          marginTop: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <br /><br />
      <button
        type="submit"
        style={{
          backgroundColor: '#387e8a',
          color: 'white',
          padding: '10px 20px',
          marginTop: '20px',
          borderRadius: '5px',
          border: 'none',
          fontSize: '16px',
        }}
      >
        Submit
      </button>
    </form>
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={handleUpdate}
        style={{
          backgroundColor: '#387e8a',
          color: 'white',
          padding: '10px 20px',
          marginRight: '10px',
          borderRadius: '5px',
          border: 'none',
          fontSize: '16px',
        }}
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          fontSize: '16px',
        }}
      >
        Delete
      </button>
    </div>
  </div>
</Modal>




        </Grid><br></br>
        {/* <Grid item container xs={12} spacing={2} justifyContent="center" sx={{ color: "white" }}>
          <Grid item xs={12} sm={6} md={3}>
          <Link to="/living-room" style={{textDecoration: "none"}}>

            <Button variant="contained" sx={{ borderRadius: 70, backgroundColor: '#387e8a' }}>
              Living Room
            </Button>
            </Link>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" sx={{ borderRadius: 70, backgroundColor: '#387e8a' }}>
              Bedroom
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" sx={{ borderRadius: 70, backgroundColor: '#387e8a' }}>
              Kitchen
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" sx={{ borderRadius: 70, backgroundColor: '#387e8a' }}>
              Bathroom
            </Button>
          </Grid>
        </Grid> */}
      </Main>
    </Box>
  );
}

export default Home;

const jsonData = [
  { id: 1, roomName: 'All Rooms', description: '', icon: <DomainIcon /> },
  { id: 2, roomName: 'Weather Today', description: '25°C', icon: <CloudIcon /> },
];