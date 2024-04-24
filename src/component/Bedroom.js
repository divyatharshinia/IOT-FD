import React, { useState } from 'react';
import { Grid, Button, Typography, Card, Switch, CardContent, Box, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import WindPowerOutlinedIcon from '@mui/icons-material/WindPowerOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  top: 0, // Aligns the icon to the top
  right: 0, // Aligns the icon to the right
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



const Bedroom = () => {
  const [lights, setLights] = useState({
    light1: true,
    light2: false,
    light3: false,
  });

  const [newNameAppliances, setNewNameAppliances] = useState('');
  const [rooms, setRooms] = useState([]);
  const [ismodalIsOpen, setIsModalOpen] = useState(false);
  const [newRooms, setNewRooms] = useState([]);
  const [newSwitchName, setNewSwitchName] = useState([]);



const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewNameAppliances('');
  };
  const handleLightToggle = (light) => (event) => {
    setLights(prevLights => ({
      ...prevLights,
      [light]: event.target.checked
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newNameAppliances) {
      toast.error('Please enter a room name');
      return;
    }
    try {
      const response = await axios.post('http://192.168.1.14:8000/adminpanel/api/homeroom/add', { room: newRooms, name: newNameAppliances, switchname: newSwitchName });
      if (response.status === 201) {
        toast.success('Room added successfully!');
        const newRoom = { id: response.data.id, room: newRooms, name: newNameAppliances, switchname: newSwitchName };
        setRooms([...rooms, newRooms, newNameAppliances, newSwitchName]);
        closeModal();

        window.location.href = 'http://192.168.1.14:8000/adminpanel/api/homeroom'; // Change the URL accordingly
      } else {
        toast.error('Error adding room');
      }
    } catch (error) {
      toast.error('Error adding room: ' + error.message);
    }
  };

  return (
    <Grid container sx={{backgroundColor: "grey"}}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button variant="contained" href="#contained-buttons" sx={{ borderRadius: 70, backgroundColor: '#387e8a' }}>
          <CreateOutlinedIcon />
          <DeleteOutlineOutlinedIcon sx={{ color: "black", pl: 2 }} />
        </Button>
      <Button sx={{backgroundColor:"#387e8a", color: "white"}} onClick={openModal}> Add Appliances</Button>

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
                    placeholder="Enter Room"
                    value={newRooms}
                    onChange={(event) => setNewRooms(event.target.value)}
                    style={{
                      width: '80%',
                      padding: '10px',
                      marginTop: '20px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={newNameAppliances}
                    onChange={(event) => setNewNameAppliances(event.target.value)}
                    style={{
                      width: '80%',
                      padding: '10px',
                      marginTop: '20px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      fontSize: '16px',
                    }}
                  /><br></br>
                  <input
                    type="text"
                    placeholder="Enter Switch name"
                    value={newSwitchName}
                    onChange={(event) => setNewSwitchName(event.target.value)}
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
      </Grid>
      <Typography sx={{ m: '15px', fontSize: '28px' }}>Bed Room</Typography>
      <Grid container sx={{margin:"20px"}}>
        {jsonData.map((item, index) => (
          <Grid key={index} item xs={6} >
            <Card sx={{ minWidth: 250, height: 200 }}>
              <CardContent sx={{ height: 200,position: 'relative' ,background: "linear-gradient(transparent, #387e8a 75%), linear-gradient(transparent, white 75%)"}}>
                <div>
                  <Typography variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                    {item.count}
                  </Typography>
                </div>

                <div style={{ position: 'absolute', top: '130px', right: 0, }}>
                  <Typography pl={3} sx={{color:"white"}}>Actions</Typography>
                  <IconButton>{item['plas-icon']}</IconButton>
                  <IconButton>{item['pen-icon']}</IconButton>
                  <IconButton>{item['delete-icon']}</IconButton>
                </div>

                <div>
                <IconButton style={{ position: 'absolute', top: '20px', right: "30PX",color:"black",fontSize:"1000px"}}>
                  {item['icon-image']}
                </IconButton>
                </div>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default Bedroom;

const jsonData = [
  {
    "title": "Lights",
    "count": "Count-2",
    "icon-image": <WbSunnyOutlinedIcon />,
    "plas-icon": <AddBoxOutlinedIcon />,
    "pen-icon": <CreateOutlinedIcon />,
    "delete-icon": <DeleteOutlineOutlinedIcon />
  },
  {
    "title": "Fans",
    "count": "Count-1",
    "icon-image": <WindPowerOutlinedIcon />,
    "plas-icon": <AddBoxOutlinedIcon />,
    "pen-icon": <CreateOutlinedIcon />,
    "delete-icon": <DeleteOutlineOutlinedIcon />
  },
//   {
//     "title": "TV",
//     "count": "Count-1",
//     "icon-image": <TvOutlinedIcon />,
//     "plas-icon": <AddBoxOutlinedIcon />,
//     "pen-icon": <CreateOutlinedIcon />,
//     "delete-icon": <DeleteOutlineOutlinedIcon />
//   },
  {
    "title": "A/C",
    "count": "Count-1",
    "icon-image": <AirOutlinedIcon />,
    "plas-icon": <AddBoxOutlinedIcon />,
    "pen-icon": <CreateOutlinedIcon />,
    "delete-icon": <DeleteOutlineOutlinedIcon />
  }
];