

import React, { useEffect, useState } from 'react';
import NewsItem from './newsItem';
import { createRoot } from 'react-dom/client';
import '../stylesheet_files/NewsPage.css';

  const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5700/api/news-events?language_code='+document.documentElement.lang) 
      .then((response) => response.json())
      .then((data) => {

        setNewsItems(data)
        
        
      })
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  return (
    <div>
     
        <section className="news-section">
            {newsItems.length > 0 ? (
                newsItems.map((item, index) => (
                    
                    <NewsItem
                        key={index}
                        image={item.image_url}
                        alt={item.title}
                        badge={item.type}
                        title={item.title}
                        description={item.description}
                        date={new Date(item.date).toLocaleDateString()}
                    />
                    
                ))
            ) : (
                <p>Loading news...</p>
            )}
        </section>
       
    </div>
   
);

};

const rootElement = document.getElementById('news_section'); 
if (rootElement) {
     const root = createRoot(rootElement);
     root.render(
         <React.StrictMode> 
            <NewsPage/> 
        </React.StrictMode> 
    );
}
