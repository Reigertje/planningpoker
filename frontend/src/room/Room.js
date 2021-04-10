import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReplayIcon from '@material-ui/icons/Replay';
import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as CardsIconSvg } from 'assets/cards.svg';
import { ReactComponent as CatIconSvg } from 'assets/cat_icon.svg';

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
const CatIcon = ({ className }) => <SvgIcon className={className} component={CatIconSvg} />;

const useRoom = (roomId) => {
  const { client, dispatchError } = useContext(AppContext);
  const [roomState, setRoomState] = useState(null);
  const history = useHistory();

  useEffect(() => {
    client.on('roomState', data => {
      setRoomState(data);
    })

    client.emit('join', roomId, success => {

      if (!success) {
        history.replace('/');
        dispatchError('Room does not exist');
      }
    });

    return () => {
      client.emit('leave');
      client.off('roomState');
    }
  }, [roomId, client, dispatchError, history]);

  return roomState;
}

const Room = () => {
  const { client } = useContext(AppContext);
  const { roomId } = useParams();
  const roomState = useRoom(roomId);
  const [cookies, setCookie] = useCookies([NAME_COOKIE_KEY]);

  const [showNameDialog, setShowNameDialog] = useState(!cookies[NAME_COOKIE_KEY]);
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);

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
      <div className='header-row'>
        <div className='room-actions'>
          <RoomActionButton IconComponent={CatIcon} onClick={() => setShowNameDialog(true)}>{ roomState.you.displayName || 'Anonymous' }</RoomActionButton>
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
      <div className='actions-row'>
        <IconButton color="primary" size="large" onClick={reset}>
          <ReplayIcon />
        </IconButton>
        <IconButton color="secondary" size="large" disabled={roomState.state !== 'SCORING'} onClick={reveal}>
          <VisibilityIcon />
        </IconButton>
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

export default Room;
