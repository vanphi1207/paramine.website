import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Menu, BookOpen } from 'lucide-react';
import { WIKI_DATA } from '../constants';
import { WikiCategory, WikiSection } from '../types';

const Wiki: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(WIKI_DATA[0].id);
  const [activeSection, setActiveSection] = useState<string>(WIKI_DATA[0].sections[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter content based on search
  const filteredData = useMemo(() => {
    if (!searchQuery) return WIKI_DATA;
    return WIKI_DATA.map(cat => ({
      ...cat,
      sections: cat.sections.filter(sec => 
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.sections.length > 0);
  }, [searchQuery]);

  const currentContent = useMemo(() => {
    for (const cat of WIKI_DATA) {
      const section = cat.sections.find(s => s.id === activeSection);
      if (section) return section;
    }
    return null;
  }, [activeSection]);

  const handleSectionClick = (catId: string, secId: string) => {
    setActiveCategory(catId);
    setActiveSection(secId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center gap-2 bg-slate-800 p-3 rounded-lg text-white font-bold w-full"
        >
          <Menu className="w-5 h-5" />
          {mobileMenuOpen ? 'Đóng Menu' : 'Mục Lục Wiki'}
        </button>

        {/* Sidebar */}
        <aside className={`lg:w-1/4 flex-shrink-0 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>

            <div className="space-y-2">
              {filteredData.map((category) => (
                <div key={category.id} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800">
                  <div className="px-4 py-3 bg-slate-800/50 flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <category.icon className="w-4 h-4" />
                    {category.title}
                  </div>
                  <div>
                    {category.sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(category.id, section.id)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group ${activeSection === section.id ? 'bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                      >
                        {section.title}
                        {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {filteredData.length === 0 && (
                <div className="text-center text-slate-500 py-8">
                  Không tìm thấy kết quả.
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="glass-panel rounded-2xl p-6 md:p-10 min-h-[600px]">
            {currentContent ? (
              <div className="animate-fade-in">
                <div className="border-b border-slate-700 pb-6 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentContent.title}</h1>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span>Wiki</span>
                    <ChevronRight className="w-4 h-4" />
                    <span>{WIKI_DATA.find(c => c.id === activeCategory)?.title}</span>
                  </div>
                </div>
                <div className="prose prose-invert prose-emerald max-w-none">
                  {currentContent.content}
                </div>
              </div>
            ) : (
               <div className="flex flex-col items-center justify-center h-full text-slate-500">
                 <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                 <p>Chọn một mục để xem chi tiết</p>
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wiki;