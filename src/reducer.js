const initialState = {
  restaurant: {
    id: 100,
    name: '',
    category: '',
    address: '',
  },
  restaurants: [],
};

const reducers = {
  updateRestaurant: (state, { payload: { restaurant } }) => ({
    ...state,
    restaurant: { ...state.restaurant, ...restaurant },
  }),
  addRestaurant: (state) => {
    const { restaurant, restaurants } = state;

    return {
      restaurant: {
        ...initialState.restaurant, id: restaurant.id + 1,
      },
      restaurants: [...restaurants, { id: restaurant.id, ...restaurant }],
    };
  },
};

export default function reducer(state = initialState, action = { type: undefined }) {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
}
