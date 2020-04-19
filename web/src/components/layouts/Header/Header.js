import React, { useState, useEffect } from 'react';

import Logo from '../../../assets/icons/apiko-logo.svg';
import Heart from '../../../assets/icons/heart.svg';
import './Header.scss';
import Button from '../Button';
import TextField from '../TextField';
import { Link, useHistory } from 'react-router-dom';
import ApikoLogo from '../ApikoLogo/ApikoLogo';
import { NOT_LOGINED, LOGINED, LOGINING, UNLOGINED, UNLOGINING } from '../../../constants/login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Icon from '../Icon';
import UserIcon from '../UserIcon/UserIcon';
import UserPanel from '../UserPanel/UserPanel';
import _ from 'lodash';
import ModalLoading from '../ModalLoading/ModalLoading';
import { LOADING, NOT_LOADED, LOADED } from '../../../constants';

const Header = ({ loginStatus, loadingDataState, fullName }) => {
    const history = useHistory();
    let darkMode = history.location.pathname === "/";

    const [minorPanel, setMinorPanel] = useState();

    const [userPanelOpen, setUserPanelOpen] = useState(false);

    useEffect(() => {
        setHeaderMinorPanel = setMinorPanel;
    }, [ ]);

    useEffect(() => {
        darkMode = window.location.pathname;
    }, [window.location.pathname]);

    let ref = React.createRef();

    return (
        <div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
            <header className="header">
                <Link to="/">
                    <ApikoLogo darkMode={darkMode} className="header__apiko-logo"/>
                </Link>
                    <div></div>
                    { loginStatus === LOGINED &&
                        <Icon>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 0H1.99C0.88 0 0.00999999 0.89 0.00999999 2L0 16C0 17.1 0.88 18 1.99 18H16C17.1 18 18 17.1 18 16V2C18 0.89 17.1 0 16 0ZM16 12H12.87C12.4 12 12.02 12.34 11.89 12.8C11.54 14.07 10.37 15 9 15C7.63 15 6.46 14.07 6.11 12.8C5.98 12.34 5.6 12 5.13 12H2V3C2 2.45 2.45 2 3 2H15C15.55 2 16 2.45 16 3V12Z" fill="white"/>
                            </svg>
                        </Icon>
                    }

                    { loginStatus !== LOGINED && <div></div> }

                    <Button id="sell-button">Sell</Button>

                    { ((loginStatus === NOT_LOGINED || loginStatus === UNLOGINED) && loadingDataState !== LOADING) && 
                        <Button id="login-button" dark-mode={darkMode ? "true" : null} type="transparent">
                            <Link to="/login">Login</Link>
                        </Button>
                    }
                    
                    { (loadingDataState === LOADING || loginStatus === LOGINED || loginStatus === LOGINING || loginStatus === UNLOGINING) && 
                        <div className="header-profile" tabIndex={1} onBlur={() => setTimeout(() => setUserPanelOpen(false), 100) }>
                            { loginStatus === LOGINED && loadingDataState === LOADED && <UserIcon onClick={() => setUserPanelOpen(!userPanelOpen) }  
                                    fullName={fullName}/>}
                            { userPanelOpen && <UserPanel /> }
                            { (loginStatus === LOGINING || loadingDataState === LOADING || loginStatus === UNLOGINING) && 
                                <ModalLoading style={{height: `48px`, width: `48px`, borderRadius: `50%`}}/> }
                        </div>
                    }
                    
                    <svg className="header-heart" dark-mode={darkMode ? "true" : null} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.468 0.0104926C15.968 0.0104926 17.3937 0.638009 18.383 1.61687C19.3723 2.59549 20 4.02098 19.9998 5.52118C19.9998 6.01046 19.9498 6.48981 19.8509 6.95732C19.6523 7.89419 19.4115 8.56141 18.8616 9.40409C18.5925 9.81667 18.3537 10.1614 18.1276 10.4465C17.9068 10.7252 17.5957 11.0636 17.2021 11.4574C16.8084 11.8509 16.4892 12.1593 16.2446 12.3828C16.1231 12.4936 15.9724 12.6247 15.7958 12.7784C15.6164 12.9346 15.4101 13.114 15.1807 13.319C14.4444 13.9763 13.8748 14.4919 13.4785 14.8614C13.0875 15.2261 12.5981 15.7361 12.0103 16.3933C11.4279 17.0446 10.9303 17.7051 10.4997 18.3508C10.3769 18.535 10.202 18.6167 9.99974 18.6167C9.80843 18.6167 9.6466 18.5332 9.52111 18.3508C8.84863 17.3735 8.13827 16.5208 7.1701 15.5956C6.69147 15.138 6.32696 14.7899 6.07438 14.5636C6.02983 14.5237 5.981 14.4798 5.92779 14.4321C5.67275 14.203 5.31713 13.8836 4.85088 13.4785C4.36134 13.0532 3.98912 12.7233 3.74448 12.4997C3.49984 12.2763 3.16484 11.9627 2.7552 11.5635C2.34575 11.1647 2.04255 10.8189 1.82967 10.5422C1.61703 10.2658 1.36853 9.91722 1.09572 9.49987C0.826111 9.08726 0.623431 8.68216 0.489314 8.30837C0.219216 7.55441 0 6.55288 0 5.52115C0 4.02098 0.627745 2.59549 1.61706 1.61683C2.60657 0.638009 4.03206 0.0104599 5.53199 0.0104599C6.41484 0.0104599 7.24458 0.212486 8.04255 0.616898C8.84049 1.02111 9.48938 1.57419 10 2.27637C10.5107 1.57419 11.1595 1.02111 11.9575 0.61693C12.7552 0.212486 13.585 0.0104926 14.468 0.0104926ZM16.8724 10.0849C17.9018 8.94425 18.5185 7.78657 18.7234 6.60618C18.7844 6.25464 18.8192 5.89334 18.8195 5.52115C18.8195 4.31899 18.394 3.29771 17.5429 2.45729C16.6919 1.61687 15.6706 1.19134 14.4684 1.19134C13.628 1.19134 12.8407 1.41464 12.1281 1.87219C11.4154 2.32948 10.9023 2.93977 10.543 3.69121C10.4341 3.91886 10.245 4.02098 10.0004 4.02098C9.75575 4.02098 9.58189 3.91134 9.47908 3.69121C9.12435 2.93252 8.5749 2.32948 7.86206 1.87219C7.14918 1.41464 6.37255 1.19134 5.53216 1.19134C4.33023 1.19134 3.30892 1.6169 2.44719 2.46794C1.59611 3.30837 1.17059 4.32964 1.17059 5.52115C1.17059 6.14866 1.22621 6.71513 1.40458 7.26572L1.64925 8.02102C1.77138 8.39851 2.06814 8.8369 2.30582 9.18803C2.36051 9.26881 2.41206 9.34497 2.45765 9.41471C2.57569 9.59497 2.75565 9.81892 2.98964 10.0743C3.03999 10.1292 3.08824 10.1818 3.13436 10.2321C3.3026 10.4155 3.44259 10.5681 3.55337 10.6913C3.69931 10.8534 3.92265 11.067 4.21291 11.3295L4.8831 11.936L5.61706 12.5848C6.30611 13.194 6.80856 13.6381 7.13833 13.9359C7.4681 14.2339 7.91222 14.6833 8.48938 15.2763C9.06108 15.8641 9.56376 16.436 9.99997 16.9997C10.4149 16.4253 10.9014 15.8375 11.4575 15.2445C12.0185 14.646 12.4894 14.1703 12.8723 13.819C13.2661 13.4575 13.7685 13.0027 14.3936 12.4466C15.5983 11.3749 16.423 10.5826 16.8724 10.0849Z" />
                    </svg>

                    { minorPanel && <div></div> }
                    { minorPanel && 
                        <div className="header-minor-panel">
                            { minorPanel }
                        </div>
                    }
            </header>
        </div>
    );
}

export let setHeaderMinorPanel = (panel) => { }

export default compose(
    connect(({ user: { loginStatus, loadingDataState, data: { fullName }}}) => ({ loginStatus, loadingDataState, fullName }))
)(Header);