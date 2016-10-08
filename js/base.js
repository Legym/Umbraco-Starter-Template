/* global $ */
/**
 *    ▄████████ ▀████    ▐████▀  ▄██████▄  ███▄▄▄▄           ▄████████  ▄██████▄  ███    █▄      ███        ▄████████    ▄████████ 
 *   ███    ███   ███▌   ████▀  ███    ███ ███▀▀▀██▄        ███    ███ ███    ███ ███    ███ ▀█████████▄   ███    ███   ███    ███ 
 *   ███    ███    ███  ▐███    ███    ███ ███   ███        ███    ███ ███    ███ ███    ███    ▀███▀▀██   ███    █▀    ███    ███ 
 *   ███    ███    ▀███▄███▀    ███    ███ ███   ███       ▄███▄▄▄▄██▀ ███    ███ ███    ███     ███   ▀  ▄███▄▄▄      ▄███▄▄▄▄██▀ 
 * ▀███████████    ████▀██▄     ███    ███ ███   ███      ▀▀███▀▀▀▀▀   ███    ███ ███    ███     ███     ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
 *   ███    ███   ▐███  ▀███    ███    ███ ███   ███      ▀███████████ ███    ███ ███    ███     ███       ███    █▄  ▀███████████ 
 *   ███    ███  ▄███     ███▄  ███    ███ ███   ███        ███    ███ ███    ███ ███    ███     ███       ███    ███   ███    ███ 
 *   ███    █▀  ████       ███▄  ▀██████▀   ▀█   █▀         ███    ███  ▀██████▀  ████████▀     ▄████▀     ██████████   ███    ███ 
 *                                                          ███    ███                                                  ███    ███                                                                             
 * -------------------------------------------------------------------------------------------------------------------------------
 *   "An Axon is the long threadlike part of a nerve cell along which impulses are conducted from the cell body to other cells.""
 *
 * @author 
 * 		Cameron Van Orman
 * 		<cameron@efelle.com>
 * 		Slack @cameronv
 *
 * @reference
 * 		Code Standards: http://daux.efellemedia.com/SOP/master/code-standards/javascript
 *
 * @usage
 * 		Store javascript functions under the FEATURES namespace to give your functions global scope.
 * 		Pass your functions to the Site Router under the relevant page name. Page names are defined by body classes.
 *
 * 		NOTE: You must have a body class on the template you're targeting in order for your page specific scripts to run.
 * 		i.e <body class='home'> if you're on the frontpage template.
 * 
 * 		NOTE: In order for your javascript to run on a specific page you need to declare the function in the FEATURES global namespace,
 * 		then call the function in the page setup where you've setup your page specific body class.
 *
 *
 * FEATURES SETUP
 * -------------
 *
 *	NOTE: Your FEATURES variable is global scope.
 * 	Javascript Global Scope: http://stackoverflow.com/a/500459 
 * 	ie. FEATURES.yourFunctionName();
 * 
 * 	NOTE: Our global variable "FEATURES" is all caps. 
 * 	ALL global scoped variables should be written in all caps
 *	to signify hierarchy in the application,
 *
 * 	Write your page specific functions here, then call the function for 
 * 	the pages you need it on below.
 *
 * @usage
 * 		var FEATURES = {
 *   		yourFunctionName: function() {
 *    		 -- Write/paste your script here --
 *  		},
 * 		};
 */

