import React, { useState } from 'react';
import { Grid, Button, Typography, Card, Switch, CardContent, Box, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// import WindPowerOutlinedIcon from '@mui/icons-material/WindPowerOutlined';
// import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
// import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

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

const Restroom = () => {
  const [lights, setLights] = useState({
    light1: true,
    light2: false,
    light3: false,
  });

  const handleLightToggle = (light) => (event) => {
    setLights(prevLights => ({
      ...prevLights,
      [light]: event.target.checked
    }));
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
      <Button sx={{backgroundColor:"#387e8a", color: "white"}}> Add Appliances</Button>

      </Grid>
      <Typography sx={{ m: '15px', fontSize: '28px' }}>Rest Room</Typography>
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

export default Restroom;

const jsonData = [
  {
    "title": "Lights",
    "count": "Count-2",
    "icon-image": <WbSunnyOutlinedIcon />,
    "plas-icon": <AddBoxOutlinedIcon />,
    "pen-icon": <CreateOutlinedIcon />,
    "delete-icon": <DeleteOutlineOutlinedIcon />
  },
//   {
//     "title": "Fans",
//     "count": "Count-1",
//     "icon-image": <WindPowerOutlinedIcon />,
//     "plas-icon": <AddBoxOutlinedIcon />,
//     "pen-icon": <CreateOutlinedIcon />,
//     "delete-icon": <DeleteOutlineOutlinedIcon />
//   },
//   {
//     "title": "TV",
//     "count": "Count-1",
//     "icon-image": <TvOutlinedIcon />,
//     "plas-icon": <AddBoxOutlinedIcon />,
//     "pen-icon": <CreateOutlinedIcon />,
//     "delete-icon": <DeleteOutlineOutlinedIcon />
//   },
//   {
//     "title": "A/C",
//     "count": "Count-1",
//     "icon-image": <AirOutlinedIcon />,
//     "plas-icon": <AddBoxOutlinedIcon />,
//     "pen-icon": <CreateOutlinedIcon />,
//     "delete-icon": <DeleteOutlineOutlinedIcon />
//   }
];