document.addEventListener("DOMContentLoaded", async () => {
  // ===== اعداد انگلیسی به فارسی  
  function toPersianNumber(num) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().replace(/\d/g, (d) => persianDigits[d]);
  }

  // ===== منوی موبایل 
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // ===== مگا منو  
  const megaTrigger = document.getElementById("mega-menu-trigger");
  const megaMenu = document.getElementById("mega-menu");

  if (megaTrigger && megaMenu) {
    megaTrigger.addEventListener("mouseenter", () => {
      megaMenu.classList.remove("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!megaMenu.contains(e.target) && !megaTrigger.contains(e.target)) {
        megaMenu.classList.add("hidden");
      }
    });
  }

  // ===== زیرمنوهای آکاردئونی 
  const toggles = document.querySelectorAll(".menu-toggle");
  toggles.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const submenu = btn.nextElementSibling;
      if (submenu) submenu.classList.toggle("hidden");
    });
  });

  document.addEventListener("click", () => {
    document
      .querySelectorAll(".submenu")
      .forEach((sub) => sub.classList.add("hidden"));
  });

  // ===== آکاردئون زیرمنوها  
  document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector("svg");
      document.querySelectorAll(".accordion-content").forEach((el) => {
        if (el !== content) el.classList.add("hidden");
      });
      document.querySelectorAll(".accordion-btn svg").forEach((el) => {
        if (el !== icon) el.classList.remove("rotate-180");
      });
      if (content) content.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180");
    });
  });

  // ===== اسلایدر  
  async function slider() {
    try {
      const res = await fetch("http://localhost:3004/slider");
      const data = await res.json();
      const slidesHTML = data.map(
        (item) =>
          `<div class="swiper-slide"><img src="${item.images}" alt="${item.alt}" /></div>`
      );
      document.querySelector(".swiper-wrapper").innerHTML = slidesHTML.join("");
    } catch (error) {
      console.log("خطا در دریافت داده‌های اسلایدر:", error.message);
    }
  }

  await slider();

  const swiperContainer = document.querySelector(".mySwiper");
  if (swiperContainer) {
    new Swiper(".mySwiper", {
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  async function loadOffDays() {
    try {
      const res = await fetch("http://localhost:3004/offdays");
      const data = await res.json();
      const container = document.getElementById("offdays-container");
      if (!container) return;

      container.innerHTML = "";
      container.className =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
      
      const col1 = document.createElement("div");
      col1.className = "flex flex-col gap-4";

      data.slice(0, 3).forEach((item) => {
        const discount = Math.round(
          100 - (item.newPrice / item.oldPrice) * 100
        );

        const card = document.createElement("div");
        card.className =
          "bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-row items-center justify-between  h-40 text-sm";

        card.innerHTML = `
    
    <div class="flex flex-col  h-full w-[65%] pr-2">
      <h3 class="font-samim mb-1 md:text-[14px] text-[12px] leading-5 text-gray-900 pt-6 ">${
        item.title
      }</h3>

      <div class="flex gap-[20px]  items-center mb-1">
        <span class="line-through text-gray-400 md:text-[14px] text-[12px]  font-samim font-bold pt-4 pr-[14px]">
          ${toPersianNumber(item.oldPrice.toLocaleString())}  
        </span>

        <span class="text-[#fe5f55]   md:text-[14px] text-[12px]  font-samim font-bold pt-4">
          ${toPersianNumber(item.newPrice.toLocaleString())}  تومان تخفیف
        </span>
      </div>
 
      <span class="text-[#0a5abd]  mt-1 md:mr-[120px]  mr-[100px] md:text-[14px] text-[12px]  font-samim font-bold pt-4">
          ${toPersianNumber(item.oldPrice.toLocaleString())} تومان
      </span>
    </div>
 
    <img src="${item.images}" alt="${item.title}" 
      class="w-33 h-33 object-contain flex-shrink-0 ml-2">
  `;

        col1.appendChild(card);
      });

     
      const col2Data = data[3];
      const discount4 = Math.round(
        100 - (col2Data.newPrice / col2Data.oldPrice) * 100
      );
      const col2 = document.createElement("div");
      col2.className = "flex flex-col h-full";
      col2.innerHTML = `
      <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full text-sm ">
        <img src="${col2Data.images}" alt="${
        col2Data.title
      }" class="w-[290px] h-[290px] object-contain p-2  mt-[30px] md:mr-[55px] mr-[37px]">
        <div class="p-3 flex flex-col justify-between flex-grow">
          <h3 class="font-samim mb-1 md:text-[18px] text-[16px] leading-5 text-gray-900 pt-6  md:pr-[35px] pr-[40px] pb-[10px]">${
            col2Data.title
          }</h3>
          <div class="flex gap-8 items-center mb-1 mr-[30px]">
            <span class="line-through text-gray-400 md:text-[16px] text-[14px] font-samim font-bold  md:pr-[35px] pr-[45px]  " >${toPersianNumber(
              col2Data.oldPrice.toLocaleString()
            )}  </span>
            <span class="text-[#fe5f55]   md:text-[16px] font-samim font-bold  text-[14px] " >${toPersianNumber(
              col2Data.newPrice.toLocaleString()
            )}   تومان تخفیف</span>
          </div>
          <span class= "text-[#0a5abd]  mt-1 md:mr-[160px]  md:text-[16px] font-samim font-bold  mb-4 mr-[170px]  text-[14px]" >${toPersianNumber(
            col2Data.oldPrice.toLocaleString()
          )}   تومان</span>
        </div>
      </div>
    `;

 
      const col3Data = data[4];
      const discount5 = Math.round(
        100 - (col3Data.newPrice / col3Data.oldPrice) * 100
      );
      const col3 = document.createElement("div");
      col3.className = "flex flex-col h-full";
      col3.innerHTML = `
      <div class=" bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full text-sm">
        <img src="${col3Data.images}" alt="${
        col3Data.title
      }" class="w-[290px] h-[290px] object-contain p-2  mt-[30px] md:mr-[55px] mr-[30px]">
        <div class="p-3 flex flex-col justify-between flex-grow">
          <h3 class="font-samim mb-1 md:text-[18px] text-[16px] leading-5 text-gray-900 pt-6   pb-[10px] md:pr-[22px] pr-[15px]">${
            col3Data.title
          }</h3>
          <div class=" flex gap-8 items-center mb-1 mr-[30px]">
            <span class="line-through text-gray-400 md:text-[16px] font-samim font-bold  md:pr-[35px] pr-[45px]   ">${toPersianNumber(
              col3Data.oldPrice.toLocaleString()
            )}  </span>
            <span class="text-[#fe5f55]   md:text-[16px] font-samim font-bold ">${toPersianNumber(
              col3Data.newPrice.toLocaleString()
            )}  تومان تخفیف</span>
          </div>
          <span class="text-[#0a5abd]  mt-1  mr-[170px]  md:mr-[160px] md:text-[16px] font-samim font-bold  mb-4 ">${toPersianNumber(
            col3Data.oldPrice.toLocaleString()
          )}   تومان</span>
        </div>
      </div>
    `;
      container.appendChild(col2); 
      container.appendChild(col3);  
      container.appendChild(col1);  
    } catch (err) {
      console.error("خطا در دریافت داده‌های تخفیف روزانه:", err.message);
    }
  }

  await loadOffDays();

  function startOffDaysTimer(endTime) {
    const timerEl = document.getElementById("offdays-timer");
    if (!timerEl) return;

    function updateTimer() {
      const now = new Date();
      const diff = endTime - now;

      if (diff <= 0) {
        timerEl.textContent = "تخفیف‌ها به پایان رسید!";
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      timerEl.textContent = `${toPersianNumber(hours)}:${toPersianNumber(
        minutes
      )}:${toPersianNumber(seconds)}`;
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
  }

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  startOffDaysTimer(todayEnd);

  // ===== دسته‌بندی‌های منتخب  
  async function loadCategories() {
    try {
      const res = await fetch("http://localhost:3004/categories");
      const data = await res.json();

      const wrapper = document.getElementById("categories-wrapper");
      wrapper.innerHTML = "";

      data.forEach((cat) => {
        wrapper.innerHTML += `
        <div class="swiper-slide flex flex-col items-center gap-2 cursor-pointer">
          <img src="${cat.image}" class="w-35 h-35 object-contain" />
          
        </div>
      `;
      });

  
      new Swiper(".categoriesSwiper", {
        slidesPerView: 6,
        spaceBetween: 15,
        loop: true,  
        autoplay: {
          delay: 2000,  
          disableOnInteraction: false, 
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        },
      });
    } catch (err) {
      console.log("خطا در لود دسته‌بندی‌ها:", err);
    }
  }

  await loadCategories();
  // ===== (بخش همین الان موجود شد...)  

  await loadNewProducts();

  async function loadNewProducts() {
    const swiperWrapper = document.getElementById("new-products-slider");
    if (!swiperWrapper) return;

    try {
      const res = await fetch("http://localhost:3004/products");
      const products = await res.json();
      console.log(products);  

       
      swiperWrapper.innerHTML = "";
 
      products.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
        <div class="min-w-[300px] bg-[#ffffff] rounded-xl shadow h-[410px] flex flex-col">
          <img src="${
            item.image
          }" class="rounded-lg h-60 w-full object-contain" />
          <h3 class="font-samim mt-[30px] text-[14px] leading-6 line-clamp-2 text-[#bebebe] text-center">${
            item.subtitle
          }</h3>
          <h3 class="font-samim mt-[10px] text-sm leading-6 line-clamp-2 text-[#757575] text-center mb-[30px] hover:text-[#0a5abd] ">${
            item.title
          }</h3>
          ${
            item.available
              ? `<p class="text-[#0a5abd] font-bold md:mr-[170px] text-center">${toPersianNumber(
                  Number(item.price).toLocaleString()
                )} تومان</p>`
              : `<p class="text-[#a46c73] border-t-1 bg-[#fff5f5] text-center h-[60px] rounded-b-xl pt-[10px]">ناموجود</p>`
          }
        </div>
      `;
        swiperWrapper.appendChild(slide);
      });

 
      if (!window.newProductsSwiper) {
        window.newProductsSwiper = new Swiper(".newProductsSwiper", {
          slidesPerView: 3,
          spaceBetween: 15,
          loop: true,  
          navigation: {
            nextEl: ".newProductsSwiper .swiper-button-next",
            prevEl: ".newProductsSwiper .swiper-button-prev",
          },
          autoplay: {
            delay: 3000,  
            disableOnInteraction: false,  
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          },
        });
      } else {
        window.newProductsSwiper.update();
      }
    } catch (err) {
      console.error("خطا در بارگذاری محصولات:", err);
    }
  }
  //=====قسمت ویژگی های مثبت
  const container = document.getElementById("features-container");

  async function loadFeatures() {
    try {
      const res = await fetch("http://localhost:3004/features");
      const data = await res.json();

      container.innerHTML = data
        .map((feature) => {
          return `
          <div class=" p-6 flex flex-col items-center  text-center  ">
            <img src="${feature.image}" 
                 alt="${feature.title}" 
                 class="w-20 h-20 object-contain"/>
            <h3 class="text-[16px] font-samim mt-4 text-[#757575] font-bold">${feature.title}</h3>
            <p class="text-gray-800 text-sm mt-2 leading-6">${feature.desc}</p>
          </div>
        `;
        })
        .join("");
    } catch (err) {
      container.innerHTML = `<p class="text-red-600 font-bold">خطا در دریافت اطلاعات</p>`;
    }
  }

  loadFeatures();
  //====بخش پر فروش ترین ها
  await loadbestSeller();

  async function loadbestSeller() {
    const swiperWrapper = document.getElementById("bestseller");
    if (!swiperWrapper) return;

    try {
      const res = await fetch("http://localhost:3004/bestseller");
      const bestseller = await res.json();
      console.log(bestseller);   

 
      swiperWrapper.innerHTML = "";

 
      bestseller.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
        <div class="min-w-[300px] bg-[#ffffff] rounded-xl shadow h-[430px] flex flex-col">
          <img src="${
            item.image
          }" class="rounded-lg h-60 w-full object-contain" />
          <h3 class="font-samim mt-[20px] text-[14px] leading-6 line-clamp-2 text-[#bebebe] text-center">${
            item.subtitle
          }</h3>
          <h3 class="font-samim mt-[10px] text-sm leading-6 line-clamp-2 text-[#757575] text-center mb-[30px] hover:text-[#0a5abd] ">${
            item.title
          }</h3>
          ${
            item.oldPrice
              ? `<span class="line-through text-gray-400 md:text-[14px] text-[14px] font-samim font-bold md:mr-[175px] pt-[10px] text-center ">${toPersianNumber(
                  Number(item.oldPrice).toLocaleString()
                )}  </span><br>`
              : ""
          }
          ${
            item.available
              ? `<p class="text-[#0a5abd] font-bold md:mr-[140px] text-center mb-[10px]">${toPersianNumber(
                  Number(item.price).toLocaleString()
                )} تومان</p>`
              : `<p class="text-[#a46c73] border-t-1 bg-[#fff5f5] text-center h-[60px] rounded-b-xl  pt-[10px] mt-[22px]">ناموجود</p>`
          }
        </div>
      `;
        swiperWrapper.appendChild(slide);
      });

     
      if (!window.bestsellerSwiper) {
        window.bestsellerSwiper = new Swiper(".bestsellerSwiper", {
          slidesPerView: 3,
          spaceBetween: 15,
          loop: true,  
          navigation: {
            nextEl: ".bestsellerSwiper .swiper-button-next",
            prevEl: ".bestsellerSwiper .swiper-button-prev",
          },
          autoplay: {
            delay: 3000,  
            disableOnInteraction: false,  
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          },
        });
      } else {
        window.bestsellerSwiper.update();
      }
    } catch (err) {
      console.error("خطا در بارگذاری محصولات:", err);
    }
  }
  // ===== برندهای محبوب 
  async function loadBrands() {
    try {
      const res = await fetch("http://localhost:3004/brands");
      const data = await res.json();

      const wrapper = document.getElementById("brands-wrapper");
      wrapper.innerHTML = "";

      data.forEach((item) => {
        wrapper.innerHTML += `
        <div class="swiper-slide flex flex-col items-center gap-2 cursor-pointer">
          <img src="${item.image}" class="w-[170px] h-[110px] object-contain  p-4 bg-white rounded-md shadow-lg " />
          
        </div>
      `;
      });

      
      new Swiper(".brandsSwiper", {
        slidesPerView: 6,
        spaceBetween: 5,
        loop: true,  
        autoplay: {
          delay: 2000, 
          disableOnInteraction: false,  
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: { slidesPerView: 3 },
          480: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        },
      });
    } catch (err) {
      console.log("خطا در لود دسته‌بندی‌ها:", err);
    }
  }
  await loadBrands();
  //=======مقالات
  async function loadArticles() {
    try {
      const res = await fetch("http://localhost:3004/articles");
      const data = await res.json();

      const wrapper = document.getElementById("articles-wrapper");
      wrapper.innerHTML = ""; 

      
      data.forEach((article) => {
        wrapper.insertAdjacentHTML(
          "beforeend",
          `
        <div class="swiper-slide">
          <a href="${
            article.link || "#"
          }" class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            
            <img
              src="${article.image}"
              alt="${article.title}"
              class="w-full h-40 object-cover"
            />

            <div class="p-4">
              <h3 class="text-base font-semibold text-gray-600 leading-6">
                ${article.title}
              </h3>
            </div>

          </a>
        </div>
      `
        );
      });

       
      new Swiper(".articlesSwiper", {
        slidesPerView: 1.2,  
        spaceBetween: 12,
        loop: false,

        breakpoints: {
          640: {
            slidesPerView: 2.2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,

          
            allowTouchMove: false,
          },
        },

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    } catch (err) {
      console.log("خطا در لود مقالات:", err);
    }
  }

  loadArticles();

  //========دکمه
  const chatBtn = document.getElementById("chat-widget-button");
  const chatWin = document.getElementById("chat-window");
  const chatClose = document.getElementById("chat-close");

  chatBtn.addEventListener("click", () => {
    chatWin.classList.toggle("hidden");
    chatBtn.style.display = chatWin.classList.contains("hidden")
      ? "flex"
      : "none";
  });

  chatClose.addEventListener("click", () => {
    chatWin.classList.add("hidden");
    chatBtn.style.display = "flex";
  });

  //===فوتر
  async function loadFooter() {
    try {
      const response = await fetch("http://localhost:3004/footer");
      const data = await response.json();

      const footer = document.getElementById("footer");

      footer.innerHTML = `
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 px-6 py-6 md:py-[20px]">
        
         
        <div class="flex flex-col items-center md:items-start justify-center text-center md:text-right space-y-4 md:space-y-6">
          <img src="https://www.dastresi.com/images/logo/logo.png" class="w-[150px] h-[70px] md:w-[180px] md:h-[80px] mx-auto md:mx-0">
          <a href="${
            data.instagram
          }" target="_blank" class="flex items-center gap-2 text-pink-600 text-sm justify-center md:justify-start">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" class="w-6 md:w-7">
            با ما در ارتباط باشید
          </a>
        </div>

     
        <div class="flex flex-col justify-center text-center md:text-right">
          <h3 class="font-bold text-lg mb-2 md:mb-4 text-gray-500">فروشگاه اینترنتی دسترسی</h3>
          <p class="text-gray-700 leading-6 text-sm">
            ${data.about || ""}
          </p>
        </div>
 
        <div class="flex flex-col justify-center text-center md:text-right">
          <h3 class="font-bold text-lg mb-2 md:mb-4 text-gray-500">دسترسی سریع</h3>
          <ul class="space-y-1 md:space-y-2 text-gray-700">
            ${
              data.links
                ?.map(
                  (l) =>
                    `<li class="hover:text-blue-600 cursor-pointer transition text-sm md:text-base">${l}</li>`
                )
                .join("") || ""
            }
          </ul>
        </div>

      </div>
    `;
    } catch (error) {
      console.error("خطا در بارگذاری فوتر:", error);
    }
  }

  loadFooter();
});
