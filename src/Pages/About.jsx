import {React,useEffect} from 'react'
import Areainformation from '../Component/About/Areainformation'
import Introduction from '../Component/About/Introduction'
import History from '../Component/About/History'
import PanjpeerPracticalInfo from '../Component/About/PanjpeerPracticalInfo'

export default function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return (
    <div>
        <Introduction/>
        <History/>
        <PanjpeerPracticalInfo/>
      <Areainformation/>

    </div>
  )
}
