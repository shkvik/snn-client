import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbCustom = () => {
  const location = useLocation(); // Получение текущего пути (URL)
  const pathSnippets = location.pathname.split('/').filter(i => i).map((value) => {
    return value.replace(/^\w/, (c) => c.toUpperCase());
  });

  return (
    <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
            {pathSnippets.map((path, index) => {
                return <Breadcrumb.Item> {path} </Breadcrumb.Item>;
            })}
        </Breadcrumb>
    </div>
  );
};

export default BreadcrumbCustom;