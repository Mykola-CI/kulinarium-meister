#!/usr/bin/env python3
"""
Script to replace <header> and <footer> elements in HTML files
with the versions from contact.html
"""
import re
import os

# Template header and footer from contact.html
TEMPLATE_HEADER = '''<header
          class="w-100 d-flex flex-row justify-content-center position-sticky top-0 start-0"
        >
          <!-- Header for mobile screens and tablets with offcanvas -->
          <div
            class="Header-inner w-100 d-md-none d-flex flex-row justify-content-between align-items-center flex-grow-0 flex-shrink-0 pb-2"
          >
            <div class="Header-branding">
              <a href="/">
                <img
                  src="../assets/images/logo_png_black@2x.png"
                  alt="Kulinarium Meister"
                  class="img-fluid"
                  style="display: block"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <div class="icon-bars">
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMain"
                aria-controls="offcanvasMain"
              >
                <svg
                  width="24"
                  height="14"
                  viewBox="0 0 24 14"
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="3"
                    x2="24"
                    y2="3"
                    stroke="currentColor"
                    stroke-width="1"
                  />
                  <line
                    x1="0"
                    y1="11"
                    x2="24"
                    y2="11"
                    stroke="currentColor"
                    stroke-width="1"
                  />
                </svg>
              </button>
            </div>
            <!-- OFFCANVAS SECTION -->
            <div
              class="offcanvas offcanvas-start Header-nav--offcanvas"
              tabindex="-1"
              id="offcanvasMain"
              aria-labelledby="offcanvasMainLabel"
            >
              <div
                class="offcanvas-header d-flex flex-direction-row justify-content-between align-items-center pt-4"
              >
                <h5 class="offcanvas-title" id="offcanvasMainLabel">
                  <img
                    src="../assets/images/logo_png_black@2x.png"
                    alt="Kulinarium Meister"
                    class="img-fluid"
                    style="display: block; width: 50px"
                    loading="lazy"
                    decoding="async"
                  />
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body p-4">
                <!-- Language Switcher Dropdown -->
                <div class="language-switcher">
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle language-btn no-outline-btn"
                      type="button"
                      id="languageDropdownOffcanvas"
                      data-bs-toggle="dropdown"
                      data-bs-offset="0,10"
                      aria-expanded="false"
                    >
                      <span
                        class="current-language-flag"
                        style="
                          transform: scale(1.3);
                          margin-left: 5px;
                          text-transform: none;
                        "
                      >
                        🇺🇦</span
                      >
                    </button>
                    <ul
                      class="dropdown-menu Header-nav-folder w-100 px-5"
                      aria-labelledby="languageDropdownOffcanvas"
                    >
                      <li>
                        <a
                          class="dropdown-item language-option p-2"
                          href="javascript:void(0)"
                          data-lang="0"
                          >🇺🇦 Українська</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item language-option p-2"
                          href="javascript:void(0)"
                          data-lang="1"
                          >🇬🇧 English</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item language-option p-2"
                          href="javascript:void(0)"
                          data-lang="2"
                          >🇵🇱 Polski</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item language-option p-2"
                          href="javascript:void(0)"
                          data-lang="3"
                        >
                          <span style="text-transform: none">Ru</span>
                          Русский</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- Menu Items -->
                <div class="header-nav--a-link">
                  <a
                    href="/"
                    class="Header-nav-item multilingual-text"
                    data-test="template-nav"
                    >Головна..Home..Start..Главная</a
                  >
                </div>
                <!-- DOUGH DROPDOWN -->
                <div class="dropdown">
                  <button
                    class="btn btn-primary dropdown-toggle multilingual-text no-outline-btn Header-nav-item"
                    type="button"
                    data-bs-offset="0,10"
                    data-bs-toggle="dropdown"
                  >
                    Тісто..Dough..Ciasto..Тесто
                  </button>
                  <ul class="dropdown-menu Header-nav-folder w-100 px-5">
                    <li>
                      <a
                        href="/dough-for-baking.html"
                        class="Header-nav-folder-item multilingual-text"
                        >Тiсто для випічки..Dough for baking..Ciasto do
                        Pieczenia..Тесто для выпечки</a
                      >
                    </li>
                    <li>
                      <a
                        href="/ready-to-cook.html"
                        class="Header-nav-folder-item multilingual-text"
                        >Тісто з начинкою..Stuffed Dough..Сiasto z
                        nadzieniem..Тесто с начинкой</a
                      >
                    </li>
                    <li>
                      <a
                        href="/tisto-dlya-pelmeniv.html"
                        class="Header-nav-folder-item multilingual-text"
                        >Кружечки для пельменiв..Dumpling Wrappers..Ciasto na
                        uszka..Кружочки для пельменей</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="header-nav--a-link">
                  <a
                    href="/pasta.html"
                    class="Header-nav-item multilingual-text"
                    >Паста..Pasta..Makaron..Паста</a
                  >
                </div>
                <div class="header-nav--a-link">
                  <a
                    href="/ravioli.html"
                    class="Header-nav-item multilingual-text"
                    >Равiолi..Ravioli..Ravioli..Равиоли</a
                  >
                </div>
                <div class="header-nav--a-link">
                  <a
                    href="/frozen.html"
                    class="Header-nav-item multilingual-text"
                    >Заморожені..Frozen Range..Mrożone..Замороженные</a
                  >
                </div>
                <div class="header-nav--a-link">
                  <a
                    href="/recipes.html"
                    class="Header-nav-item multilingual-text"
                    >Відео-рецепти..Video Recipes..Przepisy..Видео-рецепты</a
                  >
                </div>
                <div class="header-nav--a-link">
                  <a
                    href="/faq.html"
                    class="Header-nav-item multilingual-text"
                    data-test="template-nav"
                    >Питання Вiдповiдi..FAQ..Pytania Odpowiedzi..Вопросы
                    Ответы</a
                  >
                </div>
                <div class="header-nav--a-link">
                  <a
                    href="/contact.html"
                    class="Header-nav-item multilingual-text"
                    data-test="template-nav"
                    >Контакти..Contacts..Kontakty..Контакты</a
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- Header for desktops (hidden on mobile and tablets) -->
          <div
            class="Header-inner w-100 d-none d-md-flex flex-row gap-3 justify-content-start align-items-center flex-grow-0 flex-shrink-0"
          >
            <div class="Header-branding">
              <a href="/">
                <img
                  src="../assets/images/logo_png_black@2x.png"
                  alt="Kulinarium Meister"
                  class="img-fluid"
                  style="display: block"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <nav
              class="Header-nav d-flex flex-row gap-3 justify-content-start align-items-end ps-2"
              data-content-field="navigation"
            >
              <div class="header-nav--a-link">
                <a
                  href="/"
                  class="Header-nav-item multilingual-text"
                  data-test="template-nav"
                  >Головна..Home..Start..Главная</a
                >
              </div>
              <div class="dropdown desktop">
                <button
                  class="btn dropdown-toggle multilingual-text no-outline-btn Header-nav-item"
                  type="button"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                  data-bs-offset="-12,8"
                  aria-expanded="false"
                >
                  <span class="label multilingual-text"
                    >Мова..Language..Język..Язык</span
                  >
                  <span
                    class="current-language-flag"
                    style="text-transform: none"
                    >🇺🇦</span
                  >
                </button>
                <ul
                  class="dropdown-menu Header-nav-folder"
                  aria-labelledby="languageDropdown"
                >
                  <li>
                    <a
                      class="language-option"
                      href="javascript:void(0)"
                      data-lang="0"
                      >🇺🇦 Українська</a
                    >
                  </li>
                  <li>
                    <a
                      class="language-option"
                      href="javascript:void(0)"
                      data-lang="1"
                      >🇬🇧 English</a
                    >
                  </li>
                  <li>
                    <a
                      class="language-option"
                      href="javascript:void(0)"
                      data-lang="2"
                      >🇵🇱 Polski</a
                    >
                  </li>
                  <li>
                    <a
                      class="language-option"
                      href="javascript:void(0)"
                      data-lang="3"
                    >
                      <span style="text-transform: none">Ru</span>
                      Русский</a
                    >
                  </li>
                </ul>
              </div>
              <!-- DOUGH DROPDOWN -->
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle multilingual-text no-outline-btn Header-nav-item"
                  type="button"
                  data-bs-offset="-12,8"
                  data-bs-toggle="dropdown"
                >
                  Тісто..Dough..Ciasto..Тесто
                </button>
                <ul class="dropdown-menu Header-nav-folder">
                  <li>
                    <a
                      href="/dough-for-baking.html"
                      class="Header-nav-folder-item multilingual-text"
                      >Тiсто для випічки..Dough for baking..Ciasto do
                      Pieczenia..Тесто для выпечки</a
                    >
                  </li>
                  <li>
                    <a
                      href="/ready-to-cook.html"
                      class="Header-nav-folder-item multilingual-text"
                      >Тісто з начинкою..Stuffed Dough..Сiasto z
                      nadzieniem..Тесто с начинкой</a
                    >
                  </li>
                  <li>
                    <a
                      href="/tisto-dlya-pelmeniv.html"
                      class="Header-nav-folder-item multilingual-text"
                      >Кружечки для пельменiв..Dumpling Wrappers..Ciasto na
                      uszka..Кружочки для пельменей</a
                    >
                  </li>
                </ul>
              </div>
              <div class="header-nav--a-link">
                <a
                  href="/pasta.html"
                  class="Header-nav-item multilingual-text"
                  >Паста..Pasta..Makaron..Паста</a
                >
              </div>
              <div class="header-nav--a-link">
                <a
                  href="/ravioli.html"
                  class="Header-nav-item multilingual-text"
                  >Равiолi..Ravioli..Ravioli..Равиоли</a
                >
              </div>
              <div class="header-nav--a-link">
                <a
                  href="/frozen.html"
                  class="Header-nav-item multilingual-text"
                  >Заморожені..Frozen Range..Mrożone..Замороженные</a
                >
              </div>
              <div class="header-nav--a-link">
                <a
                  href="/recipes.html"
                  class="Header-nav-item multilingual-text"
                  >Відео-рецепти..Video Recipes..Przepisy..Видео-рецепты</a
                >
              </div>
              <div class="header-nav--a-link">
                <a
                  href="/faq.html"
                  class="Header-nav-item multilingual-text"
                  data-test="template-nav"
                  >Питання Вiдповiдi..FAQ..Pytania Odpowiedzi..Вопросы
                  Ответы</a
                >
              </div>
              <div class="header-nav--a-link">
                <a
                  href="/contact.html"
                  class="Header-nav-item multilingual-text"
                  data-test="template-nav"
                  >Контакти..Contacts..Kontakty..Контакты</a
                >
              </div>
            </nav>
          </div>
        </header>'''

