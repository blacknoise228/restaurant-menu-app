// src/app/help/page.tsx

export default function HelpPage() {
    return (
      <section className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto text-white text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-6">📘 Справочный Центр</h1>
  
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            Добро пожаловать в наш справочный центр! Здесь вы найдете информацию о том, как начать использовать наш сервис, а также советы по работе с меню и другими функциями.
          </p>
  
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-600 transition-all">
              <h3 className="text-xl font-semibold text-white mb-4">1. Как создать меню?</h3>
              <p className="text-gray-300">Для того чтобы создать меню, вам нужно войти в свою учетную запись и перейти в раздел "Управление меню". Там вы сможете добавить блюда, указать цены, описания и фотографии.</p>
            </div>
  
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-600 transition-all">
              <h3 className="text-xl font-semibold text-white mb-4">2. Как добавить QR код для меню?</h3>
              <p className="text-gray-300">После создания меню вы можете сгенерировать уникальный QR код. Это позволит вашим клиентам быстро и удобно открыть меню на своих устройствах, просто отсканировав код.</p>
            </div>
  
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-teal-600 transition-all">
              <h3 className="text-xl font-semibold text-white mb-4">3. Как изменить лого ресторана?</h3>
              <p className="text-gray-300">Для изменения логотипа ресторана нужно зайти в раздел "Редактировать ресторан". Там можно загрузить новый логотип, который будет отображаться в публичном меню.</p>
            </div>
          </div>
  
          <div className="mt-8">
            <p className="text-lg text-gray-300">
              Если у вас возникли дополнительные вопросы, не стесняйтесь обращаться через нашу форму на странице "Контакты".
            </p>
          </div>
        </div>
      </section>
    )
  }
  