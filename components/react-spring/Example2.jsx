'use client'
import { useSprings, animated } from 'react-spring'

export default function ExampleComponent() {
  const items = ['Item 1', 'Item 2', 'Item 3']
  
  const props2 = useSprings(
    items.length,
    items.map((item, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(0,90px,0)" },
    }))
  )

  return (
    <div className='flex items-center flex-col justify-center'>
      
      {props2.map((style, i) => (
        <animated.div className="item border-2 border-red-300 w-10 h-10" style={style} key={i}>
        </animated.div>
      ))}
      
    </div>
  )
}
