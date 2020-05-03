import React from 'react';

import "./Tab.scss";
import ModalLoading from '../../../../layouts/ModalLoading/ModalLoading';

const Tab = ({ main, minor, active, loading, activated }) => {

    const pathD = !active ? "M1.15 0.65H163.323V73.4579H1.15V0.65Z" :
        "M0.65 73.4578V0.65H161.523V73.4578L89.7001 73.45L89.4618 73.45L89.28 73.6039L81.0648 80.5591L71.8935 73.5827L71.7191 73.45L71.4999 73.45L0.65 73.4578Z";

    return (
        <svg className="profile-tab"
            active={active ? "true" : null}
            onClick={activated} viewBox="0 0 160 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={pathD}
                stroke="#EEEFF1" strokeWidth="2" />
            <foreignObject className="profile-tab-container">
                {!loading && <div xmlns="http://www.w3.org/1999/xhtml">
                    <span className="profile-tab-container-main-text">{main}</span>
                    <span className="profile-tab-container-minor-text">{minor}</span>
                </div>}

                {loading && <ModalLoading darken={false} style={{ height: '60%', top: 'calc(50% - (60% / 2))' }} />}
            </foreignObject>
        </svg>
    )
};

export default Tab;