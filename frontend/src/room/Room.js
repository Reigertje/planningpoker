import React, { useState, useEffect, useContext, useReducer } from "react";
import roomReducer, { initialState } from "./reducer";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReplayIcon from "@mui/icons-material/Replay";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as CardsIconSvg } from "assets/cards.svg";
import { ReactComponent as CatIconSvg } from "assets/cat_icon.svg";
import { AppContext } from "App";
import Participant from "./Participant";
import ProfileDialog from "./ProfileDialog";
import OptionsDialog from "./OptionsDialog";
import OptionCard from "./OptionCard";
import { OPTION_DECKS } from "options";

const NAME_COOKIE_KEY = "name";
const ROOM_COOKIE_KEY = "room";

const RoomActionButton = ({ children, IconComponent, onClick }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      className="room-action-button"
      onClick={onClick}
      startIcon={
        <>
          <EditIcon className="room-action-edit" />
          <IconComponent className="room-action-icon" />
        </>
      }
    >
      {children}
    </Button>
  );
};

const CardsIcon = ({ className }) => (
  <SvgIcon className={className} component={CardsIconSvg} />
);
const CatIcon = ({ className }) => (
  <SvgIcon className={className} component={CatIconSvg} />
);

const useRoom = (roomId) => {
  const { client, dispatchError } = useContext(AppContext);
  const [roomState, setRoomState] = useState(null);
  const navigate = useNavigate();
  const [store] = useReducer(roomReducer, initialState);

  console.log(store);

  roomReducer(store, { type: "JOIN_ROOM", payload: { roomId, client } });

  if (!store.joined) {
    dispatchError("Could not join room");
  }

  useEffect(() => {
    client.on("roomState", (data) => {
      setRoomState(data);
    });

    client.emit("join", roomId, (success) => {
      if (!success) {
        navigate("/");
        dispatchError("Room does not exist");
      }
    });

    return () => {
      client.emit("leave");
      client.off("roomState");
    };
  }, [roomId, client, dispatchError, navigate, roomState]);

  return roomState;
};

const Room = () => {
  const { client } = useContext(AppContext);
  const { roomId } = useParams();
  const roomState = useRoom(roomId);
  const [cookies, setCookie] = useCookies([NAME_COOKIE_KEY, ROOM_COOKIE_KEY]);

  const [showProfileDialog, setShowProfileDialog] = useState(
    !cookies[NAME_COOKIE_KEY]
  );
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);



  const name = (displayName) => {
    setCookie(NAME_COOKIE_KEY, displayName, { path: "/" });
    client.emit("name", displayName);
  };

  useEffect(() => {
    if (cookies[NAME_COOKIE_KEY]) {
      name(cookies[NAME_COOKIE_KEY]);
    }
  }, [cookies[NAME_COOKIE_KEY]]);

  const vote = (value) => {
    client.emit("vote", value);
  };

  const reset = () => {
    client.emit("reset");
  };

  const reveal = () => {
    client.emit("reveal");
  };

  const profile = (displayName, isSpectator) => {
    setCookie(NAME_COOKIE_KEY, displayName, { path: "/" });
    client.emit("profile", { displayName, isSpectator });
  };

  const options = (value) => {
    client.emit("options", value);
  };

  const voteForParticipant = (participant) => {
    return roomState.votes.find(
      (vote) => vote.participantId === participant.id
    );
  };

  return (
    <>
      {roomState && (
        <div>
          <ProfileDialog
            open={showProfileDialog}
            handleClose={() => setShowProfileDialog(false)}
            onChangeProfile={(name, isSpectator) => profile(name, isSpectator)}
            initialName={roomState?.you?.displayName}
            initialIsSpectator={roomState?.you?.isSpectator}
          />
          <OptionsDialog
            open={showOptionsDialog}
            handleClose={() => setShowOptionsDialog(false)}
            onChangeOptions={(value) => options(value)}
          />
          <div className="header-row">
            <div className="room-actions">
              <RoomActionButton
                IconComponent={CatIcon}
                onClick={() => setShowProfileDialog(true)}
              >
                {roomState.you.displayName || "Anonymous"}
                {roomState.you.isSpectator && (
                  <Chip
                    className="spectator-chip"
                    label="Spectator"
                    size="small"
                    color="secondary"
                  />
                )}
              </RoomActionButton>
              <RoomActionButton
                IconComponent={CardsIcon}
                onClick={() => setShowOptionsDialog(true)}
              >
                {OPTION_DECKS.find(
                  ({ options }) => options === roomState.options
                )?.name || "Custom"}
              </RoomActionButton>
            </div>
          </div>

          <div className="participants-row">
            {roomState.participants
              .filter((participant) => !participant.isSpectator)
              .map((participant) => (
                <Participant
                  key={participant.id}
                  participant={participant}
                  vote={voteForParticipant(participant)}
                  hideVoteValue={roomState.state === "SCORING"}
                />
              ))}
          </div>
          <div className="actions-row">
            <IconButton color="primary" onClick={reset}>
              <ReplayIcon />
            </IconButton>
            <IconButton
              color="secondary"
              disabled={roomState.state !== "SCORING"}
              onClick={reveal}
            >
              <VisibilityIcon />
            </IconButton>
          </div>
          <div className="info-row">
            {roomState.state === "SCORING"
              ? roomState.you.isSpectator
                ? "Spectating. Waiting for people to vote"
                : "Select a card and wait for others..."
              : "-"}
          </div>
          {!roomState.you.isSpectator && (
            <div className="options-row">
              {roomState.options.split(",").map((value) => (
                <OptionCard
                  key={value}
                  value={value}
                  onVote={vote}
                  selected={voteForParticipant(roomState.you)?.value === value}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Room;
