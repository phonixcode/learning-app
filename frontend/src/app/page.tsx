"use client";

import React from 'react';
import Link from 'next/link';
import SubjectList from './components/SubjectList';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Body */}
      <main className="flex-grow bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Our Learning Platform</h1>
        <SubjectList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
