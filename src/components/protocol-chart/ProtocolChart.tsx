import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);



export const data = {
  labels: ['Goose', 'MMS', 'SV', 'NTP','Modbus', 'PTPv2'],
  datasets: [
    {
      data: [1, 2, 1, 1, 10 ,3],
      backgroundColor: 'rgba(22, 119, 255, 0.1)',
      borderColor: 'rgba(22, 119, 255, 1)',
      borderWidth: 1,
    },
  ],
};

const plugins = {
    legend: { 
        display: false 
    },
}

const options = {
    plugins
};

export function ProtocolChart() {
  return(
    <div style={{ width: 270, height: 270, cursor: 'default'}}>
        <p style={{color: '#094292', fontSize: 18, textAlign: 'center'}}> Protocol Detected </p>
        <Radar data={data} options={options}/>
    </div>
  ) ;
}
