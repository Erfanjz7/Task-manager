import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import all pages
import { GalileoDesign } from "./screens/GalileoDesign/GalileoDesign";
import { GalileoDesign2 } from "./screens/GalileoDesign/GalileoDesign2";
import { GalileoDesign3 } from "./screens/GalileoDesign/GalileoDesign3";
// import { GalileoDesign4 } from "./screens/GalileoDesign/GalileoDesign8";
// import { GalileoDesign5 } from "./screens/GalileoDesign/GalileoDesign5";
// import { GalileoDesign6 } from "./screens/GalileoDesign/GalileoDesign6";
// import { GalileoDesign7 } from "./screens/GalileoDesign/GalileoDesign7";
import { GalileoDesign8 } from "./screens/GalileoDesign/GalileoDesign8";
import { GalileoDesign9 } from "./screens/GalileoDesign/GalileoDesign9"; // Main page

function App() {
  return (
    <>
      {/* <nav className="p-4 flex gap-4 bg-gray-100">
        <Link to="/">Main</Link>
        <Link to="/page1">Page 1</Link>
        <Link to="/page2">Page 2</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<GalileoDesign9 />} />
        <Route path="/page1" element={<GalileoDesign />} />
        <Route path="/page2" element={<GalileoDesign2 />} />
        <Route path="/page3" element={<GalileoDesign3 />} />
        {/*<Route path="/page4" element={<GalileoDesign4 />} /> */}
        {/* <Route path="/page5" element={<GalileoDesign5 />} />
        <Route path="/page6" element={<GalileoDesign6 />} />
        <Route path="/page7" element={<GalileoDesign7 />} />*/}
        <Route path="/page8" element={<GalileoDesign8 />} /> 
      </Routes>
    </>
  );
}

export default App;
