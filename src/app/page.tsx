'use client';

import { useState } from 'react';
import Form from '@/components/Form';
import PDFPreview from '@/components/PDFPreview';
import { UserDetails } from '@/types/form';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'form' | 'preview'>('form');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const handleNavigateToPreview = (data: UserDetails) => {
    setUserDetails(data);
    setCurrentScreen('preview');
  };

  const handleBackToForm = () => {
    setCurrentScreen('form');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'form' ? (
        <Form onNavigateToPreview={handleNavigateToPreview} />
      ) : (
        <PDFPreview 
          userDetails={userDetails!} 
          onBack={handleBackToForm} 
        />
      )}
    </div>
  );
}
