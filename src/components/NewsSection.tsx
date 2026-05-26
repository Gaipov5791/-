/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Eye, ArrowRight, X, BookOpen, Share2, CornerDownRight } from 'lucide-react';
import { Language, NewsItem } from '../types.ts';
import { LOCALIZATION, NEWS_ITEMS } from '../data.ts';

interface NewsSectionProps {
  currentLanguage: Language;
}

export default function NewsSection({ currentLanguage }: NewsSectionProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [localNews, setLocalNews] = useState<NewsItem[]>(NEWS_ITEMS);

  const t = (key: string) => {
    return LOCALIZATION[key]?.[currentLanguage] || key;
  };

  const handleReadMore = (news: NewsItem) => {
    // Increment view counts dynamically
    setLocalNews(prev =>
      prev.map(item =>
        item.id === news.id ? { ...item, views: item.views + 1 } : item
      )
    );
    setSelectedNews({ ...news, views: news.views + 1 });
  };

  return (
    <section className="py-24 bg-brand-surface border-b border-brand-outline-variant/20" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* News Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 border-b border-brand-outline-variant/20 pb-6 text-left">
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
              ПРЕСС-ЦЕНТР
            </h5>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight font-sans">
              {t('news_title')}
            </h2>
          </div>
          <button
            onClick={() => {
              // Simulated toast of full news archive
              alert('Архив новостей с 2024 по 2026 год содержит 148 публикаций. Все актуальные пресс-релизы выведены на эту страницу.');
            }}
            className="px-5 py-2.5 bg-brand-surface-low hover:bg-brand-secondary hover:text-white transition-all text-xs font-bold uppercase tracking-wider text-brand-secondary inline-flex items-center gap-2 cursor-pointer border border-brand-outline-variant/20"
          >
            <span>{t('btn_all_news')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Responsive Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {localNews.map((news) => (
            <div
              key={news.id}
              className="flex flex-col sm:flex-row bg-white border border-brand-outline-variant/25 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 transform text-left"
            >
              {/* Image Col */}
              <div className="sm:w-2/5 h-56 sm:h-auto overflow-hidden relative">
                <img
                  alt={news.title[currentLanguage]}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  src={news.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-brand-primary/80 text-white rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  Событие
                </div>
              </div>

              {/* Text Contents Col */}
              <div className="sm:w-3/5 p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Date & Views */}
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-on-surface-variant/60 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{news.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{news.views}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => handleReadMore(news)}
                    className="text-base font-extrabold text-brand-primary hover:text-brand-secondary transition-colors leading-snug cursor-pointer font-sans"
                  >
                    {news.title[currentLanguage]}
                  </h3>

                  <p className="text-xs text-brand-on-surface-variant/85 leading-relaxed line-clamp-3">
                    {news.summary[currentLanguage]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-outline-variant/15 flex items-center justify-between">
                  <button
                    onClick={() => handleReadMore(news)}
                    className="text-xs font-bold uppercase tracking-wider text-brand-secondary hover:text-brand-primary transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Читать далее</span>
                    <CornerDownRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => alert(`Ссылка на новость скопирована в буфер обмена: https://nif.kg/news/${news.id}`)}
                    className="p-1.5 text-brand-on-surface-variant/65 hover:text-brand-secondary hover:bg-brand-surface-low rounded-full transition-colors cursor-pointer"
                    title="Поделиться"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Modal detailed Reader */}
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-brand-primary/80 backdrop-blur-md"
              onClick={() => setSelectedNews(null)}
            ></div>

            {/* Modal Box */}
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative z-10 border border-brand-secondary/20 shadow-2xl flex flex-col custom-scrollbar">
              
              {/* Image Header wrapper */}
              <div className="h-64 sm:h-80 w-full relative">
                <img
                  alt="News Hero background"
                  className="w-full h-full object-cover"
                  src={selectedNews.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent"></div>
                
                {/* Close Button on Image */}
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-2">
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase font-mono text-brand-sky">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedNews.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{selectedNews.views}</span>
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold leading-snug font-sans">
                    {selectedNews.title[currentLanguage]}
                  </h4>
                </div>
              </div>

              {/* Body Text copy details */}
              <div className="p-8 space-y-6 text-left">
                <div className="p-4 bg-brand-surface-low border-l-4 border-brand-secondary rounded-r-lg text-xs font-semibold text-brand-on-surface-variant italic leading-relaxed">
                  "{selectedNews.summary[currentLanguage]}"
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  <p className="whitespace-pre-line font-medium">
                    {selectedNews.content[currentLanguage]}
                  </p>
                </div>

                {/* Footer operational metadata check */}
                <div className="pt-6 border-t border-brand-outline-variant/15 flex items-center justify-between text-[11px] font-bold text-brand-on-surface-variant/60 font-mono uppercase">
                  <span>© Кабинет Информации НИФ КР</span>
                  <span className="text-brand-secondary flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-brand-sky" />
                    <span>Пресс-релиз №{selectedNews.id.toUpperCase()}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
