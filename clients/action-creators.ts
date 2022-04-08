import { Dispatch } from "@reduxjs/toolkit";
import { api as monolithApi } from "@rshb/http/api/monolith";
import { api as depositsApi } from "@rshb/http/api/deposits";
import { Action, Payload } from "modules/deposits/types/actions";
import { ClientsActionTypes } from "./action-types";
import { NotificationsActionTypes } from "../notifications/action-types";
import { setNotification } from "../notifications/action-creators";
import { LOADING_STATUSES_LIST } from "../../common/constants";

export const clearPrepareDataStatus = (): Action<
  ClientsActionTypes,
  Payload
> => ({
  type: ClientsActionTypes.SET_PREPARE_DATA_STATUS,
  payload: {
    data: "",
  },
});

// функция для запуска подготовки данных на бэкенде. При обращении к депозитам бэкенду требуется некоторое время, чтобы собрать всю информацию по интеграциям
// Рекомендуется запускать эту функцию в синхронном режиме, перед загрузкой основных данных по депозитам
export const startPrepareData =
  () =>
  async (
    dispatch: Dispatch<
      Action<ClientsActionTypes | NotificationsActionTypes, Payload>
    >
  ) => {
    try {
      dispatch({
        type: ClientsActionTypes.SET_PREPARE_DATA_STATUS,
        payload: {
          data: LOADING_STATUSES_LIST.LOADING,
        },
      });

      await depositsApi.api.prepareClientData();

      dispatch({
        type: ClientsActionTypes.SET_PREPARE_DATA_STATUS,
        payload: {
          data: LOADING_STATUSES_LIST.SUCCESS,
        },
      });
    } catch (error) {
      dispatch(setNotification(error?.message));
      dispatch({
        type: ClientsActionTypes.SET_PREPARE_DATA_STATUS,
        payload: {
          data: LOADING_STATUSES_LIST.ERROR,
        },
      });
    }
  };

export const getClientsList =
  () =>
  async (
    dispatch: Dispatch<
      Action<ClientsActionTypes | NotificationsActionTypes, Payload>
    >
  ) => {
    try {
      const clientsListResponse = await monolithApi.clients.clientsList();

      dispatch({
        type: ClientsActionTypes.SET_CLIENTS_LIST,
        payload: {
          data: clientsListResponse?.data,
        },
      });
    } catch (error) {
      dispatch(setNotification(error?.error?.errors?.[0]));
    }
  };

export const getAvailableOperations =
  () =>
  async (
    dispatch: Dispatch<
      Action<ClientsActionTypes | NotificationsActionTypes, Payload>
    >
  ) => {
    try {
      const availableOperationsResponse =
        await depositsApi.api.getAvailableOperations();

      dispatch({
        type: ClientsActionTypes.SET_AVAILABLE_OPERATIONS,
        payload: {
          data: availableOperationsResponse?.data,
        },
      });
    } catch (error) {
      dispatch(setNotification(error?.message));
    }
  };

export const checkExistenceSmsSigning =
  () =>
  async (
    dispatch: Dispatch<
      Action<ClientsActionTypes | NotificationsActionTypes, Payload>
    >
  ) => {
    try {
      const existOneTimePasswordResponse =
        await depositsApi.api.getClientConfirmType();

      dispatch({
        type: ClientsActionTypes.SET_TYPE_USER_SIGNING,
        payload: {
          data: existOneTimePasswordResponse?.data?.confirmType,
        },
      });
    } catch (error) {
      dispatch(setNotification(error?.error?.errors?.[0]));
    }
  };

export const checkExistenceEsd =
  () =>
  async (
    dispatch: Dispatch<
      Action<ClientsActionTypes | NotificationsActionTypes, Payload>
    >
  ) => {
    try {
      dispatch({
        type: ClientsActionTypes.SET_ESD_LOADING_STATUS,
        payload: {
          data: LOADING_STATUSES_LIST.LOADING,
        },
      });

      const existEsdResponse = await depositsApi.api.checkEsd();

      dispatch({
        type: ClientsActionTypes.SET_HAS_USER_ESD,
        payload: {
          data: existEsdResponse?.data?.hasEsd,
        },
      });
      dispatch({
        type: ClientsActionTypes.SET_ESD_LOADING_STATUS,
        payload: {
          data: LOADING_STATUSES_LIST.SUCCESS,
        },
      });
    } catch (error) {
      dispatch(setNotification(error?.error?.errors?.[0]));
      dispatch({
        type: ClientsActionTypes.SET_ESD_LOADING_STATUS,
        payload: {
          data: LOADING_STATUSES_LIST.ERROR,
        },
      });
    }
  };
