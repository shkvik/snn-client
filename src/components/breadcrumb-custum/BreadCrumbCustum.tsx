import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbCustom = () => {
    const location = useLocation(); // Получение текущего пути (URL)

    const pathSnippets = location.pathname.split('/').filter(i => i && i != 'modbus').map((value) => {
        return value.replace(/^\w/, (c) => c.toUpperCase());
    });

    if(pathSnippets.length == 0){
        pathSnippets.push("Home");
    }

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0', cursor: 'default' }}>
                {pathSnippets.map((path, index) => {
                    return (
                        <Breadcrumb.Item>
                            {path}
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbCustom;