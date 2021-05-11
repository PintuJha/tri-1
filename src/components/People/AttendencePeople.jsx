import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  Snackbar,
  FormHelperText,
  Divider,
} from "@material-ui/core";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MuiAlert from "@material-ui/lab/Alert";
import { Table } from "antd";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";

export default class AttendencePeople extends React.Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      isMsgPop: false,
      msg: "",
      isPop: false,
      data: [],
      designationData: [],
      sid:0,
      fullName: "",
      gender: "M",
      mobileNo: "",
      email: "",
      idProof: "0",
      idProofNo: "",
      detaprtment: "0",
      designation: "0",
      salary: "",
      status: "A",
    };
  }

  reset = () => {
    this.setState({
      isEdit: false,
      isPop: false,
      data: [],
      sid:0,
      fullName: "",
      gender: "M",
      mobileNo: "",
      email: "",
      idProof: "0",
      idProofNo: "",
      detaprtment: "0",
      designation: "0",
      salary: "",
      status: "A",
    });
  };

  componentDidMount() {
    this.getDesignation();
    this.getStaffRecord();
  }

  getDesignation = async () => {
    await axios.get(`${url}api/Designation`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ designationData: res.data.response[0] });
      }
    });
  };

  getStaffRecord = async () => {
    await axios.get(`${url}api/StaffRecord`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ data: res.data.response[0] });
      }
    });
  };  

  saveInfo = async() => {
    let sid = this.state.sid;
    let fullName = this.state.fullName;
    let gender = this.state.gender;
    let mobileNo = this.state.mobileNo;
    let email = this.state.email;
    let idProof = this.state.idProof;
    let idProofNo = this.state.idProofNo;
    let detaprtment = this.state.detaprtment;
    let designation = this.state.designation;
    let salary = this.state.salary;
    let status = this.state.status;

    await axios
      .post(`${url}api/StaffRecord/new`, {
        SName: fullName,
        SGender:gender,
        SMobile:mobileNo,
        SEmail:email,
        SId_proof:idProof,
        SId_no:idProofNo,
        SDepartment:detaprtment,
        SPosition:designation,
        SStaff_sallery:salary,
        SActiveStatus:status,
        ScreatedBy:0
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
            });
            this.getStaffRecord();
            this.reset();
          }
        },
        (error) => {
          this.setState({
            isMsgPop: true,
            msg: error,
          });
        }
      );
  };

  render() {
    const columns = [
      {
      dataIndex: "SrNo",
      title: "Sr.NO.",
      key: 1,
      align: "center",
    },
    {
      dataIndex: "Employee Code",
      title: "Employee Code",
      key: 2,
      align: "center",
    },
    {
      dataIndex: "Employee Name",
      title: "Employee Name",
      key: 3,
    },
    {
      dataIndex: "Date",
      title: "Date",
      key: 4,
    },
    {
      dataIndex: "In Time",
      title: "In Time",
      key: 5,
    },
    {
      dataIndex: "Out Time",
      title: "Out Time",
      key: 6,
    },
    {
      dataIndex: "No. of Hours",
      title: "No. of Hours",
      key: 7,
    },    
     
   
    {
      title: "Status",
      key: 8,
      render: (record) => (
        <>
          <Tooltip placement="top" title="Edit">
            <a onClick={()=>this.setState({isMsgPop:true,msg:"Edit under process"})}>
              <EditTwoToneIcon />
            </a>
          </Tooltip>
          &nbsp;|&nbsp;
          <Tooltip placement="top" title="Delete">
            <a onClick={()=>this.setState({isMsgPop:true,msg:"Delete under process"})}>
              <DeleteForeverTwoToneIcon />
            </a>
          </Tooltip>
        </>
      ),
    },
  ];

  const columns1 = [
    {
    dataIndex: "SrNo",
    title: "Sr.NO.",
    key: 1,
    align: "center",
  },
  {
    dataIndex: "Employee Code",
    title: "Employee Code",
    key: 2,
    align: "center",
  },
  {
    dataIndex: "Employee Name",
    title: "Employee Name",
    key: 3,
  },
  {
    dataIndex: "Department",
    title: "Department",
    key: 4,
  },

  {
    dataIndex: "Date",
    title: "To Date",
    key: 5,
  },
  {
    dataIndex: "In Time",
    title: "In Time",
    key: 6,
  },
  {
    dataIndex: "Out Time",
    title: "Out Time",
    key: 7,
  },
  {
    dataIndex: "No. of Hours",
    title: "No. of Hours",
    key: 8,
  },    
   
 
  {
    title: "Status",
    key: 9,
    render: (record) => (
      <>
        <Tooltip placement="top" title="Edit">
          <a onClick={()=>this.setState({isMsgPop:true,msg:"Edit under process"})}>
            <EditTwoToneIcon />
          </a>
        </Tooltip>
        &nbsp;|&nbsp;
        <Tooltip placement="top" title="Delete">
          <a onClick={()=>this.setState({isMsgPop:true,msg:"Delete under process"})}>
            <DeleteForeverTwoToneIcon />
          </a>
        </Tooltip>
      </>
    ),
  },

  {
    dataIndex: "Action",
    title: "Action",
    key: 10,
  },

];
    return (
      <Box>
        <input type="hidden" value={this.state.sid} />
        <Snackbar
          open={this.state.isMsgPop}
          autoHideDuration={6000}
          onClose={() => this.setState({ isMsgPop: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => this.setState({ isMsgPop: false })}
            severity="info"
          >
            {this.state.msg}
          </Alert>
        </Snackbar>

        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
           Attendence List
          </Typography>
          <Tooltip title="Add" aria-label="add">
            <IconButton aria-label="Add">
              <AddCircleOutlineTwoToneIcon
                onClick={() => this.setState({ isPop: true })}
              />
            </IconButton>
          </Tooltip>
        </Typography>


        <Grid container spacing={3} className="mt-1 mb-4" style={{width:"50%", margin:"auto"}}>
        <Grid item xs={5}>
        <FormControl variant="outlined" className="w-100">
              <label>Form Date</label>
                <TextField type="date"
                  id="fullName"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
        </Grid>

        <Grid item xs={5}>
        <FormControl variant="outlined" className="w-100">
              <label>To Date</label>
                <TextField type="date"
                  id="fullName"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
        </Grid>

        <Grid item xs={2}>
        <Button
              className="close-btn mt-4"
              variant="contained"
              
            >
              Search
            </Button>
        </Grid>

        </Grid>



        
        <Table
          dataSource={this.state.data}
          columns={columns1}
          bordered
          pagination={{ pageSize: 50 }}
        />

        <Dialog
          onClose={() => this.setState({ isPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Add Attendance</Typography>
          </MuiDialogTitle>


          <MuiDialogContent dividers>



          <Grid container spacing={3}>
        <Grid item xs={5}>
        <FormControl variant="outlined" className="w-100">
        <label>Department</label>
                {/* <InputLabel id="demo-simple-select-outlined-label">
                 
                </InputLabel> */}
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Gender"
                  value={this.state.gender}
                  onChange={(e) => this.setState({ gender: e.target.value })}
                >
                  <MenuItem value="Select">All</MenuItem>
                  <MenuItem value="Name">Name</MenuItem>
                </Select>
              </FormControl>
        </Grid>

        <Grid item xs={5}>

        <FormControl variant="outlined" className="w-100">
              <label>Guest Date</label>
                <TextField type="date"
                  id="fullName"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
      
        </Grid>

        <Grid item xs={2}>

        <Button
              className="close-btn mt-4"
              variant="contained"
              
            >
              Search
            </Button>

</Grid>

       

        <Grid item xs={12} className="mt-4">
            <Table className="responsive-table"
          dataSource={this.state.data}
          columns={columns}
          bordered
          pagination={{ pageSize: 50 }}
        />
        </Grid>

        </Grid>



          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              className="save-btn mr-2"
              variant="contained"
              onClick={() => this.saveInfo()}
            >
              {this.state.isEdit ? "Update" : "Submit"}
            </Button>
            <Button
              className="close-btn"
              variant="contained"
              onClick={() => this.reset()}
            >
              Reset
            </Button>
          </MuiDialogActions>
        </Dialog>
      </Box>
    );
  }
}
