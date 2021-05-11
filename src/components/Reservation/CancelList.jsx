import React from "react";
import { Table } from "antd";
import { Typography,Button,Dialog,TextField} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

export default class CancelList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        isCancelPop:false,
    }
  }

  reset=()=>{
      this.setState({
        isCancelPop:false,
      })
  }

  render() {
    const columns = [
      {
        title: "Sr.No.",
        dataIndex: "SRNO",
        key: "SRNO",
      },
      {
        title: "B ID",
        dataIndex: "BID",
        key: "BID",
      },
      {
        title: "NAME",
        dataIndex: "NAME",
        key: "NAME",
      },
      {
        title: "R.NO.",
        dataIndex: "RNO",
        key: "RNO",
      },
      {
        title: "Extra BED",
        dataIndex: "EXBED",
        key: "EXBED",
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
        title: "BOOKING AMOUNT",
        dataIndex: "BOOKINGAMOUNT",
        key: "BOOKINGAMOUNT",
      },
      {
        title: "ADVANCE AMOUNT",
        dataIndex: "ADVANCEAMOUNT",
        key: "ADVANCEAMOUNT",
      },
      {
        title: "CANCELLATION CHARGE",
        dataIndex: "CANCELLATIONCHARGE",
        key: "CANCELLATIONCHARGE",
      },
      {
        title: "NET AMOUNT",
        dataIndex: "NETAMOUNT",
        key: "NETAMOUNT",
      },
    ];

   const data = [
      {
        SRNO: 1,
        BID: 2,
        NAME: "Vijay",
        RNO: 102,
        EXBED: 1,
        CHECKINDATE: "14/04/2021",
        CHECKOUTDATE: "15/04/2021",
        BOOKINGAMOUNT: 2650,
        ADVANCEAMOUNT: 0,
        CANCELLATIONCHARGE: 265,
        NETAMOUNT: 265,
      },
      {
        SRNO: 2,
        BID: 3,
        NAME: "Pintoo",
        RNO: 103,
        EXBED: 2,
        CHECKINDATE: "14/04/2021",
        CHECKOUTDATE: "18/04/2021",
        BOOKINGAMOUNT: 5000,
        ADVANCEAMOUNT: 0,
        CANCELLATIONCHARGE: 1000,
        NETAMOUNT: 1000,
      },
    ];

    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: "calc(100px + 50%)", y: 240 }}
        />
      </>
    );
  }
}
