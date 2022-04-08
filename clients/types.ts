import { ClientShort } from "@rshb/http/api/monolith";

export type ClientsDataState = {
  clientsList: ClientShort;
  availableOperations: string[];
  prepareDataStatus: string;
  hasUserEsd: boolean;
  esdLoadingStatus: string;
  typeUserSigning: string;
};

export type AvailableOperations = {
  availableOperations: string[];
};
