import React from 'react';
import { Progress, Space } from 'antd';


export function ProgressChart(props: any) {
    const _title = props.title;
    const _percent = props.percent;
    const _color = props.color != null ? props.color : '#1677ff';

    return( 
      <div style={{cursor: 'default'}}>
          <p style={{color: '#094292', fontSize: 18, textAlign: 'center'}}> {_title} </p>
          <div style={{ marginTop: 50 }}>
            <Progress 
              type="dashboard" 
              percent={_percent} 
              gapDegree={50} 
              size={200} 
              strokeColor={_color}/>
          </div>
      </div>
    ) ;
  }
  