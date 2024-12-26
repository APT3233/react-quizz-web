import { combineReducers, createStore } from "redux";

const initialState = {
  user: null,
  status: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    // case "SET_STATUS":
    //   return action.status
    default:
      return state;
  }
};

const topicReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TOPIC": {
      return action.topic;
    }
    default:
      return state;
  }
};

const quizzReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POINT": {
      const existingItemIndex = state.findIndex(
        (item) => item.idTopic === action.idTopic
      );

      if (existingItemIndex !== -1) {
        return state.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              score: action.score,
              correctAns: action.correctAns,
              incorrectAns: action.incorrectAns,
              CorrectAns: action.CorrectAns,
              InCorrectAns: action.InCorrectAns,
              selected: action.selected,
            };
          }
          return item;
        });
      } else
        return [
          ...state,
          {
            idTopic: action.idTopic,
            name: action.name,
            score: action.score,
            correctAns: action.correctAns,
            CorrectAns: action.CorrectAns,
            InCorrectAns: action.InCorrectAns,
            selected: action.selected,
          },
        ];
    }
    default:
      return state;
  }
};

const AllReducer = combineReducers({ userReducer, topicReducer, quizzReducer });

const store = createStore(AllReducer);

export default store;
