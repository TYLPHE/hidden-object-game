# hidden-object-game
Click on the image to find all the hidden objects

## Challenges
### Firebase API key is different
[This firebase article](https://firebase.google.com/docs/projects/api-keys) says that, "Unlike how API keys are typically used, API keys for Firebase services are not used to control access to backend resources" and "API keys for Firebase services are ok to include in code or checked-in config files"

### Magnifying glass simulation
Magnification was inaccurate as the user moved towards the edge of the screen. For example, if the user places the center of the magnifying glass at the (0%, 0%) position (or top left corner) of the image, the expectation is that the corner is also placed at the center of the magnifying glass.

However, the magnifying glass would display the (0%, 0%) position in the top left corner of the magnifying glass (not center).

This meant that I had to offset the magnifying glass's image (the image magnified) as it approached the edge of the main image. the problem is that each of the corners are offset in different ways. For example, the top left corner needed to be offset by 50px in the x-axis and the y-axis. The bottom right corner needed to be offset by (-50px, -50px).

My solution is to split each image into quadrants and offset the magnifying glass based on its position. For example, the bottom-left quadrant would have a negative x-axis offset and a positive y-axis offset.

```javascript
if (xScreen < .5) {
  setPosXOffset( 50 - 50 * e.pageX / ( windowWidth / 2 ) )
}
if (xScreen > .5) {
  setPosXOffset( -50 * ( e.pageX - ( windowWidth / 2 ) ) / ( windowWidth / 2 ) )
}
if (yScreen < .5) {
  setPosYOffset( 50 - 50 * e.pageY / ( windowHeight / 2 ) )
}
if (yScreen > .5) {
  setPosYOffset( -50 * ( e.pageY - ( windowHeight / 2 ) ) / ( windowHeight / 2 ) )
```

TODO: more to come

### Reading the database
I am using the Cloud Firestore to store the hidden object's coordinates. The goal is compare the user's mouse coordinates with the data stored in Cloud Firestore. I did not have enough permission to get data with the default rules. [This page helped me update the rules to allow read, but deny rewriting the database](https://firebase.google.com/docs/firestore/security/rules-structure)

It's a simple update but it's a good first step. My rules look like this:
```
rules_version = '2';
service cloud.firestore {
    match /{document=**} {
    	// https://firebase.google.com/docs/rules/basics?authuser=0&hl=en#cloud-firestore
      allow read: if true;
      allow write: if false;
    }
  }
}
```
TODO: read this https://blog.logrocket.com/how-to-use-react-hooks-firebase-firestore/