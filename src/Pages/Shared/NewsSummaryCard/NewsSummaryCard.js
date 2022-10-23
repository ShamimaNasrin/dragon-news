import React from 'react';
import Card from 'react-bootstrap/Card';

const NewsSummaryCard = ({news}) => {
    return (
        <div>
            {news.title}
        </div>
    );
};

export default NewsSummaryCard;