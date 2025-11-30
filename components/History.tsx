import React from 'react';
import { HISTORY_EVENTS } from '../constants';
import Reveal from './Reveal';

const History: React.FC = () => {
  return (
    <section id="history" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hành Trình Phát Triển</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2 md:translate-x-0"></div>

          <div className="space-y-12">
            {HISTORY_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;
              const Icon = event.icon || (() => null);

              return (
                <Reveal key={index} delay={index * 100}>
                  <div className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-emerald-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {/* Content for Desktop - Empty space on one side */}
                    <div className="hidden md:block w-1/2"></div>

                    {/* Card */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <div className="glass-panel p-6 rounded-xl hover:border-emerald-500/30 transition-colors">
                        <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                           <Icon className="w-5 h-5 text-emerald-400" />
                           <span className="text-emerald-400 font-mono text-sm font-bold tracking-wider">{event.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-slate-400 text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;