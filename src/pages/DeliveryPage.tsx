import React from 'react';

const DeliveryPage: React.FC = () => {
  // Delivery FAQ items
  const faqItems = [
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем оплату наличными, банковскими картами (Visa, MasterCard), а также банковским переводом. Возможна оплата в рассрочку по индивидуальной договоренности."
    },
    {
      question: "Нужно ли вносить предоплату?",
      answer: "Да, для начала работ по изготовлению памятника требуется внесение предоплаты в размере 30% от общей стоимости. Остальная сумма оплачивается по завершении работ перед доставкой и установкой."
    },
    {
      question: "Как происходит доставка памятника?",
      answer: "Доставка осуществляется нашим специализированным транспортом с соблюдением всех мер предосторожности для исключения повреждений изделия. При необходимости мы также можем организовать доставку транспортной компанией в другие регионы."
    },
    {
      question: "Сколько стоит доставка?",
      answer: "Стоимость доставки рассчитывается индивидуально в зависимости от расстояния и особенностей подъезда к месту установки. В пределах города Ивацевичи доставка осуществляется бесплатно."
    },
    {
      question: "Можно ли заказать только изготовление памятника без установки?",
      answer: "Да, вы можете заказать только изготовление памятника. В этом случае мы предоставим вам подробные рекомендации по правильной установке."
    },
    {
      question: "Что включает в себя услуга установки памятника?",
      answer: "Установка включает в себя подготовку основания, устройство фундамента и монтаж памятника с использованием профессионального оборудования. Все работы проводятся опытными специалистами с соблюдением технологических требований."
    }
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">Доставка и оплата</h1>
            <p className="mt-4 text-lg text-white/80">
              Информация о способах оплаты, доставке и установке памятников
            </p>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-8">
              Способы оплаты
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Наличный расчет</h3>
                <p className="text-neutral-600">
                  Оплата наличными в нашем офисе. При оплате наличными предоставляется скидка 3%.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Банковские карты</h3>
                <p className="text-neutral-600">
                  Принимаем к оплате карты Visa и MasterCard. Оплата производится через защищенный платежный терминал.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Банковский перевод</h3>
                <p className="text-neutral-600">
                  Оплата по счету для юридических лиц или через интернет-банкинг для физических лиц. 
                  Реквизиты предоставляются при оформлении заказа.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Рассрочка</h3>
                <p className="text-neutral-600">
                  Возможна оплата в рассрочку без процентов. Условия рассрочки обсуждаются индивидуально при заключении договора.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h4 className="text-lg font-bold text-neutral-900 mb-4">Порядок оплаты:</h4>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700">
                <li>Предоплата 30% при заключении договора</li>
                <li>Оплата оставшейся суммы перед доставкой и установкой</li>
                <li>Для крупных или сложных заказов возможна индивидуальная схема оплаты</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-8">
              Доставка и установка
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="prose prose-lg text-neutral-600 max-w-none">
                  <p>
                    Компания РоНи-плюс осуществляет доставку и профессиональную установку памятников в Ивацевичском районе и по всей Брестской области.
                  </p>
                  <h3>Доставка</h3>
                  <p>
                    Доставка памятников осуществляется нашим специализированным транспортом с соблюдением всех мер предосторожности для исключения повреждений изделия.
                  </p>
                  <p>
                    Сроки и стоимость доставки зависят от удаленности места установки и особенностей подъезда. Точная стоимость доставки рассчитывается индивидуально и согласовывается при оформлении заказа.
                  </p>
                  <h3>Установка</h3>
                  <p>
                    Установка памятника — это ответственный процесс, который влияет на долговечность и внешний вид изделия. Наши специалисты имеют большой опыт и выполняют все работы с соблюдением технологических требований.
                  </p>
                  <p>
                    Процесс установки включает:
                  </p>
                  <ul>
                    <li>Подготовку места установки</li>
                    <li>Устройство фундамента</li>
                    <li>Монтаж основания и стелы</li>
                    <li>Крепление декоративных элементов</li>
                    <li>Финальную проверку качества установки</li>
                  </ul>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">Зоны доставки</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                      <span className="font-medium">г. Ивацевичи</span>
                      <span className="text-primary font-semibold">Бесплатно</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                      <span className="font-medium">Ивацевичский район</span>
                      <span>от 50 руб.</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                      <span className="font-medium">Брестская область</span>
                      <span>от 100 руб.</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Другие регионы</span>
                      <span>По договоренности</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Стоимость установки</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                        <span className="font-medium">Одиночный памятник</span>
                        <span>от 150 руб.</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                        <span className="font-medium">Двойной памятник</span>
                        <span>от 200 руб.</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                        <span className="font-medium">Комплекс</span>
                        <span>от 350 руб.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Ограда</span>
                        <span>от 100 руб.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-sm text-neutral-500">
                      * Окончательная стоимость доставки и установки зависит от множества факторов и рассчитывается индивидуально после осмотра места установки.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-primary/5 rounded-2xl border border-primary/10 p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-neutral-900">Важная информация</h4>
                  <p className="mt-1 text-neutral-600">
                    Установка памятников производится в теплое время года (с апреля по октябрь), когда температура воздуха устойчиво держится выше +5°C. 
                    В зимний период установка возможна только при определенных условиях и по предварительному согласованию.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading text-neutral-900">
                Часто задаваемые вопросы
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Ответы на популярные вопросы о доставке и оплате
              </p>
            </div>
            
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                      <h3 className="text-lg font-semibold text-neutral-900">{item.question}</h3>
                      <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-neutral-600">{item.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-neutral-200 max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-900 mb-4">
                Остались вопросы?
              </h2>
              <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto">
                Наши специалисты с радостью ответят на все ваши вопросы по телефону или при личной встрече. 
                Вы также можете оставить заявку на сайте, и мы свяжемся с вами в ближайшее время.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/contact" className="btn-primary py-3 px-8">
                  Связаться с нами
                </a>
                <a href="tel:+375297912384" className="btn-secondary py-3 px-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +375 (29) 791 23 84
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeliveryPage;