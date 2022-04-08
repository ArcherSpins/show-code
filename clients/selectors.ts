import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "store";
import { ClientShort } from "@rshb/http/api/monolith";

const clientListSelector = (state: AppState): ClientShort =>
  state.deposits.model.clients?.clientsList;

export const clientIdSelector = createSelector(
  clientListSelector,
  (clientsList) => clientsList?.[0]?.id
);

export const clientNameSelector = createSelector(
  clientListSelector,
  (clientsList) => clientsList?.[0]?.shortName
);

export const availableOperationsSelector = (state: AppState) =>
  state.deposits.model.clients?.availableOperations;

export const prepareDataStatusSelector = (state: AppState) =>
  state.deposits.model.clients?.prepareDataStatus;

export const isUserWithSmsSigningSelector = (state: AppState) =>
  state.deposits.model.clients?.typeUserSigning === "sms";

export const hasUserEsdSelector = (state: AppState) =>
  state.deposits.model.clients?.hasUserEsd;

export const esdLoadingStatusSelector = (state: AppState) =>
  state.deposits.model.clients?.esdLoadingStatus;
