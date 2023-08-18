import { IStringDictionary } from "../models/interfaces/IStringDictionary";

function getJsonHeaders() {
  return {
    "content-type": "application/json",
  };
}

function getAxiosConfig(headers?: IStringDictionary<string>, params?: any) {
  const response = {
    headers: {
      ...headers,
    },
  } as any;

  if (params) {
    response["params"] = params;
  }
  return response;
}

const out = {
  getJsonHeaders,
  getAxiosConfig,
};

export default out;
