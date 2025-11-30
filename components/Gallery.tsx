import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import Reveal from './Reveal';
import { X, ZoomIn } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  return (
    <section id="gallery" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Thư Viện Ảnh</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-400">Những khoảnh khắc đáng nhớ tại Paramine.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <Reveal key={image.id} delay={index * 100}>
              <div 
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-emerald-500/50 transition-all shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold text-white">{image.title}</h3>
                    <p className="text-slate-300 text-sm mt-1 line-clamp-2">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <ZoomIn className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-full object-contain max-h-[85vh] bg-slate-900"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 sm:p-6 border-t border-white/10">
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-slate-300 mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;