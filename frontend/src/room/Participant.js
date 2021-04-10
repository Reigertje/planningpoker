import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as PlaceHolderSvg } from 'assets/placeholder.svg'
import { ReactComponent as FrontSvg } from 'assets/front.svg'
import { ReactComponent as BackSvg } from 'assets/back.svg'


const ParticipantVote = ({ vote, hideValue }) => {
  if (!vote) return <PlaceHolderSvg />;

  const voteValue = hideValue ? null : vote.value;

  return <>
    { voteValue === null ? <BackSvg /> : <FrontSvg /> }
    <div className='participant-vote-value'>
      <Typography variant="h4">{voteValue}</Typography>
    </div>
  </>
}

const Participant = ({ participant, vote, hideVoteValue }) => {
  return <div className='participant'>
    <Card>
      <div className='participant-vote'>
        <ParticipantVote vote={vote} hideValue={hideVoteValue} />
      </div>
      <Typography variant="caption">{participant.displayName || 'Anonymous'}</Typography>
    </Card>
  </div>;
}


export default Participant;
