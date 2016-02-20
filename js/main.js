/*jshint expr:true */
jQuery(function($) {
	var L = {
		checkBoxes: function() {
			$('input').checkBox();
		},
		goTo: function() {
			$('.js-goto').on('click', function(e) {
				e.preventDefault();
				var t = $(this).attr('href'),
					v = $('html, body'),
					o = $(t).offset().top - 20;
				v.animate({
					scrollTop: o
				}, {
					duration: 1000,
					easing: 'easeOutCubic'
				});
			});
		},
		modernizrSupport: function() {
			var m = Modernizr,
				placeholder = m.input.placeholder,
				svg = m.svg;
			if (placeholder === false) {
				var inputs = $('input[placeholder], textarea[placeholder]');
				m.load([{
					load: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-placeholder/2.3.0/jquery.placeholder.min.js',
					complete: function() {
						inputs.placeholder();
					}
				}]);
			}
			if (svg === false) {
				var i = document.getElementsByTagName("img"),
					j, y;
				for (j = i.length; j--;) {
					y = i[j].src;
					if (y.match(/svg$/)) {
						i[j].src = y.slice(0, -3) + 'png';
					}
				}
			}
		},
		upload: function() {
			var e = $('.js-upload'),
				b = $('.o-button__title', e),
				d = b.text(), n;
			$('.upload').on('change', '#file', function() {
				n = $('#file').val().replace(/.*(\/|\\)/, '');
				if (n) {
					b.text(n);
					e.addClass('has-file');
				} else {
					b.text(d);
					e.removeClass('has-file');
				}
			});
		},
		validate: function() {
			var el = $('#sign-up'),
				email = '',
				error = 0,
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
				filename = '',
				submit = $('button[type=submit]'),
				validateStart = function() {
					error = 0;
					$('input[type=text]', el).each(function() {
						if ($(this).prop('required')) {
							if (!$(this).val()) {
								$(this).parent().addClass('error');
								error = 1;
							} else {
								$(this).parent().removeClass('error');
							}
						}
					});
					$('input[type=email], input[type=text]', el).on('keydown', function() {
						$(this).parent().removeClass('error');
					});
					$('input[type="email"]', el).each(function() {
						if ($(this).prop('required')) {
							email = $(this).val();
							if (email === '') {
								$(this).parent().addClass('error');
								error = 1;
							} else if (reg.test(email) === false) {
								$(this).parent().addClass('error');
								error = 1;
							} else {
								$(this).parent().removeClass('error');
							}
						}
					});
					// Terminate the script if an error is found
					if (error === 1) {
						var offset = el.offset().top - 20;
						$('body, html').animate({
							scrollTop: offset
						}, 500);
						return false;
					} else {
						return true;
					}
				};
			$(':file').on('change', function() {
				var f = this.files[0];
				if (f) {
					filename = f.name;
				}
			});
			submit.on('click', function(e) {
				e.preventDefault();
				var success = validateStart();
				// jesli nie ma bledu (weryfikacja)
				if (success === true) {
					$('form', el).submit();
					return true;
				}
			});
		},
		init: function() {
			L.checkBoxes();
			L.goTo();
			L.modernizrSupport();
			L.upload();
			L.validate();
		}
	};
	$(document).ready(function() {
		L.init();
	});
});