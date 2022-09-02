# hidden-object-game
Click on the image to find all the hidden objects
![](https://github.com/TYLPHE/TYLPHE/blob/main/readmeAssets/hidden-object-game.gif)

## Links
- [Try Hidden Object Game here!](https://tylphe.github.io/hidden-object-game/)

- [Link to the Assignment](https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app)

## Features
 - Play with 3 different maps
 - Use the magnifying glass to see details
 - Record times after finding all objects
 - Locations and images are saved on Firebase

## About
Hidden Object Game is my first app where I use Firebase, an SDK to pull and store data. This app is a game where the user uses the magnifying glass to find 4 different hidden objects (Waldo and his friends). 

## Challenges
## How to accurately find images based on different screen sizes
I decided to set the positions of my hidden objects based on percentages. I did this to accomodate for large and small screens. The image itself will always stay at 100% width so if the window was 100px wide or 1000 px wide, the position of the object will always be at the same percentage of the image. For example, Waldo will be at the 20px for a 100px screen and 200px for a 1000px wide screen. It wouldnt matter what width the image is, the solutions will be the same.

My firebase database looks like this:
```javascript
const solutions-waldo1 = {
  odlaw = {
    xMax 0.33866
    xMin 0.29764
    yMax 0.67665
    yMin 0.61294 
  },
  waldo = {
    xMax 0.86835
    xMin 0.83875
    yMax 0.76248
    yMin 0.70858 
  },
  wenda = {
    xMax 0.50501
    xMin 0.41717
    yMax 0.43713
    yMin 0.4032 
  },
  wizard = {
    xMax 0.08481
    xMin 0.05316
    yMax 0.78044
    yMin 0.74052 
  }
} 
```

When the user clicks between all the min and max values of the (x, y) coordinates, then the object is marked as found. 

One weakness to this method is that the image cannot be zoomed-in to view objects in greater detail because the image is always set to 100% viewing width. This is why I implemented the magnifying glass.

### Magnifying glass simulation
Magnification was inaccurate as the user moved towards the edge of the screen. For example, if the user places the center of the magnifying glass at the (0%, 0%) position (or top left corner) of the image, the expectation is that the corner is also placed at the center of the magnifying glass.

However, the magnifying glass would display the (0%, 0%) position in the top left corner of the magnifying glass (not center).

This meant that I had to offset the magnifying glass's image (the image magnified) as it approached the edge of the main image. The problem is that each of the corners are offset in different ways. For example, the top left corner needed to be offset by 50px in the x-axis and the y-axis. The bottom right corner needed to be offset by (-50px, -50px).

My solution is to split each image into quadrants and offset the magnifying glass based on its position. For example, the bottom-left quadrant would have a negative x-axis offset and a positive y-axis offset.

```javascript
// adjust magnifying glass's image to match mouse position more accurately
function magnifyOffset(e) {
  const xScreen = e.pageX / imgWidth;
  const yScreen = ( e.pageY ) / ( imgHeight );
  if (xScreen < .5) {
    const offset = 50 - 50 * e.pageX / ( imgWidth / 2 );
    setPosXOffset(offset);
  }
  if (xScreen > .5) {
    const offset = -50 * ( e.pageX - ( imgWidth / 2 ) ) / ( imgWidth / 2 );
    setPosXOffset(offset);
  }
  if (yScreen < .5) {
    const offset = 50 - 50 * (e.pageY) / ( ( imgHeight ) / 2 );
    setPosYOffset(offset);
  }
  if (yScreen > .5) {
    const offset = -50 * ( (e.pageY) - ( ( imgHeight ) / 2 ) ) / ( imgHeight / 2 )
    setPosYOffset(offset);
  }
}
```

After calculating offset for each of the quadrants of the image. I then used this offset in the background calculation as the mouse moved:
```javascript
bgPosX={`calc( ${( posX / imgWidth ) * 100}% + ${ posXOffset }px )`}
bgPosY={`calc( ${( posY / imgHeight ) * 100 }% + ${ posYOffset }px )`}
```

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

### Render on window resize
If the user resizes the window after loading the image, the magnifying glass component will lose its position relative to the main image.

I learned that React does not have a resize event so we need to `window.addEventListener()` from the React component.

I combined using React's `useRef()` from [this guide](https://www.pluralsight.com/guides/re-render-react-component-on-window-resize) and the `window.addEventListener()` [guide](https://bobbyhadz.com/blog/react-get-element-width-ref) to find a solution to my issue.

TODO: expand on this

### Setting a load
Instead of saving my images in the src folder, I've loaded my images to firebase, creating a URL, and then displaying it on my app. The problem is that my components will render before the image loads. I wanted the image to completely load first and then render the component for a smoother user experience. I found a solution [thanks to this article](https://stackoverflow.com/questions/43115246/how-to-detect-when-a-image-is-loaded-that-is-provided-via-props-and-change-sta).

### Leaderboard
https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=0

understanding more about rules to write to my scores collection while only reading the solutions
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	match /{document=**} {
    	allow read;
    }
	
    match /scores/{score} {
      allow write;
    }
  }
}
```

next TODO is to sort by value: https://firebase.google.com/docs/database/web/lists-of-data

### Setting a promise
Must return a promise from function and in the setState, use a .then function to wait for promise to fulfill.
https://stackoverflow.com/questions/37533929/how-to-return-data-from-promise

## Helpful Notes
### Firebase API key is different
[This firebase article](https://firebase.google.com/docs/projects/api-keys) says that, "Unlike how API keys are typically used, API keys for Firebase services are not used to control access to backend resources" and "API keys for Firebase services are ok to include in code or checked-in config files".