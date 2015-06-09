angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("about.html","<ion-view view-title=\"About\">\r\n  <ion-content class=\"paddingclass\">\r\n    <div class=\"aboutlogo\">\r\n      <center>\r\n        <img src=\"img/Chef.png\" height=\"90px\" />\r\n      </center>\r\n    </div>\r\n    <div style=\" margin-top: 30px;\">\r\n      <pre>\r\n				About ReciFlix\r\n\r\n						Welcome to the world\'s largest collection of vegetarian and non-vegetarian recipes! Here you\'ll find thousands of the best vegetarian and vegan recipes from features and popular departments in the magazine, each one prepared, tasted, and approved by editors in the VT test kitchen. Search for a specific ingredient above or browse below to spark your creativity in the kitchen and get your mouth watering. Want more free both vegetarian and non-vegetarian recipes in your in box every week? Sign up for our popular recipe newsletters and videos. You can also create your own My VT Recipe Box to save and organize your favorite recipes, print shopping lists, and more!\r\n			</pre>\r\n    </div>\r\n\r\n    <br>\r\n    <button class=\"button button-block  curvebutton button-color\">\r\n      Email Us\r\n    </button>\r\n    <button class=\"button button-block  curvebutton button-color\">\r\n      Share\r\n    </button>\r\n  </ion-content>\r\n</ion-view>");
$templateCache.put("allCategories.html","<ion-view cache-view=\"true\">\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">All Categories\r\n    </span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n    <ion-list>\r\n      <ion-item ng-repeat=\"item in categories\" class=\"item-remove-animate\">\r\n        <div ui-sref=\"app.categoriesVideos({categorieName:item.catId,catName:item.displayName})\">\r\n          <center>\r\n            <img ng-src=\"img/recipeImgs/{{item.imageName}}\" height=\"180px\" />\r\n          </center>\r\n          <center class=\"catgyName\">{{item.displayName}}</center>\r\n        </div>\r\n      </ion-item>\r\n    </ion-list>\r\n    <ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" distance=\"5%\" on-infinite=\"loadMore()\"></ion-infinite-scroll>\r\n  </ion-content>\r\n  <rf-footer-display></rf-footer-display>\r\n</ion-view>");
$templateCache.put("contentSlides.html","<ion-view ng-init=\"singleRecipe()\" cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">Recipe Info\r\n    </span>\r\n  </ion-nav-title>\r\n  <ion-content has-header=\"true\">\r\n    <div class=\"card\">\r\n      <div class=\"item item-divider\" style=\"text-align:center\">\r\n        RECIPE: {{recipe.title}}\r\n      </div>\r\n      <center>\r\n        <img ng-src=\"{{recipe.images.mq}}\" height=\"180px\" />\r\n      </center>\r\n      <div class=\"row\">\r\n        <div class=\"col\"><span my-like-icon favorite=recipe></span>\r\n          <br>{{recipe.ytlikes + recipe.applikes | numeral}}</div>\r\n        <div class=\"col\"><i class=\"ion ion-eye\" style=\"color:grey;font-size:30px\"></i>\r\n          <br>{{recipe.views | numeral}}</div>\r\n        <div class=\"col\">\r\n          <span my-favorite-icon favorite=recipe></span>\r\n        </div>\r\n        <div class=\"col\"><i class=\"ion ion-play\" style=\"color:#00CCA3;font-size:30px\" ui-sref=\"app.showRecipes({videoId:recipe.videoId})\"></i>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"card\">\r\n      <div class=\"item item-divider bar bar-calm\">\r\n        Recipe Description\r\n        <i ng-class=\"recipe._id === selectedIndex ? \'ion ion-chevron-up\' : \'ion ion-chevron-down\'\" style=\"color:Grey;font-size:30px;float:right\" ng-click=\"changeClass(recipe)\"></i>\r\n      </div>\r\n      <div class=\"item item-text-wrap\" ng-class=\"recipe._id === selectedIndex ? \'fullHeight\' : \'dftHeight\'\">\r\n        {{recipe.description}}\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n  <rf-footer-display></rf-footer-display>\r\n</ion-view>");
$templateCache.put("forgot-password.html","<ion-view class=\"forgot-password-view\" hide-nav-bar=\"true\">\n  <ion-content scroll=\"false\">\n    <div class=\"row\">\n      <div class=\"col col-center\">\n        <div class=\"card forgot-password-container\">\n          <form name=\"forgot_password_form\" class=\"\" novalidate>\n            <div class=\"item item-body\">\n              <label class=\"item item-input\">\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n              </label>\n            </div>\n            <div class=\"item item-body bottom-content\">\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"recoverPassword()\" ng-disabled=\"forgot_password_form.$invalid\">\n                Recover it\n              </button>\n            </div>\n          </form>\n        </div>\n        <div class=\"alternative-actions\">\n          <button class=\"log-in button button-small button-clear button-light\" ui-sref=\"login\">\n            Log In\n          </button>\n          <button class=\"sign-up button button-small button-clear button-light\" ui-sref=\"signup\">\n            Sign Up\n          </button>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>");
$templateCache.put("loading.html","<ion-spinner class=\"light\" icon=\"bubbles\"></ion-spinner>\n<br/>\n<span>Loading...</span>");
$templateCache.put("login.html","<ion-modal-view class=\"login-view\" hide-nav-bar=\"true\" cache-view=\"false\">\r\n  <ion-header-bar class=\"bar bar-assertive\">\r\n    <h1 class=\"title\">Login Screen</h1>\r\n    <button class=\"button button-icon ion-close\" style=\"float:right\" ng-click=\"closeModal(1)\"></button>\r\n  </ion-header-bar>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"row\">\r\n      <div class=\"col col-center\">\r\n        <div class=\"card login-container\" content-tabs tabsdata=\'tabsdata\'>\r\n          <form name=\"login_form\" class=\"\" novalidate ng-cloak autocomplete=\"off\" cache-view=\"false\">\r\n            <my-tabs>\r\n              <my-tab title=\"Email\">\r\n                <div class=\"list\">\r\n                  <label class=\"item item-input\">\r\n                    <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\r\n                  </label>\r\n                  <label class=\"item item-input\" show-hide-container>\r\n                    <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\r\n                  </label>\r\n                </div>\r\n              </my-tab>\r\n              <div class=\"item item-body bottom-content\">\r\n                <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"Login()\" ng-disabled=\"(login_form.user_email.$invalid || login_form.user_password.$invalid)\">\r\n                  Log In\r\n                </button>\r\n              </div>\r\n            </my-tabs>\r\n          </form>\r\n        </div>\r\n        <div class=\"alternative-actions\">\r\n          <button class=\"forgot-password button button-small button-clear button-light\" ui-sref=\"forgot-password\">\r\n            Forgot Password?\r\n          </button>\r\n          <button class=\"sign-up button button-small button-clear button-light\" ng-click=\"oModal2.show() && oModal1.hide()\">\r\n            Sign Up\r\n          </button>\r\n        </div>\r\n        <center><strong>{{errMsg}}</strong>\r\n        </center>\r\n\r\n        <button class=\"login button button-block button-stable\" ng-click=\"fbLogin()\">\r\n          Connect with FB\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-modal-view>");
$templateCache.put("myFavorites.html","<ion-view cache-view=\"true\" ng-init=\"favoriteFunc()\">\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">Favourite Recipes</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n    <div class=\"card\" ng-show=\"authentication && recipes.length == 0\">\r\n      <div class=\"item item-text-wrap\">\r\n        Howdy.... You dont seem to have any Favourite Recipes, tap on <i class=\"icon ion-ios-heart-outline\" style=\"font-size:30px;padding:5px 5px\"></i> of a recipe to add it to Favourites <i class=\"icon ion-ios-heart animated\" style=\"font-size:30px;padding:5px 5px\"></i>\r\n      </div>\r\n    </div>\r\n    <div ng-repeat=\"item in recipes\" ng-show=\"authentication\">\r\n      <rf-recipe-display></rf-recipe-display>\r\n    </div>\r\n    <div ng-hide=\"authentication\" class=\"card\">\r\n      <div class=\"item item-text-wrap\">\r\n        User is not logged in, Please login or create account to use Favourites, Preferences and several other account specific features.\r\n        <br/>\r\n        <br/>\r\n        <div ui-sref=\"walkthrough\" align=\"middle\">\r\n          <i class=\"icon ion-log-in\"></i>\r\n          <span class=\"menu-text\" style=\"color:green\">Login or Create Account</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" distance=\"1%\" on-infinite=\"loadMore()\" ng-show=\"authentication\"></ion-infinite-scroll>\r\n  </ion-content>\r\n  <rf-footer-display></rf-footer-display>\r\n</ion-view>");
$templateCache.put("newPage.html","<ion-view cache-view=\"true\">\n  <ion-nav-title>\n    <span style=\"color:white\">{{currentStateName}}</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"card\">\n      <div class=\"item item-text-wrap\">\n        <strong>{{currentStateName}} </strong>is currently on developing state. Our Developers will launch very soon. Until Stay in touch.\n        <br/>\n        <br/>\n      </div>\n    </div>\n  </ion-content>\n  <rf-footer-display></rf-footer-display>\n</ion-view>");
$templateCache.put("recipesUnderCategory.html","<ion-view cache-view=\"true\">\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">{{CatName}}\r\n    </span>\r\n  </ion-nav-title>\r\n  <ion-content has-header=\"true\" ng-init=\"initialQueryRecipes()\">\r\n    <div ng-repeat=\"item in recipes\">\r\n      <rf-recipe-display></rf-recipe-display>\r\n    </div>\r\n    <ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" on-infinite=\"loadMore()\" distance=\"5%\"></ion-infinite-scroll>\r\n  </ion-content>\r\n  <rf-footer-display></rf-footer-display>\r\n</ion-view>");
$templateCache.put("search.html","<ion-view>\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">Search Recipes\r\n    </span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n    <div class=\"row\" style=\"margin-top:20px\">\r\n      <div class=\"col col-90\">\r\n        <input type=\"text\" placeholder=\"Search Ur Recipes Here\" ng-model=\"search\">\r\n      </div>\r\n      <div class=\"col\"><i class=\"icon ion-search\" style=\"font-size:30px;padding-left:5px\" ui-sref=\"app.searchedRecipes({searchQuery:search})\"></i>\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n  <rf-footer-display></rf-footer-display>\r\n</ion-view>");
$templateCache.put("searchedRecipes.html","<ion-view cache-view=\"false\">\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">Searched Recipes\r\n    </span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n    <div ng-repeat=\"items in recipes\">\r\n      <div ng-repeat=\"item in items\">\r\n        <rf-recipe-display></rf-recipe-display>\r\n      </div>\r\n    </div>\r\n    <ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" distance=\"5%\" on-infinite=\"searchQueryLoadMore()\"></ion-infinite-scroll>\r\n  </ion-content>\r\n  <rf-footer-display></rf-footer-display>\r\n</ion-view>");
$templateCache.put("showRecipes.html","<ion-view>\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">Recipe Video </span>\r\n  </ion-nav-title>\r\n  <ion-nav-buttons side=\"secondary\">\r\n  </ion-nav-buttons>\r\n  <ion-content>\r\n    <ion-list>\r\n      <ion-item item=\"item\">\r\n        <div my-youtube code=videoId></div>\r\n        <div class=\"item tabs tabs-secondary tabs-icon-left\">\r\n          <a class=\"tab-item\" ng-click=\"sendMail()\">\r\n            <i class=\"icon ion-email\"></i> Email\r\n          </a>\r\n          <a class=\"tab-item\" ng-click=\"sharePost()\">\r\n            <i class=\"icon ion-share\"></i> Share\r\n          </a>\r\n        </div>\r\n      </ion-item>\r\n    </ion-list>\r\n  </ion-content>\r\n</ion-view>");
$templateCache.put("side-menu.html","<ion-side-menus cache-view=\"false\">\r\n  <ion-side-menu-content class=\"post-size-14px\">\r\n    <ion-nav-bar class=\"bar bar-assertive\">\r\n      <ion-nav-back-button>\r\n      </ion-nav-back-button>\r\n      <ion-nav-buttons side=\"left\">\r\n        <button class=\"button button-icon button-clear ion-android-contact\" menu-toggle=\"left\">\r\n        </button>\r\n      </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\r\n  </ion-side-menu-content>\r\n\r\n  <ion-side-menu side=\"left\" class=\"main-menu\" expose-aside-when=\"large\">\r\n    <ion-content>\r\n      <ion-list ng-show=\"authentication\">\r\n        <ion-item class=\"heading-item item item-avatar\" nav-clear menu-close ui-sref=\"app.profile\">\r\n          <img ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\">\r\n          <h2 class=\"greeting\">Hi {{authentication.firstName}}</h2>\r\n          <p class=\"message\">Welcome back</p>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myFav\">\r\n          <i class=\"icon ion-heart\"></i>\r\n          <h2 class=\"menu-text\">My Favourites</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.featuredRecipes({name:\'Featured Recipes\'})\">\r\n          <i class=\"icon ion-fork\"></i>\r\n          <h2 class=\"menu-text\">Featured Recipes</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.groceryList({name:\'Grocery List\'})\">\r\n          <i class=\"icon ion-document-text\"></i>\r\n          <h2 class=\"menu-text\">Grocery List</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myCalendarPlan({name:\'My Meal Plan\'})\">\r\n          <i class=\"icon ion-calendar\"></i>\r\n          <h2 class=\"menu-text\">My Meal Plan</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.settings({name:\'Preferences\'})\">\r\n          <i class=\"icon ion-gear-a\"></i>\r\n          <h2 class=\"menu-text\">Preferences</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close>\r\n          <div ng-show=\"authentication\" ng-click=\"signout()\"><i class=\"icon ion-log-out\"></i>\r\n            <h2 class=\"menu-text\" style=\"color:grey\">SignOut</h2>\r\n          </div>\r\n        </ion-item>\r\n\r\n      </ion-list>\r\n      <ion-list ng-hide=\"authentication\">\r\n        <ion-item nav-clear menu-close class=\"item\" style=\"background-color:#606060\">\r\n          <div align=\"middle\"><img ng-src=\"../img/Chef.png\" width=\"40%\" /> </div>\r\n        </ion-item>\r\n\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myCalendarPlan\">\r\n          <h2 class=\"menu-text\">About ReciFlix</h2>\r\n        </ion-item>\r\n\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myCalendarPlan\">\r\n          <h2 class=\"menu-text\">Rate this App</h2>\r\n        </ion-item>\r\n\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myCalendarPlan\">\r\n          <h2 class=\"menu-text\">Why Signup or Login ?</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-left\" nav-clear menu-close>\r\n          <div ui-sref=\"walkthrough\">\r\n            <i class=\"icon ion-log-in\"></i>\r\n            <h2 class=\"menu-text\" style=\"color:green\">Login or Create Account</h2>\r\n          </div>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ion-content>\r\n  </ion-side-menu>\r\n</ion-side-menus>");
$templateCache.put("signup.html","<ion-modal-view class=\"signup-view\" hide-nav-bar=\"true\" cache-view=\"false\">\r\n  <ion-header-bar class=\"bar bar-assertive\">\r\n    <h1 class=\"title\">Create Account</h1>\r\n    <button class=\"button button-icon ion-close\" style=\"float:right\" ng-click=\"closeModal(2)\"></button>\r\n  </ion-header-bar>\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"row\">\r\n      <div class=\"col col-center\">\r\n        <div class=\"card sign-up-container\">\r\n          <form name=\"signup_form\" class=\"\" novalidate>\r\n            <div class=\"item item-body\">\r\n              <label class=\"item item-input\">\r\n                <input type=\"text\" placeholder=\"First Name\" name=\"user_fname\" ng-model=\"user.firstName\" required>\r\n              </label>\r\n              <label class=\"item item-input\">\r\n                <input type=\"text\" placeholder=\"Last Name\" name=\"user_lname\" ng-model=\"user.lastName\" required>\r\n              </label>\r\n              <label class=\"item item-input\">\r\n                <input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\r\n              </label>\r\n              <label class=\"item item-input\" show-hide-container>\r\n                <input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\r\n              </label>\r\n            </div>\r\n            <div class=\"item item-body bottom-content\">\r\n              <button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doSignUp()\" ng-disabled=\"signup_form.$invalid\">\r\n                Sign Up\r\n              </button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"alternative-actions\">\r\n          <button class=\"log-in button button-small button-clear button-light\" ng-click=\"oModal1.show() && oModal2.hide()\">\r\n            Log In\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-modal-view>");
$templateCache.put("userNotLoggedIn.html","<ion-view cache-view=\"true\">\n  <ion-nav-title>\n    <span style=\"color:white\">User Not LoggedIn</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"card\">\n      <div class=\"item item-text-wrap\">\n        User is not logged in, Please login or create account to use Favourites, Likes, Preferences and several other account specific features.\n        <br/>\n        <br/>\n        <div ui-sref=\"walkthrough\" align=\"middle\">\n          <i class=\"icon ion-log-in\"></i>\n          <span class=\"menu-text\" style=\"color:green\">Login or Create Account</span>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n  <rf-footer-display></rf-footer-display>\n</ion-view>");
$templateCache.put("walkthrough.html","<ion-view class=\"walkthrough-view\" hide-nav-bar=\"true\" cache-view=\"false\">\r\n  <ion-content scroll=\"false\">\r\n    <div class=\"top-content row\">\r\n      <div class=\"col col-center\">\r\n        <img ng-src=\"img/WalkthroughCtrl.png\">\r\n      </div>\r\n    </div>\r\n    <div class=\"bottom-content row\">\r\n      <div class=\"col col-center\">\r\n        <button class=\"login button button-block button-stable\" ng-click=\"login()\">\r\n          Log In\r\n        </button>\r\n        <button class=\"sign-up button button-block button-stable\" ng-click=\"signup()\">\r\n          Sign Up\r\n        </button>\r\n        <button class=\"login button button-stable\" style=\"float:right\" ng-click=\"skip()\">\r\n          Skip For Now\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </ion-content>\r\n</ion-view>");
$templateCache.put("directive_partials/rf-footer-display.html","<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n  <div class=\"row\">\r\n    <div class=\"col col-20 col-center\" ui-sref=\"app.allCategories\" nav-direction=\"back\">\r\n      <i class=\"icon icon-chef_cap\" style=\"color:white;font-size:30px;padding-left:10px\"></i>\r\n    </div>\r\n    <div class=\"col col-20 col-offset-20 col-center\" ui-sref=\"app.search\">\r\n      <i class=\"icon ion-search\" style=\"color:white;font-size:30px;padding-left:10px\"></i>\r\n    </div>\r\n    <div class=\"col col-30 col-offset-20 col-center\" ui-sref=\"app.myFav\">\r\n      <i class=\"icon icon-brifecase_filled_heart\" style=\"color:white;font-size:30px;padding-left:20px\"></i>\r\n    </div>\r\n  </div>\r\n</ion-footer-bar>");
$templateCache.put("directive_partials/rf-recipe-display.html","<div class=\"card\">\r\n  <div class=\"item item-divider item-text-wrap rf-title\">\r\n    {{item.title}}\r\n    <i ng-class=\"item._id === selectedIndex ? \'ion ion-chevron-up\' : \'ion ion-chevron-down\'\" style=\"color:Grey;font-size:30px;float:right\" ng-click=\"changeClass(item)\"></i>\r\n  </div>\r\n  <div class=\"item item-body item-text-wrap rf-recipe-display\" style=\"overflow: visible;\">\r\n    <div class=\"row\">\r\n      <div class=\"col-30\">\r\n        <img ng-src=\"{{item.images.dft}}\" alt=\"Making Image\" class=\"rf-image\">\r\n        <div class=\"rf-play-icon\" ui-sref=\"app.showRecipes({videoId:item.videoId})\"></div>\r\n      </div>\r\n      <div class=\"col col-70\" style=\"padding-left:2px;\">\r\n        <div class=\"row\" style=\"padding-bottom:10px\">\r\n          <i class=\"ion ion-ios-person-outline ion-info\"><span class=\"small-info\">&nbsp;&nbsp;{{item.author}}</span></i>\r\n        </div>\r\n        <div class=\"row\" style=\"padding-bottom:5px\">\r\n          <i class=\"ion ion-eye ion-info\">&nbsp;</i><span class=\"small-info\">{{item.views | numeral}}</span>&nbsp;&nbsp;&nbsp;\r\n          <i class=\"ion ion-ios-clock-outline ion-info\">&nbsp;</i><span class=\"small-info\">{{item.duration | durationFltr}}</span>\r\n        </div>\r\n        <div class=\"row\" style=\"padding-left:0px\">\r\n          <div class=\"col col-33\">\r\n            <span my-like-icon favorite=item></span>\r\n            <br>{{item.ytlikes + item.applikes | numeral}}\r\n          </div>\r\n          <div class=\"col col-33\">\r\n            <span my-favorite-icon favorite=item></span>\r\n          </div>\r\n          <div class=\"col col-33\" style=\"padding-top: 5px;font-size:20px;text-decoration:none;border: 1px solid grey;\">\r\n            <a style=\"text-decoration:none;\" ui-sref=\"app.slides({recipeId:item._id})\" href=\"#/app/slides/553b6343939820f40da7237e\">Learn More</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row rf-description\">\r\n      <div ng-class=\"item._id === selectedIndex ? \'fullHeight\' : \'dftHeight\'\">\r\n        {{item.description}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>");
$templateCache.put("partials/my-tab.html","<div class=\"tab-content\" ng-show=\"selected\" ng-transclude></div>");
$templateCache.put("partials/my-tabs.html","<div class=\"item item-divider card-heding\">\n  <div class=\"tabs-striped tabs-background-dark tabs-color-stable\">\n    <div class=\"tabs\">\n      <a ng-repeat=\"tab in tabs\" ng-click=\"select(tab)\" ng-class=\"{ active: tab.selected }\" class=\"tab-item\">{{tab.title}}</a>\n    </div>\n  </div>\n</div>\n<div class=\"item item-body\">\n  <div class=\"tabs-content\" ng-transclude></div>\n</div>");
$templateCache.put("partials/show-hide-password.html","<div class=\"show-hide-input\" ng-transclude>\n</div>\n<a class=\"toggle-view-anchor\" on-touch=\"toggleType($event)\">\n  <span ng-show=\"show\">HIDE</span>\n  <span ng-show=\"!show\">SHOW</span>\n</a>");}]);
