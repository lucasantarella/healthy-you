import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import Home from "./routes/Home";
import DoctorDashboard from "./routes/DoctorDashboard";
import Review from "./routes/Review";
import UserRegistrationForm from './routes/UserRegistration'
import WriterDashboard from './routes/WriterDashboard';
import Article from './routes/Article';
import Login from "./routes/Login";
import Search from './routes/Search'
import SearchResults from './components/SearchResults'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContext } from './context/AuthContext'
import LoginAPI from './apis/LoginAPI'

const App = () => {
    //const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        // Define a function fetchData that calls APIs which is then called in useEffect
        const fetchData = async () => {
            try {
                const response = await (LoginAPI.get("/user", {
                    withCredentials: true
                }));
                console.log(response.data.city)
                if (response.data.city == "Holmdel") {
                    setLoggedIn(true);
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);

    return (
        <AuthContextProvider>
            <AppContextProvider>
                <div>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={ Home }/>
                            <Route exact path="/register" component = { UserRegistrationForm }/>
                            <Route exact path="/login" component={ Login } loggedIn={ loggedIn }/>
                            <Route exact path="/search" component={ Search }/>
                            <Route path="/results" component={ SearchResults }/>
                            <ProtectedRoute exact path="/doctor-dashboard/:doctorID" component = { DoctorDashboard } requiredRole="Doctor" />
                            <Route path="/leaveReview/:id">
                                <Review url={window.location.href}/>
                            </Route>
                            <Route path="/writer-dashboard/:id" component = { WriterDashboard }/>
                            <Route path="/article/:id" component = { Article } />
                        </Switch>
                    </Router>
                </div>
            </AppContextProvider>
        </AuthContextProvider>
    )
};

export default App;