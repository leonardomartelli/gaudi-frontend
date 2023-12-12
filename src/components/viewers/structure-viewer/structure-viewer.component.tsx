import React, { useEffect, useMemo, useRef, useState } from "react";
import { StructureViewerContract } from "./structure-viewer.interface";
import { Force } from "../../../models/project/force.model";
import styles from "./structure-viewer.module.scss";
import { Support } from "../../../models/project/support.model";
import { isDimensionable } from "../../../renders/utils/common.utils";
import { eCreationState } from "../../../models/enums/eCreationState";
import { Position } from "../../../models/project/position.model";
import { Dimensions } from "../../../models/project/dimensions.model";
import { BoundaryConditionCreator } from "../../../creators/boundary-condition-creator/boundary-condition-creator";
import StructureRender from "../../../renders/StructureRender";
import ForceRender from "../../../renders/ForceRender";
import { ForceDrawingDefinition } from "./boundary-conditions-drawings-definitions/force-drawing-definition.component";
import { SupportDrawingsDefinitions } from "./boundary-conditions-drawings-definitions/support-defintions/support-drawings-definitions.component";
import SupportRender from "../../../renders/SupportRender";
import ConstantRegionRender from "../../../renders/ConstantRegionRender";

export function StructureViewer(props: StructureViewerContract) {
  const boundaryConditionCreator = useMemo<BoundaryConditionCreator>(
    () =>
      new BoundaryConditionCreator(
        props.forces,
        props.supports,
        props.constantRegions
      ),
    [props.constantRegions, props.forces, props.supports]
  );

  const width = props.width;
  const height = props.height;
  const densities = props.densities;

  let [counter, setCounter] = useState(1);

  const ref = useRef(null);

  const squareSize = 12;
  const viewerHeight = squareSize * height;
  const viewerWidth = squareSize * width;

  const paddingRate = 0.2;
  const innerPaddingX = viewerWidth * paddingRate;
  const innerPaddingY = viewerHeight * paddingRate;

  let [positionChanged, setPositionChanged] = useState(0);

  useEffect(() => {
    StructureRender.renderStructureCountour(ref, width, height, squareSize);
  }, [width, height]);

  useEffect(() => {
    const onClick = (event: any) => {
      const x = event.target.x.animVal.value;
      const y = event.target.y.animVal.value;

      const creationPosition = new Position(
        Math.round(x / squareSize),
        Math.round(y / squareSize)
      );

      boundaryConditionCreator.create(creationPosition, props.creationState);
      setPositionChanged(positionChanged + 1);

      props.setCreationState(eCreationState.NONE);
    };

    StructureRender.renderStructure(
      ref,
      width,
      height,
      squareSize,
      innerPaddingX,
      innerPaddingY,
      viewerWidth,
      viewerHeight,
      densities,
      onClick
    );

    // if (props.optimizationIdentifier !== "") {
    //   setCounter(counter + 1);
    //   props.triggerUpdate(counter);
    // }
  }, [
    boundaryConditionCreator,
    counter,
    densities,
    height,
    innerPaddingX,
    innerPaddingY,
    positionChanged,
    props,
    viewerHeight,
    viewerWidth,
    width,
  ]);

  useEffect(() => {
    const onClick = (event: any) => {
      const datum: Force = event.target.__data__;

      if (event.shiftKey) {
        const datum = event.target.__data__;
        props.removeForce(datum.id);
      } else if (event.altKey) {
        datum.orientation = (datum.orientation + 1) % 2;
        setPositionChanged(positionChanged + 1);
      }
    };

    ForceRender.renderForce(
      ref,
      props.forces,
      width,
      height,
      squareSize,
      onClick
    );
  }, [height, positionChanged, props, width]);

  useEffect(() => {
    const onClick = (event: any) => {
      if (event.shiftKey) {
        const datum = event.target.__data__;
        props.removeConstantRegion(datum.id);
      }
    };

    ConstantRegionRender.renderConstantRegions(
      ref,
      props.constantRegions,
      width,
      height,
      squareSize,
      onClick
    );
  }, [height, props, width]);

  useEffect(() => {
    const onClickLeftSupport = (event: any) => {
      const datum: Support = event.target.__data__;
      if (event.shiftKey) {
        props.removeSupport(datum.id);
      } else if (event.altKey) {
        datum.direction = datum.direction > 0 ? 0 : 1;
      } else if (isDimensionable(datum) === false) {
        datum.dimensions = new Dimensions(5, 5);
      }
      SupportRender.rerenderSupport(ref, datum, squareSize);
    };

    const onClickRectangle = (event: any) => {
      const datum = event.target.__data__;
      if (event.shiftKey) {
        props.removeSupport(datum.id);
      } else if (event.altKey) {
        datum.direction = datum.direction > 0 ? 0 : 1;
        SupportRender.rerenderSupport(ref, datum, squareSize);
      }
    };

    const onClickRightSupport = (event: any) => {
      const datum = event.target.__data__;
      if (event.shiftKey) {
        props.removeSupport(datum.id);
      } else if (event.altKey) {
        datum.direction = datum.direction > 0 ? 0 : 1;
        SupportRender.rerenderSupport(ref, datum, squareSize);
      }
    };

    SupportRender.renderSupports(
      ref,
      props.supports,
      width,
      height,
      squareSize,
      onClickLeftSupport,
      onClickRightSupport,
      onClickRectangle
    );
  }, [height, props, width]);

  return (
    <div className={styles.viewer}>
      <svg ref={ref}>
        <defs>
          <ForceDrawingDefinition id="force" transform="scale(2.5)" />
          <SupportDrawingsDefinitions />
        </defs>
      </svg>
    </div>
  );
}
