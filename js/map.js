'use strict';

(function () {

  // Создаем шаблон карточек квартиры

  window.templateCardHouse = document.querySelector('template').content.querySelector('.map__card');
  var mapPin = document.querySelectorAll('.map__pin');

  // Объект с названием квартир

  window.TYPE = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  /*
  // Функция генерирующая новые карточки с информацией

  window.renderCardHouse = function (flat, index) {
    var cardHouse = templateCardHouse.cloneNode(true);
    var features = cardHouse.querySelector('.popup__features');
    var flatType = cardHouse.querySelector('.popup__type');
    var featuresFragment = document.createDocumentFragment();

    cardHouse.querySelector('.popup__avatar').src = flat.author.avatar;
    cardHouse.querySelector('.popup__title').textContent = flat.offer.title;
    cardHouse.querySelector('.popup__text--address').textContent = flat.offer.address;
    cardHouse.querySelector('.popup__text--price').textContent = flat.offer.price + '₽/ночь';
    flatType.textContent = flat.offer.type;
    flatType.textContent = TYPE[flat.offer.type];
    cardHouse.querySelector('.popup__description').textContent = flat.offer.description;
    cardHouse.querySelector('.popup__text--capacity').textContent = flat.offer.rooms + ' комнаты' + ' для ' + flat.offer.guests + ' гостей';
    cardHouse.querySelector('.popup__text--time').textContent = 'Заезд после ' + flat.offer.checkin + ', ' + 'выезд до ' + flat.offer.checkout;

    // Вставляем features

    features.innerHTML = '';
    for (var j = 0; j < flat.offer.features.length; j++) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + flat.offer.features[j];
      featuresFragment.appendChild(li);
    }
    features.appendChild(featuresFragment);
    features.nextElementSibling.textContent = flat.offer.description;
    document.querySelector('.map').appendChild(cardHouse);
    cardHouse.setAttribute('rel', index);
*/
  // Удаляем карточку квартиры по клику на крестик

  var popupClose = document.querySelectorAll('.popup__close'); // крестик на карточке
  var popup = document.querySelectorAll('.popup');

  popupClose.forEach(function (t) {
    t.addEventListener('click', function () {
      popup.forEach(function (elem) {
        elem.remove();
      });
      mapPin.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    });
  });

  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

  // Удаляем карточку квартиры по нажатию ESCAPE
  function popupCloseCrossHandler(esc) {
    if (esc.keyCode === ESC_BUTTON) {
      popup.forEach(function (elem) {
        elem.remove();
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    }
  }
  document.addEventListener('keydown', popupCloseCrossHandler);
  // Элементы разметки

  var form = document.querySelector('.ad-form'); // форма
  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта
  var fieldset = document.querySelectorAll('fieldset'); // поля
  window.address = form.querySelector('#address'); // адрес
  // Скрываем метки после загрузки страницы

  mapPin.forEach(function (hide) {
    hide.style.display = 'none';
    hide.classList.remove('map__pin--active');
  });

  // Главная метка видна после загрузки страницы

  mapPinMain.style.display = 'block';

  // Скрываем карточки с инфоормацией

  var houseCard = document.querySelectorAll('.popup');
  houseCard.forEach(function (hide) {
    hide.style.display = 'none';
  });

  // Делаем неактивными поля формы

  fieldset.forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });

  // Функция показывающая координаты метки в строке адреса

  var PIN_SIZE = 65;

  window.getCoordinatePin = function (center) {
    center = center === 'center' ? 2 : 1;
    var left = parseInt(mapPinMain.style.left, 10) + PIN_SIZE / 2;
    var top = parseInt(mapPinMain.style.top, 10) + PIN_SIZE / center;
    return left + ', ' + top;
  };

  window.address.value = window.getCoordinatePin('center');

  // Активируем карту

  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.address.value = window.getCoordinatePin();

    // Отображаем метки и карточки квартир на экране

    mapPin.forEach(function (element) {
      element.style.display = 'block';
      element.addEventListener('click', function (view) {
        var index = view.target.getAttribute('rel');
        if (index) {
          window.card.renderCardHouse(window.data.flats[index]);
        }
      });
    });
    fieldset.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  });

  // Добавляем класс метке по клику

  mapPin.forEach(function (pin) {
    pin.addEventListener('click', function (ad) {
      mapPin.forEach(function () {
        mapPinMain.classList.remove('map__pin--active');
        pin.className = pin.className.replace('map__pin--active', '');
        ad.currentTarget.classList.add('map__pin--active');
      });
    });
  });

  // Добавляем активный класс метке по нажатию ENTER

  mapPin.forEach(function (elem) {
    elem.addEventListener('keydown', function (ent) {
      mapPin.forEach(function (p) {
        if (ent.keyCode === ENTER_BUTTON) {
          p.className = p.className.replace('map__pin--active', '');
          ent.currentTarget.classList.add('map__pin--active');
        }
      });
    });
  });

})();
