import React from 'react';
import { 
    LoadingOutlined, 
    SmileOutlined, 
    SolutionOutlined, 
    UserOutlined,
    GlobalOutlined,
    SearchOutlined,
    FundViewOutlined
} from '@ant-design/icons';
import { Steps } from 'antd';

const LearningStep: React.FC = () => (
  <Steps
    items={[
      {
        title: 'Connect to LAN',
        status: 'finish',
        icon: <GlobalOutlined />,
      },
      {
        title: 'Define connections',
        status: 'finish',
        icon: <SearchOutlined />,
      },
      {
        title: 'Learning',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'AI Monitoring',
        status: 'wait',
        icon: <FundViewOutlined />,
      },
    ]}
  />
);

export default LearningStep;