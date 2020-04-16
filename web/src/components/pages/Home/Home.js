import React from 'react';

const Home = ({ history }) => {
    return ( 
        <div>
            <button onClick={ () => history.push("/login") }>Login</button>
        </div>
     );
}

export default Home;