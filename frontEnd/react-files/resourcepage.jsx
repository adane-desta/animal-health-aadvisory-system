

import React, { useEffect, useState } from 'react';
import ResourceItem from './resourceItem';
import { createRoot } from 'react-dom/client';
import '../stylesheet_files/resourcePage.css';

  const NesourcePage = () => {
  const [resourceItems, setResourceItems] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5700/api/resources?language_code='+document.documentElement.lang) 
      .then((response) => response.json())
      .then((data) => {

        setResourceItems(data)
        
        
      })
      .catch((error) => console.error('Error fetching resources:', error));
  }, []);

  return (
    <div>
     
        <section className="news-section">
            {resourceItems.length > 0 ? (
                resourceItems.map((item, index) => (
                    
                    <ResourceItem
                        key={index}
                        image={item.image_url}
                        alt={item.title}
                        badge={item.type}
                        title={item.title}
                        description={item.description}
                        date={new Date(item.created_at).toLocaleDateString()}
                        actual_resourse_url = {item.actual_resource_url}
                    />
                    
                ))
            ) : (
                <p>Loading resources...</p>
            )}
        </section>
       
    </div>
   
);

};

const rootElement = document.getElementById('resource_section'); 
if (rootElement) {
     const root = createRoot(rootElement);
     root.render(
         <React.StrictMode> 
            <NesourcePage/> 
        </React.StrictMode> 
    );
}