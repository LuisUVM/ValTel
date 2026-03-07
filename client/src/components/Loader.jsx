import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ size = 50, color = "#2563eb" }) => {
  return (
    <div className="flex justify-center items-center py-12">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;