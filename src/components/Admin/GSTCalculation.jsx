import React from "react";
import MUIDataTable from "mui-datatables";
import {
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Dialog,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";

export default class GSTCalculation extends React.Component {
  constructor() {
    super();
    this.state = {
      isPop: false,
      category: "",
      shortCode: "",
      noOfRooms: 0,
      data: [],
    };
  }

  componentDidMount() {
    this.getRoomCategoryData();
  }

  async getRoomCategoryData() {
    await axios.get(`http://localhost:3006/api/roomCategory`).then((res) => {
      //console.log("adsfa",JSON.stringify(res.data.response[0]));
      if (res.data.response[0].length !== 0) {
        this.setState({ data: res.data.response[0] });
      }
    });
  }

  async saveCategory() {
    let category = this.state.category;
    let noOfRoom = this.state.noOfRooms;
    let shortCode = this.state.shortCode;

    if (category === "") {
      alert("Enter category");
      return false;
    }

    if (noOfRoom === "") {
      alert("Enter No of rooms");
      return false;
    }

    if (shortCode === "") {
      alert("Enter Short Code");
      return false;
    }

    await axios
      .post("http://localhost:3006/api/roomCategory/new", {
        Category: category,
        InventoryItem: noOfRoom,
        shortCode: shortCode,
        createdBy: 0,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.getRoomCategoryData();
            alert("Saved successfully");
            this.reset();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reset() {
    this.setState({
      category: "",
      shortCode: "",
      noOfRooms: 0,
      isPop: false,
    });
  }

  render() {
    const columns = [
      {
        name: "SrNo",
        label: "Sr.NO.",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Finacial Year",
        label: "Finacial Year",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Form Date",
        label: "Form Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "TO Date",
        label: "TO Date",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "CGST",
        label: "CGST",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "SGST",
        label: "SGST",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "GST",
        label: "GST",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Action",
        label: "Action",
        options: {
          filter: true,
          sort: true,
        },
      },
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
    };
    return (
      <Box>
        <Tooltip title="Add" aria-label="add">
          <IconButton aria-label="Add">
            <AddCircleOutlineTwoToneIcon
              onClick={() => this.setState({ isPop: true })}
            />
          </IconButton>
        </Tooltip>
        <MUIDataTable
          title={"GST Calculation"}
          data={this.state.data}
          columns={columns}
          options={options}
        />
        <Dialog
          onClose={() => this.setState({ isPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Add GST Rates</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="w-100 mt-2">
                <InputLabel id="demo-simple-select-outlined-label">
                  Finacial Year
                </InputLabel>
                <Select id="demo-simple-select-outlined" label="Finacial Year">
                  <MenuItem value="n">-Select-</MenuItem>
                  <MenuItem value="f">2021 - 2021</MenuItem>
                  <MenuItem value="s">2021 - 2021</MenuItem>
                  <MenuItem value="h">2021 - 2021</MenuItem>
                </Select>
              </FormControl>
            </Typography>

            <Typography gutterBottom>
              <p className="mb-0 mt-0">&nbsp;</p>
              <TextField
                id="date"
                label="From"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="date"
                label="To"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Typography>

            <Typography gutterBottom>
              <p className="mb-0 mt-0">&nbsp;</p>
              <p className="mb-0">
                <b>Rate Range</b>
              </p>
              <TextField
                id="date"
                label="From"
                type="number"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="date"
                label="To"
                type="number"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Typography>

            <Typography gutterBottom>
              <p className="mb-0 mt-0">&nbsp;</p>
              <p className="mb-0">
                <b>GST Calculation</b>
              </p>
              <TextField
                id="date"
                label="CGST %"
                type="number"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="date"
                label="SGST %"
                type="number"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Typography>

            <Typography gutterBottom>
              <TextField
                id="outlined-basic"
                className="mt-3 w-100"
                label="GST %"
                variant="outlined"
                onChange={(e) => this.setState({ category: e.target.value })}
              />
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              onClick={() => this.saveCategory()}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
            <Button
              onClick={() => this.reset()}
              color="secondary"
              variant="contained"
            >
              Reset
            </Button>
          </MuiDialogActions>
        </Dialog>
      </Box>
    );
  }
}