TEMPLATE_FOOTER = '''<footer id="footer-index">
        <div class="footer-container">
          <nav
            id="footer-nav"
            class="Header-nav d-flex flex-row gap-3 justify-content-center justify-content-lg-start"
          >
            <div class="header-nav--a-link">
              <a
                href="/faq.html"
                class="Header-nav-item multilingual-text"
                data-test="template-nav"
                >Запитання та вiдповiдi..FAQ..PYTANIA I ODPOWIEDZI..Вопросы и
                ответы</a
              >
            </div>
            <div class="header-nav--a-link">
              <a
                href="/contact.html"
                class="Header-nav-item multilingual-text"
                data-test="template-nav"
                >Контакти..Contacts..Kontakty..Контакты</a
              >
            </div>
          </nav>
          <div class="footer--company-details row mx-0">
            <div class="col-12 col-lg-2 text-center pb-4">
              <img
                src="/assets/images/deutshe_qualitat@2x.png"
                class="img-fluid"
                alt="Mahlzeit logo"
              />
            </div>
            <div class="col-12 col-lg-10">
              <div class="footer--company-details-text ps-3">
                <a href="/contact.html">Виробник: ТОВ «Мальцайт ГМБХ»</a>
                <p>
                  <span class="multilingual-text">
                    Адреса: вул. Лісна, 6Б, с. Білогородка, Бучанський р-н,
                    Київська обл., 08140, Україна..Lysna St., 6B, Bilohorodka
                    village, Buchanskyi district, Kyiv region, 08140,
                    Ukraine..ul. Leśna, 6B, wieś Biłogorodka, rejon Buchański,
                    obwód Kijowski, 08140, Ukraina..ул. Лесная, 6Б, с.
                    Белогородка, Бучанский р-н, Киевская обл., 08140, Украина
                  </span>
                  <br />
                  <span class="multilingual-text"
                    >тел. ..phone..telefon..тел.</span
                  >
                  +380 44 384 06 76, office@mahlzeit.com.ua ,
                  https://kulinariummeister.com , https://kulinarium-meister.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>'''


