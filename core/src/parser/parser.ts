import { Point } from "../algo/types"
import { DrawMessage } from "./DrawMessage"
import { EagleData, EagleMessage, EagleSensorDirection } from "./EagleMessage"

/**
 * @throws {Error}
 */
export const parseMessageFromEagle = (
  msg: string
): EagleData => {
  const data = msg as any
  if (
    !data["Heading"] ||
    !data["Distance, Variation"] ||
    data["Distance, Variation"].length !== 6
  ) {
    throw new Error("Invalid message")
  }

  const message = data as EagleMessage
  const distVar = message["Distance, Variation"]

  return {
    heading: convertToRadians(message.Heading),
    direction: {
      front: {
        distance: distVar[2],
        variation: distVar[3],
      },
      left: {
        distance: distVar[0],
        variation: distVar[1],
      },
      right: {
        distance: distVar[4],
        variation: distVar[5],
      },
    },
  }
}

export const createDrawMessage = (
  point: Point,
  variant: EagleSensorDirection | "position"
): DrawMessage => {
  let color: string
  switch (variant) {
    case "front":
      color = "Green"
      break
    case "left":
      color = "Blue"
      break
    case "right":
      color = "Red"
      break
    case "position":
      color = "White"
      break
  }
  return {
    point: point,
    color: color,
  }
}

const convertToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}
