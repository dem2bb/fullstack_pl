$(document).ready(function () {
    $('input[type="tel"]').mask('+48999999999');

    var utm_source   = getUrlParameter('utm_source'),
        utm_medium   = getUrlParameter('utm_medium'),
        utm_term     = getUrlParameter('utm_term'),
        utm_campaign = getUrlParameter('utm_campaign'),
        utm_content  = getUrlParameter('utm_content'),
        utmcsr       = getUrlParameter('utmcsr'),
        utmccn       = getUrlParameter('utmccn');

    $('input[name="utm_source"]').val(utm_source);
    $('input[name="utm_medium"]').val(utm_medium);
    $('input[name="utm_term"]').val(utm_term);
    $('input[name="utm_campaign"]').val(utm_campaign);
    $('input[name="utm_content"]').val(utm_content);
    $('input[name="utmcsr"]').val(utmcsr);
    $('input[name="utmccn"]').val(utmccn);

    // script to get utm
    function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      }
    }


    $('form').on('submit', function (e) {
        // e.preventDefault();
        const $this = $(this);
        const modalParents = $this.parents('.modalDialog');
        // modalParents.removeClass('show');
        // $('body').removeClass('no-scroll');
        $.growl.notice({ message: "Dziękujemy za kontakt, nasz konsultant skontaktuje się wkrótce" });

        if ($(this).find('input[name="email"]').val()) {
            $('.submit').prop('disabled', true);
            const $form = $(this);
            console.log(dataLayer)

            $.ajax({
                type: 'POST',
                url: 'crm/registration.php',
                dataType: 'json',
                data: $form.serialize(),
                success: function (response) {
                    if (response.status == 'success') {

                        dataLayer.push({ event: 'fullstackonline' });
                        window.location.href = "https://goit.global/pl/fullstackonline/";
                    } else {
                        showStackTopCenter('error');
                    }
                }
            });
        }

        // $this[0].reset();
    });

    // $('.scroll').click(function (e) {
    //     e.preventDefault();
    //     var id = $(this).attr('href'),
    //         top = $(id).offset().top - 80;

    //     $('body,html').animate({
    //         scrollTop: top
    //     }, 1500);
    // });

    // $('.program-titles-tablet').click(function () {
    //     $('.program-titles-tablet .block-html-title-tablet').removeClass('active');
    //     $(this).find('.block-html-title-tablet').addClass('active');
    //     $('.program-titles_title-before').addClass('program-titles_title-none');
    //     $('#' + $(this).data('tab')).removeClass('program-titles_title-none');
    // })
});
