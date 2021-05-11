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

export default class StaffReport extends React.Component {
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
      dataIndex: "Name",
      title: "Name",
      key: 3,
    },
    {
      dataIndex: "Email",
      title: "Email",
      key: 4,
    },
    {
      dataIndex: "Mobile",
      title: "Mobile",
      key: 5,
    },
    {
      dataIndex: "Department",
      title: "Department",
      key: 6,
    },
    {
      dataIndex: "designation",
      title: "Designation",
      key: 7,
    },    
    {
      dataIndex: "Staff Name",
      title: "Staff Name",
      key: 8,
    },    
   
    {
      title: "Action",
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
            Staff Record
          </Typography>
          <Tooltip title="Add" aria-label="add">
            <IconButton aria-label="Add">
              <AddCircleOutlineTwoToneIcon
                onClick={() => this.setState({ isPop: true })}
              />
            </IconButton>
          </Tooltip>
        </Typography>


        
        <Table
          dataSource={this.state.data}
          columns={columns}
          bordered
          pagination={{ pageSize: 50 }}
        />

        <Dialog
          onClose={() => this.setState({ isPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Add Staff Record</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="fullName"
                  label="Name *"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
              &nbsp;&nbsp;

              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="fullName"
                  label="Employee Code *"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Gender"
                  value={this.state.gender}
                  onChange={(e) => this.setState({ gender: e.target.value })}
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography gutterBottom>

            <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="Email Id *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
              &nbsp;&nbsp;

              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="mobileNo"
                  label="Contact No. *"
                  variant="outlined"
                  type="number"
                  value={this.state.mobileNo}
                  onChange={(e) => this.setState({ mobileNo: e.target.value })}
                  inputProps={{
                    min: 0,
                  }}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
             
            
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  ID Proof
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="ID Proof"
                  value={this.state.idProof}
                  onChange={(e) => this.setState({ idProof: e.target.value })}
                >
                  <MenuItem value="0">-none-</MenuItem>
                  <MenuItem value="1">Aadhar Card</MenuItem>
                  <MenuItem value="2">Pan Card</MenuItem>
                  <MenuItem value="3">Voter Id</MenuItem>
                  <MenuItem value="4">Driving Licence</MenuItem>
                </Select>
              </FormControl>
              &nbsp;&nbsp;


              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <label>Id Prof Upload</label>
                <TextField type="file"
                  id="outlined-basic"
                  // label="ID Proof No"
                  variant="outlined"
                  value={this.state.idProofNo}
                  onChange={(e) => this.setState({ idProofNo: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Department"
                  value={this.state.detaprtment}
                  onChange={(e) =>
                    this.setState({ detaprtment: e.target.value })
                  }
                >
                  <MenuItem value="0">-Department-</MenuItem>
                  <MenuItem value="1">Front Office Department</MenuItem>
                  <MenuItem value="2">Administrative</MenuItem>
                </Select>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Designation"
                  value={this.state.designation}
                  onChange={(e) =>
                    this.setState({ designation: e.target.value })
                  }
                >
                  <MenuItem value="0">-Designation-</MenuItem>
                  {this.state.designationData.map((item) => (
                    <MenuItem value={item.id}>{item.designation}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>

<Typography>


<FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Shift Name *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Designation"
                  value={this.state.designation}
                  onChange={(e) =>
                    this.setState({ designation: e.target.value })
                  }
                >
                  <MenuItem value="0">-Designation-</MenuItem>
                  {this.state.designationData.map((item) => (
                    <MenuItem value={item.id}>{item.designation}</MenuItem>
                  ))}
                </Select>
              </FormControl>


              &nbsp;&nbsp;

              <FormControl variant="outlined" style={{ minWidth: 150 }}>
              <label>Date of Commitment *</label>
                <TextField type="date"
                  id="fullName"
                  // label="Employee Code *"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
</Typography>


            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label="Salary"
                  variant="outlined"
                  value={this.state.salary}
                  onChange={(e) => this.setState({ salary: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  disabled={this.state.isEdit ? false : true}
                  value={this.state.status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                >
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="D">Deactive</MenuItem>
                </Select>
              </FormControl>
            </Typography>

            <Typography>
            <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                 Job Type *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Designation"
                  value={this.state.designation}
                  onChange={(e) =>
                    this.setState({ designation: e.target.value })
                  }
                >
                  <MenuItem value="0">Full Time</MenuItem>
                  <MenuItem value="0">Part Time</MenuItem>
                  {this.state.designationData.map((item) => (
                    <MenuItem value={item.id}>{item.designation}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                 Hours / Day *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Designation"
                  value={this.state.designation}
                  onChange={(e) =>
                    this.setState({ designation: e.target.value })
                  }
                >
                  <MenuItem value="0">F</MenuItem>
                  {this.state.designationData.map((item) => (
                    <MenuItem value={item.id}>{item.designation}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>

            <Typography className="mb-2">
              <p className="mb-2"><b>Bank Details :</b></p>
              <Divider />
            </Typography>

            <Typography>
            <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="Account Holder's Name *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="Account Number *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
            </Typography>

            <Typography>
            <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="Bank Name *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="IFSC Code *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}></FormHelperText>
              </FormControl>
            </Typography>



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
