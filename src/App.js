import { Routes, Route } from "react-router-dom";
import Navbar from "./Publicfolder/Navbar";
import Homescreen from "./Pages/Homescreen";
import Footer from "./Publicfolder/Footer";
import Review from "./Component/Homescreen/Review";
import About from "./Pages/About";
import Visitorinfo from "./Component/Homescreen/Visitorinfo";
import Gallerysection from "./Pages/Gallerysection";
import Sunrise from "./Component/Pictures/Sunrise";
import SunriseUploadandgallery from "./Component/Pictures/SunriseUploaderAndGallery";
import Seasonal from "./Component/Pictures/Seasonal";
import Visitinfo from "./Pages/Visitinfo";
import Areainformation from "./Component/Homescreen/Areainformation";
import ContactForm from "./Publicfolder/ContactForm";
import Waterfall from "./Component/Pictures/Waterfall";
import Mountain from "./Component/Pictures/Mountain";
import Snowfall from "./Component/Pictures/Snowfall";
import GalleryPage from "./Pages/GalleryPage";


function App() {
  return (
    <>
   <Navbar/>

      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="About" element={<About />} />
        <Route path="Review" element={<Review />} />
        <Route path="Visitorinfo" element={<Visitorinfo />} />
        <Route path="gallery" element={<Gallerysection />} />
        <Route path="sunrise" element={<Sunrise />} />
        <Route path="Seasonal" element={<Seasonal />} />
        <Route path="Visitinfo" element={<Visitinfo />} />
        <Route path="Areainformation" element={<Areainformation />} />
        <Route path="ContactForm" element={<ContactForm />} />
        <Route path="SunriseUploadandgallery" element={<SunriseUploadandgallery />} />
        <Route path="Waterfall" element={<Waterfall />} />
        <Route path="Mountain" element={<Mountain />} />
        <Route path="Snowfall" element={<Snowfall />} />
        <Route path="GalleryPage" element={<GalleryPage />} />
      </Routes>

   <Footer/>
    </>
  );
}

export default App;
