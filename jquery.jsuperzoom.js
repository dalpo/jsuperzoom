(function($){

    $.jSuperzoom = {

        //default settings
        defaults: {

            transiction: {
                open: 500,
                close: 300
            },

            beforeOpen: function() {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {},

            contentCssClass: 'superZoomContent',
            closeBtnSelector: '.superZoomCloseBtn',

            superzoomContainerCss: {
                beforeOpen: {},
                afterClose: {}
            },

            animate: {

                onOpen: {

                    width: "100%",
                    height: "100%",
                    left: '0%',
                    top: '0%',
                    opacity: 1,
                    display: 'block'

                },

                onClose: {

                    width: 0,
                    height: 0,
                    left: "50%",
                    top: "50%",
                    opacity: 0
                //                    display: 'none'

                }
                
            }
        },

        defaultsIE: {
            
            transiction: {
                open: 500,
                close: 300
            },

            beforeOpen: function() {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {},

            contentCssClass: 'superZoomContent',
            closeBtnSelector: '.superZoomCloseBtn',

            superzoomContainerCss: {

                beforeOpen: {
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    opacity: 0,
                    display: 'block'
                },

                afterClose: {
                    display: 'none'
                }
            },
            
            animate: {

                onOpen: {
                    opacity: 1
                },

                onClose: {
                    opacity: 0
                }

            }
        }

    };

    $.fn.extend({
        jSuperzoom: function(options) {

            var config = $.extend({}, ($.browser.msie ? $.jSuperzoom.defaultsIE : $.jSuperzoom.defaults), options);
            var szLayerSel = "#superZoomOverlayer";
            var bodyCss = {
                width: 'auto',
                height: 'auto',
                overflow: 'auto'
            };


            function open(selector) {

                var content = selector;

                if(!$(szLayerSel).hasClass('superZoomed')) {

                    $(szLayerSel).css(config.superzoomContainerCss.beforeOpen);
                    
                    bodyCss = {
                        overflow: $('body').css('overflow')
                    }


                    $("body").addClass("SuperZoomOverflowHidden");
                    //                    $(window).resize(function() {
                    //                        $("body.SuperZoomOverflowHidden").css({
                    //                            overflow: 'hidden',
                    //                            height: $(document).height()
                    //                            width: $('body').outerWidth()
                    //                        });
                    //                    });
                    //                    $(window).resize();

                    $('html').css({
                        overflow: 'hidden'
                    });
                    

                    $(szLayerSel).css({
                        opacity: 0,
                        display: 'block'
                    });

                    $(szLayerSel).html( $(content).html() );

                    config.beforeOpen();

                    $(config.closeBtnSelector).live('click', function() {
                        close();                        
                    });

                    config.animate.onOpen.height = $('body').outerHeight();
                    config.animate.onOpen.width = $('body').outerWidth();

                    $(szLayerSel).animate(
                        config.animate.onOpen,
                        config.transiction.open, 'linear',
                        function() {
                            $(this).css(config.animate.onOpen);
                            config.afterOpen();
                        }).addClass('superZoomed');

                }

                $(window).resize(function() {

                    if($(szLayerSel).hasClass('superZoomed')) {
                        $(szLayerSel).css({
                            width: $('body').outerWidth(),
                            height: $('body').outerHeight()
                        });
                    }
                    
                });
                $(window).resize();
                    
            }

            function close(callback) {

                config.beforeClose();

                $(szLayerSel).animate(
                    config.animate.onClose,
                    config.transiction.close,
                    'linear', function() {
                        
                        if (callback) {
                            callback();
                        }

                        $(szLayerSel).css({
                            opacity: 0,
                            display: 'none'
                        });

                        $(szLayerSel).css(config.superzoomContainerCss.afterClose);

                        $("body").removeClass("SuperZoomOverflowHidden");


                        $(config.closeBtnSelector).die('click');

                        config.afterClose();
                        
                    }).removeClass('superZoomed');

                $('html').css({
                    overflow: 'auto'
                });
                    
            }

            //todo..
            //            var methods = {
            //                open: function(selector) {
            //                    open(selector);
            //                },
            //                close: function() {
            //                    close();
            //                }
            //            }
                
            

            return $(this).each(function(){

                var contentSel = $(this).attr('href');

                //here we go!
                if(!$(szLayerSel).size()) {
                    $('body').append("<div id='superZoomOverlayer'></div>");
                }

                $(szLayerSel).css(config.animate.onClose).css({
                    opacity: 0,
                    background: '#ffffff',
                    display: 'none',
                    position: 'absolute',
                    'z-index': 10000,
                    overflow: 'hidden'
                });

                $(this).click(function() {
                    open($(this).attr('href'));
                    return false;
                });

            //todo...
            // Method calling logic
            //                if ( methods[method] ) {
            //                    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            //                } else if ( typeof method === 'object' || ! method ) {
            //                    return methods.init.apply( this, arguments );
            //                } else {
            //                    $.error( 'Method ' +  method + ' does not exist' );
            //                }

            });

        }

    });

})(jQuery);