import React from 'react';
import Typography from '@material-ui/core/Typography';

import JoinOrCreate from './JoinOrCreate';

const Home = () => {
  return <>
    <div className='planning-poker-title'>
      <Typography variant="h2">Planning Poker</Typography>
    </div>
    <JoinOrCreate />
  </>
}



export default Home;
