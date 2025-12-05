import React from 'react'
import Header from '../Component/Homescreen/Header'
import Location from '../Component/Homescreen/Location'
import Gallery from '../Component/Homescreen/Gallery'
import Visitorinfo from '../Component/Homescreen/Visitorinfo'
import ReviewComponent from '../Component/Homescreen/ReviewComponent'
import Sections from '../Component/Homescreen/Sections'
import Review from '../Component/Homescreen/Review'
import Areainfo from '../Component/Homescreen/Areainfo'
import Activities from '../Component/Visitinfo/Activities'
import Locations from '../Component/Visitinfo/Locations'
import Randomweather from '../Component/Pictures/Gallerymodel/Randomweather'



export default function Homescreen() {
  return (
    <div>
      <Header/>
     <Location/>
     <Locations/>
      <Gallery/>
      <Areainfo/>
      <Activities/>
     <Visitorinfo/>
<Sections/>
<Randomweather/>
    </div>
  )
}
