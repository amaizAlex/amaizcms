$('.form-simple_label-agree').on('click', function(){
    var self = $(this);
    if(self.siblings('.form-simple_input-suspend').val() === 'true') {
        self.siblings('.form-simple_input-suspend').val('false')
    } else {
        self.siblings('.form-simple_input-suspend').val('true')
    }
})

$('.form-simple_label-privacy').on('click', function(){
    $(this).removeClass('error');
})

var formSimpleBtnText = $('.form-simple_btn-submit').text()

$('.form-simple_input-email').on('focus', function(){ 
    $(this).removeClass('error').addClass('focus')
    $(this).siblings('.form-simple_btn-submit').removeClass('success').text(formSimpleBtnText)
    $(this).siblings('.btn-blue').prop('disabled', false)
})

var validateEmail = function(el) {
  
    var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    // если не прошел проверку
    if (!email_reg.test($.trim(el.val()))) {
        el.addClass("error")
        return proceed = false;
    }
}

$('.form-simple').on('focusout', '.form-simple_input-email.focus', function(){
    $(this).removeClass('focus error')
    validateEmail($(this))
});

var uniqid = function (pr, en) {
        var pr = pr || '', en = en || false, result, us;

        this.seed = function (s, w) {
            s = parseInt(s, 10).toString(16);
            return w < s.length ? s.slice(s.length - w) : 
                      (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
        };

        result = pr + this.seed(parseInt(new Date().getTime() / 1000, 10), 8) 
                    + this.seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

        if (en) result += (Math.random() * 10).toFixed(8).toString();

        return result;
    };

$('.form-simple').children('.uniqid').val(uniqid())

$('.form-simple').submit(function(e){
    e.preventDefault(); //prevent default action
    proceed = true;
    var self = $(this)

    var uniqid = function (pr, en) {
        var pr = pr || '', en = en || false, result, us;

        this.seed = function (s, w) {
            s = parseInt(s, 10).toString(16);
            return w < s.length ? s.slice(s.length - w) : 
                      (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
        };

        result = pr + this.seed(parseInt(new Date().getTime() / 1000, 10), 8) 
                    + this.seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

        if (en) result += (Math.random() * 10).toFixed(8).toString();

        return result;
    };

    self.children('.uniqid').val(uniqid())

    // проверяем email
    validateEmail(self.children('.form-simple_input-email'))

    // проверяем что бы поле email не было пустым
    if(!self.children('.form-simple_input-email').val()) {
        self.children('.form-simple_input-email').addClass('error')
        proceed = false;
    }

    // проверяем галочку на privacy
    if (!self.children('.form-simple_input-privacy').prop("checked")) {
        self.children('.form-simple_label-privacy').addClass('error')
        proceed = false;
    }

    if (proceed) {
        self.children(".btn-blue").addClass('loader')
        
        var post_url = self.attr("action"); //get form action url
        var request_method = self.attr("method"); //get form GET/POST method
        var data = self.serialize();

        $.ajax({ //ajax form submit
            url : post_url,
            type: request_method,
            data : data,
            dataType : "json",
            beforeSend: function(){ // перед отправкой
                self.children('.btn-blue').prop('disabled', true);
            },
            complete: function() { // в конце любого исхода
                if (self.children('.form-simple_btn-submit').text() === 'SUBSCRIBE') {
                    dataLayer.push({'event': 'Subscription_submitted'}) 
                } else {
                    dataLayer.push({'event': 'EarlyAccess_submited'})
                }
                self.children(".btn-blue").removeClass('loader').addClass('success').text('SUCCESS')
                self.children(".form-simple_input-email").val('')
                self.children('.form-simple_input-checkbox').prop('checked', false);
            }
        })
    }
})