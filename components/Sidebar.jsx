"use client"
import Image from "next/image"
import { useMemo, useState } from "react"
import { RiHome3Fill } from "react-icons/ri"
import { BiSearch, BiLibrary } from "react-icons/bi"
import { BsCaretDownFill, BsListUl } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai"
import { useSprings, useSpring, animated } from "react-spring"

const Sidebar = ({ width, setWidth }) => {
  const Filters = () => (
    <div
      className={`flex w-full items-center justify-start -ml-7 gap-2 text-sm ${
        width === "small" ? "hidden" : ""
      }`}
    >
      {["Playlists", "Artists", "Albums", "Podcasts & Shows"].map((item) => (
        <div
          key={item}
          className="rounded-full whitespace-nowrap transition-all duration-200 hover:scale-[1.2] hover:bg-neutral-800 bg-[#232323] px-3 py-1.5"
        >
          {item}
        </div>
      ))}
    </div>
  )
  const Rows = [
    {
      icon: <RiHome3Fill size={32} />,
      name: "Home",
      classes: "cursor-pointer group",
      onClick: () => {
        setWidth(width === "small" ? "medium" : "small")
      },
    },
    {
      icon: <BiSearch size={32} />,
      name: "Search",
      classes: "cursor-pointer group",
    },

    {
      icon: <BiLibrary size={32} />,
      name: "Your Library",
      classes: "min-h-[56px]",
      content: (
        <div className="flex gap-4 items-center absolute top-1/2 -translate-y-1/2 right-6 text-neutral-400">
          <AiOutlinePlus
            className={`hover:text-white ${width === "small" ? "hidden" : ""}`}
            size={24}
          />
          <BsListUl
            className={`cursor-pointer hover:text-white ${
              width === "large" ? "xl:block" : "hidden"
            }`}
            size={24}
          />
          <AiOutlineArrowRight
            onClick={() => setWidth(width === "medium" ? "large" : "medium")}
            className={`cursor-pointer md:block hover:text-white hidden ${
              width === "small"
                ? "hidden"
                : width === "medium"
                ? "hidden xl:block"
                : width === "large"
                ? "rotate-180"
                : ""
            }`}
            size={24}
          />
        </div>
      ),
      onClick: () => {
        setWidth(width === "small" ? "medium" : "small")
      },
    },
    {
      content: <Filters />,
      classes: "h-[66px] hover:bg-brand !important overflow-y-hidden py-2",
      edgeCase: width === "small" ? "hidden" : "",
    },
    {
      content: (
        <div
          className={`text-sm flex justify-between w-full items-center font-medium text-neutral-400 pr-6 ${
            width === "small" ? "hidden" : ""
          }`}
        >
          <BiSearch className="-translate-x-5" size={20} />
          <div className="flex items-center gap-3">
            <p>Recents</p>{" "}
            <BsCaretDownFill className="translate-y-px" size={15} />
          </div>
        </div>
      ),
      edgeCase: width === "small" ? "hidden" : "",
      classes: "h-[40px] mb-2 hover:bg-brand !important",
    },
    {
      name: "Liked Songs",
      iconImageUrl: "/icons/liked.png",
      classes: "h-[50px] gap-[13px] mb-2 hover:bg-neutral-800/50",
      secondaryText: (
        <p className="text-xs text-neutral-300">Playlist &bull; 334 songs</p>
      ),
    },
    {
      name: "Your Episodes",
      iconImageUrl: "/icons/saved.png",
      classes: "h-[50px] gap-[13px] mb-2",
      secondaryText: (
        <p className="text-xs text-neutral-300">Saved & downloaded episodes</p>
      ),
    },
    {
      name: "Release Radar",
      iconImageUrl: "/art/release.jpeg",
      classes: "h-[50px] gap-[13px] mb-2",
      secondaryText: (
        <p className="text-xs text-neutral-300">Playlist &bull; Spotify</p>
      ),
    },
    {
      name: "Your Top Songs 2022",
      iconImageUrl: "/art/top-2022.jpeg",
      classes: "h-[50px] gap-[13px] mb-2",
      secondaryText: (
        <p className="text-xs text-neutral-300">Playlist &bull; Spotify</p>
      ),
    },
    {
      name: "Your Top Songs 2021",
      iconImageUrl: "/art/top-2021.jpeg",
      classes: "h-[50px] gap-[13px] mb-2",
      secondaryText: (
        <p className="text-xs text-neutral-300">Playlist &bull; Spotify</p>
      ),
    },
  ]
  const art = useMemo(() => {
    const excludedIndices = [2, 12, 14, 23]
    const artData = []

    for (let i = 1; i <= 25; i++) {
      if (excludedIndices.includes(i)) {
        continue // Skip this index and move on to the next iteration
      }

      const iconImageUrl = `/art/albums-${i + 1}.jpeg`
      const name = `Playlist ${i}`
      const secondaryText = (
        <p className="text-xs text-neutral-300">Playlist &bull; cooldaddy</p>
      )
      const classes = "min-h-[50px] gap-[13px] mb-2"

      const album = { iconImageUrl, classes, name, secondaryText }
      artData.push(album)
    }

    return artData
  }, [])
  const FullRows = [...Rows, ...art]
  const HomeSearch = FullRows.slice(0, 2)
  const Library = FullRows.slice(2, 4)
  const Playlists = FullRows.slice(4)
  const Row = ({
    icon,
    name,
    iconImageUrl,
    content,
    classes,
    onClick,
    edgeCase,
    secondaryText,
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const homeSearchSpring = useSpring({
      scale: isHovered ? 1.2 : 1,
      from: { scale: 1 },
    })

    return (
      <div
        className={`flex items-center relative w-full transition-all overflow-x-scroll gap-6 duration-200 ease-in-out pl-[22px] hover:bg-neutral-800/50 group h-[56px] hover:text-white cursor-pointer  ${classes} ${edgeCase}`}
      >
        {iconImageUrl && (
          <Image
            className={`cursor-pointer -translate-x-2 rounded-md min-h-[46px]  w-[46px]`}
            src={iconImageUrl}
            width={44}
            height={44}
            alt={name}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}
        <div className="flex group gap-6 items-center">
          {icon && (
            <animated.div
              style={homeSearchSpring}
              onClick={onClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`text-neutral-400 cursor-pointer group-hover:text-white hover:text-white ${
                name === "Home" && "text-white"
              }`}
            >
              {icon}
            </animated.div>
          )}
          {width !== "small" && name ? (
            <div className="flex flex-col">
              <p
                className={` group-hover:text-white cursor-pointer hover:text-white ${
                  name === "Home" ||
                  name === "Search" ||
                  name === "Your Library"
                    ? "font-semibold"
                    : "font-medium"
                } ${name === "Liked Songs" ? "text-[#1ED760]" : "text-neutral-400"} ${
                  name === "Home" && "text-white"
                }`}
              >
                {name}
              </p>

              {secondaryText}
            </div>
          ) : null}
        </div>
        {content}
      </div>
    )
  }
  const homeSearchSprings = useSprings(
    HomeSearch.length,
    HomeSearch.map((item, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(0,40px,0)" },
    }))
  )
  const LibrarySprings = useSprings(
    Library.length,
    Library.map((item, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(0,40px,0)" },
    }))
  )
  const playlistsSprings = useSprings(
    Playlists.length,
    Playlists.map((item, i) => ({
      opacity: 1,
      transform: "translate3d(0,0,0)",
      delay: i * 100,
      from: { opacity: 0, transform: "translate3d(0,40px,0)" },
    }))
  )

  return (
    <div
      className={`text-white pb-20 block transition-all duration-500 ease-in-out absolute bg-black top-0 h-screen left-0  ${
        width === "small"
          ? "w-[90px]"
          : width === "medium"
          ? "w-[300px] xs:w-[360px] md:w-[430px]"
          : width === "large"
          ? "xl:w-[620px]"
          : ""
      }`}
    >
      {/* home/search */}
      <div
        className={`bg-brand flex flex-col items-center justify-center m-2  rounded-lg`}
      >
        {homeSearchSprings.map((style, i) => (
          <animated.div
            className={`w-full flex items-center justify-center h-full rounded-lg`}
            key={HomeSearch[i].name}
            style={style}
          >
            <Row {...HomeSearch[i]} />
          </animated.div>
        ))}
      </div>

      {/* library */}
      <div
        className={`bg-brand flex overflow-hidden  flex-col h-screen gap-2 m-2 pb-5 rounded-lg mb-20`}
      >
        {LibrarySprings.map((style, i) => (
          <animated.div
            className={`w-full flex items-center justify-center rounded-lg`}
            key={Library[i].name}
            style={style}
          >
            <Row {...Library[i]} />
          </animated.div>
        ))}
        <div className="overflow-y-scroll">
          {playlistsSprings.map((style, i) => (
            <animated.div
              className={`w-full flex items-center justify-center rounded-lg`}
              key={Playlists[i].name}
              style={style}
            >
              <Row {...Playlists[i]} />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
