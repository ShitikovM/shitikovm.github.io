$('.form').on('submit', function (event) {

	event.stopPropagation();
	event.preventDefault();

	let form = this,
		 submit = $('.submit', form),
		 data = new FormData(),
		 files = $('input[type=file]')


	$('.form__button', form).val('Loading...');
	$('input, textarea, select', form).attr('disabled','');

	data.append( 'Имя', 		$('[name="name"]', form).val() );
	data.append('Телефон', $('[name="phone"]', form).val());
	data.append( 'Телеграм', 		$('[name="telegram"]', form).val() );
	data.append( 'Город продажи', 		$('[name="sale-city"]', form).val() );
	data.append('Продаваемая валюта', $('[name="sale-currency"]', form).val());
	data.append('Город получения', $('[name="get-city"]', form).val());
	data.append('Получаемая валюта', $('[name="get-currency"]', form).val());
	data.append('Количество', $('[name="amount"]', form).val());

	files.each(function (key, file) {
		 let cont = file.files;
		 if ( cont ) {
			  $.each( cont, function( key, value ) {
					data.append( key, value );
			  });
		 }
	});
	
	$.ajax({
		 url: '../php/send.php',
		 type: 'POST',
		 data: data,
		 cache: false,
		 dataType: 'json',
		 processData: false,
		 contentType: false,
		 xhr: function() {
			  let myXhr = $.ajaxSettings.xhr();

			  if ( myXhr.upload ) {
					myXhr.upload.addEventListener( 'progress', function(e) {
						 if ( e.lengthComputable ) {
							  let percentage = ( e.loaded / e.total ) * 100;
									percentage = percentage.toFixed(0);
							  $('.submit', form)
									.html( percentage + '%' );
						 }
					}, false );
			  }

			  return myXhr;
		 },
		 complete: function() {
			  window.location.href = '../index.html'
			  form.reset() 
		 }
	});

	return false;
});

