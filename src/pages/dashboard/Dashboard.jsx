import React from 'react';

import './Dashboard.css';

import ActivityChart from '../../components/activity-chart/ActivityChart';
import { ProtocolChart } from '../../components/protocol-chart/ProtocolChart';
import { ProgressChart } from '../../components/progress-chart/ProgressChart';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Progress, Badge, Divider } from 'antd';
import { useRef, useState, Link, Text, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import LearningStep from '../../components/learning-step/LearningStep';



function getStatusComponent(status){
  switch(status){
    case "Learning": return <Badge status="processing" text="Learning" />;
  }
}

function getTrainedComponent(trained){
  return <Progress percent={trained} steps={5} />;
}

function parseData(data) {
  var dataConnections = new Array();

  data.forEach(function(value, index) {
      console.log(value);
      dataConnections.push({
        key: index + 1,
        id: value.guid,
        client: value.client,
        server: value.server,
        protocol: value.protocol,
        trained: getTrainedComponent(value.trained),
        status: getStatusComponent(value.status),
        activity: <ActivityChart guid={value.timeSeriasGuid}/>
      });
      
  });
  return dataConnections;
}


const Dashboard = () => {

    const [data, setData] = useState(null);
    const [socket, setSocket] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
        {
          title: 'Id',
          dataIndex: 'key',
          key: 'key',
          className: 'my-cursor-pointer', // добавляем стиль курсора
          ...getColumnSearchProps('id'),
          
        },
        {
          title: 'GUID',
          dataIndex: 'id',
          key: 'id',
          className: 'my-cursor-pointer', // добавляем стиль курсора
          ...getColumnSearchProps('id'),
          
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            className: 'my-cursor-pointer',
            ...getColumnSearchProps('source'),
        },
        {
            title: 'Server',
            dataIndex: 'server',
            key: 'server',
            className: 'my-cursor-pointer',
            ...getColumnSearchProps('destination'),
        },
        {
            title: 'Protocol',
            dataIndex: 'protocol',
            className: 'my-cursor-pointer',
            key: 'protocol',
            ...getColumnSearchProps('protocol'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            className: 'my-cursor-pointer',
            key: 'status',
        },
        {
            title: 'Trained',
            dataIndex: 'trained',
            className: 'my-cursor-pointer',
            key: 'trained',
        },
        {
          title: 'Activity',
          dataIndex: 'activity',
          key: 'activity',
          className: 'my-cursor-pointer',
        },
      ];
      let navigate = useNavigate();

      const handleRowClick = (record) => {
        navigate(`/dashboard/modbus/${record.id}`);
      };

      useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);
        ws.onopen = function(e) {
          const unixTime = Math.floor(new Date().getTime() / 1000);
          var request = {
              jsonrpc: "2.0",
              method: "GetConections",
              params: [],
              id: unixTime
          }
          
          ws.send(JSON.stringify(request));
        };

        ws.onmessage = function(event) {
          var newData = JSON.parse(event.data);
          
          newData = parseData(newData);
          console.log(newData);
          setData(newData);
          ws.close();
        };

        ws.onclose = function(event) {
          console.log(`close websocket`);
        };

        return () => {
          ws.close();
        };
      }, []);

    return (
      <div style={{ width: '100%', height: '100%' }}>

        <div style={
          {
            marginBottom: 30,
            marginTop: 20,
            marginLeft: '15%',
            marginRight: '15%'
          }}>
          <LearningStep/>
        </div>
        <Divider/>
        <div style={
          { 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 80,
            marginLeft: '10%',
            marginRight: '10%'
          }}>
        <ProtocolChart/>

        <ProgressChart title={'Learning Nodes'} percent={80}/>
        <ProgressChart title={'Learned Nodes'} percent={5}/>
        <ProgressChart title={'Inactivated Nodes'} percent={15}/>

        </div>
        
        

        <Table columns={columns} dataSource={data}  onRow={(record) => ({
            onClick: () => handleRowClick(record),})} />
      </div>
    );
};

export default Dashboard;