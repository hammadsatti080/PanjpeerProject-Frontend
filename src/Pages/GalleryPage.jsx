import {React,useEffect} from 'react'
import GalleryPages from '../Component/Pictures/Gallerymodel/GalleryPages'

export default function GalleryPage() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return (
    <div>
    <GalleryPages/>
    
    </div>
  )
}
