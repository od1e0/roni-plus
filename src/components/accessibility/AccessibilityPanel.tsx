import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

export const AccessibilityPanel: React.FC = () => {
  const { 
    mode, 
    setMode, 
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    highContrast,
    toggleHighContrast
  } = useAccessibility();

  return (
    <div className="fixed top-0 right-0 w-full max-w-sm sm:w-auto m-4 p-5 bg-white shadow-xl rounded-xl z-50 border border-neutral-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-heading font-bold text-neutral-800">Настройки доступности</h2>
        <button 
          onClick={() => document.dispatchEvent(new CustomEvent('accessibility-close'))}
          className="text-neutral-500 hover:text-neutral-700"
          aria-label="Закрыть панель настроек доступности"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-5">
        <div className="border-b border-neutral-200 pb-4">
          <p className="text-sm font-medium text-neutral-700 mb-3">Режим доступности:</p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setMode('default')}
              className={`px-3 py-2 rounded-lg text-sm ${
                mode === 'default' 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Обычный
            </button>
            <button 
              onClick={() => setMode('blind')}
              className={`px-3 py-2 rounded-lg text-sm flex items-center ${
                mode === 'blind' 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              aria-label="Режим для слабовидящих"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Для слабовидящих
            </button>
            <button 
              onClick={() => setMode('deaf')}
              className={`px-3 py-2 rounded-lg text-sm flex items-center ${
                mode === 'deaf' 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              aria-label="Режим для слабослышащих"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-16 16m-2.828-2.828a9 9 0 010-12.728" />
              </svg>
              Для слабослышащих
            </button>
          </div>
        </div>
        
        <div className="border-b border-neutral-200 pb-4">
          <p className="text-sm font-medium text-neutral-700 mb-3">Размер шрифта: <span className="font-bold">{fontSize}px</span></p>
          <div className="flex items-center">
            <button 
              onClick={decreaseFontSize}
              className="w-10 h-10 rounded-l-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center"
              aria-label="Уменьшить размер шрифта"
            >
              A-
            </button>
            <div className="h-2 bg-primary rounded-full mx-2 flex-grow">
              <div 
                className="h-full bg-primary-light rounded-full"
                style={{ width: `${Math.max(0, Math.min(100, ((fontSize - 14) / 10) * 100))}%` }}
              ></div>
            </div>
            <button 
              onClick={increaseFontSize}
              className="w-10 h-10 rounded-r-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center justify-center"
              aria-label="Увеличить размер шрифта"
            >
              A+
            </button>
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <div className="relative flex items-center cursor-pointer" onClick={toggleHighContrast}>
              <input 
                type="checkbox" 
                id="high-contrast" 
                checked={highContrast}
                onChange={toggleHighContrast}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ml-3 text-sm font-medium text-neutral-700">Высокий контраст</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <button 
          onClick={() => document.dispatchEvent(new CustomEvent('accessibility-close'))}
          className="w-full py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Применить настройки
        </button>
      </div>
    </div>
  );
};

export default AccessibilityPanel;