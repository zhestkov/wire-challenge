// action types
export const SET_LOADING = 'SET_LOADING';

// action interfaces

export interface ISetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

// actions
export const setLoading = (loading: boolean): ISetLoadingAction => ({
  type: SET_LOADING,
  payload: loading
});

export interface ILoadingState {
  isLoading: boolean;
}

const initialState: ILoadingState = {
  isLoading: false
};

export default (state: ILoadingState = initialState, action: ISetLoadingAction) => {
  switch(action.type) {
    case 'SET_LOADING':
      return {
        isLoading: action.payload
      };
    default:
      return state;
  }
};
