$.ajax({
url: '/ajax/example.html',
dataType : "json",
success: function (data, textStatus) {
$.each(data, function(i, val) {
/* ... */
        });
    }
});