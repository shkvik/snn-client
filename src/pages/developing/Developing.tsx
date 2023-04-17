import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Developing: React.FC = () => (
  <Result
    status="404"
    title="Develop Stage"
    subTitle="Sorry, the page is developing right now."
    extra={
    <Button type="primary"> 
        <Link to={'/'}> Back Home </Link>
    </Button>
    }
  />
);

export default Developing;