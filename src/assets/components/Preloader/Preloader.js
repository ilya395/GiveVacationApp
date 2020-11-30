import React from 'react';
import { Spin, Space } from 'antd';

import './Preloader.scss';

const Preloader = () => {
    return (
        <div className="work-area preloader">
            <div className="container">
                <div className="preloader-wrapper big active">
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </div>
            </div>
        </div>
    );
}

export default Preloader;