export type EagleMessage = {
  Heading: number
  "Distance, Variation": number[]
}

export type EagleDirectionData = {
  distance: number
  variation: number
}

export type EagleSensorDirection = "front" | "left" | "right"

export type EagleData = {
  heading: number
  direction: {
    front: EagleDirectionData
    left: EagleDirectionData
    right: EagleDirectionData
  }
}
