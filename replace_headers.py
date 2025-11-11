#!/usr/bin/env python3
"""
Replace <header> elements in HTML files with the template from contact.html
"""
import os
import re
from pathlib import Path

# Template header from contact.html
HEADER_TEMPLATE = '''        <!-- Header -->
        <header
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
              <div class="offcanvas-body py-2 px-4">
                <!-- Language Switcher Dropdown -->
                <div class="language-switcher">
                  <div class="dropdown d-flex justify-content-center">
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
                      class="dropdown-menu Header-nav-folder px-5"
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
                <!-- DOUGH DROPDOWN -->
                <div class="dropdown mt-5">
                  <button
                    class="btn btn-primary dropdown-toggle multilingual-text no-outline-btn Header-nav-item"
                    type="button"
                    data-bs-offset="0,10"
                    data-bs-toggle="dropdown"
                    style="color: #212529"
                  >
                    Тісто..Dough..Ciasto..Тесто
                  </button>
                  <!-- Dropdown body -->
                  <ul class="dropdown-menu Header-nav-folder w-100 px-2">
                    <li>
                      <a
                        href="/dough-for-baking.html"
                        class="dropdown-item multilingual-text p-2"
                        >Тiсто для випічки..Dough for baking..Ciasto do
                        Pieczenia..Тесто для выпечки</a
                      >
                    </li>
                    <li>
                      <a
                        href="/ready-to-cook.html"
                        class="dropdown-item multilingual-text p-2"
                        >Тісто з начинкою..Stuffed Dough..Сiasto z
                        nadzieniem..Тесто с начинкой</a
                      >
                    </li>
                    <li>
                      <a
                        href="/tisto-dlya-pelmeniv.html"
                        class="dropdown-item multilingual-text p-2"
                        >Кружечки для пельменiв..Dumpling Wrappers..Ciasto na
                        uszka..Кружочки для пельменей</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="header-nav--a-link mt-5">
                  <a
                    href="/pasta.html"
                    class="Header-nav-item multilingual-text"
                    >Паста..Pasta..Makaron..Паста</a
                  >
                </div>
                <div class="header-nav--a-link mt-5">
                  <a
                    href="/ravioli.html"
                    class="Header-nav-item multilingual-text"
                    >Равiолi..Ravioli..Ravioli..Равиоли</a
                  >
                </div>
                <!-- FROZEN DROPDOWN -->
                <div class="dropdown mt-5">
                  <button
                    class="btn btn-primary dropdown-toggle multilingual-text no-outline-btn Header-nav-item"
                    type="button"
                    data-bs-offset="0,10"
                    data-bs-toggle="dropdown"
                    style="color: #212529"
                  >
                    Заморожені..Frozen Range..Mrożone..Замороженные
                  </button>
                  <!-- Dropdown body -->
                  <ul class="dropdown-menu Header-nav-folder w-100 px-2">
                    <li>
                      <a
                        href="/frozen.html"
                        class="dropdown-item multilingual-text p-2"
                        >Смаколики для випічки..Home-quality treats..Smakołyki
                        do pieczenia..Вкусности для выпечки</a
                      >
                    </li>
                    <li>
                      <a
                        href="/frozen_ravioli.html"
                        class="dropdown-item multilingual-text p-2"
                        >Равіолі..Ravioli..Ravioli..Равиоли</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="header-nav--a-link mt-5">
                  <a
                    href="/recipes.html"
                    class="Header-nav-item multilingual-text"
                    >Відео-рецепти..Video Recipes..Przepisy..Видео-рецепты</a
                  >
                </div>
                <div class="header-nav--a-link mt-5">
                  <a href="/faq.html" class="Header-nav-item multilingual-text"
                    >Питання Вiдповiдi..FAQ..Pytania Odpowiedzi..Вопросы
                    Ответы</a
                  >
                </div>
                <div class="header-nav--a-link mt-5">
                  <a
                    href="/contact.html"
                    class="Header-nav-item multilingual-text"
                    >Контакти..Contacts..Kontakty..Контакты</a
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Header for desktop screens -->
          <div
            class="Header-inner d-none d-md-flex flex-column align-items-center flex-grow-0 flex-shrink-0"
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

            <!-- Navigation bar -->
            <nav class="Header-nav d-none d-md-block Header-nav--primary">
              <div
                class="Header-nav-inner d-flex flex-row gap-3 align-items-center"
              >
                <!-- Language Switcher Dropdown -->
                <div class="language-switcher">
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle language-btn no-outline-btn"
                      type="button"
                      id="languageDropdown"
                      data-bs-toggle="dropdown"
                      data-bs-offset="-12,8"
                      aria-expanded="false"
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
                <div class="dropdown">
                  <button
                    class="btn btn-primary dropdown-toggle multilingual-text no-outline-btn Header-nav-item"
                    type="button"
                    data-bs-offset="-12,8"
                    data-bs-toggle="dropdown"
                  >
                    Заморожені..Frozen Range..Mrożone..Замороженные
                  </button>
                  <ul class="dropdown-menu Header-nav-folder">
                    <li>
                      <a
                        href="/frozen.html"
                        class="Header-nav-folder-item multilingual-text"
                        >Смаколики для випічки..Home-quality treats..Smakołyki
                        do pieczenia..Вкусности для выпечки</a
                      >
                    </li>
                    <li>
                      <a
                        href="/frozen_ravioli.html"
                        class="Header-nav-folder-item multilingual-text"
                        >Равіолі..Ravioli..Ravioli..Равиоли</a
                      >
                    </li>
                  </ul>
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
            </nav>
          </div>
        </header>'''

def replace_header(file_path):
    """Replace header in a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match entire header element (including newlines and whitespace)
        # This matches from the comment before header to </header>
        pattern = r'(\s*)<!-- Header -->.*?</header>'
        
        # Check if header exists
        if not re.search(pattern, content, re.DOTALL):
            print(f"❌ No header found in: {file_path}")
            return False
        
        # Replace the header
        new_content = re.sub(pattern, HEADER_TEMPLATE, content, flags=re.DOTALL)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Updated: {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    base_dir = Path(__file__).parent
    
    # Collect all HTML files from specified directories
    html_files = []
    
    # Root directory (excluding contact.html)
    for file in base_dir.glob("*.html"):
        if file.name != "contact.html":
            html_files.append(file)
    
    # product_pages directory
    product_pages = base_dir / "product_pages"
    if product_pages.exists():
        html_files.extend(product_pages.glob("*.html"))
    
    # recipe_details directory
    recipe_details = base_dir / "recipe_details"
    if recipe_details.exists():
        html_files.extend(recipe_details.glob("*.html"))
    
    print(f"Found {len(html_files)} HTML files to process\n")
    
    # Process each file
    success_count = 0
    for file in sorted(html_files):
        if replace_header(file):
            success_count += 1
    
    print(f"\n✅ Successfully updated {success_count} out of {len(html_files)} files")

if __name__ == "__main__":
    main()
