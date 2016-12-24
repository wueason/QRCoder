if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

var width = "250";
var height = "250";

jQuery('#regenerate').click(function(){
	makeQRCode(jQuery('#qr_url').val());
});

function makeQRCode(text){
    jQuery('#qr_code').html('');
    jQuery('#qr_code').qrcode({
        text: text,
        width: width,
        height: height
    });
}

function localization_init(){
	var language = navigator.language;
	if(jQuery.inArray(language, ['zh-CN', 'zh-TW']))
		language = 'else';
    language = 'else';
	var localization = {
		'zh-CN':{
			'current_qrcode': '生成的二维码',
			'regenerate': '重新生成',
			'current_text': '生成二维码的文本'
		},
		'zh-TW':{
			'current_qrcode': '生成的二维码',
			'regenerate': '重新生成',
			'current_text': '生成二维码的文本'
		},
		'else':{
			'current_qrcode': 'Generated QRCode',
			'regenerate': 'Start Over',
			'current_text': 'Text to generate QRCode'
		}
	};
	
	jQuery('#current_qrcode').html(localization[language]['current_qrcode']);
	jQuery('#regenerate').html(localization[language]['regenerate']);
	jQuery('#current_text').html(localization[language]['current_text'] + '<br/><input id="qr_url">');
	
}

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	localization_init();
	var url = tabs[0].url;
	makeQRCode(url);
    jQuery('#qr_url').val(url);
});