def replace_header_footer(file_path):
    """Replace header and footer in the given HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace header - match from <header to </header> (including nested tags)
        header_pattern = r'<header\b[^>]*>.*?</header>'
        content = re.sub(header_pattern, TEMPLATE_HEADER, content, flags=re.DOTALL)
        
        # Replace footer - match from <footer to </footer> (including nested tags)
        footer_pattern = r'<footer\b[^>]*>.*?</footer>'
        content = re.sub(footer_pattern, TEMPLATE_FOOTER, content, flags=re.DOTALL)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    """Main function to process all HTML files."""
    base_dir = '/Users/danielkraig/Developer/kulinarium_files/kulinarium-meister'
    
    # Collect all HTML files from specified directories
    html_files = []
    
    # Root directory HTML files (excluding contact.html as it's the template)
    root_files = [
        'index.html',
        'dough-for-baking.html',
        'tisto-dlya-pelmeniv.html',
        'ready-to-cook.html',
        'pasta.html',
        'frozen.html',
        'ravioli.html',
        'faq.html',
        'recipes.html'
    ]
    
    for file in root_files:
        file_path = os.path.join(base_dir, file)
        if os.path.exists(file_path):
            html_files.append(file_path)
    
    # recipe_details directory
    recipe_details_dir = os.path.join(base_dir, 'recipe_details')
    if os.path.exists(recipe_details_dir):
        for file in os.listdir(recipe_details_dir):
            if file.endswith('.html'):
                html_files.append(os.path.join(recipe_details_dir, file))
    
    # product_pages directory
    product_pages_dir = os.path.join(base_dir, 'product_pages')
    if os.path.exists(product_pages_dir):
        for file in os.listdir(product_pages_dir):
            if file.endswith('.html'):
                html_files.append(os.path.join(product_pages_dir, file))
    
    # Process all files
    updated_count = 0
    for file_path in html_files:
        print(f"Processing: {file_path}")
        if replace_header_footer(file_path):
            updated_count += 1
            print(f"  ✓ Updated")
        else:
            print(f"  - No changes needed")
    
    print(f"\nCompleted! Updated {updated_count} out of {len(html_files)} files.")


if __name__ == '__main__':
    main()
