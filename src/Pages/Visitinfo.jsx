import {React,useEffect} from 'react'
import Reachdirection from '../Component/Visitinfo/Reachdirection';
import Facilities from '../Component/Visitinfo/Facilities';
import Activities from '../Component/Visitinfo/Activities';
import Maplocation from '../Component/Visitinfo/Maplocation';
import FAQ from '../Component/Visitinfo/FAQ';
import HeaderNavbar from '../Publicfolder/HeaderNavbar';

export default function Visitinfo() {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, []);
  return (
    <div className='mt-20'>
   <HeaderNavbar/>
    <Reachdirection/>
    <Facilities/>
    <Activities/>
  <Maplocation/>
  <FAQ/>
    </div>
  )
}