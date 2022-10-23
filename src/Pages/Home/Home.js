import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const allNews = useLoaderData();
    return (
        <div>
            <h2>All news: {allNews.length}</h2>
        </div>
    );
};

export default Home;