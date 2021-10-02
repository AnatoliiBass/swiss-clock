//Адаптивный слайдер
//======================================================================

function adaptSlider(body, bodyitems, prev, next, kolsliders) {
   const items = document.querySelectorAll(bodyitems)
   const sliderBody = document.querySelector(body)
   let count = 0
   let width
   function init() {
      width = sliderBody.parentNode.offsetWidth
      sliderBody.style.width = width * items.length / kolsliders + 'px'
      items.forEach(item => {
         item.style.width = width + 'px'
         item.style.height = 'auto'
      })
      rollSlider()
   }

   window.addEventListener('resize', init)
   init()

   document.querySelector(prev).addEventListener('click', function () {
      count--
      if (count < 0) {
         count = items.length - kolsliders
      }
      rollSlider()
   })

   document.querySelector(next).addEventListener('click', function () {
      count++
      if (count > items.length - kolsliders) {
         count = 0
      }
      rollSlider()
   })

   function rollSlider() {
      sliderBody.style.transform = 'translate(-' + count * width / kolsliders + 'px)'
   }
}
function checkScreen() {
   let widthBodyLot = document.querySelector('.slider-lots__body').parentNode.offsetWidth
   if (widthBodyLot > 767) {
      adaptSlider('.slider-lots__body', '.slider-lots__slide', '.control-slider-lots__arrow.control-slider-lots__arrow-prev', '.control-slider-lots__arrow.control-slider-lots__arrow-next', 3)
   } else if ((widthBodyLot <= 767) && (widthBodyLot > 480)) {
      adaptSlider('.slider-lots__body', '.slider-lots__slide', '.control-slider-lots__arrow.control-slider-lots__arrow-prev', '.control-slider-lots__arrow.control-slider-lots__arrow-next', 2)
   } else {
      adaptSlider('.slider-lots__body', '.slider-lots__slide', '.control-slider-lots__arrow.control-slider-lots__arrow-prev', '.control-slider-lots__arrow.control-slider-lots__arrow-next', 1)
   }
}
adaptSlider('.slider-quotes__body', '.slider-quotes__slide', '.fake', '.control-slider-quotes__link', 1)
adaptSlider('.main-slider__body', '.main-slider__item.item-main-slider', '.control-main-slider__arrow.control-main-slider__arrow-prev', '.control-main-slider__arrow.control-main-slider__arrow-next', 1)


document.addEventListener("DOMContentLoaded", function () {
   checkScreen()
   document.documentElement.scrollIntoView(top)
})

window.addEventListener('resize', () => {
   checkScreen()
})

//=======================================================================

//для настройки gulp

function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else { document.querySelector('body').classList.add('no-webp'); }

});

//Меню бургер
let iconMenu = document.querySelector('.icon-menu')
let menuBody = document.querySelector('.menu__body')
let menuList = document.querySelector('.menu__list')
if (iconMenu != null) {
   iconMenu.addEventListener('click', (e) => {
      iconMenu.classList.toggle('active')
      menuBody.classList.toggle('active')
   })
}
//Выпадающие меню
let user_icon = document.querySelector('.user-header__icon');
let user_menu = document.querySelector('.user-header__menu');
user_icon.addEventListener("click", function (e) {
   user_menu.classList.toggle('active')
   if (menuBody.className === 'menu__body active' && user_menu.className === 'user-header__menu active') {
      menuList.style.marginTop = user_menu.offsetHeight + 'px'
   } else {
      menuList.style.marginTop = 0
   }

})

//Клик вне меню
document.documentElement.addEventListener('click', function (e) {
   if (!e.target.closest('.user-header')) {
      user_menu.classList.remove('active')
      menuList.style.marginTop = 0
   }
   const Input = document.querySelector('.input');
   const Btn = document.querySelector('.subscribe__btn');
   if ((e.target.className !== 'input') && (e.target.className !== 'form-subscribe__btn')) {
      Input.value = "";
   }
})

//Перенос роздела
function moveSelector() {
   const action = document.querySelector('.header__actions')
   const region = document.querySelector('.actions-header__region')
   const datamove = region.getAttribute('data-move').split(', ')
   const burgermenu = document.querySelector('.' + datamove[0])
   if (document.documentElement.clientWidth <= Number(datamove[1])) {
      burgermenu.appendChild(region)
   }
   if (document.documentElement.clientWidth > Number(datamove[1])) {
      action.insertAdjacentElement('beforebegin', region)
   }
}
window.addEventListener('resize', moveSelector)
moveSelector()

function moveSelector2() {
   const infofooter = document.querySelector('.first-column')
   const info = document.querySelector('.footer__info')
   const datamove = info.getAttribute('data-move').split(', ')
   const container = document.querySelector('.' + datamove[0])
   if (document.documentElement.clientWidth <= Number(datamove[1])) {
      container.appendChild(info)
   }
   if (document.documentElement.clientWidth > Number(datamove[1])) {
      infofooter.appendChild(info)
   }
}
window.addEventListener('resize', moveSelector2)
moveSelector2()

//Функция для переобразования обычной картинки в фоновою

function ibg() {
   let ibg = document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}
ibg();

//Навигация по сайту и прокрутка

function navigationMenu(menuLink) {
   const arrLinks = document.querySelectorAll(menuLink)
   for (let link of arrLinks) {
      link.addEventListener('click', () => {
         for (let linkAgain of arrLinks) {
            linkAgain.classList.remove('active')
         }
         link.classList.add('active')
         if (arrLinks[arrLinks.length - 1].classList.contains('active')) {
            setTimeout(() => window.scrollBy(0, 60), 100)
         } else {
            setTimeout(() => window.scrollBy(0, -60), 100)
         }

      })
   }
   const sections = document.querySelectorAll('.scroll-id');
   window.addEventListener('scroll', () => {
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = 0; i < sections.length; i++) {
         if (sections[i].offsetTop <= scrollPosition) {
            for (let linkAgain of arrLinks) {
               linkAgain.classList.remove('active')
            }
            arrLinks[i].classList.add('active')
         }
      }
   })
}
navigationMenu('.menu__link')




