import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">Контакты</h1>
            <p className="mt-4 text-lg text-white/80">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы и помочь с выбором.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information, Map and Form - All in One Row */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-heading text-neutral-900 mb-8">Как нас найти</h2>
          
          {/* Three-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map - Takes 5 columns */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col h-[600px]">
              {/* Interactive Yandex Map */}
              <div className="h-full relative flex-grow">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=15&ll=25.432305%2C52.787380&l=map&pt=25.432305%2C52.787380,pm2rdm"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Местоположение компании РоНи-плюс"
                ></iframe>
              </div>
              <div className="p-3 bg-white border-t border-neutral-200">
                <a 
                  href="https://yandex.ru/maps/?rtext=~52.787380,25.432305&rtt=auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Построить маршрут
                </a>
              </div>
            </div>
            
            {/* Contact Information - Takes 3 columns */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden p-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Контактная информация
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-800 font-medium">Адрес:</p>
                    <p className="text-neutral-600 text-sm">
                      Брестская область, Ивацевичский район,<br />
                      д. Плехово, ул Центральная, 1
                    </p>
                    <p className="text-neutral-500 text-sm mt-1">
                      GPS: 52.787380° N, 25.432305° E
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-800 font-medium">Телефоны:</p>
                    <p className="text-sm">
                      <a href="tel:+375297912384" className="text-primary hover:underline">+375 (29) 791-23-84</a>
                    </p>
                    <p className="text-sm">
                      <a href="tel:+375297912395" className="text-primary hover:underline">+375 (29) 791-23-95</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-800 font-medium">Email:</p>
                    <p className="text-sm">
                      <a href="mailto:info@roniplus.by" className="text-primary hover:underline">info@roniplus.by</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-800 font-medium">Режим работы:</p>
                    <p className="text-neutral-600 text-sm">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-neutral-600 text-sm">Сб: 10:00 - 15:00</p>
                    <p className="text-neutral-600 text-sm">Вс: Выходной</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4 mt-4 border-t border-neutral-200">
                  <p className="text-neutral-800 font-medium mb-2">Мы в соцсетях:</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-neutral-500 hover:text-primary">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-neutral-500 hover:text-primary">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-neutral-500 hover:text-primary">
                      <span className="sr-only">Viber</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11.4 0.6c-5.6 0-10.2 4.6-10.2 10.2v1c0 0.8 0.2 1.6 0.4 2.4v0c0 0.1 0 0.1 0 0.2 0 0 0 0.1 0 0.1 0.1 0.1 0.2 0.2 0.4 0.2 0.2 0 0.5-0.1 0.6-0.3 0 0 0.1-0.1 0.1-0.2 0.2-0.5 0.5-0.9 0.7-1.4 0.3-0.5 0.6-0.7 1-0.3 0.3 0.4 1.5 1.7 1.7 2 0.2 0.3 0.1 0.6-0.1 0.8 -0.2 0.3-0.6 0.7-0.9 0.9 -0.3 0.2-0.3 0.5-0.3 0.8 0.1 0.5 1 2.2 2.2 3.2 1.3 1.2 2.4 1.6 3.1 1.7 0.3 0 0.5-0.1 0.7-0.3 0.2-0.2 0.5-0.5 0.8-0.7 0.3-0.3 0.6-0.3 0.9-0.1 0.4 0.2 2.8 1.3 2.8 1.3 0.2 0.1 0.3 0.2 0.3 0.4 0 0.1 0 0.3 0 0.5 -0.1 0.7-1 1.4-1.5 1.5 -0.7 0.3-1.6 0.4-2.4 0.2 -0.2-0.1-0.5-0.1-0.7-0.2 -1.8-0.6-3.5-1.5-5.1-2.8 -0.8-0.6-1.6-1.4-2.3-2.1 -0.7-0.7-1.4-1.5-2-2.4 -1.3-1.6-2.2-3.3-2.8-5.1 -0.1-0.2-0.2-0.5-0.2-0.7 -0.1-0.8-0.1-1.7 0.2-2.4 0.1-0.5 0.8-1.4 1.5-1.5 0.2 0 0.3 0 0.5 0 0.2 0 0.3 0.1 0.4 0.3 0 0 1.1 2.4 1.3 2.8 0.2 0.3 0.2 0.6-0.1 0.9 -0.2 0.3-0.5 0.6-0.7 0.8 -0.2 0.2-0.3 0.4-0.3 0.7 0.1 0.7 0.5 1.8 1.7 3.1 1.2 1.3 2.8 2.2 3.2 2.3 0.3 0.1 0.6 0 0.8-0.3 0.2-0.2 0.6-0.6 0.9-0.9 0.3-0.2 0.6-0.2 0.8-0.1 0.3 0.2 1.7 1.3 2 1.7 0.4 0.4 0.2 0.7-0.3 1 -0.5 0.3-0.9 0.5-1.4 0.7 -0.1 0-0.2 0.1-0.2 0.1 -0.2 0.1-0.3 0.4-0.3 0.6 0 0.2 0.1 0.3 0.2 0.4 0 0 0.1 0 0.1 0 0.1 0 0.1 0 0.2 0v0c0.8 0.2 1.7 0.4 2.4 0.4h1c5.7-0.1 10.2-4.6 10.2-10.2v-1c0-5.6-4.6-10.2-10.2-10.2h-1z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Takes 4 columns */}
            <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Оставить заявку</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="form-input w-full"
                      placeholder="Иван"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="form-input w-full"
                      placeholder="+375 (xx) xxx-xx-xx"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="form-input w-full"
                      placeholder="example@mail.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="form-input w-full resize-none"
                      placeholder="Напишите ваш вопрос или запрос здесь..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        className="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-xs">
                      <label htmlFor="privacy" className="text-neutral-600">
                        Я согласен с <a href="/privacy" className="text-primary hover:text-primary-dark">политикой конфиденциальности</a>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary py-2.5 px-8"
                    >
                      Отправить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;