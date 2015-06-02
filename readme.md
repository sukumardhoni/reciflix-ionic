Recipe App with ionic

$>cordova platform add android

ionic serve --lab

USE Brackets Editor Spaces : 2 option

Developer Notes
-------------------------------




Bugs
----------
IOS back text not hiding after configuring the 
$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');

when clicked on home always show the User settings


Searched Recipes seems have bugs




5.1) prepare empty pages informing not supported yet

7. how to differentiate fbuser from regular user ( use provider in the USer model)



1.1) Directives to be developed for reuse
recipe_display

1.2) User notifications

1.3) https setup for rest server

2. Landing website page (www.reciflix.com) details and strategy


4. Gather more videos, select some relevant yt sources and load


6. Explore how to set Featured recipes

7. Identify the offline access for some recipes,
provide user preferences to select offline access of available recipes

offline content for 10 high ranked recipes in each category


6. UnAuthenticated User 
-- suggest to Login/Signup when tried to add favourites or when visiting User Settings section
-- explore to use localstorage to add favourites etc when not authenticated also


9.optimize the images using gimp etc..


10. offline access of the application
-- localstore images of category
-- add a api call for latest updated date for each category
-- store category info and image in localstorage, only if the server data is latest bring it from the server and refresh the localstorage



allow videos be submitted by the user

allow users to be able to submit the directions, ingradients


--






https://www.youtube.com/watch?v=9j5CvMaKu2s








Email updates when a new recipe added by category or tag



NYT cooking RecipeBox
http://pttrns.com/applications/408?y=2015







http://forum.ionicframework.com/t/ionic-beta14-how-to-clean-the-cache-for-a-specific-view/14277/11


DigitalIQApr 2
Great Idea Collin..

I instantiated one of my route state with cache: false then from a logical navigation I manipulated the state as

$state.go ('state.name' , {}, {cache: true});
It perfectly worked. 
Thanks for your idea.


http://sahatyalkabov.com/create-a-tv-show-tracker-using-angularjs-nodejs-and-mongodb/




If a device is not responding as needed one of the approach is to tweak with css to only add a style to perticular platform

http://forum.ionicframework.com/t/default-ios-tap-on-top-behavior/1615/11

So I just tested this on an android device and I'm starting to think that it is the fade bar directive. To make sure it only appeared on iOS7, I added the platform specific class to it as well.

.platform-ios7 .fade-bar {
	height: 20px;
	width: 100%;
	position: fixed;
	z-index: 9999;
	opacity: 0;
	background-color: #000;
	position: absolute;
	top: 0px;
}
So the fade bar isn't even there on anything device that isn't an iOS7 device. Tried taking the fade bar out from my iOS project, and it worked like a charm.

So the issue seems to be that when you tap the header, it thinks you're tapping the fade bar and no the header it self.






X 1. the infinite scroll is hitting twice the API call  
- done cleared after cleaning up the code

X 8. logout is not completely logging out user

X 5. User settings section
-- clean and keep only required options 
