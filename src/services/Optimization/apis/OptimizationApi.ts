import axios from "axios";
import ServiceBase from "../../ServiceBase";
import { Project } from "../../../models/project/project.model";
import { Result } from "../../../models/optimization/result.model";
import { ValidationResult } from "../../../models/optimization/validation-result.model";

// const url = "http://127.0.0.1:5000";
const url = "https://gaudi-backend.azurewebsites.net";

function startOptimization(project: Project) {
  return new Promise<ValidationResult>((resolve, reject) => {
    axios
      .post<ValidationResult>(
        `${url}/optimize`,
        {
          project: project,
        },
        ServiceBase.getAxiosConfig(ServiceBase.getJsonHeaders())
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        if (res.response?.status === 400) resolve(res.response.data);
        else reject(res);
      });
  });
}

function getResult(indentifier: string) {
  return new Promise<Result>((resolve, reject) => {
    axios
      .get<Result>(`${url}/result?id=${indentifier}`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res));
  });
}

function terminateOptimization(indentifier: string) {
  return new Promise<string>((resolve, reject) => {
    axios
      .delete<string>(`${url}/optimization?id=${indentifier}`)
      .then((res) => resolve(res.data))
      .catch((res) => reject(res));
  });
}

const out = {
  startOptimization,
  getResult,
  terminateOptimization,
};

export default out;
