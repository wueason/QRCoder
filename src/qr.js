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

function refresh() {
    jQuery('#qr_code').qrcode({
        text: jQuery('#qr_url').val(),
        width: width,
        height: height
    });
}

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var title = tabs[0].title;
    var outputUrl = url;

    jQuery('#qr_code').qrcode({
        text: outputUrl,
        width: width,
        height: height
    });

    jQuery('#qr_url').val(outputUrl);
});
