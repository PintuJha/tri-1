import React from 'react';
import { Tabs } from "antd";
import StaffRecord from './StaffRecord';
import User from './User';
import AttendencePeople from './AttendencePeople';
import LeavePeople from './LeavePeople';
import UserAccessFeature from './UserAccessFeature';
const { TabPane } = Tabs;

export default class PeopleNav extends React.Component{
    render(){
        const operations = <h3 style={{marginLeft:'1px'}}>People</h3>;
    return (
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab="User" key="1">
          <User />
        </TabPane>
        <TabPane tab="User Access Feature" key="2">
          <UserAccessFeature />
        </TabPane>
        <TabPane tab="Staff Record" key="3">
          <StaffRecord />
        </TabPane>
        <TabPane tab="Attendence People" key="4">
          <AttendencePeople />
        </TabPane>
        <TabPane tab="Leave People" key="5">
          <LeavePeople />
        </TabPane>
      </Tabs>
    );
    }
}