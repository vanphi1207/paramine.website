import React from 'react';
import { FEATURES } from '../constants';
import Reveal from './Reveal';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tính Năng Nổi Bật</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Paramine mang đến trải nghiệm Minecraft độc đáo với những tính năng được tùy chỉnh riêng biệt.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={index} delay={index * 150}>
                <div 
                  className="glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group h-full"
                >
                  <div className={`w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;