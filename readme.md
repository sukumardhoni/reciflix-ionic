Recipe App with ionic

$>cordova platform add android

ionic serve --lab

USE Brackets Editor Spaces : 2 option

Developer Notes
-------------------------------

Create in mean-reciflix-rest project reciflix landing page as homepage  (Mahesh)

Functionality for taking the subscribers email for notification  (Vinodh, Mahesh)
1000 people subscribed for notification
/notifyme {name: , email: email@address.com}
.post
.get

prospectiveEmails  collection  for storing prospective users emails

Provide the latest writeup for reciflix  (Venkat)

1.1) Directives to be developed for re-use (Venkat)
recipe_display
recipe display directive common for recipelist, search display, favourite display  

category and recipe editing features for administartor  (Vinodh, Mahesh)


on the App
--------------

create an app.profile route to show User profile ( image , firstname, lastname, email)  (Mahesh)

On the header bar back button to be replaced with ios light back button(see if we can show it in font color white)  (Vinodh)

Home button to be bringing the categories transition from left side (Vinodh)

icon editor to create a Home icon with food theme or use a readymade food theme icon (like dinner plate etc) (Mahesh)

https (ssl enbling) for API server (. enable ssl for api server)  (Vinodh)

Bugs
----------

dist folder and generated files need to investigate to see why they need in ionic project  (Venkat)
dist is not being ignored in git


4. Gather more videos, select some relevant yt sources and load


6. Explore how to set Featured recipes (Venkat)



6. UnAuthenticated User 
-- suggest to Login/Signup when tried to add favourites or when visiting User Settings section
-- explore to use localstorage to add favourites etc when not authenticated also


9.optimize the images using gimp etc.. (Venkat)


10. offline access of the application
-- localstore images of category
-- add a api call for latest updated date for each category
-- store category info and image in localstorage, only if the server data is latest bring it from the server and refresh the localstorage
Identify the offline access for some recipes,
offline access for recipes  (Venkat)
offline content for 10 high ranked recipes in each category
provide user preferences to select offline access of available recipes

Next Version
-------------
allow videos be submitted by the user

allow users to be able to submit the procedure and ingradients

Email updates when a new recipe added by category or tag


--

https://www.youtube.com/watch?v=9j5CvMaKu2s

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


