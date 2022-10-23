import React from 'react';
import { useLoaderData } from 'react-router-dom';

const News = () => {
    const newsDetails = useLoaderData();
    console.log(newsDetails);
    return (
        <div>
            <h2>This is News {newsDetails.title}</h2>
        </div>
    );
};

export default News;