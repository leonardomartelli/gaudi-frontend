import * as d3 from "d3";
import { MutableRefObject } from "react";
import constants from "../assets/constants";

function renderStructure(ref: MutableRefObject<null>, width: number, height: number, squareSize: number, innerPaddingX: number, innerPaddingY: number, viewerWidth: number, viewerHeight: number, densities: number[], onClick: (event: any) => void) {
    function to_id(x: number, y: number) {
        return x * height + y;
    }

    const svg = d3.select(ref.current);

    svg
        .attr("viewBox", [
            -innerPaddingX,
            -innerPaddingY,
            viewerWidth + 2 * innerPaddingX,
            viewerHeight + 2 * innerPaddingY,
        ])
        .attr("width", viewerWidth)
        .attr("height", viewerHeight)
        .attr("style", "width: 100%; height: 90%");

    const structure = svg
        .selectAll<SVGRectElement, number>(".dens")
        .data<number>(d3.range(height * width))
        .join("rect")
        .attr("x", (d: number) => (d % width) * squareSize)
        .attr("y", (d: number) => Math.floor(d / width) * squareSize)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("class", "dens")
        .attr("fill", constants.NIGHT_BLACK)
        .attr(
            "fill-opacity",
            (d: number) => densities[to_id(d % width, Math.floor(d / width))]
        )
        .lower();

    structure.on("click", onClick);
}

function renderStructureCountour(ref: MutableRefObject<null>, width: number, height: number, squareSize: number) {
    const svg = d3.select(ref.current);

    svg
        .selectAll(".contour")
        .data<number>(d3.range(1))
        .join("rect")
        .attr("class", "contour")
        .attr("x", "-5")
        .attr("y", "-5")
        .attr("width", width * squareSize + 10)
        .attr("height", height * squareSize + 10)
        .attr("stroke-width", "10")
        .attr("fill", "none")
        .attr("stroke", constants.POPPY);
}

const out = {
    renderStructure,
    renderStructureCountour
}

export default out
