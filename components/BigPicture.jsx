"use client"
import { useState } from "react"
import Sidebar from "./Sidebar"
import Image from "next/image"
import { useSprings, useSpring, animated } from "react-spring"
import { TbUser } from "react-icons/tb"
import { AiOutlineDownCircle } from "react-icons/ai"

export default function BigPicture() {
  const [width, setWidth] = useState("small")

  return (
    <div>
      <Sidebar width={width} setWidth={setWidth} />
      <MainArea width={width} />
    </div>
  )
}

const MainArea = ({ width }) => {
  const recentlyPlayed = [
    {
      name: "Liked Songs",
      imageUrl: "/recents/recent-liked.png",
    },
    {
      name: "Daily Mix 2",
      imageUrl: "/recents/recent-daily-2.png",
    },
    {
      name: "Gemini",
      imageUrl: "/recents/recent-gemini.png",
    },
    {
      name: "Housewerk",
      imageUrl: "/recents/recent-werk.png",
    },
    {
      name: "Release Radar",
      imageUrl: "/recents/recent-release.png",
    },
    {
      name: "Kasket Club",
      imageUrl: "/recents/recent-kasket.png",
    },
  ]
  const recentSprings = useSprings(
    recentlyPlayed.length,
    recentlyPlayed.map((_, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(50px,0,0)" },
    }))
  )
  const { opacity } = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <div
      className={`text-white flex-shrink  flex-grow-0 w-full transition-all duration-500 h-full pr-2 ${
        width === "small"
          ? "pl-[90px]"
          : width === "medium"
          ? "ml-[300px] left-[300px] top-2 xs:ml-[360px] md:ml-[430px]"
          : "xl:ml-[620px] ml-[420px]"
      }`}
    >
      <div
        className="my-2 py-3 bg-gradient-to-b from-[#161029] to-brand h-full w-full flex flex-col gap-6 rounded-lg overflow-y-scroll"
        style={{ maxHeight: "calc(100vh - 1px)" }}
      >
        {/* greeting and recent playlists */}
        <animated.div
          style={{ opacity }}
          className="px-5 flex  items-center justify-between"
        >
          {/* greeting */}
          <h1
            className="text-[32px] font-semibold tracking-tighter"
            style={opacity}
          >
            Good evening
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-sm bg-black/50 sm:px-4 font-medium py-2.5 rounded-full flex items-center justify-center gap-1.5  w-9 h-9 sm:w-auto sm:h-auto transition-all duration-300 hover:bg-neutral-800/30">
              <AiOutlineDownCircle size={24} className="w-5 h-5" />
              <span className="hidden sm:block">Install app</span>
            </button>
            <div className="bg-black/50 hover:bg-neutral-800/30 rounded-full h-9 w-9 grid place-items-center transition-all duration-300 cursor-pointer">
              <TbUser size={20} />
            </div>
          </div>
        </animated.div>

        <div className="flex px-5 flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 ">
          {recentSprings.map((spring, i) => (
            <animated.div
              style={spring}
              key={i}
              className="rounded-lg min-h-[64px] md:min-h-[80px] cursor-pointer  flex items-center overflow-hidden "
            >
              <Image
                src={recentlyPlayed[i].imageUrl}
                width={100}
                height={110}
                alt=""
                className="w-[60px] md:w-[80px] h-full object-cover"
              />
              <div className="bg-[#1d1d1dc5] flex items-center font-semibold pl-4 md:h-[80px] h-[60px] w-full hover:bg-neutral-800">
                <p>{recentlyPlayed[i].name}</p>
              </div>
            </animated.div>
          ))}
        </div>
        <div className="mt-3">
          {Rows.map((item) => (
            <Row key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Rows = [
  {
    heading: "Made For cooldaddy",
    secondaryText: "RÜFÜS DU SOL, KUNZITE, Rhye and more",
    imageUrl: "/icons/daily-1.png",
    name: "Daily Mix 1",
  },
  {
    heading: "Your top mixes",
    secondaryText: "Wild Nothing, Neon Trees, and more",
    imageUrl: "/mixes/mix-1.png",
    name: "2010s Mix",
  },
  {
    heading: "Recently played",
    secondaryText: "Deadmau5, Kaskade, Skrillex and more",
    imageUrl: "/mixes/mix-2.png",
    name: "Daily Mix 2",
  },
  {
    heading: "Pop",
    secondaryText: "Deadmau5, Kaskade, Skrillex and more",
    imageUrl: "/mixes/mix-3.png",
    name: "Daily Mix 2",
  },
  {
    heading: "Top Dance & EDM hits",
    secondaryText: "Deadmau5, Kaskade, Skrillex and more",
    imageUrl: "/mixes/mix-7.png",
    name: "Daily Mix 2",
  },
  {
    heading: "electronic vibes",
    secondaryText: "Deadmau5, Kaskade, Skrillex and more",
    imageUrl: "/mixes/mix-8.png",
    name: "Daily Mix 2",
  },
  {
    heading: "Throwback favorites",
    secondaryText: "Deadmau5, Kaskade, Skrillex and more",
    imageUrl: "/mixes/mix-9.png",
    name: "Daily Mix 2",
  },
]

const Row = ({ heading }) => {
  const { opacity } = useSpring({ opacity: 1, from: { opacity: 0 } })
  const rowSprings = useSprings(
    Rows.length,
    Rows.map((_, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(0,50px,0)" },
    }))
  )
  return (
    <div className="flex flex-col gap-2">
      <animated.div style={{ opacity }} className="px-5">
        <h1 className="text-[24px] translate-y-5 font-semibold tracking-tighter">
          {heading}
        </h1>
      </animated.div>
      <div className="w-full px-5 pt-8 overflow-x-scroll flex gap-4">
        {rowSprings.map((props, i) => (
          <animated.div
            key={i}
            className="group mb-6 p-4 max-w-[210px] flex-shrink-0 rounded-lg bg-neutral-900 hover:bg-neutral-800 hover:scale-150 relative transition-all duration-500 cursor-pointer "
            style={props}
          >
            <Image
              className="rounded-lg h-[186px] w-[186px] hover:-translate-y-1 transition-all duration-500 group-hover:scale-[1.1] group-hover:-translate-y-4"
              src={Rows[i].imageUrl}
              width={280}
              height={50}
              alt=""
            />
            <div className="flex gap-1.5 flex-col mt-3">
              <h3 className="font-semibold">{Rows[i].name}</h3>
              <p className="text-[13px] text-neutral-400">
                {Rows[i].secondaryText}
              </p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
