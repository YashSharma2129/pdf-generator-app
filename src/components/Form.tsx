'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserDetails } from '@/types/form';
import jsPDF from 'jspdf';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  position: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
  onNavigateToPreview: (data: UserDetails) => void;
}

export default function Form({ onNavigateToPreview }: FormProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const generatePDF = (data: FormData) => {
    const doc = new jsPDF();
    
    doc.setFont('helvetica');
    
    doc.setFontSize(20);
    doc.text('Personal Details', 20, 30);
    
    doc.setFontSize(12);
    let yPosition = 60;
    
    doc.text(`Name: ${data.name}`, 20, yPosition);
    yPosition += 15;
    
    doc.text(`Email: ${data.email}`, 20, yPosition);
    yPosition += 15;
    
    doc.text(`Phone: ${data.phone}`, 20, yPosition);
    yPosition += 15;
    
    if (data.position) {
      doc.text(`Position: ${data.position}`, 20, yPosition);
      yPosition += 15;
    }
    
    if (data.description) {
      doc.text(`Description:`, 20, yPosition);
      yPosition += 10;
        
      const splitDescription = doc.splitTextToSize(data.description, 170);
      doc.text(splitDescription, 20, yPosition);
    }
    
    return doc;
  };

  const handleViewPDF = (data: FormData) => {
    onNavigateToPreview(data);
  };

  const handleDownloadPDF = async (data: FormData) => {
    setIsGeneratingPDF(true);
    try {
      const doc = generatePDF(data);
      doc.save('user-details.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const onSubmit = () => {
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-black">
          Add Your details
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-white">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <input
                {...register('name')}
                type="text"
                placeholder="e.g. John Doe"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-white">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                {...register('email')}
                type="email"
                placeholder="e.g. Johndoe@gmail.com"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-white">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <input
                {...register('phone')}
                type="tel"
                placeholder="e.g. (220) 222-20002"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-white">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <input
                {...register('position')}
                type="text"
                placeholder="e.g. Junior Front end Developer"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-start space-x-3 p-4 border border-gray-300 rounded-lg bg-white">
              <svg className="w-5 h-5 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <textarea
                {...register('description')}
                placeholder="e.g. Work expriences"
                rows={4}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSubmit(handleViewPDF)}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              View PDF
            </button>
            <button
              type="button"
              onClick={handleSubmit(handleDownloadPDF)}
              disabled={isGeneratingPDF}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
