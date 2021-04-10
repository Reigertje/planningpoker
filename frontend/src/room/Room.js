import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReplayIcon from '@material-ui/icons/Replay';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as CardsIconSvg } from 'assets/cards.svg';

import { AppContext } from 'App';

import Participant from './Participant';
import NameDialog from './NameDialog';
import OptionsDialog from './OptionsDialog';
import OptionCard from './OptionCard';
import { OPTION_DECKS } from 'options';


const NAME_COOKIE_KEY = 'name';


const RoomActionButton = ({ children, IconComponent, onClick }) => {
  return <Button
    variant="outlined"
    className='room-action-button'
    onClick={onClick}
    startIcon={<>
        <EditIcon className='room-action-edit' />
        <IconComponent className='room-action-icon' />
      </>
    }
  >
    {children}
  </Button>
}

const CardsIcon = ({ className }) => <SvgIcon className={className} component={CardsIconSvg} />;

const Room = ({ client, roomState, dispatchError }) => {
  const { roomId } = useParams();
  const history = useHistory();
  const [cookies, setCookie] = useCookies([NAME_COOKIE_KEY]);
  const [showNameDialog, setShowNameDialog] = useState(!cookies[NAME_COOKIE_KEY]);
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);

  useEffect(() => {
    client.emit('join', roomId, success => {
      if (!success) {
        history.replace('/');
        dispatchError('Room does not exist');
      }
    });
  }, []);

  useEffect(() => {
    if (cookies[NAME_COOKIE_KEY]) {
      name(cookies[NAME_COOKIE_KEY]);
    }
  }, [])

  const vote = (value) => {
    client.emit('vote', value);
  };

  const reset = () => {
    client.emit('reset');
  }

  const reveal = () => {
    client.emit('reveal');
  }

  const name = (value) => {
    setCookie(NAME_COOKIE_KEY, value, { path: '/' });
    client.emit('name', value);
  }

  const options = (value) => {
    client.emit('options', value);
  }

  const voteForParticipant = (participant) => {
    return roomState.votes.find(vote => vote.participantId === participant.id)
  }

  return <>
    { roomState && <div>
      <NameDialog
        open={showNameDialog}
        handleClose={() => setShowNameDialog(false)}
        onChangeName={value => name(value)}
      />
      <OptionsDialog
        open={showOptionsDialog}
        handleClose={() => setShowOptionsDialog(false)}
        onChangeOptions={value => options(value)}
      />
      <div className='actions-row'>
        <div className='planning-actions'>
          <IconButton color="primary" size="large" onClick={reset}>
            <ReplayIcon />
          </IconButton>
          <IconButton color="secondary" size="large" disabled={roomState.state !== 'SCORING'} onClick={reveal}>
            <VisibilityIcon />
          </IconButton>
        </div>
        <div className='room-actions'>
          <RoomActionButton IconComponent={PersonIcon} onClick={() => setShowNameDialog(true)}>{ roomState.you.displayName || 'Anonymous' }</RoomActionButton>
          <RoomActionButton IconComponent={CardsIcon} onClick={() => setShowOptionsDialog(true)}>
            { OPTION_DECKS.find(({ options }) => options === roomState.options)?.name || 'Custom' }
          </RoomActionButton>
        </div>
      </div>

      <div className='participants-row'>
        { roomState.participants.map(participant =>
          <Participant key={participant.id} participant={participant} vote={voteForParticipant(participant)} hideVoteValue={roomState.state === 'SCORING'} />
        )}
      </div>
      <div className='info-row'>
        { roomState.state === 'SCORING' ? 'Select a card and wait for others...' : '-' }
      </div>
      <div className='options-row'>
        { roomState.options.split(',').map(value => <OptionCard value={value} onVote={vote} selected={voteForParticipant(roomState.you)?.value === value}/>) }
      </div>
    </div>
    }
  </>
}

const RoomWrapper = () => {
  const { client, roomState, dispatchError } = useContext(AppContext);

  if (!client && !roomState) return <span>Loading...</span>;

  return <Room client={client} roomState={roomState} dispatchError={dispatchError} />;
}

export default RoomWrapper;
