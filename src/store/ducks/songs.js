const GETSONG = 'getSong';
const ADDSONG = 'addSong';

export const getSong = () => ({
  type: GETSONG,
});
export const addSong = (song) => ({
  type: ADDSONG,
  song,
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
      const { song } = action;
      return {
        ...state,
        song,
      };
    default:
      return state;
  }
}
