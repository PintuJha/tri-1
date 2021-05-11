import React from "react";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NewReservation from "./NewReservation";
import {
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  TextField,
} from "@material-ui/core";
import CancelList from "./CancelList";
import { Tabs, Table } from "antd";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ClearTwoToneIcon from "@material-ui/icons/ClearTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
const { TabPane } = Tabs;

export default class ViewReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: false,
      reportType: "v",
      isCancelPop: false,
    };
  }

  reset = () => {
    this.setState({
      isCancelPop: false,
    });
  };

  closeResPop = () => {
    this.setState({
      isPop: false,
    });
  };

  render() {
    const columns = [
      {
        title: "Sr.No.",
        dataIndex: "SRNo",
        key: "SRNo",
      },
      {
        title: "B id",
        dataIndex: "B_id",
        key: "B_id",
      },
      {
        title: "NAME",
        dataIndex: "NAME",
        key: "NAME",
      },
      {
        title: "ROOM NO",
        dataIndex: "ROOMNO",
        key: "ROOMNO",
      },
      {
        title: "CHECKIN DATE",
        dataIndex: "CHECKINDATE",
        key: "CHECKINDATE",
      },
      {
        title: "CHECKOUT DATE",
        dataIndex: "CHECKOUTDATE",
        key: "CHECKOUTDATE",
      },
      {
        title: "ROOM PRICE",
        dataIndex: "ROOMPRICE",
        key: "ROOMPRICE",
      },
      {
        title: "EXTRABED CHARGES",
        dataIndex: "EXTRABEDCHARGES",
        key: "EXTRABEDCHARGES",
      },
      {
        title: "TOTAL CHARGES",
        dataIndex: "TOTALCHARGES",
        key: "TOTALCHARGES",
      },
      {
        title: "ADV. PAYMENT",
        dataIndex: "ADVPAYMENT",
        key: "ADVPAYMENT",
      },
      {
        title: "NET CHARGES",
        dataIndex: "NETCHARGES",
        key: "NETCHARGES",
      },
      {
        title: "PAX",
        dataIndex: "PAX",
        key: "PAX",
      },
      {
        title: "CHILD",
        dataIndex: "CHILD",
        key: "CHILD",
      },
      {
        title: "Action",
        key: "Action",
        fixed: "right",
        width: 130,
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a href="#">
                <EditTwoToneIcon />
              </a>
            </Tooltip>
            |
            <Tooltip placement="top" title="Cancel">
              <a  href="#" onClick={() => this.setState({ isCancelPop: true })}>
                <ClearTwoToneIcon />
              </a>
            </Tooltip>
            |
            <Tooltip placement="top" title="Delete">
              <a  href="#">
                <DeleteForeverTwoToneIcon />
              </a>
            </Tooltip>
          </>
        ),
      },
    ];

    const data = [
      {
        SRNo: "1",
        B_id: "2",
        NAME: "Vijay",
        ROOMNO: "123",
        CHECKINDATE: "13-04-2021",
        CHECKOUTDATE: "14-04-2021",
        ROOMPRICE: 2000,
        EXTRABEDCHARGES: 500,
        TOTALCHARGES: 2500,
        ADVPAYMENT: 1000,
        NETCHARGES: 1500,
        PAX: 1,
        CHILD: 2,
      },
      {
        SRNo: "2",
        B_id: "3",
        NAME: "Victor",
        ROOMNO: "321",
        CHECKINDATE: "14-04-2021",
        CHECKOUTDATE: "30-04-2021",
        ROOMPRICE: 2000,
        EXTRABEDCHARGES: 500,
        TOTALCHARGES: 2500,
        ADVPAYMENT: 1000,
        NETCHARGES: 1500,
        PAX: 2,
        CHILD: 5,
      },
    ];

    return (
      <>
        <Tooltip title="Book Reservation">
          <IconButton
            aria-label="add"
            onClick={() =>
              this.setState({
                isPop: true,
              })
            }
          >
            <AddCircleOutlineTwoToneIcon />
          </IconButton>
        </Tooltip>

        {this.state.isPop ? (
          <NewReservation closeResPop={this.closeResPop} />
        ) : null}

        <Box>
          <Grid container spacing={5}>
            <Grid container item xs>
              <Typography>
                <Tabs type="card">
                  <TabPane tab="View Reservation" key="viewReservation">
                    <Table
                      columns={columns}
                      dataSource={data}
                      scroll={{ x: "calc(100px + 50%)", y: 240 }}
                    />
                  </TabPane>
                  <TabPane tab="Cancel List" key="cancellist">
                    <CancelList />
                  </TabPane>
                </Tabs>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Dialog
          onClose={() => this.setState({ isCancelPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isCancelPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Cancel Reservation</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <TextField
                id="outlined-basic"
                label="Booking Id no"
                type="number"
                variant="outlined"
              />
              &nbsp;&nbsp;
              <TextField
                id="outlined-basic"
                label="Advance Amount"
                type="number"
                variant="outlined"
              />
            </Typography>
            <Typography gutterBottom>
              <TextField
                id="outlined-basic"
                label="Due Amount"
                type="number"
                variant="outlined"
              />
              &nbsp;&nbsp;
              <TextField
                id="outlined-basic"
                label="Cancellation Charge"
                variant="outlined"
              />
            </Typography>
            <Typography gutterBottom>
              <TextField
                id="outlined-basic"
                label="Cancellation Amount"
                type="number"
                variant="outlined"
              />
              &nbsp;&nbsp;
              <TextField
                id="outlined-basic"
                label="Net Amount"
                variant="outlined"
                type="number"
              />
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              className="save-btn mr-2" 
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={() => this.reset()}
              color="secondary"
              variant="contained"
              className="close-btn" 
            >
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>
      </>
    );
  }
}
