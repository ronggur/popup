var Core = (function ($) {
	"use strict";
	var theHash;
	var self = {
		init: function(){
			theHash = window.location.hash.substring(1);

			self.globalFunction();

			if( theHash.length > 0 ){
				self.triggerAction(theHash);
			}

		},
		globalFunction:function(){
			/* all globa pages load here */
			$('.modal').on('click',function(event){
				event.preventDefault();
				var data = $(this);
				self.createModal('modal-transparent',data);
			});
		},
		createLoader:function(target, message) {
			$('<span/>', {
				class:'ajax_loader',
			})
			.html(message)
			.appendTo(target)
			.hide()
			.fadeIn();
		},
		destroyLoader:function(target){
			$(target).find('.ajax_loader').fadeOut('fast',function(){ $(this).remove(); });
		},
		triggerAction:function(hash){
			var action = hash.split("-");
			$('#'+action[2]).trigger(action[1]);
		},
		createModal: function(modalClass,data){
			var docPos = $('body').scrollTop();

			self.removeModal();

			$('<div/>', {
				'id':'overlay',
			})
			.appendTo('body').show('fast');
			$('<div/>', {
				'id':'modal',
				'class':'modal '+modalClass,
				'css': {'top':(docPos+40)+'px'}
			}).append(
				$('<div/>', {
					'id':'modal-box-wrapper',
					'class':'modal-box '+modalClass,
					'html':'<a href="#" class="modal-close modal-close-button">close</a>',
				}).append(
					$('<div/>', {
						'class':'modal-content',
						'html':'<iframe src="'+data.data('iframe')+'" scrolling="yes"><iframe>',
					})
				)
			)
			.prependTo('body')
			.hide()
			.fadeIn('fast');

			self.closeModal();
		},
		showModal: function(){
			$('#overlay').fadeIn('fast');
			$('#modal').fadeIn('fast');
		},
		closeModal:function(){
			$('body').on('click', '#overlay', function(e){
				e.preventDefault();
				$('#overlay').fadeOut('fast');
				$('#modal').fadeOut('fast');
			}).on('click', '.modal-close', function(e){
				e.preventDefault();

				$('#overlay').fadeOut('fast');
				$('#modal').fadeOut('fast');
			});
		},
		removeModal: function(){
			$('#overlay').remove();
			$('#modal').remove();
		}
	};
	return self;
})(jQuery);


jQuery(document).ready(function($){
	Core.init();
});