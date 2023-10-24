import React from "react";
import { ProjectToolBar } from "../../components/toolbars/project-toolbar/project-toolbar.component";
import { ProjectViewer } from "../../components/viewers/project-viewer/project-viewer.component";
import styles from "./gaudi-main.module.scss";
import { OptimizationContextProvider } from "../../contexts/optimization-context/optimization-context-provider.component";
import { Toaster } from "react-hot-toast";

export function GaudiMain() {
  return (
    <div className={styles.gaudi}>
      <Toaster position="bottom-right" reverseOrder={false} />
      <OptimizationContextProvider>
        <ProjectToolBar />
        <ProjectViewer />
      </OptimizationContextProvider>
    </div>
  );
}
