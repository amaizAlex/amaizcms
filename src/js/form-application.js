// APPLY FORM
var totalFilesSize = 0;
var maxFileSize = 26214400;
var emptyInputs = 3;

// add preview at upload files ------------------------------- REWRITE 
addFilePreview = function(files){
	var attachFile = document.createElement('div')
	attachFile.classList.add('form-apply_form_files_attached_attach')
	attachFile.setAttribute('id', $('.form-apply_form_files_label').attr('for'))
	attachFile.innerText = files[0].name;
	attachFile.setAttribute('data-size', files[0].size)
	var attachFileRemove = document.createElement('div')
	attachFileRemove.classList.add('remove')
	attachFileRemove.addEventListener('click', removeFile)
	attachFile.append(attachFileRemove)
	$('.form-apply_form_files_attached').append(attachFile)
}

// remove upload file preview and input value
removeFile = function() {
	totalFilesSize = totalFilesSize - $(this).parent().data('size')
	$('.form-apply_form_files_label').attr('for',$(this).parent().attr('id'))
	$('.form-apply_form_files_input#'+$(this).parent().attr('id')).val('');
	$(this).parent().remove()
	emptyInputs++;
	$('.form-apply_form_files_label').attr('for',$(this).parent().attr('id'))
	$('.form-apply_form_files_label').css('opacity', 1)
	$('.form-apply_form_files_label_note').html('3 files only. Maximum files size: 25mb<br/>Supported .pdf .doc .pages')
}


// Warning, if file(s) larger 25mb or a uppload file unsupport
fileAlert = function(){
	$('.form-apply_form_files_label_note_limit').addClass('error')
}

// adding a file from the form input
addFile = function(){
	// if file uppload supported
	if(window.File && window.FileReader && window.FileList && window.Blob){
		// foolproof: file type checking

		// slicing the value of the input from end to dot
		var fileType = this.files[0].name.split('.')[this.files[0].name.split('.').length - 1];
		
		// check slicing file value to supported format
		if(fileType === 'doc' || fileType === 'docx' || fileType === 'pdf' || fileType === 'pages') {
			// aading file size to totalFilesSizie counter
			totalFilesSize = totalFilesSize + this.files[0].size;
			// if file or totalFilesSize more 25mb, show allert, clear data & abort adding
			if(this.files[0].size > maxFileSize || totalFilesSize > maxFileSize) {
				fileAlert()
				totalFilesSize = totalFilesSize - this.files[0].size;
				$(this).val('')
				return;
			}
			// if everything's ok
			// amount inputs on page
			emptyInputs = 3;
			// adding file preview
			addFilePreview(this.files)
			// all inputs on page
			var fileInputs = document.querySelectorAll('.form-apply_form_files_input')
			for (var i = fileInputs.length - 1; i >= 0; i--) {
				// if empty inputs exist
				if(emptyInputs > 0) {
					// and value is empty
					if(fileInputs[i].value === '') {
						// add file to this input value
						$('.form-apply_form_files_label').attr('for',fileInputs[i].id)							
					} else {
						// else subtract empty inputs counter
						emptyInputs--
						// if counter eq zero (what means max files added)
						if(emptyInputs === 0) {
							// change input label state
							$('.form-apply_form_files_label').css('opacity', 0.3)
							$('.form-apply_form_files_label').attr('for','')
							$('.form-apply_form_files_label_note').html('Maximum number of files attached')
						}
					}
				}
			}
		// if this wrong file, show warring & empty input value
		} else {
			fileAlert()
			$(this).val('')
		}
	}
}

// add file label click event
$('.form-apply_form_files_input').on('change', addFile)

$('.form-apply_form_files_input').on('click', function(){
	$('.form-apply_form_files_label_note_limit').removeClass('error')
})

$('.form-apply_form_name').on('focus', function(){ 
    $(this).removeClass('error').addClass('focus')
    $('.form-apply_form_btn').prop('disabled', false);
    $('.form-apply_form_btn').removeClass('success').text('Send application')
})

$('.form-apply_form_email').on('focus', function(){ 
    $(this).removeClass('error').addClass('focus')
    $('.form-apply_form_btn').prop('disabled', false);
    $('.form-apply_form_btn').removeClass('success').text('Send application')
})

$('.form-apply_form_text').on('click', function(){
    $('.form-apply_form_btn').prop('disabled', false);
    $('.form-apply_form_btn').removeClass('success').text('Send application')
})


$('.form-apply_form_privacy_label').on('click', function(){
	$(this).removeClass('error');
    $('.form-apply_form_btn').prop('disabled', false);
    $('.form-apply_form_btn').removeClass('success').text('Send application')
})


// form submit events
$(".form-apply_form").submit(function(e){
    e.preventDefault(); //prevent default action
    proceed = true;

	$('.form-apply_form_files_label_note_limit').removeClass('error')

    // Name input validation which is not empty
    if(!$.trim($('.form-apply_form_name').val())) {
    	$('.form-apply_form_name').addClass('error');
    	// animate scroll to error input
    	$("html, body").animate({scrollTop: $('.form-apply_form_name').offset().top - 100 }, 300)
    	proceed = false;
    }

    // Email Validation which is not empty, and this has @ and dot with domain zone
    var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
	if(!$('.form-apply_form_email').val() || !email_reg.test($.trim($('.form-apply_form_email').val()))){
		$('.form-apply_form_email').addClass('error');
    	// animate scroll to error input
    	$("html, body").animate({scrollTop: $('.form-apply_form_email').offset().top - 100 }, 300)
		proceed = false;
	}


	 // проверяем галочку на privacy
    if (!$(this).children('#form-apply_form_privacy').prop("checked")) {
        $(this).children('.form-apply_form_privacy_label').addClass('error')
        proceed = false;
    }
    
    //if everything's ok, continue with Ajax form submit
    if(proceed){ 
    	// add loader state to btn
    	$('.form-apply_form_btn').addClass('loader')
    	// block form input & btn to edit, while sending procces
    	// $('.form-file-input').attr('disabled',true)
		$('.form-apply_form_name, .form-apply_form_email, .form-apply_form_text').attr('readonly',1)
    	
        
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = new FormData(this); //Creates new FormData object
        // form_data.append('file', $('.form-file input[type=file]')[0].value );
        
        
        $.ajax({ //ajax form submit
            url : post_url,
            type: request_method,
            data : form_data,
            dataType : "json",
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function(){ // перед отправкой
                $('.form-apply_form_btn').prop('disabled', true);
            },
	        complete: function() { //fetch server "json" messages when done
	    	    	// remove loader state
				$('.form-apply_form_name, .form-apply_form_email, .form-apply_form_text').attr('readonly',false)
		        $('.form-apply_form_btn').removeClass('loader').addClass('success').text('SUCCESS')
		        $('.form-apply_form_name,.form-apply_form_email,.form-apply_form_text').val('')
				$('#form-apply_form_privacy').prop('checked', false);
				$('.form-apply_form_files_input').val('')
				$('.form-apply_form_files_attached').html('')
		    }
       });
    }
})