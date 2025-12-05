import {React,useEffect} from 'react'
import Webintro from '../Component/Pictures/Webintro'
import GallerySection from '../Component/Pictures/GallerySection'
import Hero from '../Component/Pictures/Hero'
import Waterfall from '../Component/Pictures/Waterfall';
import Mountain from '../Component/Pictures/Mountain';
import Gallerynav from '../Component/Pictures/Gallerynav';
import Snowfall from '../Component/Pictures/Snowfall';
import GalleryPages from '../Component/Pictures/Gallerymodel/GalleryPages';




export default function Gallerysection() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return (
    <div>
     <Webintro/>
     <GallerySection/>
 <Hero/>
 <Gallerynav/>
 <Waterfall/>
 <Snowfall/>
 <GalleryPages/>

 
    </div>
  )
}
