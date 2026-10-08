import os
import base64
import subprocess
from pypdf import PdfReader

# 1. Read logo
logo_b64 = ""
logo_path = os.path.join(os.path.dirname(__file__), "photo", "amb_logo_clean.png")
if os.path.exists(logo_path):
    with open(logo_path, "rb") as f:
        logo_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")

html_content = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Отчет о выполненных работах — Авто & Мания</title>
<style>
  @page {{
    size: A4;
    margin: 10mm 12mm 10mm 12mm;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 11.5px;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .page {{
    page-break-after: always;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  .page:last-child {{
    page-break-after: avoid;
  }}

  /* HEADER */
  .header {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 11px;
    border-bottom: 2px solid #0f172a;
    margin-bottom: 12px;
  }}
  .brand-block {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .brand-logo {{
    height: 42px;
    width: auto;
    object-fit: contain;
  }}
  .brand-text h1 {{
    font-size: 16.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #0f172a;
  }}
  .brand-text p {{
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }}
  .badge-meta {{
    text-align: right;
  }}
  .badge-status {{
    display: inline-block;
    background: #059669;
    color: #ffffff;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 4px 10px;
    border-radius: 5px;
    margin-bottom: 3px;
  }}
  .badge-date {{
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
  }}

  /* METRICS BAR */
  .metrics-bar {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 9px;
    margin-bottom: 12px;
  }}
  .metric-card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 10px;
    text-align: center;
  }}
  .metric-num {{
    font-size: 17px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
  }}
  .metric-label {{
    font-size: 9.5px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-top: 2px;
  }}

  /* SECTION TITLE */
  h2.sec-title {{
    font-size: 12.5px;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    gap: 7px;
  }}
  h2.sec-title span.tag-badge {{
    background: #0f172a;
    color: #ffffff;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 9.5px;
    font-weight: 700;
  }}

  /* WORK ITEMS */
  .work-box {{
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 9px 12px;
    margin-bottom: 10px;
  }}
  .work-item {{
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 7px;
    font-size: 11px;
    color: #334155;
    line-height: 1.4;
  }}
  .work-item:last-child {{
    margin-bottom: 0;
  }}
  .work-icon {{
    flex-shrink: 0;
    font-size: 12px;
    margin-top: 1px;
    color: #10b981;
    font-weight: bold;
  }}
  .work-item strong {{
    color: #0f172a;
  }}

  /* SUMMARY HIGHLIGHT BOX */
  .summary-box {{
    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
    border: 1.5px solid #86efac;
    border-radius: 8px;
    padding: 10px 13px;
    margin-bottom: 11px;
  }}
  .summary-box h3 {{
    font-size: 11.5px;
    font-weight: 800;
    color: #166534;
    text-transform: uppercase;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }}
  .summary-box p {{
    font-size: 11px;
    color: #334155;
    line-height: 1.4;
  }}

  /* FOOTER */
  .footer {{
    border-top: 1px solid #e2e8f0;
    padding-top: 7px;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    color: #94a3b8;
  }}
</style>
</head>
<body>

  <!-- ==================== СТРАНИЦА 1 ==================== -->
  <div class="page">
    <div>
      <!-- Header -->
      <div class="header">
        <div class="brand-block">
          <img src="{logo_b64}" alt="Авто & Мания" class="brand-logo">
          <div class="brand-text">
            <h1>Авто &amp; Мания</h1>
            <p>Отчет о выполнении работ и технической модернизации</p>
          </div>
        </div>
        <div class="badge-meta">
          <div class="badge-status">Релиз 2.0 готов</div>
          <div class="badge-date">Студия детейлинга в Королёве</div>
        </div>
      </div>

      <!-- Метрики спринта -->
      <div class="metrics-bar">
        <div class="metric-card">
          <div class="metric-num">35+</div>
          <div class="metric-label">Модулей обновлено</div>
        </div>
        <div class="metric-card">
          <div class="metric-num">100%</div>
          <div class="metric-label">Синхронизация прайса</div>
        </div>
        <div class="metric-card">
          <div class="metric-num">Retina & 4K</div>
          <div class="metric-label">Медиа-контент</div>
        </div>
        <div class="metric-card">
          <div class="metric-num">Production</div>
          <div class="metric-label">Готов к приему трафика</div>
        </div>
      </div>

      <!-- Вводное резюме -->
      <div class="summary-box">
        <h3>⭐ Комплексный релиз и кастомизация проекта под регламент студии</h3>
        <p>
          Проведена масштабная техническая и контентная модернизация сайта студии «Авто & Мания». Все разделы приведены в строгое соответствие с индивидуальным прайс-листом, внедрен эксклюзивный медиа-банк, обновлена айдентика, произведена прецизионная отладка мобильной версии и развернута инфраструктура веб-аналитики для входящего потока клиентов.
        </p>
      </div>

      <!-- Блок 1: Позиционирование и структура бренда -->
      <h2 class="sec-title"><span class="tag-badge">01</span> Премиальное позиционирование и брендинг студии</h2>
      <div class="work-box">
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Премиальный статус студии</strong>: все материалы сайта выстроены вокруг концепции высококлассного детейлинг-центра с акцентом на бережный уход, технологичные составы и индивидуальное внимание к каждому автомобилю.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Фокусный Hero-экран</strong>: разработан новый представительский главный экран с акцентным списком флагманских направлений (<em>комплексная мойка, восстановительная и защитная полировка, глубокая химчистка салона, нанесение нанокерамики и жидкого кварца</em>).</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Официальный график работы</strong>: зафиксирован и выведен на всех экранах сайта рабочий регламент студии: <strong>ежедневно с 8:00 до 22:00</strong>.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Интеграция фирменной айдентики</strong>: внедрен оригинальный логотип «Авто & Мания» во всех ключевых точках взаимодействия — в шапке сайта, мобильном меню и вкладке браузера (Favicon для десктопов и смартфонов).</div>
        </div>
      </div>

      <!-- Блок 2: Интеграция официального прайс-листа -->
      <h2 class="sec-title"><span class="tag-badge">02</span> Полная интеграция официального прайс-листа</h2>
      <div class="work-box">
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>100% точность каталога по документу студии</strong>: абсолютно все позиции услуг, базовые комплексы и спецпредложения синхронизированы копейка в копейку с официальным прайсом.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Интерактивный 4-классовый калькулятор</strong>: настроена точная классификация автомобилей:
            <ul style="margin: 3px 0 3px 18px; list-style-type: disc;">
              <li><strong>1 класс:</strong> Малый и компактный класс (Audi A1, BMW 1, VW Polo)</li>
              <li><strong>2 класс:</strong> Средний и бизнес-класс (Audi A4/A6, BMW 3/5, Camry, RAV4)</li>
              <li><strong>3 класс:</strong> Кроссоверы и полноприводные авто (BMW X5/X6, Touareg, Cayenne)</li>
              <li><strong>4 класс:</strong> Полноразмерные внедорожники и минивэны (LC 300, Range Rover, V-Class)</li>
            </ul>
          </div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Двойная сетка для дополнительных услуг</strong>: реализован удобный формат вывода цен (<strong>«Легковые» / «Внедорожники»</strong>) для экспресс-услуг, антидождя и уходовых процедур.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Точные технологические регламенты</strong>: в описаниях услуг закреплены реальные составы (<em>эпоксидные покрытия, жидкое стекло, керамика, кварцевая защита</em>), а также реальные работы студии (включая защиту кузова BMW эпоксидным составом).</div>
        </div>
      </div>

    </div>

    <!-- Футер страницы 1 -->
    <div class="footer">
      <div>Детейлинг-студия «Авто &amp; Мания» | г. Королёв, ул. 9 Мая, 10</div>
      <div>Страница 1 из 2</div>
    </div>
  </div>

  <!-- ==================== СТРАНИЦА 2 ==================== -->
  <div class="page">
    <div>
      <!-- Header -->
      <div class="header">
        <div class="brand-block">
          <img src="{logo_b64}" alt="Авто & Мания" class="brand-logo">
          <div class="brand-text">
            <h1>Авто &amp; Мания</h1>
            <p>UI/UX, продакшн, аналитика и сдача проекта</p>
          </div>
        </div>
        <div class="badge-meta">
          <div class="badge-status">Релиз 2.0 готов</div>
          <div class="badge-date">Студия детейлинга в Королёве</div>
        </div>
      </div>

      <!-- Блок 3: Эксклюзивный фото- и видео-продакшн -->
      <h2 class="sec-title"><span class="tag-badge">03</span> Эксклюзивный фото- и видео-продакшн</h2>
      <div class="work-box">
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>100% уникальный банк фотографий</strong>: проведена полная реструктуризация медиа-ряда. Для каждой отдельной услуги и каждого кейса портфолио подобраны и обработаны уникальные кадры высокого разрешения без повторяющихся изображений.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Динамичный 4K-видеофон</strong>: на первом экране сайта внедрен плавный эффектный видеоряд с темным автомобилем в профессиональном детейлинг-боксе, создающий статусное первое впечатление.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Чистый европейский дизайн карточек</strong>: визуальный ряд очищен от лишнего графического шума — внимание сфокусировано на безупречном результате детейлинга, зеркальном блеске ЛКП и идеальной чистоте салона.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Оригинальные работы студии</strong>: внедрены реальные фотографии выполненных работ (глубокая полировка, защита оптики, антидождь, чистка моторного отсека).</div>
        </div>
      </div>

      <!-- Блок 4: Мобильная адаптация и эргономика интерфейса -->
      <h2 class="sec-title"><span class="tag-badge">04</span> Мобильная эргономика и прецизионный UI/UX</h2>
      <div class="work-box">
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Компактная мобильная навигация по услугам</strong>: разработан оптимизированный тач-ряд категорий (<em>Мойка и уборка, Дополнительные услуги, Полировка и покрытия, Химчистка</em>), позволяющий быстро переключаться между разделами в один клик.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Плавный циклический слайдер портфолио</strong>: обеспечена плавная кинематика листания примеров работ свайпом на смартфонах с поддержкой бесконечного просмотра в обе стороны.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Интерактивный навигационный блок маршрутов</strong>: разработана адаптивная панель проезда (<em>Автомобиль, Метро, Лаунж-зона</em>) с выверенной версткой под все диагонали современных смартфонов (iOS / Android).</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Мгновенная связь в один тап</strong>: подключены прямые вызовы по телефону <strong>+7 (925) 855-55-15</strong>, переход в Telegram, WhatsApp и быстрые ссылки на построение маршрута в <strong>Яндекс.Картах</strong> и <strong>2ГИС</strong>.</div>
        </div>
      </div>

      <!-- Блок 5: Инфраструктура, веб-аналитика и сдача проекта -->
      <h2 class="sec-title"><span class="tag-badge">05</span> Сквозная веб-аналитика и пакет для запуска</h2>
      <div class="work-box">
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Яндекс.Метрика нового домена</strong>: развернут и активирован новый счетчик <strong><code>113546147</code></strong> на всех страницах сайта. Настроены автоматические цели на конверсии, клики по кнопкам записи и переходы в мессенджеры.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Передача прав владельца</strong>: все права на аналитику, отчеты и Вебвизор привязаны к личному кабинету владельца (<strong>Vitaliy.gonashvili@yandex.ru</strong>).</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Готовый продакшн-пакет для хостинга</strong>: сформирован чистый оптимизированный архив <strong><code>САЙТ_ДЛЯ_ХОСТИНГА.zip</code></strong> со сжатыми медиа-файлами для мгновенного развертывания на Timeweb.</div>
        </div>
        <div class="work-item">
          <div class="work-icon">✦</div>
          <div><strong>Фирменная памятка владельца в PDF</strong>: составлена исчерпывающая иллюстрированная инструкция по управлению сайтом, тарифам (хостинг 452 ₽/мес, домен 200 ₽/год), регламенту оплат и прямой поддержке.</div>
        </div>
      </div>

    </div>

    <!-- Футер страницы 2 -->
    <div class="footer">
      <div>Проект успешно модернизирован, полностью протестирован и передан заказчику</div>
      <div>Страница 2 из 2</div>
    </div>
  </div>

</body>
</html>
"""

html_file = "changelog_temp.html"
pdf_file = "ОТЧЕТ_О_ВЫПОЛНЕННЫХ_РАБОТАХ_АВТОМАНИЯ.pdf"

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_exe):
    chrome_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

print(f"Using browser: {chrome_exe}")
cmd = [
    chrome_exe,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={os.path.abspath(pdf_file)}",
    os.path.abspath(html_file)
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Exit code:", res.returncode)

if os.path.exists(pdf_file):
    reader = PdfReader(pdf_file)
    print(f"Changelog PDF generated successfully! Total pages: {len(reader.pages)}, file size: {os.path.getsize(pdf_file)} bytes")
else:
    print("Changelog PDF generation failed!")

if os.path.exists(html_file):
    os.remove(html_file)