var FEATURES = {

    currentPage: function () {
        var $linkURL = $("#desktop-menu ul li > a");

        $linkURL.filter(function () {
            return this.href == location.href.replace(/#.*/, "");
        }).addClass("menu-active");

        $('#desktop-menu ul li > a[href^="/' + location.pathname.split("/")[4] + '"]').addClass('menu-active');
    },

    blogSocialMedia: function () {
        $("#share").jsSocials({
            showLabel: false,
            showCount: false,
            shares: ["twitter", "facebook", "googleplus",]
        });

        $("#share-mobile").jsSocials({
            showLabel: false,
            showCount: false,
            shares: ["twitter", "facebook", "googleplus", ]
        });
    },

    blogOvSticky: function () {

        $(document).scroll(function () {
            var y = $(document).scrollTop(),
                header = $("#blog-sticky");
            if (y >= 500) {
                header.css({ position: "fixed", "top": "11%", "width": "100%" });
            } else {
                header.css("position", "relative");
            }
        });

    },

    blogOvSidebar: function () {
        $('.responsive-accordion').each(function () {
            // Set Expand/Collapse Icons
            $('.responsive-accordion-minus', this).hide();

            // Hide panels
            $('.responsive-accordion-panel', this).hide();

            // Bind the click event handler
            $('.responsive-accordion-head', this).click(function (e) {
                // Get elements
                var thisAccordion = $(this).parent().parent(),
                    thisHead = $(this),
                    thisPlus = thisHead.find('.responsive-accordion-plus'),
                    thisMinus = thisHead.find('.responsive-accordion-minus'),
                    thisPanel = thisHead.siblings('.responsive-accordion-panel');

                // Reset all plus/mins symbols on all headers
                thisAccordion.find('.responsive-accordion-plus').show();
                thisAccordion.find('.responsive-accordion-minus').hide();

                // Reset all head/panels active statuses except for current
                // thisAccordion.find('.responsive-accordion-head').not(this).removeClass('active');
                // thisAccordion.find('.responsive-accordion-panel').not(this).removeClass('active').slideUp();

                // Toggle current head/panel active statuses
                if (thisHead.hasClass('active')) {
                    thisHead.removeClass('active');
                    thisPlus.show();
                    thisMinus.hide();
                    thisPanel.removeClass('active').slideUp();
                } else {
                    thisHead.addClass('active');
                    thisPlus.hide();
                    thisMinus.show();
                    thisPanel.addClass('active').slideDown();
                }
            });

            $('.accordion-default', this).click();
        });
    },

    toTop: function() {
      // browser window scroll (in pixels) after which the "back to top" link is shown
      var offset = 300,
      //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      // offset_opacity = 1200,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 700,
      //grab the "back to top" link
      $back_to_top = $('#to-top');
    
      //hide or show the "back to top" link
      $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.fadeIn().addClass('in') : $back_to_top.fadeOut().removeClass('in');
      });
    
      //smooth scroll to top
      $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
          scrollTop: 0 ,
          }, scroll_top_duration
        );
      });
    },

    runFoundation: function () {
        $(document).foundation();
    },

    mmenu: function () {

        $("#menu-mobile").mmenu({
            searchfield: {
                add: true,
                search: false
            },

            "offCanvas": {
                "position": "right"
            },
            "extensions": [
                "pageshadow"
            ],
        });

        $(".mm-search input").keyup(function (e) {
            if (e.keyCode == 13) {
                window.location.href = '/search-results?Keywords=' + $(this).val();
            }
        });

    },

    search: function () {

        /* 
			Please set anchor tag of search button to <a href="#/"></a>
			to prevent page from jumping.
		*/

        /* Hides searchbar if clicking anywhere else on page other than input */
        $(document).click(function () {
            $('.search-input').removeClass("search-show");

            /* Removes click event listner and adds new event handler: showSearch()*/
            $('.search-icon').unbind('click').bind('click', showSearch);
        });


        /* Always shows searchbar when clicking on search icon */
        $('.search-icon').bind('click', showSearch);


        /* 
			When searchbar is displayed and user clicks inside, prevent searchbar from entering Bubbling phase and hiding searchbar
		*/
        $('.search-input').click(function (ev) {
            ev.stopPropagation();
        });

        /* Shows searchbar */
        function showSearch(ev) {

            /* 
				Shows searchbar with CSS3 and binds executeSearch to searchbar 
			*/
            $('.search-input').addClass("search-show");
            $('.search-icon').bind('click', executeSearch);
            ev.stopPropagation();
        }

        /* Executes Search. */
        function executeSearch() {
            var searchvalue = $('.search-input').val();

            /* 
				If user presses the search button with text in input, perform search.
				If user presses the search button with no text, hide searchbar

			*/
            if ($.trim(searchvalue) !== '') {
                location.href = '/search/' + searchvalue;
            } else {
                $('.search-input').toggleClass("search-show");
            }
        }
    },

    fancybox: function () {
        $(".fancybox").fancybox();
    },

    matchHeight: function () {
        $('.height').matchHeight();
    }
};