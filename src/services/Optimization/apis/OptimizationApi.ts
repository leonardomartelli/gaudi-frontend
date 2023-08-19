import axios from "axios";
import ServiceBase from "../../ServiceBase";
import { Project } from "../../../models/project/project.model";
import { Result } from "../../../models/optimization/result.model";

const url = "http://127.0.0.1:5000";

function startOptimization(project: Project) {
  return new Promise<string>((resolve, reject) => {
    axios
      .post<string>(
        `${url}/optimize`,
        {
          project: project,
        },
        ServiceBase.getAxiosConfig(ServiceBase.getJsonHeaders())
      )
      .then((res) => resolve(res.data))
      .catch((res) => reject(res));
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

const out = {
  startOptimization,
  getResult,
};

export default out;
