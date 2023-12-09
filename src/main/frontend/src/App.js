import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import LinkPage from './pages/LinkPage';
import Unauthorized from './pages/Unauthorized';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Admin from './pages/Admin';
import Lounge from './pages/Lounge';
import Missing from './pages/Missing';

import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': 'USER',
  'Editor': 'EDITOR',
  'Admin': 'ADMIN'
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          {/* public routes */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='linkpage' element={<LinkPage />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route index element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path='editor' element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path='lounge' element={<Lounge />} />
          </Route>

          {/* catch all */}
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </AuthProvider >
  );
}

export default App;
