import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import Error from "./components/pages/Error";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastProvider } from "./context/ToastContext";


function App() {

  return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<BrowserRouter>
				<ToastProvider>
					<Routes >
						<Route path="/" element={<Layout/>}>
							<Route index element={<Home/>}/>
							<Route path="auth" element={<Auth/>}/>
							<Route path="*" element={<Error/>}/>
						</Route>
					</Routes>
				</ToastProvider>
			</BrowserRouter>
		</LocalizationProvider>
	
  )
}

export default App
