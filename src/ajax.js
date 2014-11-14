;(function($) {
    function createXHR() {
        var xhr = false;
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP"); //ie msxml3.0+
        } catch (e1) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP"); //ie msxml 2.6
            } catch (e2) {
                xhr = false;
            }
        }
        if (!xhr && typeof XMLHttpRequest != 'undefined') { //firefox opera 8.0 safari
            xhr = new XMLHttpRequest();
        }
        return xhr;
    };

    $.ajax = function(option) {
        option.type = (option.type || 'GET').toUpperCase()
        var xhr = createXHR();
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader("Content-Type", option.contentType || "application/x-www-form-urlencoded");
        if (option.type === 'POST') {
            xhr.send(option.data || null);
        } else {
            xhr.send(null);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                option.success && $.isFunction(option.success) && option.success(xhr.responseText)
            }
        }
    };
})(core)
