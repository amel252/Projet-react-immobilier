import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );

    // return <div className="text-center bg-blue-700 text-white py-3">App</div>;
}

export default App;
