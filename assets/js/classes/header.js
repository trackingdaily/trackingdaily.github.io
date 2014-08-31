var headerBehaviour = function() {
  // Smooth scroll
  $(".js_scrollto").on('click', function(e) {
    e.preventDefault();
    var position = $($(this).attr('href')).offset().top;
    $('html, body').animate({scrollTop: position-20}, 400, 'swing');
  });

  $(window).on('resize',resizeThrottler);

  var resizeTimeout;
  function resizeThrottler() {
      window.clearTimeout(resizeTimeout);
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      resizeTimeout = setTimeout(function() {
          actualResizeHandler();
          // The actualResizeHandler will execute at a rate of    3,5fps
      }, 244);
  }
  function actualResizeHandler() {
    // handle the resize event
    $(window).trigger({
        type: "Mangrove:resized",
        wHeight: $(window).height(),
        wWidth: $(window).width()
    });
  }
  $(window).on('Mangrove:resized',function(e) {
      $(".js_height").height(e.wHeight); //.width(e.wWidth);
  });
  $(window).trigger('resize');
};


var blurEffect = function() {
  
  /*
  http://bassta.bg/2013/12/medium-com-like-blurred-header-effect/
  */
  
  $window = $(window);
  $body  = $("body");              
  $bgBlur = $(".bg-blur");
                
  var bgBlurHeight = $bgBlur.height();
  var scrollFlag = false;
  var scrollThreshold  = 0.25; //used to debounce pointer events 
  var blurWhenReach = 8; //blur factor, 3 means the image will be blurred when you scroll 1/3 of the div
                
  $window.on("scroll", function(event){
                 
    var scrollTop = $window.scrollTop(); 
                 
    if(!scrollFlag){
      scrollFlag = true;
      $body.addClass("disable-pointer-events");
    }
                 
    debouncePointerEvents();
                 
    if(scrollTop < bgBlurHeight){
      var _alpha = (scrollTop / bgBlurHeight) * blurWhenReach;
      if(_alpha > 1){ _alpha = 1 }
      TweenMax.set($bgBlur, {alpha: _alpha });
    }
                 
   });
  
   // Speed up things by disabling pointer events. I use TweenMax delayedCall instead JS native setInterval just for the sake of showing how to use this method. See more at http://www.thecssninja.com/javascript/pointer-events-60fps
        
  function debouncePointerEvents(){
    TweenMax.killDelayedCallsTo(addPointerEvents);
    TweenMax.delayedCall(scrollThreshold, addPointerEvents);
  }
        
  function addPointerEvents(){
    scrollFlag = false;
    $body.removeClass("disable-pointer-events");
  }
        
};