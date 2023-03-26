const GETSONG = 'getSong';
const ADDSONG = 'addSong';

export const getSong = () => ({
  type: GETSONG,
});
export const addSong = () => ({
  type: ADDSONG,
});

const initialState = {
  song: [],
};

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case GETSONG:
      return {
        ...state,
        song: action.payload,
      };
    case ADDSONG:
      return {
        ...state,
        song: action.payload,
      };
    default:
      return state;
  }
}
