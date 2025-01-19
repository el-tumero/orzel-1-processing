import { Point } from "./algo/types"
import { EagleSensorDirection } from "./parser/EagleMessage"

const positionCache: Point[] = [{ x: 0, y: 0 }]

const pointCache: { front: Point[]; left: Point[]; right: Point[] } = {
  front: [],
  left: [],
  right: [],
}

export const getLatestPosition = () => {
  return positionCache[positionCache.length - 1]
}

export const addPositionToCache = (point: Point) => {
  positionCache.push(point)
}

export const getLatestPoint = (direction: EagleSensorDirection) => {
  return pointCache[direction][pointCache[direction].length - 1]
}
