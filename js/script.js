window.addEventListener('DOMContentLoaded', () => {
	let language = 'ru';
	const languageParentBlock = document.querySelector('[data-language="parentBlock"]');
	const addressTextBlock = document.querySelector('.header-address__link');
	const mainTextBlock = document.querySelector('[data-animation="text"]');
	let mainTextBlockContent = 'С помощью сервиса GlobalExchange вы можете перевести цифровые или наличные активы из одной страны, в любую другую точку мира. А также купить или продать любую криптовалюту, в любом объёме.';
	const openModalButton = document.querySelector('.info-main__button');
	function switchLanguage() {
		language = (language === 'ru') ? 'eng' : 'ru';
		translatePageTextContent();
		changeLanguageBlockContent();
	}
	function changeLanguageBlockContent() {
		const languageIconBlock = languageParentBlock.querySelector('img');
		const languageTextBlock = languageParentBlock.querySelector('div');
		if (language === 'ru') {
			languageIconBlock.setAttribute('src', 'img/icons/header/ukrainian.svg');
			languageTextBlock.textContent = 'RU'
		} else {
			languageIconBlock.setAttribute('src', 'img/icons/header/english.svg');
			languageTextBlock.textContent = 'ENG'
		}
	}
	function translatePageTextContent() {
		if (language === 'ru') {
			addressTextBlock.textContent = 'ул. Константина Гамсахурдия 27, Батуми, Грузия';
			mainTextBlockContent = 'С помощью сервиса GlobalExchange вы можете перевести цифровые или наличные активы из одной страны, в любую другую точку мира. А также купить или продать любую криптовалюту, в любом объёме.';
			openModalButton.textContent = 'НАШИ УСЛУГИ';
		} else {
			mainTextBlockContent = 'With the GlobalExchange service, you can transfer digital or cash assets from one country to any other point in the world. As well as buy or sell any cryptocurrency in any volume.';
			addressTextBlock.textContent = '27 Konstantine Gamsakhurdia St, Batumi, Georgia';
			openModalButton.textContent = 'OUR SERVICES';
		}
	}
	languageParentBlock.addEventListener('click', switchLanguage);

	const mainBlock = document.querySelector('.info-main');
	function addTextAnimation() {
		mainTextBlock.textContent = mainTextBlockContent;
	}
	mainBlock.addEventListener('mouseenter', addTextAnimation);

	const cityBlockTopArray = ['Kyiv', 'Odessa', 'Dnieper', 'Tbilisi', 'Moscow', 'Peter', 'Rostov', 'Krasnodar', 'Warsaw', 'Prague'];
	const cityBlockBottomArray = ['Vein', 'Milan', 'Barcelona', 'Berlin', 'Vilnius', 'Budapest', 'Dubai', 'New York', 'San Francisco', 'Toronto']
	const cityBlockTop = document.querySelector('[data-randomCity="top"]');
	const cityBlockBottom = document.querySelector('[data-randomCity="bottom"]');
	const cityBlockTopMobile = document.querySelector('[data-randomCity-mobile="top"]');
	const cityBlockBottomMobile = document.querySelector('[data-randomCity-mobile="bottom"]');
	function getRandomCityIndex(max) {
		return Math.floor(Math.random() * max);
	}
	function setRandomCity() {
		const screenWidth = window.screen.width;
		if (screenWidth > 600) {
			cityBlockTop.textContent = cityBlockTopArray[getRandomCityIndex(cityBlockTopArray.length)];
			cityBlockBottom.textContent = cityBlockBottomArray[getRandomCityIndex(cityBlockBottomArray.length)];
		} else {
			cityBlockTopMobile.textContent = cityBlockTopArray[getRandomCityIndex(cityBlockTopArray.length)];
			cityBlockBottomMobile.textContent = cityBlockBottomArray[getRandomCityIndex(cityBlockBottomArray.length)];
		}
		
	}
	setRandomCity();
	setInterval(setRandomCity, 5000);



	mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdGlrb3YwMDAiLCJhIjoiY2w1ZTliNnRwMGlqZTNqbnR1bnRpcDFiMCJ9.gdU3izpkDihTRDBIovm_Gg';
	const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v10',
		center: [41.6387 ,41.6481],
		zoom: 0
		});
	function addMarkerToMap(place) {
		mapboxClient.geocoding
		.forwardGeocode({
		query: place,
		autocomplete: false,
		limit: 1
		})
		.send()
		.then((response) => {
		if (
		!response ||
		!response.body ||
		!response.body.features ||
		!response.body.features.length
		) {
		console.error('Invalid response:');
		console.error(response);
		return;
		}
		const feature = response.body.features[0];
		
		
			
		new mapboxgl.Marker({color: '#fe7b0c'}).setLngLat(feature.center).addTo(map);
		});
	}
	addMarkerToMap('Wellington, New Zealand');
	addMarkerToMap('Canada');
	addMarkerToMap('Batumi, Georgia');
	addMarkerToMap('Ukraine');
	addMarkerToMap('Warzawa, Poland');


	async function fetchCryptocurrency(id) {
		const url = `https://api.coinpaprika.com/v1/tickers/${id}`;
		const response = await fetch(url);
		const datapoints = response.json();
		return datapoints;
	}
	
	function updateCryptocurrencyValue () {
		fetchCryptocurrency('sol-solana')
		.then((datapoints) => setCryptocurrencyValues(datapoints, 'SOL'));
		fetchCryptocurrency('bnb-binance-coin')
			.then((datapoints) => setCryptocurrencyValues(datapoints, 'BNB'));
		fetchCryptocurrency('btc-bitcoin')
			.then((datapoints) => setCryptocurrencyValues(datapoints, 'BTC'));
		fetchCryptocurrency('busd-binance-usd')
			.then((datapoints) => setCryptocurrencyValues(datapoints, 'BUSD'));
		fetchCryptocurrency('eth-ethereum')
			.then((datapoints) => setCryptocurrencyValues(datapoints, 'ETH'));
		fetchCryptocurrency('usdc-usd-coin')
			.then((datapoints) => setCryptocurrencyValues(datapoints, 'USDC'));
	}
	
	function abbreviateNumber(value) {
		 var newValue = value;
		 if (value >= 1000) {
			  var suffixes = ["", "K", "M", "B","T"];
			  var suffixNum = Math.floor( (""+value).length/3 );
			  var shortValue = '';
			  for (var precision = 2; precision >= 1; precision--) {
					shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
					var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
					if (dotLessShortValue.length <= 2) { break; }
			  }
			  if (shortValue % 1 != 0)  shortNum = shortValue.toFixed(1);
			  newValue = shortValue+suffixes[suffixNum];
		 }
		 return newValue;
	}	
		
	function setCryptocurrencyValues(datapoints, dataAttributeValue) {
		const priceBlock = document.querySelector([`[data-crypto=${dataAttributeValue}-price]`]);
		const price = datapoints.quotes.USD.price;
		priceBlock.innerHTML = Math.round(price) + '$';
		const supplyBlock = document.querySelector([`[data-crypto=${dataAttributeValue}-supply]`]);
		const supply = datapoints.total_supply;
		supplyBlock.innerHTML = abbreviateNumber(supply);
		const changeBlock = document.querySelector([`[data-crypto=${dataAttributeValue}-change]`]);
		const change = datapoints.quotes.USD.percent_change_24h;
		const triangle = (change < 0) ? '▽' : '△';
		const color = (change < 0) ? 'rgb(255, 40, 40)' : 'rgb(18, 186, 18)';
		changeBlock.innerHTML = change + '%' + triangle;
		changeBlock.style.color = color;
	
	}
	
	updateCryptocurrencyValue();



	async function fetchCryptocurrency(id) {
		const url = `https://api.coinpaprika.com/v1/tickers/${id}`;
		const response = await fetch(url);
		const datapoints = response.json();
		return datapoints;
	}
	
	function setCryptocurrencyPrice(datapoints, dataAttributeValue) {
		const priceBlock = document.querySelector([`[data-crypto=${dataAttributeValue}parent]`]);
		const price = datapoints.quotes.USD.price;
		priceBlock.innerHTML = `
		<div class="aside-right-text__name price-animation">
			${dataAttributeValue}
		</div>
		<div data-crypto="SOL" class="aside-right-text__price price-animation">
			${price.toFixed(3)}$
		</div>`
	}
	
	function updateCryptocurrencyPrice () {
		fetchCryptocurrency('sol-solana')
		.then((datapoints) => setCryptocurrencyPrice(datapoints, 'SOL'));
		fetchCryptocurrency('bnb-binance-coin')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'BNB'));
		fetchCryptocurrency('btc-bitcoin')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'BTC'));
		fetchCryptocurrency('busd-binance-usd')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'BUSD'));
		fetchCryptocurrency('eth-ethereum')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'ETH'));
		fetchCryptocurrency('usdc-usd-coin')
			.then((datapoints) => setCryptocurrencyPrice(datapoints, 'USDC'));
	}
	
	function removeElementCryptocurrencyPrice(dataAttributeValue) {
		const priceBlock = document.querySelector(`[data-crypto="${dataAttributeValue}parent"]`);
		while (priceBlock.firstChild) {
			priceBlock.removeChild(priceBlock.firstChild);
	  }
	}

	function removeAllCryptocurrencyPrices() {
		removeElementCryptocurrencyPrice('SOL');
		removeElementCryptocurrencyPrice('BNB');
		removeElementCryptocurrencyPrice('BTC');
		removeElementCryptocurrencyPrice('BUSD');
		removeElementCryptocurrencyPrice('ETH');
		removeElementCryptocurrencyPrice('USDC');
	}

	function setAsideEventListeners() {
		const asideBlock = document.querySelector('.aside-right');
		asideBlock.addEventListener('mouseenter', updateCryptocurrencyPrice);
		asideBlock.addEventListener('mouseleave', removeAllCryptocurrencyPrices);
	}
	setAsideEventListeners();
	function mouseenterAnimation() {
		element.textContent = (language === 'ru') ?
				'С помощью сервиса GlobalExchange вы можете перевести цифровые или наличные активы из одной страны, в любую другую точку мира. А также купить или продать любую криптовалюту, в любом объёме.' :
				'With the GlobalExchange service, you can transfer digital or cash assets from one country to any other point in the world. As well as buy or sell any cryptocurrency in any volume.';
			box.style.padding = '20px 0';
			element.classList.add('text-animation');
			arrowLeft.style.right = '0';
			arrowRight.style.left = '0';
	}
	function mouseleaveAnimation() {
		element.textContent = '';
			box.style.padding = '80px 0';
			arrowLeft.style.right = '-15px';
			arrowRight.style.left = '-15px';
	}
	const element = document.querySelector('.info-main-center__text');
		const parent = document.querySelector('.info-main');
		const box = document.querySelector('.info-main-center-box');
		const arrowLeft = document.querySelector('.info-main-left__img');
		const arrowRight = document.querySelector('.info-main-right__img');
	function setTextAnimationOnHover() {
		
		
		
			parent.addEventListener('mouseenter', mouseenterAnimation);
		parent.addEventListener('mouseleave', mouseleaveAnimation);
	}
	setTextAnimationOnHover();

	const anchors = document.querySelectorAll('a[href*="#"]')

	for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		
		const blockID = anchor.getAttribute('href').substr(1)
		
		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
	const parent = document.querySelector('.info-main');
		const modal = document.querySelector('.info-modal');
		const modalMobileShowButton = document.querySelector('.info-mobile__button');
		const modalShowButton = document.querySelector('.info-main__button');
		modalShowButton.addEventListener('click', () => {
			modal.classList.add('info-modal-show');
			parent.removeEventListener('mouseenter', mouseenterAnimation);
		parent.removeEventListener('mouseleave', mouseleaveAnimation);
		})
		const modalCloseButton = document.querySelector('.info-modal__close');
		modalMobileShowButton.addEventListener('click', () => {
			modal.classList.add('info-modal-show');
			parent.removeEventListener('mouseenter', mouseenterAnimation);
		parent.removeEventListener('mouseleave', mouseleaveAnimation);
		})
		modalCloseButton.addEventListener('click', () => {
			modal.classList.remove('info-modal-show');
			parent.addEventListener('mouseenter', mouseenterAnimation);
		parent.addEventListener('mouseleave', mouseleaveAnimation);
		})
	}
	function getReview() {
		const reviewsParent = document.querySelector('.reviews');
	fetch("./db/db.json").then(res => res.json()).then(reviews => {
		reviews.forEach(review => {
			const div = document.createElement('div');
			div.classList.add('reviews-item');
			div.innerHTML = `
			<div class="reviews-item__info reviews-item-info">
					<div class="reviews-item-info__name">${review.name}</div>
					<div class="reviews-item-info__city">${review.city}</div>
				</div>
				<p class="reviews-item__description">${review.description}</p>`
			reviewsParent.append(div);
		})
	});
	}
	getReview();
	// const formButton = document.querySelector('.form-element__button');
	// const form = document.querySelector('.form-element');
	// formButton.addEventListener('click',postReview)
	// async function postReview() {
	// 	let formData = new FormData(form);
	// 	let review = {
	// 		"name": formData.get("name"),
	// 		"city": formData.get("city"),
	// 		"description": formData.get("description"),
	// 	}
	// 	let response = await fetch('./php/server.php', {
	// 		method: 'POST',
	// 		headers: {
	// 		  'Content-Type': 'application/json;charset=utf-8'
	// 		},
	// 		body: review
	// 	});
	// 	let result = await response.json();
	// 	alert(result.message);
	// 	getReview();
	// }
})