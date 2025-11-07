import React from 'react';

const GallerySection = () => {
  // Using diverse school-related images from Unsplash
  const images = [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Life at Gurukul</h2>
          <p className="text-lg text-gray-600">
            Experience the vibrant life at Gurukul Olympiad School through our gallery
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={image}
                alt={`Campus ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;