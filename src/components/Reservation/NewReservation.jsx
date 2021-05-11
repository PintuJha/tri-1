import React from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MealPlan from "../RoomManagement/MealPlan";

const url = "http://localhost:3006/";

let today = new Date();
let Tyear = today.getFullYear();
let Tmonth =
  today.getMonth() + 1 < 10
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1;
let Tday = today.getDate();
const TodayDate = Tyear + "-" + Tmonth + "-" + Tday;
const NextDate = Tyear + "-" + Tmonth + "-" + (today.getDate() + 1);

export default class NewReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMealPop: false,
      isPop: true,
      pax: 1,
      child: 0,
      Reference: "n",
      selectedDate: TodayDate,
      NextDate: NextDate,
      PaymentType: "n",
      roomCategory: "0",
      roomType: "A",
      roomNo: 0,
      mealPlan: "0",
      ExtraBed: 0,
      data: [],
      guestList: [],
      mealPlanList: [],
      CompName: 0,
      compList: [],
      roomCategoryList:[]
    };
  }

  reset = () => {
    this.setState({
      isPop: false,
      pax: 1,
      child: 0,
      Reference: "n",
      selectedDate: TodayDate,
      NextDate: NextDate,
      PaymentType: "n",
      roomCategory: "0",
      roomType: "A",
      roomNo: 0,
      mealPlan: "0",
      ExtraBed: 0,
      CompName: 0,
    });
    this.props.closeResPop();
  };

  componentDidMount() {
    this.getMealPlanList();
    this.getRoomCategory();
  }

  getMealPlanList = async () => {
    await axios.get(`${url}api/MealPlan`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ mealPlanList: res.data.response[0] });
      }
    });
  };

  closeMealType = () => {
    this.setState({ isMealPop: false });
    this.getMealPlanList();
  };

  getReference = async (e) => {
    this.setState({ Reference: e.target.value });
    await axios
      .post(`${url}api/BookingRef`, {
        BookRef: e.target.value,
        flag: 1,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ compList: res.data.response[0] });
        }
      });
  };

  getPaymentType = (e) => {
    this.setState({ PaymentType: e.target.value });
  };

  getRoomCategory = async () => {
    await axios.get(`${url}api/roomCategory`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ roomCategoryList: res.data.response[0] });
      }
    });
  };

  getRoomType = (event) => {
    this.setState({
      roomType: event.target.value,
    });
  };

  getRoomNo = (event) => {
    this.setState({ roomNo: event.target.value });
  };

  getMealPlan = (event) => {
    this.setState({ mealPlan: event.target.value });
  };

  getExtraBed = (e) => {
    this.setState({ ExtraBed: e.target.value });
  };

  render() {
    const options = {
      filterType: "checkbox",
    };
    const columns = [
      "Name",
      "Category",
      "Type",
      "Room",
      "MealPlan",
      "RoomCharge",
      "Adult",
      "Child",
      "ExtraBed",
      "ExtraCharge",
    ];
    return (
      <Dialog onClose={() => this.reset()} fullScreen open={this.state.isPop}>
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.reset()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">New Reservation</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box>
            <br />
            <Grid container spacing={5}>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-In Date *"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    defaultValue={this.state.selectedDate}
                    inputProps={{
                      min: TodayDate,
                    }}
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-Out Date *"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    defaultValue={this.state.NextDate}
                    inputProps={{
                      min: NextDate,
                    }}
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-In *"
                    variant="outlined"
                    type="time"
                    defaultValue="08:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-Out *"
                    variant="outlined"
                    type="time"
                    defaultValue="20:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <FormControl variant="outlined" style={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Booking Reference *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.Reference}
                      onChange={(e) => this.getReference(e)}
                      label=">Booking Reference"
                    >
                      <MenuItem value="n">-Booking Reference-</MenuItem>
                      <MenuItem value="ID">Individual</MenuItem>
                      <MenuItem value="RE">Relatives</MenuItem>
                      <MenuItem value="FR">Friends</MenuItem>
                      <MenuItem value="HS">Hotel Staff</MenuItem>
                      <MenuItem value="TA">Travel Agent</MenuItem>
                      <MenuItem value="TP">Third Party Side</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              {this.state.Reference == "TA" || this.state.Reference == "TP" ? (
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Company Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.CompName}
                        onChange={(e) =>
                          this.setState({ CompName: e.target.value })
                        }
                        label=">Company  Name"
                      >
                        <MenuItem value="0">-Company Name-</MenuItem>
                        {this.state.compList.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.Company_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
            <Box sx={{ border: "1px dashed grey" }}>
              <Grid container spacing={5}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <TextField
                      id="outlined-basic"
                      label="Guest Name *"
                      variant="outlined"
                    />
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Room Category *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.roomCategory}
                        onChange={(e) => this.setState({
                          roomCategory: e.target.value,
                        })}
                        label="Room Category" 
                      >
                        <MenuItem value="0">None</MenuItem>
                        {this.state.roomCategoryList.map((item) => (
                          <MenuItem value={item.c_id} key={item.c_id}>
                            {item.Category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Room Type *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.roomType}
                        onChange={(e) => this.getRoomType(e)}
                        label="Room Type"
                      >
                        <MenuItem value="A">AC</MenuItem>
                        <MenuItem value="N">Non Ac</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Room No *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.roomNo}
                        onChange={(e) => this.getRoomNo(e)}
                        label="Room No"
                      >
                        <MenuItem value="0">-Select-</MenuItem>
                        <MenuItem value="101">101</MenuItem>
                        <MenuItem value="102">102</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Meal Plan *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.mealPlan}
                        onChange={(e) => this.getMealPlan(e)}
                        label="Occupancy"
                      >
                        <MenuItem value="0">None</MenuItem>
                        {this.state.mealPlanList.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.plan}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Tooltip title="Meal Plan" aria-label="add">
                      <IconButton aria-label="Add">
                        <AddCircleOutlineTwoToneIcon
                          onClick={() => this.setState({ isMealPop: true })}
                        />
                      </IconButton>
                    </Tooltip>
                    {this.state.isMealPop ? (
                      <MealPlan closeMealType={this.closeMealType} />
                    ) : null}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <TextField
                      id="outlined-basic"
                      label="Room Charges *"
                      variant="outlined"
                      defaultValue={0}
                    />
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <TextField
                    id="outlined-number"
                    type="number"
                    label="Adults *"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "1", step: "1" } }}
                    defaultValue={this.state.pax}
                  />
                </Grid>
                <Grid container item xs>
                  <TextField
                    id="outlined-number"
                    label="Child"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "0", step: "1" } }}
                    defaultValue={this.state.child}
                  />
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Extra Bed
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.ExtraBed}
                        onChange={(e) => this.getExtraBed(e)}
                        label=">Extra Bed"
                      >
                        <MenuItem value="0">-None-</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4 </MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <TextField
                      id="outlined-basic"
                      label="Extra Bed Charge"
                      variant="outlined"
                      defaultValue="0"
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <Button autoFocus color="primary" variant="contained" className="save-btn mr-2">
                      Add +
                    </Button>
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography gutterBottom>
                    <Button color="secondary" variant="contained"  className="close-btn" >
                      Reset
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              <MUIDataTable
                title={"Add Guest"}
                data={this.state.data}
                columns={columns}
                options={options}
              />
              <br />
            </Box>
            <Grid container spacing={5}>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Sub Total *"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Discount *"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Taxable Amount *"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    disabled
                    id="outlined-basic"
                    label="CGST"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    disabled
                    id="outlined-basic"
                    label="SGST"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Total Amount *"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Adv. Payment *"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>              
            </Grid>
            <Grid container spacing={2}>
            <Grid container item xs>
                <Typography gutterBottom>
                  <FormControl variant="outlined" style={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Adv. Payment Type *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.PaymentType}
                      onChange={(e) => this.getPaymentType(e)}
                      label="Adv. Payment Type"
                    >
                      <MenuItem value="n">-None-</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="Neft">NEFT</MenuItem>
                      <MenuItem value="Paypal">PayPal</MenuItem>
                      <MenuItem value="paytm">paytm</MenuItem>
                    </Select>
                  </FormControl>
                  <Tooltip title="Add Payment Mode" aria-label="add">
                    <IconButton aria-label="Add">
                      <AddCircleOutlineTwoToneIcon
                        onClick={() => alert("Add Payment Mode")}
                      />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Grid>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Net Amount *"
                    variant="outlined"
                    defaultValue="0"
                  />
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid container item xs>
                <Typography gutterBottom></Typography>
                &nbsp;&nbsp;
                <Typography gutterBottom></Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="save-btn mr-2" 
            color="primary"
            variant="contained"
          >
            Save
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={() => this.reset()}
            color="secondary"
            variant="contained"
            className="close-btn" 
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
