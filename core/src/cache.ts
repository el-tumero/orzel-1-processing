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

export const clearCache = () => {
  positionCache.length = 0
  pointCache.front.length = 0
  pointCache.left.length = 0
  pointCache.right.length = 0
  positionCache.push({x: 0, y: 0})
}
