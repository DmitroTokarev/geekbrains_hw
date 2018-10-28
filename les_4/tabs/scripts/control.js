$(document).ready(function(){
    //   $('.page-btn').click(function(event) {
    //     $(this).addClass('active-btn').siblings().removeClass('active-btn')
    //     $('.page').animate({ opacity: 'show' }, "slow").siblings().hide;
    // });  
    // мой вариант, который я так и не смог довести до ума



    $('body').each(function() {
        $(this).find('a').each(function(i) {
          $(this).click(function(){
            $(this).addClass('active-btn').siblings().removeClass('active-btn')
                $('body').find('div.page').slideUp().delay(400).eq(i).slideDown()
          });
        });
      });

      //Тут чать решения представленного в дз + небольшой апргрейд)
});


