1. Change the id to com.reciflix.recipeapp
--add version to 0.0.3
-remove the userdi t3@t3.com

3. mongodb instance for production use  (Venkat)
4. logic to switch the apilocation based on the enviroment (Venkat)
X : 5. add "Share ReciFlix" menu item to be added in the Sidemenu
-upon click user is taken to a page where the choice of fb,email,or whats app is selected by user and appropriate sharing action is taken

X :7. fb user complete functionality check
X :8. Non fb user functionality use a blank user image from
http://www.iconarchive.com/show/pretty-office-8-icons-by-custom-icon-design/User-yellow-icon.html
9. hardware back button to be enabled except for the home page
2. Facebook ids for prod use (Venkat and Vinodh)

bugs
1. The error scenario when fb user k.venkat logs in and clicks on the favourites
2. when there is no result for search the infinite scroll is triggered, need to take care of the condition

Recipe App with ionic

$>cordova platform add android

ionic serve --lab

cordova camera plugin to be able to use for profile picture and uploading the images of dishes prepared using the recipe

Developer Notes
-------------------------------

More clarification on notify functionality.
-------------------------------------------

Think and evolve strategy for enrolling alpha and beta testers from website (using alpha.reciflix.com etc)

Login and signup forms should be in a native application look and feel.
font name can we use good font on ionic( like google font apis)
http://forum.ionicframework.com/t/google-fonts/1206



6. create an app.profile route to show User profile ( image , firstname, lastname, email)  (Mahesh)
   Logo images should maintain the fixed size.
   
Make the production website point and work correctly  (Venkat)
-- thinnk about a new mongo instance for prod  (and how to dynamically point to api server)

1.1) Directives to be developed for re-use (Venkat)
recipe_display
recipe display directive common for recipelist, search display, favourite display  
category and recipe editing features for administartor  (Vinodh, Mahesh)



share the App link and functionality
Profile image integration from fb or from the upload from camera/phone gallery
-- this image needs to be updated to mongodb into user model as base64

-- if user is from fb, get the image url from fb and store it in to the User model
-- if local empty image use a blank user 






Understand config.xml features


PlayStore Assets Preparation:
-----------------------------

1: Good Quality Images for PlayStore.


Bugs
----------

dist folder and generated files need to investigate to see why they need in ionic project  (Venkat)
dist is not being ignored in git

4. Gather more videos, select some relevant yt sources and load



6. Explore how to set Featured recipes (Venkat)


6. UnAuthenticated User (Venkat)

-- explore to use localstorage to add favourites etc when not authenticated also




10. offline access of the application (Venkat)
-- localstore images of category
-- add a api call for latest updated date for each category
-- store category info and image in localstorage, only if the server data is latest bring it from the server and refresh the localstorage
Identify the offline access for some recipes,
offline access for recipes  
offline content for 10 high ranked recipes in each category
provide user preferences to select offline access of available recipes
























Next Version
-------------

try ionic push for sending push notifications to users when the app is not in active state
try ionic deploy for pushing updates to app directly

allow videos be submitted by the user

allow users to be able to submit the procedure and ingradients

Email updates when a new recipe added by category or tag

https (ssl enbling) for API server (. enable ssl for api server)  (Vinodh)
--

Windows Store app submission
------------------------------
https://msdn.microsoft.com/en-us/library/windows/apps/jj657967.aspx

https://dev.windows.com/en-us/publish







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




X : Create in mean-reciflix-rest project reciflix landing page as homepage  (Mahesh)

X : Functionality for taking the subscribers email for notification  (Vinodh, Mahesh)
1000 people subscribed for notification
/notifyme {type:'ios/android' , email: email@address.com}
.post
.get

X : prospectiveEmails  collection  for storing prospective users emails


X 1. user comes to reciflix.com
we show landing page with image of the app on mobile  and links to appstore

X 2. upon click on the one of the store 

-- make an API call to /prospectiveuser (get)    :   {'ios': 1005, 'android': 20345}

Currently 20345 USers are subscribed for our app release.

User is given the form to enter email to subscribe and above the form display a message saying, We are almost there in the APPStore/PlayStore, you can give your email address so that we will notify you when the app is in the store.

Email: -----------------------------   NotifyMe

-- what if user doesnot enter anything but click on Notify Me (  enable Notify button only after user enter something in the email field)
-- if user give wrong formatted email ( server api validates email so display error message to user
-- if user enters a existing email address: (server api validates and send Email already exists)

This email already existsts in our notification list, if you want to give a different email address you can givenow, otherwise we will notify at your  existing email address

-- valid new email

then Show user that, thanks for subscribing to notification, you will hear from us as soon as the ReciFlix app is released to store.


1. X : display style change for recipe card
2. X : go all the way to generating apk for playstore, we will signup forthe android developer program in the morning
3. X : landing page display in mobile device ( model it after instagram behaviour or as you suggested)
4. X : help Mahesh push the code mean-reciflix-rest 
5. X : Mahesh to look into image optimization and icon creation
7. X : Documentation for creating custom icons (Mahesh)
   X : Create a custom favorite brief-case icon with heart icon also.
   D : Protractor tests should be re-visited.(Mahesh)


X : icon editor to create a Home icon with food theme or use a readymade food theme icon (like dinner plate etc) (Mahesh)



X : On the header bar back button to be replaced with ios light back button(see if we can show it in font color white)  (Vinodh)

X : Home button to be bringing the categories transition from left side (Vinodh)



9. X: optimize the images using gimp etc.. 
X : USE Brackets Editor Spaces : 2 option
X: Provide the latest writeup for reciflix  (Venkat)
   X: try to get the image sizes in a tabular format and we can get the assets from professional help  (Venkat)
   create doc for release time changes
  X: -- how to increase the version info
  X:  -- prepare changelog like whats is new

X: -- suggest to Login/Signup when tried to add favourites or when visiting User Settings section