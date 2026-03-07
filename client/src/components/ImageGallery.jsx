import React, { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 h-96 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Sin imágenes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="h-96 overflow-hidden rounded-lg">
        <img
          src={`http://localhost:5000${images[selectedImage]}`}
          alt="Habitación"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-20 overflow-hidden rounded-lg border-2 transition ${
                selectedImage === index ? 'border-blue-600' : 'border-transparent hover:border-blue-300'
              }`}
            >
              <img
                src={`http://localhost:5000${img}`}
                alt={`Vista ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;