import React from 'react';
import { Box } from "@material-ui/core";
import { Tabs } from "antd";
//import AddSuperAdmin from "./AddSuperAdmin";
import SuperAdminList from "./SuperAdminList";
import HotelRegistration from './HotelRegistration';
import Configuration from './Configuration';
import GSTCalculation from './GSTCalculation';

const { TabPane } = Tabs;

export default class Admin extends React.Component {
  render() {
    const operations = <h3 style={{marginLeft:'1px'}}>Admin</h3>;
    return (
      <Box>
        <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={operations}>
          <TabPane tab="Super Admin" key="1">
            <SuperAdminList />
          </TabPane>
          <TabPane tab="Hotel Registration" key="3">
            <HotelRegistration />
          </TabPane>
          <TabPane tab="Configuration" key="2">
            <Configuration />
          </TabPane>
          <TabPane tab="GST Calculation" key="4">
            <GSTCalculation />
          </TabPane>
        </Tabs>
      </Box>
    );
  }
}
