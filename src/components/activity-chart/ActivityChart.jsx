import React , { useState, useEffect } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
    LineElement, Title, Tooltip, Legend } from 'chart.js';

import { Line } from 'react-chartjs-2';

import { options }  from './ActivitySettings.jsx';
import { dataSet, updateData, labels } from './ActivityData.jsx';

import { Badge } from 'antd';

import './Activity.css'

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,
    Title, Tooltip, Legend);

function replaceZerosWithNull(arr) {
  return arr.map(function(value) {
    return value === 0 ? null : value;
  });
}

function imitatePrediction(arr, max, min){
  return arr.map(function(value) {
    return value + Math.floor(Math.random() * (max - min + 1)) + min;
  });
}

function getStatusComponent(status){
  switch(status){
    case "Learning": return <Badge status="processing" text="Learning" />;
    case "Alarm": return  <Badge status="error" text="Alarm" />;
  }
}

const ActivityChart = (props) => {

    const ROWKEY = props.rowKey;
    const CALLBACK = props.callback;
    const GUID = props.guid;
    const TYPE = props.type;

    //console.log(RECORD);

    switch(TYPE)
    {
      case "Logic": options.elements.line = { stepped: true  }; break;
      case "Float": options.elements.line = { stepped: false }; break;
      default:      options.elements.line = { stepped: false }; break;
    }

    //console.log(options.elements.line);

    const [data, setData] = useState(dataSet);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Создание WebSocket соединения при монтировании компонента
        const ws = new WebSocket("ws://localhost:8080"); // Замените URL на адрес вашего WebSocket сервера
        setSocket(ws);

        const unixTime = Math.floor(new Date().getTime() / 1000);

        var request = {
            jsonrpc: "2.0",
            method: "TimeSeriasStream",
            params: [GUID],
            id: unixTime
        }

        ws.onopen = () => {
            ws.send(JSON.stringify(request))
            console.log('WebSocket connection opened');
        };

        // Обработчик события при получении сообщения от сервера
        ws.onmessage = (event) => {
            //console.log(JSON.parse(event.data).result)
            const data = JSON.parse(event.data).result.ts_frame;
            const status = JSON.parse(event.data).result.status;

            const newData = {
                labels: labels,
                datasets: [
                  {
                    borderColor: 'rgba(22, 119, 255, 1)',
                    pointRadius: 0, // скрыть точки 
                    borderWidth: 1,
                    data: data != null ? replaceZerosWithNull(data) :  [],
                  },
                ]
              };
              CALLBACK(ROWKEY, getStatusComponent(status));
              setData(newData);
        };
    
        // Функция, выполняющаяся при размонтировании компонента
        return () => {
          // Закрытие WebSocket соединения при размонтировании компонента
          ws.close();
        };
      }, []);

    return (
        <div className='cell'>
            <div style={{ width: '100%', height: '50px', borderRadius: '15px', padding: '8px'}}>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default ActivityChart;