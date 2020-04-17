import React, { useEffect } from 'react';
import Header, { setHeaderMinorPanel } from '../../layouts/Header/Header';
import TextField from '../../layouts/TextField';
import Icon from '../../layouts/Icon';

import './Home.scss';
import Button from '../../layouts/Button';

const Home = ({ history }) => {

    useEffect(() => {
        setHeaderMinorPanel(
            <div className="home-page-header-minor">
                <TextField placeholder="Search products by name" icon={ 
                    <Icon>
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.23782 13.1718C10.4389 13.1718 12.9756 10.5265 12.9756 7.33592C12.9756 4.14538 10.4389 1.5 7.23782 1.5C4.03674 1.5 1.5 4.14538 1.5 7.33592C1.5 10.5265 4.03674 13.1718 7.23782 13.1718Z" fill="white" fillOpacity="0.01" stroke="#5C5C5C" strokeWidth="3"/>
                            <path d="M10.7646 11.6667L14.7577 15.7522" stroke="#5C5C5C" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </Icon>
                } />
                <TextField placeholder="Location" icon={
                    <Icon>
                        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.22222 0C2.91694 0 0 2.80662 0 5.77778C0 11.7808 5.9422 18.3683 5.77778 18.7778C6.27255 18.7295 6.38357 18.7778 7.22222 18.7778C6.62727 18.7706 6.73016 18.7295 7.22222 18.7778C7.06051 18.3604 13 11.6634 13 5.77778C13 2.80662 10.0831 0 7.22222 0ZM7.22222 8.66667C5.30418 8.66667 4.33333 7.69815 4.33333 7.22222C4.33333 5.30426 5.30418 4.33333 7.22222 4.33333C7.69582 4.33333 8.66667 5.30426 8.66667 7.22222C8.66667 7.69815 7.69582 8.66667 7.22222 8.66667Z" fill="#5C5C5C"/>
                        </svg>
                    </Icon>
                } />
                <Button style={{textTransform: "uppercase"}} type="martinique">Search</Button>
            </div>
        );
        return () => {
            setHeaderMinorPanel();
        }
    }, [ ]);

    return ( 
        <div>
            
        </div>
     );
}

export default Home;