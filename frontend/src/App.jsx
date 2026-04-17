import Header from "./components/layout/Header.jsx"
import Footer from "./components/layout/Footer.jsx"
import Dashboard from "./components/dashboard/Dashboard.jsx"

export default function App(){
    return(
        <div className="app">
            <Header />
            <Dashboard />
            <Footer />
            
        </div>
    )
}