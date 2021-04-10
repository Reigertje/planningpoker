import React from 'react';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as FrontSvg } from 'assets/front.svg'

const OptionCard = ({ value, selected, onVote }) => {
  const className = classnames('option', { selected });
  return <div className={className}>
    <Card>
      <CardActionArea onClick={() => onVote(value)}>
        <div className='option-vote'>
          <FrontSvg />
          <div className='option-vote-value'>
            <Typography variant="button">{value}</Typography>
          </div>
        </div>
      </CardActionArea>
    </Card>
  </div>;
}

export default OptionCard;
