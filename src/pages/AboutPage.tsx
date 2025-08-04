import React from 'react';

const AboutPage: React.FC = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      content: "Хочу выразить благодарность компании РоНи-плюс за качественную работу и профессионализм. Памятник получился именно таким, как мы и хотели. Спасибо за внимательное отношение в трудный для нас период.",
      author: "Елена Иванова",
    },
    {
      id: 2,
      content: "Отличная компания! Заказывали памятник для дедушки, всё сделали быстро и качественно. Очень благодарны за консультацию при выборе модели и материалов.",
      author: "Алексей Петров",
    },
    {
      id: 3,
      content: "Большое спасибо всему коллективу за доброе и чуткое отношение. Памятник для мамы изготовили даже раньше обещанного срока. Всем рекомендую!",
      author: "Ирина Сидорова",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">О компании</h1>
            <p className="mt-4 text-lg text-white/80">
              РоНи-плюс — ведущий производитель памятников с 15-летней историей и безупречной репутацией
            </p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image column */}
            <div className="lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8 lg:mb-0">
                <div className="aspect-w-16 aspect-h-9 bg-neutral-100">
                  <div className="w-full h-96 bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center">
                    <p className="text-center text-neutral-500">Фото мастерской РоНи-плюс</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text column */}
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-6">
                История компании
              </h2>
              <div className="prose prose-lg text-neutral-600 max-w-none">
                <p>
                  Компания РоНи-плюс была основана в 2010 году как небольшая семейная мастерская по изготовлению памятников.
                  За 15 лет работы мы выросли в одно из ведущих предприятий Брестской области в своей сфере.
                </p>
                <p>
                  Начав с небольших объемов производства, мы постепенно расширяли ассортимент и повышали качество изделий, 
                  внедряя современные технологии обработки камня и художественного оформления.
                </p>
                <p>
                  Сегодня РоНи-плюс — это команда опытных мастеров, современное оборудование и безупречная репутация. 
                  Мы гордимся каждой выполненной работой и высоко ценим доверие наших клиентов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-6">
              Наша миссия
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Помогать людям сохранять память о близких через создание качественных и долговечных памятников, 
              которые будут достойно отражать историю жизни и личность усопшего.
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-20 bg-primary rounded"></div>
            </div>
          </div>
          
          {/* Values */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Качество</h3>
              <p className="text-neutral-600">
                Мы используем только высококачественные материалы и современное оборудование для создания памятников, 
                которые прослужат долгие годы.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Сострадание</h3>
              <p className="text-neutral-600">
                Мы понимаем, что наши клиенты обращаются к нам в трудный период жизни, и относимся 
                к каждому заказу с глубоким пониманием и уважением.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Индивидуальный подход</h3>
              <p className="text-neutral-600">
                Мы создаем каждый памятник с учетом пожеланий заказчика, стремясь отразить 
                индивидуальность и память о человеке.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-4">
              Наша команда
            </h2>
            <p className="text-lg text-neutral-600">
              РоНи-плюс — это коллектив профессионалов, объединенных общими ценностями и любовью к своему делу
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
                <div className="w-full h-full bg-gradient-to-b from-neutral-300 to-neutral-200"></div>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Роман Иванович</h3>
              <p className="text-neutral-600">Основатель, директор</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
                <div className="w-full h-full bg-gradient-to-b from-neutral-300 to-neutral-200"></div>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Нина Петровна</h3>
              <p className="text-neutral-600">Художник-гравер</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
                <div className="w-full h-full bg-gradient-to-b from-neutral-300 to-neutral-200"></div>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Алексей Васильевич</h3>
              <p className="text-neutral-600">Мастер по камню</p>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-neutral-200">
                <div className="w-full h-full bg-gradient-to-b from-neutral-300 to-neutral-200"></div>
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Елена Сергеевна</h3>
              <p className="text-neutral-600">Менеджер по работе с клиентами</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-neutral-600">
              Мы стремимся сделать процесс заказа памятника максимально комфортным и прозрачным для клиента
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2"></div>
            
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">Консультация</h3>
                <p className="text-neutral-600 text-center">
                  Бесплатная консультация по выбору памятника, материалов и оформления. 
                  Обсуждение всех деталей и пожеланий.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">Дизайн</h3>
                <p className="text-neutral-600 text-center">
                  Создание индивидуального дизайн-проекта памятника с учетом всех пожеланий. 
                  Согласование деталей.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">Изготовление</h3>
                <p className="text-neutral-600 text-center">
                  Производство памятника с использованием современного оборудования и 
                  высококачественных материалов.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  4
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">Установка</h3>
                <p className="text-neutral-600 text-center">
                  Профессиональная доставка и установка памятника на месте с соблюдением 
                  всех технологических требований.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Equipment */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-8 lg:mb-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden bg-neutral-100 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
                </div>
                <div className="rounded-lg overflow-hidden bg-neutral-100 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
                </div>
                <div className="rounded-lg overflow-hidden bg-neutral-100 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
                </div>
                <div className="rounded-lg overflow-hidden bg-neutral-100 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-6">
                Производство и оборудование
              </h2>
              <div className="prose prose-lg text-neutral-600 max-w-none">
                <p>
                  Наша производственная база оснащена современным оборудованием, которое позволяет выполнять 
                  работы любой сложности с высоким качеством и в оптимальные сроки.
                </p>
                <p>
                  Мы используем станки с ЧПУ для точной резки и обработки камня, а также специализированное 
                  оборудование для гравировки и художественного оформления памятников.
                </p>
                <p>
                  Благодаря собственному производству мы можем предложить клиентам конкурентные цены 
                  без наценок посредников.
                </p>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/products" 
                  className="btn-primary inline-flex items-center"
                >
                  Смотреть каталог продукции
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-4">
              Отзывы наших клиентов
            </h2>
            <p className="text-lg text-neutral-600">
              Мнения тех, кто уже воспользовался нашими услугами
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-neutral-300" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-neutral-600 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="font-medium text-neutral-900">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Готовы заказать памятник?
              </h2>
              <p className="mt-2 text-white/80">
                Свяжитесь с нами для получения персональной консультации.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-primary bg-white hover:bg-gray-50 shadow-sm"
              >
                Каталог памятников
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-primary shadow-sm transition-colors"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;