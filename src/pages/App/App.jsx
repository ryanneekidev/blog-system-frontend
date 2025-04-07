import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.jsx'
import Login from '../Login/Login.jsx'
import Register from '../Register/Register.jsx'
import AuthProvider from '../../components/AuthProvider.jsx';
import PrivateRoute from '../../components/PrivateRoute.jsx';
import PublicRoute from '../../components/PublicRoute.jsx';
import Create from '../Create/Create.jsx';
import Account from '../Account/Account.jsx';
import SinglePost from '../SinglePost/SinglePost.jsx';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route element={<PublicRoute />}>
                        <Route path='/login' element={<Login />} />
                    </Route>
                    <Route element={<PublicRoute />}>
                        <Route path='/register' element={<Register />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='/create' element={<Create />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='/account' element={<Account />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='/posts' element={<SinglePost />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App