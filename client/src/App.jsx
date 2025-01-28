import AuthPage from './pages/AuthPage'
import Dashboard_inst from './pages/Dashboard_inst';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import dashboardPage from './pages/DashboardPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}/>
        <Route path="/dashboard" element={<DashboardPage></DashboardPage>} />
        <Route path="/dashboard_inst" element={<Dashboard_inst></Dashboard_inst>} />

      </Routes>
    </Router>
  )
}
export default App;
