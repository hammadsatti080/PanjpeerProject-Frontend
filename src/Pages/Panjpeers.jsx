import {React,useEffect} from 'react'
import Panjpeerhill from '../Component/Navfolder/Panjpeer/Panjpeerhill'
import Essentialpanjpeer from '../Component/Navfolder/Panjpeer/Essentialpanjpeer'
import Stayarea from '../Component/Navfolder/Panjpeer/Stayarea'
import Foodservices from '../Component/Navfolder/Panjpeer/Foodservices'
import FAQcomponent from '../Component/Navfolder/Panjpeer/FAQcomponent'

export default function Panjpeer() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return (
    <div>
      <Panjpeerhill/>
      <Essentialpanjpeer/>
      <Stayarea/>
      <Foodservices/>
      <FAQcomponent/>
    </div>
  )
}
