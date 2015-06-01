angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("about.html","<ion-view view-title=\"About\">\r\n	<ion-content class=\"paddingclass\">\n		<div class=\"aboutlogo\">\n			<center>\n				<img src=\"img/Chef.png\" height=\"90px\" />\n			</center>\n		</div>\n		<div style=\" margin-top: 30px;\">\n			<pre>\n				About ReciFlix\n\n						Welcome to the world\'s largest collection of vegetarian and non-vegetarian recipes! Here you\'ll find thousands of the best vegetarian and vegan recipes from features and popular departments in the magazine, each one prepared, tasted, and approved by editors in the VT test kitchen. Search for a specific ingredient above or browse below to spark your creativity in the kitchen and get your mouth watering. Want more free both vegetarian and non-vegetarian recipes in your in box every week? Sign up for our popular recipe newsletters and videos. You can also create your own My VT Recipe Box to save and organize your favorite recipes, print shopping lists, and more!\n			</pre>\n		</div>\n\r\n		<br>\n		<button class=\"button button-block  curvebutton button-color\">\n			Email Us\n		</button>\n		<button class=\"button button-block  curvebutton button-color\">\n			Share\n		</button>\n	</ion-content>\n</ion-view>\n");
$templateCache.put("allCategories.html","<ion-view cache-view=\"true\">\r\n	<ion-nav-title>\r\n		<!--<div class=\"bar bar-header item-input-inset\">\r\n			<label class=\"item-input-wrapper\">\r\n				<input type=\"search\" placeholder=\"Search\" ng-model=\"search\">\r\n			</label>\r\n			<i class=\"icon  ion-search\" style=\"color:white;font-size:30px;padding-left:3px\" ui-sref=\"app.searchedRecipes({searchQuery:search})\"></i>\r\n		</div>-->\r\n\r\n		<span style=\"color:white\">All Categories\r\n    </span>\r\n\r\n	</ion-nav-title>\r\n\r\n	<ion-content>\r\n		<ion-list>\r\n			<ion-item ng-repeat=\"item in categories\" class=\"item-remove-animate\">\r\n				<!--<span ui-sref=\"singleRecipe({recipeId:item._id})\">{{item.tags}}</span>-->\r\n				<!--<div ui-sref=\"app.categoriesVideos({categorieName:item})\">-->\r\n				<div ui-sref=\"app.categoriesVideos({categorieName:item.catId,catName:item.displayName})\">\r\n					<center>\r\n						<img ng-src=\"img/recipeImgs/{{item.imageName}}\" height=\"180px\" width=\"100%\" />\r\n					</center>\r\n					<center class=\"catgyName\">{{item.displayName}}</center>\r\n				</div>\r\n			</ion-item>\r\n		</ion-list>\r\n		<ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" distance=\"5%\" on-infinite=\"loadMore()\"></ion-infinite-scroll>\r\n	</ion-content>\r\n\r\n	<!--\r\n	<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n<a class=\"button button-clear\" href=\"\">\r\n			<i class=\"icon ion-laptop\" style=\"color:white;font-size:30px\"></i>\r\n		</a>\r\n		<h1 class=\"button button-clear\" ui-sref=\"app.myFav\">\r\n			<i class=\"icon ion-search\" style=\"color:white;font-size:30px\"></i>\r\n		</h1>\r\n		<a class=\"button button-clear\" ui-sref=\"app.myFav\">\r\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n		</a>\r\n</ion-footer-bar>\r\n-->\r\n\r\n\r\n	<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n<!--		<div class=\"buttons button-clear\" style=\"padding-left:20px\">\r\n			<i class=\"icon ion-laptop\" style=\"color:white;font-size:30px\"></i>\r\n		</div>-->\r\n		<!--<div class=\"buttons\" ng-click=\"doSomething()\" style=\"position: absolute;bottom: 0;left: 0;\">\r\n	<button class=\"button\">Right Button</button>\r\n</div>-->\r\n		<!--<div class=\"icon ion-search\" style=\"padding-left:90px\"></div>-->\r\n		<div class=\"buttons button-clear\" ui-sref=\"app.search\" style=\"padding-left:110px\">\r\n			<i class=\"icon ion-search\" style=\"color:white;font-size:30px\"></i>\r\n		</div>\r\n		<div class=\"buttons button-clear\" ui-sref=\"app.myFav\" style=\"padding-left:110px\">\r\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n		</div>\r\n	</ion-footer-bar>\r\n	<!--\r\n	<ion-tabs class=\"tabs-assertive tabs-icon-only\">\r\n\r\n		<ion-tab title=\"Web\" icon-on=\"ion-ios-laptop\" icon-off=\"ion-ios-laptop-outline\">\r\n		</ion-tab>\r\n\r\n		<ion-tab title=\"Search\" icon-on=\"ion-ios-search\" icon-off=\"ion-ios-search-outline\">\r\n		</ion-tab>\r\n\r\n		<ion-tab title=\"Favorites\" icon-on=\"ion-ios-briefcase\" icon-off=\"ion-ios-briefcase-outline\">\r\n		</ion-tab>\r\n\r\n	</ion-tabs>\r\n-->\r\n\r\n</ion-view>\r\n");
$templateCache.put("contentSlides.html","<ion-view ng-init=\"singleRecipe()\" cache-view=\"false\">\n	<ion-nav-title>\r\n		<span style=\"color:white\">Recipe Info\r\n    </span>\r\n	</ion-nav-title>\r\n\r\n\r\n	<ion-content has-header=\"true\">\r\n\r\n		<div class=\"card\">\r\n			<div class=\"item item-divider\" style=\"text-align:center\">\r\n				RECIPE: {{recipe.title}}\r\n			</div>\r\n			<center>\r\n				<img ng-src=\"{{recipe.images.mq}}\" height=\"180px\" />\r\n			</center>\r\n\r\n			<div class=\"row\">\r\n				<div class=\"col\"><span my-like-icon favorite=recipe></span>\n					<br>{{recipe.ytlikes + recipe.applikes | numeral}}</div>\n				<div class=\"col\"><i class=\"ion ion-eye\" style=\"color:grey;font-size:30px\"></i>\r\n					<br>{{recipe.views | numeral}}</div>\n				<div class=\"col\">\r\n					<span my-favorite-icon favorite=recipe></span>\n				</div>\r\n				<div class=\"col\"><i class=\"ion ion-play\" style=\"color:#00CCA3;font-size:30px\" ui-sref=\"app.showRecipes({videoId:recipe.videoId})\"></i>\r\n				</div>\r\n			</div>\r\n		</div>\r\n\r\n\r\n		<ion-slide-box scroll=\"true\" show-pager=\"true\" auto-play=\"2000\" does-continue=\"true\">\r\n			<ion-slide>\r\n				<div class=\"card\" style=\"min-height:300px\">\r\n					<div class=\"item item-divider bar bar-calm\">\r\n						Recipe Description\r\n					</div>\r\n					<div class=\"item item-text-wrap\">\r\n						{{recipe.description}}\r\n\r\n					</div>\r\n				</div>\r\n			</ion-slide>\r\n\r\n			<ion-slide>\r\n				<div class=\"card\" style=\"min-height:300px\">\r\n					<div class=\"item item-divider bar bar-royal\">\r\n						Recipe Author\r\n					</div>\r\n					<div class=\"item item-text-wrap\">\r\n						{{recipe.author}}\r\n					</div>\r\n				</div>\r\n			</ion-slide>\r\n			<ion-slide>\r\n				<div class=\"card\" style=\"min-height:300px\">\r\n					<div class=\"item item-divider bar bar-balanced\">\r\n						Recipe Published On\r\n					</div>\r\n					<!--					<div class=\"item item-text-wrap\">\r\n						{{currentDate}}\r\n					</div>-->\r\n\r\n					<div class=\"item item-text-wrap\">\r\n						{{recipe.published}}\r\n					</div>\r\n				</div>\r\n			</ion-slide>\r\n\r\n		</ion-slide-box>\r\n	</ion-content>\r\n	<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n		<a class=\"title\" ui-sref=\"app.myFav\">\r\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n		</a>\r\n	</ion-footer-bar>\r\n</ion-view>\n");
$templateCache.put("dropdownmenu.html","<ion-popover-view class=\"popover-items\" style=\" margin-top: 10px;\">\n	<ion-content>\n		<div class=\"list\" ng-click=\"popover.hide()\">\n			<!--<a class=\"item\" href=\"#/editprofile\">\n            Edit Profile\n            </a>\n<a class=\"item\" href=\"#/changepassword\">\n              Change Password\n            </a>-->\n			<a class=\"item\" href=\"#/about\">\n             About\n            </a>\n			<a class=\"item\" href=\"/\">\n             Signout\n            </a>\n		</div>\n	</ion-content>\n</ion-popover-view>\n");
$templateCache.put("forgot-password.html","<ion-view class=\"forgot-password-view\" hide-nav-bar=\"true\">\n	<ion-content scroll=\"false\">\n		<div class=\"row\">\n			<div class=\"col col-center\">\n				<div class=\"card forgot-password-container\">\n					<form name=\"forgot_password_form\" class=\"\" novalidate>\n						<div class=\"item item-body\">\n							<label class=\"item item-input\">\n								<input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\n							</label>\n						</div>\n						<div class=\"item item-body bottom-content\">\n							<button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"recoverPassword()\" ng-disabled=\"forgot_password_form.$invalid\">\n								Recover it\n							</button>\n						</div>\n					</form>\n				</div>\n				<div class=\"alternative-actions\">\n					<button class=\"log-in button button-small button-clear button-light\" ui-sref=\"login\">\n						Log In\n					</button>\n					<button class=\"sign-up button button-small button-clear button-light\" ui-sref=\"signup\">\n						Sign Up\n					</button>\n				</div>\n			</div>\n		</div>\n	</ion-content>\n</ion-view>\n");
$templateCache.put("loading.html","<!--<div class=\"icon ion-load-a\"></div>-->\n<ion-spinner class=\"light\" icon=\"bubbles\"></ion-spinner>\n<br/>\n<span>Loading...</span>\n");
$templateCache.put("login.html","<!--<ion-view hide-nav-bar=\"true\" cache-view=\"false\" class=\"login-view\">\r\n	<ion-content>\r\n		<div class=\"logo\">\r\n			<center>\r\n				<img src=\"img/Chef.png\" height=\"140px\" />\r\n			</center>\r\n		</div>\r\n		<div class=\"apptitle\">\r\n			<center>\r\n				<p class=\"titlestyle\">ReciFlix</p>\r\n			</center>\r\n		</div>\r\n		<div class=\" paddingclass\" style=\"margin-top: 0px;\" autocomplete=\"off\">\r\n			<label class=\"item-input inputstyle item-floating-label\">\r\n				<span class=\"input-label labelClr\">Email</span>\r\n				<input type=\"text\" placeholder=\"Email\" data-ng-model=\"user.email\">\r\n			</label>\r\n			<label class=\"item-input inputstyle item-floating-label\">\r\n				<span class=\"input-label labelClr\">Password</span>\r\n				<input type=\"password\" placeholder=\"Password\" data-ng-model=\"user.password\">\r\n			</label>\r\n			<br>\r\n			<button class=\"button button-block curvebutton button-color\" ng-click=\"Login()\">\r\n				Login\r\n			</button>\r\n			<button class=\"button button-block button-positive\" ng-click=\"fbLogin()\">\r\n				Login with Facebook\r\n			</button>\r\n			<a href=\"#/forgotpassword\" style=\"text-decoration:none;color:black\">\r\n				<small class=\"forgotpswd\">Forgot Password\r\n      </small>\r\n			</a>\r\n		</div>\r\n		<div class=\"signupbutton\" ui-sref=\"signup\">\r\n			<center>\r\n				Sign Up\r\n			</center>\r\n		</div>\r\n	</ion-content>\r\n</ion-view>-->\r\n\r\n\r\n<!--IonicFullAppLoginTemplate-->\r\n\r\n<ion-modal-view class=\"login-view\" hide-nav-bar=\"true\" cache-view=\"false\">\r\n	<ion-header-bar class=\"bar bar-assertive\">\r\n		<h1 class=\"title\">Login Screen</h1>\r\n		<button class=\"button button-icon ion-close\" style=\"float:right\" ng-click=\"closeModal(1)\"></button>\r\n	</ion-header-bar>\r\n	<ion-content scroll=\"false\">\r\n		<div class=\"row\">\r\n			<div class=\"col col-center\">\r\n				<div class=\"card login-container\" content-tabs tabsdata=\'tabsdata\'>\r\n\r\n					<form name=\"login_form\" class=\"\" novalidate ng-cloak autocomplete=\"off\" cache-view=\"false\">\r\n						<my-tabs>\r\n							<my-tab title=\"Email\">\r\n								<div class=\"list\">\r\n									<label class=\"item item-input\">\r\n										<input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\r\n									</label>\r\n									<label class=\"item item-input\" show-hide-container>\r\n										<input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\r\n									</label>\r\n								</div>\r\n							</my-tab>\r\n							<div class=\"item item-body bottom-content\">\r\n								<button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"Login()\" ng-disabled=\"(login_form.user_email.$invalid || login_form.user_password.$invalid)\">\n									Log In\r\n								</button>\r\n							</div>\r\n					</form>\r\n				</div>\r\n				<div class=\"alternative-actions\">\r\n					<button class=\"forgot-password button button-small button-clear button-light\" ui-sref=\"forgot-password\">\r\n						Forgot Password?\r\n					</button>\r\n					<button class=\"sign-up button button-small button-clear button-light\" ng-click=\"oModal2.show() && oModal1.hide()\">\r\n						Sign Up\r\n					</button>\r\n				</div>\r\n				<center><strong>{{errMsg}}</strong>\r\n				</center>\r\n\r\n				<button class=\"login button button-block button-stable\" ng-click=\"fbLogin()\">\r\n					Connect with FB\r\n				</button>\r\n			</div>\r\n		</div>\r\n	</ion-content>\r\n</ion-modal-view>\n");
$templateCache.put("myFavorites.html","<ion-view cache-view=\"true\">\r\n  <ion-nav-title>\r\n    <span style=\"color:white\">Favourite Recipes</span>\r\n  </ion-nav-title>\r\n  <ion-content>\r\n    <div class=\"card\" ng-show=\"authentication && recipes.length == 0\">\r\n      <div class=\"item item-text-wrap\">\r\n        Howdy.... You dont seem to have any Favourite Recipes, tap on <i class=\"icon ion-ios-heart-outline\" style=\"font-size:30px;padding:5px 5px\"></i> of a recipe to add it to Favourites <i class=\"icon ion-ios-heart animated\" style=\"font-size:30px;padding:5px 5px\"></i>\r\n      </div>\r\n    </div>\r\n\r\n    <div ng-repeat=\"item in recipes\" ng-show=\"authentication\">\r\n\r\n      <rf-recipe-display></rf-recipe-display>\r\n\r\n    </div>\r\n\r\n    <div ng-hide=\"authentication\">{{notLoggedIn}}</div>\r\n\r\n    <ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" distance=\"1%\" on-infinite=\"loadMore()\" ng-show=\"authentication\"></ion-infinite-scroll>\r\n  </ion-content>\r\n\r\n  <ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n    <div class=\"buttons button-clear\" ui-sref=\"app.search\" style=\"padding-left:110px\">\r\n      <i class=\"icon ion-search\" style=\"color:white;font-size:30px\"></i>\r\n    </div>\r\n    <div class=\"buttons button-clear\" ui-sref=\"app.myFav\" style=\"padding-left:110px\">\r\n      <i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n    </div>\r\n  </ion-footer-bar>\r\n\r\n</ion-view>\r\n");
$templateCache.put("recipesUnderCategory.html","<ion-view cache-view=\"true\">\r\n	<ion-nav-title>\r\n		<span style=\"color:white\">{{CatName}}\r\n    </span>\r\n	</ion-nav-title>\r\n\r\n	<ion-content has-header=\"true\" ng-init=\"initialQueryRecipes()\">\r\n		<div ng-repeat=\"item in recipes\">\r\n			<div class=\"card\">\r\n				<div class=\"item item-divider\" style=\"text-align:center\">\r\n					{{item.title}}\r\n				</div>\r\n				<div ng-class=\"item._id === selectedIndex ? \'fullHeight\' : \'dftHeight\'\">{{item.description}}\r\n				</div>\r\n				<i ng-class=\"item._id === selectedIndex ? \'ion ion-chevron-up\' : \'ion ion-chevron-down\'\" style=\"color:Grey;font-size:30px;float:right\" ng-click=\"changeClass(item)\"></i>\r\n				<div class=\"row\">\r\n					<div class=\"col\"><span my-like-icon favorite=item></span>\r\n						<br>{{item.ytlikes + item.applikes | numeral}}</div>\r\n					<div class=\"col\"><i class=\"ion ion-eye\" style=\"color:grey;font-size:30px\"></i>\r\n						<br>{{item.views | numeral}}</div>\r\n					<div class=\"col\">\r\n						<span my-favorite-icon favorite=item></span>\r\n					</div>\r\n					<div class=\"col\"><a style=\"font-size:20px;text-decoration:none\" ui-sref=\"app.slides({recipeId:item._id})\">More </a>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n		<ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" on-infinite=\"loadMore()\" distance=\"5%\"></ion-infinite-scroll>\r\n	</ion-content>\r\n\r\n	<!--	<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n		<a class=\"title\" ui-sref=\"app.myFav\">\r\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n		</a>\r\n	</ion-footer-bar>-->\r\n\r\n\r\n\r\n	<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n		<!--		<div class=\"buttons button-clear\" style=\"padding-left:20px\" ui-sref=\"app.allCategories\">\r\n			<i class=\"icon ion-laptop\" style=\"color:white;font-size:30px\"></i>\r\n		</div>-->\r\n		<!--<div class=\"buttons\" ng-click=\"doSomething()\" style=\"position: absolute;bottom: 0;left: 0;\">\r\n	<button class=\"button\">Right Button</button>\r\n</div>-->\r\n		<!--<div class=\"icon ion-search\" style=\"padding-left:90px\"></div>-->\r\n		<div class=\"buttons button-clear\" ui-sref=\"app.search\" style=\"padding-left:110px\">\r\n			<i class=\"icon ion-search\" style=\"color:white;font-size:30px\"></i>\r\n		</div>\r\n		<div class=\"buttons button-clear\" ui-sref=\"app.myFav\" style=\"padding-left:110px\">\r\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n		</div>\r\n	</ion-footer-bar>\r\n\r\n\r\n</ion-view>");
$templateCache.put("search.html","<ion-view>\r\n	<ion-nav-title>\r\n		<span style=\"color:white\">Search Recipes\r\n    </span>\r\n	</ion-nav-title>\r\n\r\n	<ion-content>\r\n		<div class=\"row\" style=\"margin-top:20px\">\r\n			<div class=\"col col-90\">\r\n				<input type=\"text\" placeholder=\"Search Ur Recipes Here\" ng-model=\"search\">\r\n			</div>\r\n			<div class=\"col\"><i class=\"icon  ion-search\" style=\"font-size:30px;padding-left:5px\" ui-sref=\"app.searchedRecipes({searchQuery:search})\"></i>\r\n			</div>\r\n		</div>\r\n	</ion-content>\r\n   <ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\r\n<!--		<div class=\"buttons button-clear\" style=\"padding-left:20px\" ui-sref=\"app.allCategories\">\r\n			<i class=\"icon ion-laptop\" style=\"color:white;font-size:30px\"></i>\r\n		</div>-->\r\n		<!--<div class=\"buttons\" ng-click=\"doSomething()\" style=\"position: absolute;bottom: 0;left: 0;\">\r\n	<button class=\"button\">Right Button</button>\r\n</div>-->\r\n		<!--<div class=\"icon ion-search\" style=\"padding-left:90px\"></div>-->\r\n		<div class=\"buttons button-clear\" ui-sref=\"app.search\" style=\"padding-left:110px\">\r\n			<i class=\"icon ion-search\" style=\"color:white;font-size:30px\"></i>\r\n		</div>\r\n		<div class=\"buttons button-clear\" ui-sref=\"app.myFav\" style=\"padding-left:110px\">\r\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\r\n		</div>\r\n	</ion-footer-bar>\r\n</ion-view>\r\n");
$templateCache.put("searchedRecipes.html","<ion-view cache-view=\"false\">\n	<ion-nav-title>\n		<span style=\"color:white\">Searched Recipes\n    </span>\n	</ion-nav-title>\n\n	<ion-content has-header=\"true\">\n		<div ng-repeat=\"items in recipes\">\n			<div ng-repeat=\"item in items\">\n				<div class=\"card\">\n					<div class=\"item item-divider\" style=\"text-align:center\">\n						{{item.title}}\n					</div>\n					<div ng-class=\"item._id === selectedIndex ? \'fullHeight\' : \'dftHeight\'\">{{item.description}}\n					</div>\n					<i ng-class=\"item._id === selectedIndex ? \'ion ion-chevron-up\' : \'ion ion-chevron-down\'\" style=\"color:Grey;font-size:30px;float:right\" ng-click=\"changeClass(item)\"></i>\n					<div class=\"row\">\n						<div class=\"col\"><i class=\"ion ion-thumbsup\" style=\"color:green;font-size:30px\"></i>\n							<br>{{item.likes}}</div>\n						<div class=\"col\"><i class=\"ion ion-thumbsdown\" style=\"color:red;font-size:30px\"></i>\n							<br>{{item.dislikes}}</div>\n						<div class=\"col\"><i class=\"ion ion-eye\" style=\"color:grey;font-size:30px\"></i>\n							<br>{{item.views}}</div>\n						<!--<div class=\"col\"><i class=\"ion ion-heart\" style=\"color:PeachPuff;font-size:30px\"></i>\n					</div>-->\n						<div class=\"col\" ng-click=\"updateFav(item)\">\n							<!--<i ng-class=\"item._id === selectedRecipe ? \'icon ion-ios-heart\' : \'icon ion-ios-heart-outline\'\" style=\"color:PeachPuff;font-size:30px\"></i>-->\n							<span my-favorite-icon favorite=item.videoId></span>\n						</div>\n\n						<div class=\"col\" ng-click=\"sharePost()\"><i class=\"ion ion-android-share-alt\" style=\"color:Coral;font-size:30px\"></i>\n						</div>\n						<div class=\"col\"><a style=\"font-size:20px;text-decoration:none\" ui-sref=\"app.slides({recipeId:item._id})\">More </a>\n						</div>\n					</div>\n				</div>\n			</div>\n			<ion-infinite-scroll immediate-check=\"false\" ng-if=\"!noMoreItemsAvailable\" distance=\"1%\" on-infinite=\"loadMore()\"></ion-infinite-scroll>\n	</ion-content>\n\n	<ion-footer-bar align-title=\"left\" class=\"bar-assertive\">\n		<a class=\"title\" ui-sref=\"app.myFav\">\n			<i class=\"icon ion-ios-briefcase\" style=\"color:white;font-size:30px\"></i>\n		</a>\n	</ion-footer-bar>\n</ion-view>\n");
$templateCache.put("showRecipes.html","<ion-view>\r\n	<ion-nav-title>\r\n		<span style=\"color:white\">Recipe Video </span>\r\n	</ion-nav-title>\r\n	<ion-nav-buttons side=\"secondary\">\r\n	</ion-nav-buttons>\r\n	<ion-content>\n		<ion-list>\r\n			<ion-item item=\"item\">\r\n				<div my-youtube code=videoId></div>\r\n\r\n				<div class=\"item tabs tabs-secondary tabs-icon-left\">\r\n					<a class=\"tab-item\" ng-click=\"sendMail()\">\r\n						<i class=\"icon ion-email\"></i> Email\r\n					</a>\r\n					<a class=\"tab-item\" ng-click=\"sharePost()\">\r\n						<i class=\"icon ion-share\"></i> Share\r\n					</a>\r\n				</div>\r\n\r\n			</ion-item>\r\n		</ion-list>\r\n	</ion-content>\r\n</ion-view>\n");
$templateCache.put("side-menu.html","<ion-side-menus cache-view=\"false\">\r\n	<ion-side-menu-content class=\"post-size-14px\">\r\n		<!--\r\nenable-menu-with-back-views=\"false\"\r\n		<div class=\"bar bar-header bar-assertive\">\r\n			<span class=\"title\">Header111</span>\r\n		</div>\r\n bar-footer\r\n-->\r\n\r\n		<ion-nav-bar class=\"bar bar-assertive\">\r\n			<ion-nav-back-button>\r\n			</ion-nav-back-button>\r\n			<ion-nav-buttons side=\"left\">\r\n				<button class=\"button button-icon button-clear ion-android-contact\" menu-toggle=\"left\">\r\n				</button>\r\n			</ion-nav-buttons>\r\n		</ion-nav-bar>\r\n		<ion-nav-view name=\"menuContent\"></ion-nav-view>\r\n	</ion-side-menu-content>\r\n\r\n	<ion-side-menu side=\"left\" class=\"main-menu\" expose-aside-when=\"large\">\r\n		<ion-content>\r\n			<ion-list ng-show=\"authentication\">\r\n				<ion-item class=\"heading-item item item-avatar\" nav-clear menu-close ui-sref=\"app.profile\">\r\n					<img ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\">\r\n					<h2 class=\"greeting\">Hi {{authentication.firstName}}</h2>\r\n					<p class=\"message\">Welcome back</p>\r\n				</ion-item>\r\n				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myFav\">\r\n					<i class=\"icon ion-heart\"></i>\r\n					<h2 class=\"menu-text\">My Favourites</h2>\r\n				</ion-item>\r\n                <ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.featuredRecipes\">\r\n					<i class=\"icon ion-fork\"></i>\r\n					<h2 class=\"menu-text\">Featured Recipes</h2>\r\n				</ion-item>\r\n<!--				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.recipesNotes\">\r\n					<i class=\"icon ion-clipboard\"></i>\r\n					<h2 class=\"menu-text\">Recipes Notes</h2>\r\n				</ion-item>-->\r\n				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.groceryList\">\r\n					<i class=\"icon ion-document-text\"></i>\r\n					<h2 class=\"menu-text\">Grocery List</h2>\r\n				</ion-item>\r\n				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.myCalendarPlan\">\r\n					<i class=\"icon ion-calendar\"></i>\r\n					<h2 class=\"menu-text\">My Meal Plan</h2>\r\n				</ion-item>\r\n  				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.settings\">\r\n					<i class=\"icon ion-gear-a\"></i>\r\n					<h2 class=\"menu-text\">Preferences</h2>\r\n				</ion-item>\r\n\r\n<!--\r\n				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.addPreferences\">\r\n					<i class=\"icon ion-compose\"></i>\r\n					<h2 class=\"menu-text\">Preferences</h2>\r\n				</ion-item>\r\n-->\r\n\r\n<!--\r\n				<ion-item class=\"item-icon-left\" nav-clear menu-close ui-sref=\"app.settings\">\r\n					<i class=\"icon ion-gear-a\"></i>\r\n					<h2 class=\"menu-text\">Preferences</h2>\r\n				</ion-item>\r\n-->\r\n				<ion-item class=\"item-icon-left\" nav-clear menu-close>\r\n					<div ng-show=\"authentication\" ng-click=\"signout()\"><i class=\"icon ion-log-out\"></i>\r\n						<h2 class=\"menu-text\" style=\"color:grey\">SignOut</h2>\r\n					</div>\r\n					<!--<div ng-hide=\"authentication\" ui-sref=\"walkthrough\"><i class=\"icon ion-log-in\"></i>\r\n						<h2 class=\"menu-text\" style=\"color:green\">Login or Create Account</h2>\r\n					</div>-->\r\n				</ion-item>\r\n\r\n			</ion-list>\r\n          <ion-list ng-hide=\"authentication\">\r\n\r\n            <ion-item class=\"heading-item item item-avatar\" nav-clear menu-close ui-sref=\"app.profile\">\r\n			  <img ng-src=\"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg\">\r\n		      <p class=\"message\">Welcome back</p>\r\n\r\n\r\n              <p class=\"message\">Hi There, you can add Favourites, set up Preferences and create Grocery lists etc.. and many more after signup or connecting with your facebook or gmail</p>\r\n\r\n              <h2 class=\"greeting\">Hi There, you can add Favourites, set up Preferences and create Grocery lists etc.. and many more after signup or connecting with your facebook or gmail</h2>\r\n\r\n			</ion-item>\r\n\r\n\r\n            <ion-item class=\"item-icon-left\" nav-clear menu-close>\r\n\r\n          <div  ui-sref=\"walkthrough\"><i class=\"icon ion-log-in\"></i>\r\n						<h2 class=\"menu-text\" style=\"color:green\">Login or Create Account</h2>\r\n		  </div>\r\n\r\n\r\n            </ion-item>\r\n            </ion-list>\r\n\r\n\r\n\r\n		</ion-content>\r\n	</ion-side-menu>\r\n</ion-side-menus>\r\n\r\n\r\n\r\n<!--<ion-side-menus enable-menu-with-back-views=\"false\">\r\n	<ion-side-menu-content>\r\n		<ion-nav-bar class=\"bar-assertive\">\r\n			<ion-nav-back-button>\r\n			</ion-nav-back-button>\r\n\r\n			<ion-nav-buttons side=\"left\">\r\n				<button class=\"button button-icon button-clear ion-android-contact\" menu-toggle=\"left\">\r\n				</button>\r\n			</ion-nav-buttons>\r\n		</ion-nav-bar>\r\n		<ion-nav-view name=\"menuContent\">\r\n\r\n			<div class=\"bar bar-footer item-input-inset bar-assertive\">\r\n				<label class=\"item-input-wrapper\">\r\n					<i class=\"icon ion-ios7-search placeholder-icon\"></i>\r\n					<input type=\"search\" placeholder=\"Search\">\r\n				</label>\r\n				<button class=\"button button-clear\">\r\n					<i class=\"ion-search\"></i>\r\n				</button>\r\n			</div>\r\n\r\n		</ion-nav-view>\r\n	</ion-side-menu-content>\r\n\r\n	<ion-side-menu side=\"left\" expose-aside-when=\"large\">\r\n		<ion-header-bar class=\"bar-assertive\">\r\n			<h1 class=\"title\">Left</h1>\r\n		</ion-header-bar>\r\n		<ion-content>\r\n			<ion-list>\r\n				<ion-item nav-clear menu-close ng-click=\"login()\">\r\n					Login\r\n				</ion-item>\r\n				<ion-item nav-clear menu-close href=\"#/app/search\">\r\n					Search\r\n				</ion-item>\r\n				<ion-item nav-clear menu-close href=\"#/app/browse\">\r\n					Browse\r\n				</ion-item>\r\n				<ion-item nav-clear menu-close href=\"#/app/playlists\">\r\n					Playlists\r\n				</ion-item>\r\n			</ion-list>\r\n		</ion-content>\r\n	</ion-side-menu>\r\n</ion-side-menus>-->\r\n");
$templateCache.put("signup.html","<!--<ion-view hide-nav-bar=\"true\" class=\"signup-view\">\r\n	<ion-content>\r\n		<div class=\"logo\">\r\n			<center>\r\n				<img src=\"img/Chef.png\" height=\"90px\" />\r\n			</center>\r\n		</div>\r\n		<div>\r\n			<center>\r\n				<p class=\"titlestyle\">ReciFlix</p>\r\n			</center>\r\n\r\n		</div>\r\n		<div class=\"paddingclass\">\r\n			<form name=\"form\">\r\n				<label class=\"item-input inputstyle item-floating-label\">\r\n					<span class=\"input-label labelClr\">First Name</span>\r\n					<input type=\"text\" placeholder=\"First Name\" ng-model=\"user.firstname\">\r\n				</label>\r\n				<label class=\"item-input inputstyle item-floating-label\">\r\n					<span class=\"input-label labelClr\">Last Name</span>\r\n					<input type=\"text\" placeholder=\"Last Name\" ng-model=\"user.lastname\">\r\n				</label>\r\n				<label class=\"item-input inputstyle item-floating-label\">\r\n					<span class=\"input-label labelClr\">Email</span>\r\n					<input type=\"text\" placeholder=\"Email\" ng-model=\"user.email\">\r\n				</label>\r\n				<p>\r\n					<small ng-show=\"errMsg\" class=\"errMsg\">{{errMsg}}</small>\r\n				</p>\r\n				<label class=\"item-input inputstyle item-floating-label\">\r\n					<span class=\"input-label labelClr\">Password</span>\r\n					<input type=\"Password\" placeholder=\"Password\" ng-model=\"user.password\">\r\n				</label>\r\n\r\n				<br>\r\n				<button class=\"button button-block button-color curvebutton\" ng-click=\"signup()\">\r\n					Sign Up\r\n				</button>\r\n				<div>\r\n					<center>\r\n						<p style=\"opacity:0.5\">or if you already have account</p>\r\n					</center>\r\n				</div>\r\n				<div>\r\n					<center>\r\n						<p style=\"margin-top:20px;\" class=\"button-color\" ui-sref=\"login\">\r\n							Login\r\n						</p>\r\n					</center>\r\n				</div>\r\n			</form>\r\n		</div>\r\n	</ion-content>\r\n</ion-view>-->\r\n\r\n\r\n<!--IonicFullAppSignUpTemplate-->\r\n\r\n<ion-modal-view class=\"signup-view\" hide-nav-bar=\"true\" cache-view=\"false\">\r\n	<ion-header-bar class=\"bar bar-assertive\">\r\n		<h1 class=\"title\">Create Account</h1>\r\n		<button class=\"button button-icon ion-close\" style=\"float:right\" ng-click=\"closeModal(2)\"></button>\r\n	</ion-header-bar>\r\n	<ion-content scroll=\"false\">\r\n		<div class=\"row\">\r\n			<div class=\"col col-center\">\r\n				<div class=\"card sign-up-container\">\r\n\r\n					<form name=\"signup_form\" class=\"\" novalidate>\r\n						<div class=\"item item-body\">\r\n							<label class=\"item item-input\">\r\n								<input type=\"text\" placeholder=\"First Name\" name=\"user_fname\" ng-model=\"user.firstName\" required>\n							</label>\r\n							<label class=\"item item-input\">\r\n								<input type=\"text\" placeholder=\"Last Name\" name=\"user_lname\" ng-model=\"user.lastName\" required>\n							</label>\r\n							<label class=\"item item-input\">\r\n								<input type=\"email\" placeholder=\"Email\" name=\"user_email\" ng-model=\"user.email\" required>\r\n							</label>\r\n							<label class=\"item item-input\" show-hide-container>\r\n								<input type=\"password\" placeholder=\"Password\" name=\"user_password\" ng-model=\"user.password\" required show-hide-input>\r\n							</label>\r\n						</div>\r\n						<div class=\"item item-body bottom-content\">\r\n							<button type=\"submit\" class=\"button button-positive button-block\" ng-click=\"doSignUp()\" ng-disabled=\"signup_form.$invalid\">\r\n								Sign Up\r\n							</button>\r\n						</div>\r\n					</form>\r\n				</div>\r\n				<div class=\"alternative-actions\">\r\n					<button class=\"log-in button button-small button-clear button-light\" ng-click=\"oModal1.show() && oModal2.hide()\">\r\n						Log In\r\n					</button>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</ion-content>\r\n</ion-modal-view>\n");
$templateCache.put("walkthrough.html","<ion-view class=\"walkthrough-view\" hide-nav-bar=\"true\" cache-view=\"false\">\n	<ion-content scroll=\"false\">\n		<div class=\"top-content row\">\n			<div class=\"col col-center\">\n				<img ng-src=\"img/WalkthroughCtrl.png\">\n			</div>\n		</div>\n		<div class=\"bottom-content row\">\n			<div class=\"col col-center\">\n				<button class=\"login button button-block button-stable\" ng-click=\"login()\">\n					Log In\n				</button>\n				<button class=\"sign-up button button-block button-stable\" ng-click=\"signup()\">\n					Sign Up\n				</button>\n				<button class=\"login button button-stable\" style=\"float:right\" ng-click=\"skip()\">\n					Skip For Now\n				</button>\n			</div>\n		</div>\n	</ion-content>\n</ion-view>\n");
$templateCache.put("directive_partials/rf-recipe-display.html","\r\n\r\n\r\n\r\n\r\n<div class=\"card\">\r\n  <div class=\"item item-divider\">\r\n  {{item.title}}\r\n  <i ng-class=\"item._id === selectedIndex ? \'ion ion-chevron-up\' : \'ion ion-chevron-down\'\" style=\"color:Grey;font-size:30px;float:right\" ng-click=\"changeClass(item)\"></i>\r\n  </div>\r\n  <div class=\"item item-text-wrap\">\r\n    <div ng-class=\"item._id === selectedIndex ? \'fullHeight\' : \'dftHeight\'\">{{item.description}}</div>\r\n  </div>\r\n  <div class=\"item item-divider\">\r\n    <div class=\"row\">\r\n					<div class=\"col\"><i class=\"ion ion-thumbsup\" style=\"color:#FF6666;font-size:30px\"></i>\r\n						<br>{{item.ytlikes + item.applikes | numeral}}</div>\r\n					<div class=\"col\"><i class=\"ion ion-eye\" style=\"color:grey;font-size:30px\"></i>\r\n						<br>{{item.views}}</div>\r\n					<div class=\"col\"><i class=\"ion ion-ios-heart\" style=\"color:#FF6666;font-size:30px\"></i>\r\n					</div>\r\n					<div class=\"col\"><a style=\"font-size:20px;text-decoration:none\" ui-sref=\"app.slides({recipeId:item._id})\">More </a>\r\n					</div>\r\n				</div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("partials/my-tab.html","<div class=\"tab-content\" ng-show=\"selected\" ng-transclude></div>\n");
$templateCache.put("partials/my-tabs.html","<div class=\"item item-divider card-heding\">\n	<div class=\"tabs-striped tabs-background-dark tabs-color-stable\">\n		<div class=\"tabs\">\n			<a ng-repeat=\"tab in tabs\" ng-click=\"select(tab)\" ng-class=\"{ active: tab.selected }\" class=\"tab-item\">{{tab.title}}</a>\n		</div>\n	</div>\n</div>\n<div class=\"item item-body\">\n	<div class=\"tabs-content\" ng-transclude></div>\n</div>\n");
$templateCache.put("partials/show-hide-password.html","<div class=\"show-hide-input\" ng-transclude>\n</div>\n<a class=\"toggle-view-anchor\" on-touch=\"toggleType($event)\">\n	<span ng-show=\"show\">HIDE</span>\n	<span ng-show=\"!show\">SHOW</span>\n</a>\n");}]);
