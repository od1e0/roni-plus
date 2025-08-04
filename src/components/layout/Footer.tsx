import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white">

      {/* Main footer content */}
      <div className="py-12 sm:py-16 bg-primary-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company info */}
            <div>
              <h3 className="text-lg font-heading font-bold mb-5">РоНи-плюс</h3>
              <p className="text-sm text-gray-300 mb-4">Изготовление и продажа памятников в городе Ивацевичи</p>
              <p className="text-sm text-gray-300 mb-4">УНП - 290830677</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Viber</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.4 0.6c-5.6 0-10.2 4.6-10.2 10.2v1c0 0.8 0.2 1.6 0.4 2.4v0c0 0.1 0 0.1 0 0.2 0 0 0 0.1 0 0.1 0.1 0.1 0.2 0.2 0.4 0.2 0.2 0 0.5-0.1 0.6-0.3 0 0 0.1-0.1 0.1-0.2 0.2-0.5 0.5-0.9 0.7-1.4 0.3-0.5 0.6-0.7 1-0.3 0.3 0.4 1.5 1.7 1.7 2 0.2 0.3 0.1 0.6-0.1 0.8 -0.2 0.3-0.6 0.7-0.9 0.9 -0.3 0.2-0.3 0.5-0.3 0.8 0.1 0.5 1 2.2 2.2 3.2 1.3 1.2 2.4 1.6 3.1 1.7 0.3 0 0.5-0.1 0.7-0.3 0.2-0.2 0.5-0.5 0.8-0.7 0.3-0.3 0.6-0.3 0.9-0.1 0.4 0.2 2.8 1.3 2.8 1.3 0.2 0.1 0.3 0.2 0.3 0.4 0 0.1 0 0.3 0 0.5 -0.1 0.7-1 1.4-1.5 1.5 -0.7 0.3-1.6 0.4-2.4 0.2 -0.2-0.1-0.5-0.1-0.7-0.2 -1.8-0.6-3.5-1.5-5.1-2.8 -0.8-0.6-1.6-1.4-2.3-2.1 -0.7-0.7-1.4-1.5-2-2.4 -1.3-1.6-2.2-3.3-2.8-5.1 -0.1-0.2-0.2-0.5-0.2-0.7 -0.1-0.8-0.1-1.7 0.2-2.4 0.1-0.5 0.8-1.4 1.5-1.5 0.2 0 0.3 0 0.5 0 0.2 0 0.3 0.1 0.4 0.3 0 0 1.1 2.4 1.3 2.8 0.2 0.3 0.2 0.6-0.1 0.9 -0.2 0.3-0.5 0.6-0.7 0.8 -0.2 0.2-0.3 0.4-0.3 0.7 0.1 0.7 0.5 1.8 1.7 3.1 1.2 1.3 2.8 2.2 3.2 2.3 0.3 0.1 0.6 0 0.8-0.3 0.2-0.2 0.6-0.6 0.9-0.9 0.3-0.2 0.6-0.2 0.8-0.1 0.3 0.2 1.7 1.3 2 1.7 0.4 0.4 0.2 0.7-0.3 1 -0.5 0.3-0.9 0.5-1.4 0.7 -0.1 0-0.2 0.1-0.2 0.1 -0.2 0.1-0.3 0.4-0.3 0.6 0 0.2 0.1 0.3 0.2 0.4 0 0 0.1 0 0.1 0 0.1 0 0.1 0 0.2 0v0c0.8 0.2 1.7 0.4 2.4 0.4h1c5.7-0.1 10.2-4.6 10.2-10.2v-1c0-5.6-4.6-10.2-10.2-10.2h-1zM12.2 2.7c4.6 0 8.3 3.7 8.3 8.3v0.8c0 4.6-3.7 8.3-8.3 8.3h-0.8c-0.6 0-1.1-0.1-1.7-0.2 -0.6-0.1-1.1-0.4-1.3-1 -0.2-0.5 0-1 0.1-1.3 -0.5-0.2-1.9-0.9-3.1-2.2 -1.1-1.2-1.8-2.7-2.1-3.2 -0.2 0-0.7 0.1-1.3-0.1 -0.5-0.2-0.8-0.8-1-1.3 -0.2-0.5-0.3-1.1-0.2-1.7v-0.8c0-4.6 3.7-8.3 8.3-8.3h0.8zM12.9 4.7c-0.4-0.1-0.7 0.2-0.7 0.6 -0.1 0.4 0.2 0.7 0.6 0.7 2.4 0.2 4.4 2.2 4.7 4.7 0 0.3 0.3 0.6 0.6 0.6 0 0 0.1 0 0.1 0 0.3 0 0.6-0.3 0.6-0.6 -0.3-3-2.6-5.3-5.7-5.6zM10.5 5.2c0 0.4 0.3 0.7 0.7 0.7 0 0 0 0 0 0v0c0.4 0 0.7-0.3 0.7-0.7 0-0.4-0.3-0.7-0.7-0.7 0 0 0 0 0 0h0c-0.4 0-0.7 0.3-0.7 0.7zM12.9 6.5c-0.4-0.1-0.7 0.2-0.8 0.6 -0.1 0.4 0.2 0.7 0.6 0.8 1.4 0.2 2.4 1.3 2.7 2.7 0.1 0.3 0.4 0.5 0.7 0.5 0.1 0 0.1 0 0.2 0 0.4-0.1 0.6-0.4 0.5-0.8 -0.3-2-2-3.6-3.9-3.9zM13 8.4c-0.4-0.1-0.8 0.2-0.8 0.6 -0.1 0.4 0.2 0.8 0.6 0.8 0.4 0.1 0.7 0.4 0.8 0.8 0.1 0.3 0.4 0.6 0.7 0.6 0.1 0 0.1 0 0.2 0 0.4-0.1 0.6-0.4 0.5-0.8 -0.3-1-1-1.8-2-2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-lg font-heading font-bold mb-5">Навигация</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">О компании</a>
                </li>
                <li>
                  <a href="/products" className="text-sm text-gray-300 hover:text-white transition-colors">Каталог продукции</a>
                </li>
                <li>
                  <a href="/delivery" className="text-sm text-gray-300 hover:text-white transition-colors">Доставка и оплата</a>
                </li>
                <li>
                  <a href="/works" className="text-sm text-gray-300 hover:text-white transition-colors">Наши работы</a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Контакты</a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-heading font-bold mb-5">Продукция</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/products/single" className="text-sm text-gray-300 hover:text-white transition-colors">Одиночные памятники</a>
                </li>
                <li>
                  <a href="/products/double" className="text-sm text-gray-300 hover:text-white transition-colors">Двойные памятники</a>
                </li>
                <li>
                  <a href="/products/exclusive" className="text-sm text-gray-300 hover:text-white transition-colors">Эксклюзивные памятники</a>
                </li>
                <li>
                  <a href="/products/granite" className="text-sm text-gray-300 hover:text-white transition-colors">Памятники из гранитной крошки</a>
                </li>
                <li>
                  <a href="/products/art" className="text-sm text-gray-300 hover:text-white transition-colors">Художественное оформление</a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-lg font-heading font-bold mb-5">Контакты</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-3 text-sm text-gray-300">Брестская область, Ивацевичский район, д. Плехово, ул Центральная, 1</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="ml-3">
                    <a href="tel:+375297912384" className="text-sm text-gray-300 hover:text-white">+375 (29) 791 23 84</a><br />
                    <a href="tel:+375297912395" className="text-sm text-gray-300 hover:text-white">+375 (29) 791 23 95</a>
                  </div>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-3">
                    <a href="mailto:info@roniplus.by" className="text-sm text-gray-300 hover:text-white">info@roniplus.by</a>
                  </span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-primary-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3 text-sm text-gray-300">
                    <p>Пн-Пт: 9:00 - 18:00</p>
                    <p>Сб: 10:00 - 15:00</p>
                    <p>Вс: Выходной</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} РоНи-плюс. Все права защищены.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Политика конфиденциальности</a>
                <a href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Условия использования</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;