'use client';

import { useState } from 'react';
import { UserDetails } from '@/types/form';
import jsPDF from 'jspdf';

interface PDFPreviewProps {
  userDetails: UserDetails;
  onBack: () => void;
}

export default function PDFPreview({ userDetails, onBack }: PDFPreviewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFont('helvetica');
    
    doc.setFontSize(20);
    doc.text('Personal Details', 20, 30);
    
    doc.setFontSize(12);
    let yPosition = 60;
    
    doc.text(`Name: ${userDetails.name}`, 20, yPosition);
    yPosition += 15;
    
    doc.text(`Email: ${userDetails.email}`, 20, yPosition);
    yPosition += 15;
    
    doc.text(`Phone Number: ${userDetails.phone}`, 20, yPosition);
    yPosition += 15;
    
    if (userDetails.position) {
      doc.text(`Position: ${userDetails.position}`, 20, yPosition);
      yPosition += 15;
    }
    
    if (userDetails.description) {
      doc.text(`Description:`, 20, yPosition);
      yPosition += 10;
      
      const splitDescription = doc.splitTextToSize(userDetails.description, 170);
      doc.text(splitDescription, 20, yPosition);
    }
    
    return doc;
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const doc = generatePDF();
      doc.save('user-details.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Name:</span>
              <span className="text-gray-600">{userDetails.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Email:</span>
              <span className="text-gray-600">{userDetails.email}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Phone Number:</span>
              <span className="text-gray-600">{userDetails.phone}</span>
            </div>
            
            {userDetails.position && (
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Position:</span>
                <span className="text-gray-600">{userDetails.position}</span>
              </div>
            )}
            
            {userDetails.description && (
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-gray-800">Description:</span>
                <div className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {userDetails.description}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
        </button>
      </div>
    </div>
  );
}
