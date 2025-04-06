import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GettingStarted() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container px-4 py-12 md:px-6" id="usage">
          <div className="mx-auto grid max-w-5xl gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                🛠️ Как пользоваться сервисом
              </h2>
              <p className="text-muted-foreground">
                Пошаговая инструкция по использованию нашего сервиса
              </p>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Шаг 1: Сформулируйте техническое задание (ТЗ)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Опишите, в чём заключается ваш бизнес-проект. Чем подробнее,
                    тем лучше. Укажите:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      сферу деятельности (например, логистика, IT, образование);
                    </li>
                    <li>
                      формат реализации (онлайн-сервис, офлайн-компания,
                      маркетплейс и т.д.);
                    </li>
                    <li>целевую аудиторию;</li>
                    <li>
                      важные особенности (например, использование персональных
                      данных, работа с детьми, экспорт продукции и т.п.).
                    </li>
                  </ul>
                  <div className="bg-muted mt-4 rounded-lg p-4">
                    <p className="font-medium">📌 Пример ТЗ:</p>
                    <p className="mt-2 italic">
                      Мы запускаем онлайн-платформу для оказания психологической
                      помощи подросткам. Включает видеочат, оплату услуг и сбор
                      анонимной обратной связи.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Шаг 2: Отправьте ТЗ в наш сервис</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Вставьте текст вашего ТЗ в редактор технического задания и
                    нажмите кнопку «Найти нормативные документы по тексту».
                    Сервис автоматически сформулирует запрос к AI-системе
                    (Gemini) и выполнит поиск по релевантным нормативным актам.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Шаг 3: Изучите полученные НПА</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Вы получите список нормативных документов, которые могут
                    быть важны для реализации проекта. Каждый документ
                    сопровождается кратким описанием и рекомендациями для вашего
                    ТЗ. Также вы можете провести поиск по нормативным документам
                    нажав кнопку фильтра.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12" id="npa">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  📚 Что такое НПА?
                </h2>
                <p className="text-muted-foreground">
                  Нормативные правовые акты и их значение для бизнеса
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow">
                <p className="mb-4">
                  НПА (нормативный правовой акт) — это официальный документ,
                  издаваемый государственными органами и содержащий обязательные
                  правила поведения. К НПА относятся:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>законы;</li>
                  <li>указы Президента;</li>
                  <li>постановления Правительства;</li>
                  <li>приказы и инструкции министерств;</li>
                  <li>санитарные нормы, технические регламенты и т.д.</li>
                </ul>
                <p className="mt-4">
                  НПА регулируют практически все стороны предпринимательской
                  деятельности — от регистрации компании до обращения с
                  персональными данными или санитарных требований к офису.
                </p>
                <p className="mt-4">
                  Наш сервис помогает не утонуть в правовом поле и быстро
                  находить именно те НПА, которые относятся к вашему проекту. А
                  также рекомендациями для вашего ТЗ.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
