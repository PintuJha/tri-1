import React from "react";
import Link from '@material-ui/core/Link';
import { Tabs, Radio } from 'antd';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import {
  Select,
  InputLabel,
  MenuItem,
  Tooltip,
  Box,
  Button,
  Grid,
  FormControl,
  TextField,
  IconButton
} from "@material-ui/core/";


export default class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInventoryPop: false,
    };
  }


  


  state = { size: 'small' };

  onChange = e => {
    this.setState({ size: e.target.value });
  };


  closeInventoryPop = () => {
    this.setState({ isInventoryPop: false });
  };

  render() {
    const { TabPane } = Tabs;
    const { size } = this.state;
    return (
      <Box className="addinventory">

<Breadcrumbs className="bread-link-sec" aria-label="breadcrumb">
             {/* <Link color="inherit" href="/StayView">Stay View</Link> */}
             <Link color="inherit" href="/CheckIn">Check In</Link>
             <Link color="inherit" href="/StayView">Check Out</Link>
             {/* <Link color="inherit" href="/StayView">Bill List</Link> */}
             <Link color="inherit" href="/RoomShifting">Room Shifting</Link>
             <Link color="inherit" href="/EditBooking">Booking Modification</Link>
             <Link color="inherit" href="/EarlyCheckOut">Early CheckOut</Link>
             {/* <Link color="inherit" href="/EodSaleReport">EOD Sale Report</Link>
             <Link color="inherit" href="/MealReport">Meal Report</Link>
             <Link color="inherit" href="/OccupancyReport">Occupancy Report</Link>
             <Link color="inherit" href="/DirectBookingReport">Direct Booking Report</Link> */}
          </Breadcrumbs>

        <div>


<h3 className="mb-3">Check Out</h3>

<div>
      
        <Tabs defaultActiveKey="1" type="card" size={size}>
          <TabPane tab="Room Shfiting" key="1">
          <div className="tab-content">
          
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl className="float-left" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Booking Id no *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>-Select Booking Id-</MenuItem>
                  <MenuItem value={20}>7</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl className="float-left" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Current Room No.*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>-Select Booking Id-</MenuItem>
                  <MenuItem value={20}>7</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl className="float-left" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Current Room No.*</InputLabel>
                
              </FormControl>
            </Grid>

            <div className="text-center m-auto w-100 mt-4">
              <Button variant="contained" color="primary" className="mr-3">
                {" "}
                Update{" "}
              </Button>
              <Button variant="contained" color="secondary">
                Reset{" "}
              </Button>
            </div>

            
            </Grid>


</div>
          </TabPane>
          <TabPane tab="Room Shifting List" key="2">
            Content of card tab 2
          </TabPane>
         
        </Tabs>
      </div>

        </div>
      </Box>
    );
  }
}
