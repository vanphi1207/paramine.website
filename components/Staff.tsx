import React from 'react';
import { STAFF_MEMBERS } from '../constants';
import { MessageSquare } from 'lucide-react';
import Reveal from './Reveal';

const Staff: React.FC = () => {
  // Sort staff by role hierarchy for display if needed, but array order is fine
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Admin': return 'bg-red-500/10 text-red-300 border-red-500/30';
      case 'Developer': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Builder': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    }
  };

  return (
    <section id="staff" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Đội Ngũ Ban Quản Trị</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-400">Những người hùng thầm lặng vận hành Paramine.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {STAFF_MEMBERS.map((staff, index) => (
            <Reveal key={staff.id} delay={index * 100}>
              <div className="glass-panel rounded-xl overflow-hidden group h-full">
                <div className="p-6 flex flex-col items-center text-center relative h-full">
                  <div className="w-full h-24 bg-gradient-to-b from-slate-700 to-transparent absolute top-0 left-0 -z-10 opacity-30"></div>
                  
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border-4 border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={staff.avatarUrl} 
                        alt={staff.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold border ${getRoleColor(staff.role)}`}>
                      {staff.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-4">{staff.name}</h3>
                  <p className="text-slate-400 text-sm mt-2 mb-4 line-clamp-2 min-h-[40px]">
                    {staff.description}
                  </p>

                  <div className="mt-auto">
                    {staff.contact && (
                      <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-950/50 px-3 py-1.5 rounded-full inline-flex">
                        <MessageSquare className="w-3 h-3" />
                        <span>{staff.contact}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Staff;