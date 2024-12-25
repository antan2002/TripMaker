import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripCard from '../components/Custom/TripCard';
import Hero from '@/components/Custom/Hero';
import './Profile.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Profile() {
    const [trips, setTrips] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/trip');
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setLoggedInUser(user || 'Guest');
    }, []);

    return (
        <>
            <Hero
                cName="hero-mid"
                heroImg="https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title={`Welcome to Your Profile - ${loggedInUser}`}
                btnStyle="hide"
            />
            <div className="profile-container">
                <div className="trip-cards-container">
                    {loading ? (
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
                    ) : trips.length > 0 ? (
                        trips.map((trip) => (
                            <TripCard
                                key={trip._id}
                                trip={trip}
                            // Uncomment if needed
                            // onClick={() => window.location.href = `http://localhost:8080/trip/${trip._id}`}
                            />
                        ))
                    ) : (
                        <p>No trips found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
