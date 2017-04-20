var subjectEl = document.getElementById('subject'),
    emailEl = document.getElementById('email'),
    contentEl = document.getElementById('content'),
    hintEl = document.querySelector('.contact-form--hint'),
    sendBtn = document.querySelector('.contact-form--send'),
    sendStatus = document.querySelector('.contact-form--send-status');

contentEl.addEventListener('input', function() {
    var length = this.value.length;

    hintEl.innerHTML = 'Co najmniej 100 znaków. Użyto ' + length + ' znaków.';
});

sendBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if ('reportValidity' in this.form && !this.form.reportValidity())
        return;

    var i = 0;
    var interval = setInterval(function () {
        sendStatus.innerHTML = 'Wysyłanie' + '.'.repeat(i % 4);
        i++;
    }, 500);
    
    var xhr = new XMLHttpRequest();
    xhr.open(this.form.method, this.form.action, true);
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == xhr.DONE) {
            clearTimeout(interval);
            
            if (xhr.status >= 400) {
                var response = JSON.parse(xhr.responseText);
                if (response.error)
                    sendStatus.innerHTML = response.error;
                else
                    sendStatus.innerHTML = 'Wystąpił błąd!'

                ga('send', 'event', 'Contact form', 'error');
            } else {
                sendStatus.innerHTML = 'Wysłano!';
                sendBtn.disabled = true;

                ga('send', 'event', 'Contact form', 'sent');
            }
        }
    };

    xhr.send(new FormData(this.form));
});