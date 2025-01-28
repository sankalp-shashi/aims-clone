import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import dashboardPage from './pages/DashboardPage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage></AuthPage>}/>
        <Route path="/dashboard" element={<DashboardPage></DashboardPage>} />
      </Routes>
    </Router>
  )
}
export default App;
