import { AppContext } from "App";
import { useContext } from "react";

const JOIN_ROOM = 'JOIN_ROOM';
const LEAVE_ROOM = 'LEAVE_ROOM';

export const initialState = {
  room: null,
  joined: false,
};

// Reducer function
const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM: {
      const { roomId, client } = action.payload;

      client.emit('join', roomId, (success) => {
        if (!success) { return { ...state } }
      });

      return {
        ...state,
        room: roomId,
        joined: true,
      };
    }
    case LEAVE_ROOM: {
      return {
        ...state,
        room: null,
        joined: false,
      };
    }
    default:
      return state;
  }
};

export default roomReducer;
