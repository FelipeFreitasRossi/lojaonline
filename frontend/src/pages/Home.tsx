import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Bem-vindo à Loja Online
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Em breve, vitrine de produtos!
        </p>
      </div>
    </div>
  );
};

export default Home;