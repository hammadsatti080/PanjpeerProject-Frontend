import {React,useEffect} from 'react'
import Sunrise from '../Component/Pictures/Sunrise'

export default function Sunrise() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return (
    <div>
      <Sunrise/>
    </div>
  )
}
