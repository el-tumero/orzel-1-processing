import { EagleData, EagleSensorDirection } from "../parser/EagleMessage"
import { Point } from "./types"

export const calculatePosition = (
  previousPosition: Point,
  data: EagleData
): Point => {
  return {
    x:
      previousPosition.x +
      data.direction.front.variation * Math.sin(data.heading),
    y:
      previousPosition.y +
      data.direction.front.variation * Math.cos(data.heading),
  }
}

export const calculatePoint = (
  position: Point,
  data: EagleData,
  direction: EagleSensorDirection
): Point => {
  return {
    x:
      position.x +
      data.direction[direction].distance *
        Math.sin(getSensorAngleRadians(data.heading, direction)),
    y:
      position.y +
      data.direction[direction].distance *
        Math.cos(getSensorAngleRadians(data.heading, direction)),
  }
}

export const getSensorAngleRadians = (
  heading: number,
  direction: EagleSensorDirection
): number => {
  switch (direction) {
    case "front":
      return heading
    case "left":
      return heading - Math.PI / 2
    case "right":
      return heading + Math.PI / 2
  }
}
