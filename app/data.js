import React from "react"
import { readdirSync } from "fs"
import { join } from "path"

export function recentList(array) {
  // get list of files in public/recents directory
  const files = readdirSync(join(process.cwd(), "public", "recents"))

  // map array items to objects with name and imageUrl properties
  const transformedArray = array.map((item) => {
    // convert name to lowercase for case-insensitive matching
    const name = item.name.toLowerCase()
    // find first file in recents directory that matches name
    const file = files.find((file) => {
      const fileName = file.toLowerCase()
      return fileName.includes(name)
    })
    // create object with name and imageUrl properties
    return {
      name: item.name,
      imageUrl: file ? `/recents/${file}` : "",
    }
  })

  return transformedArray
}
