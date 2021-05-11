import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { Tabs,Button } from "antd";
import RoomCategory from "./RoomCategory";
import Floor from "./Floor";
import RoomNo from "./RoomNo";
import ViewTariff from "./ViewTariff";
import ViewInventory from "./ViewInventory";
const { TabPane } = Tabs;

export default class RoomManagementNav extends React.Component {
  render() {
    const operations = <h3 style={{marginLeft:'1px'}}>Room Management</h3>;
    return (
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab="Room Category" key="rm">
          <RoomCategory />
        </TabPane>
        <TabPane tab="Floor" key="fr">
          <Floor />
        </TabPane>
        <TabPane tab="Room No" key="rn">
          <RoomNo />
        </TabPane>
        <TabPane tab="Tariff Plan" key="tp">
          <ViewTariff />
        </TabPane>
        <TabPane tab="Inventory" key="in">
          <ViewInventory />
        </TabPane>
      </Tabs>
    );
  }
}
