import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import Error from "./components/pages/Error";


function App() {

  return (
	
		<BrowserRouter>
			<Routes >
				<Route path="/" element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path="auth" element={<Auth/>}/>
					<Route path="*" element={<Error/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	
  )
}

export default App
