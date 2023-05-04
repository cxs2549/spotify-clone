"use client"
import { useSprings, animated } from "react-spring"

export default function ExampleComponent() {
  const items = ["Item 1", "Item 2", "Item 3"]
  const props = useSprings(
    items.length,
    items.map((item, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(0,90px,0)" },
    }))
  )

  return props.map((style, i) => (
    <animated.div
      className="border-2 w-10 h-10"
      key={i}
      style={style}
    ></animated.div>
  ))
}
