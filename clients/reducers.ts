import { ClientsActionTypes } from "./action-types";
import { ClientsDataState } from "./types";

const initialState: ClientsDataState = {
  clientsList: null,
  prepareDataStatus: "",
  hasUserEsd: false,
  esdLoadingStatus: "",
  availableOperations: [],
  typeUserSigning: "",
};

export const clientsReducer = (
  state = initialState,
  { type, payload }
): ClientsDataState => {
  switch (type) {
    case ClientsActionTypes.SET_CLIENTS_LIST:
      return {
        ...state,
        clientsList: payload?.data,
      };
    case ClientsActionTypes.SET_AVAILABLE_OPERATIONS:
      return {
        ...state,
        availableOperations: payload?.data?.availableOperations,
      };
    case ClientsActionTypes.SET_PREPARE_DATA_STATUS:
      return {
        ...state,
        prepareDataStatus: payload?.data,
      };
    case ClientsActionTypes.SET_HAS_USER_ESD:
      return {
        ...state,
        hasUserEsd: payload?.data,
      };
    case ClientsActionTypes.SET_ESD_LOADING_STATUS:
      return {
        ...state,
        esdLoadingStatus: payload?.data,
      };
    case ClientsActionTypes.SET_TYPE_USER_SIGNING:
      return {
        ...state,
        typeUserSigning: payload?.data,
      };
    default:
      return state;
  }
};
