# Holography

Simple demo of WebXR and Deep Learning using Tensorflow to create holograms on-the-fly. 
It works on Android with the last Chrome (>= r81)

Thank to https://twitter.com/AlexandreDevaux for original inspiration from: https://github.com/nosy-b/holography

![![Youtube Demo Video](http://img.youtube.com/vi/VkoQecLPkS4/0.jpg)](https://www.youtube.com/watch?v=VkoQecLPkS4 "Youtube Demo Video")

Live DEMO here: https://hologram-webxr.herokuapp.com/ (android only)

## How to

- First be sure to have an android phone with chrome >=r81
- Start by looking at a person/face/photo and tap on the screen to start AR
- Look at a human (real or a photo) and tap on the screen
- It should appear coming from your phone to the direction you were looking at when clicked on Start (initial position)

## Description

Create particles of people extracted from camera feed using Bodypix model
Feel free to use this dirty little code for your own experiments

## Whats different

This is a version that doesn't use ImageCapture, since grabFrame() was failing on Samsung and Pixel phones.

- Added proper permission checker
- Fixed camera issues, instead using deviceId I used constraint: facingMode: { exact: 'environment'}
- Load model only on init()
- Reorganized the code and removed imageCapture and other obsolete functions in this version
- My phone doesn't support zoom either, but you can fiddle depth etc... with this in Init():
- THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0, 1000 )
- All this reduced size to 14mb (used to be 18mb)
- It has the issue of reusing same segmentation image. So zou need to repfresh paget to try another image (TODO)

### Dependencies

* ThreeJS, TensorFlowJS

## Help

One thing to be careful about is not to frame too close the subject you want to make a hologram of. The camera frame is smaller than what your screen shows. (A good todo would be to show camera frame while in AR)

## Authors
Branislav Djalic
[@LordOfThePies4](https://twitter.com/LordOfThePies4)

## License

Check the license of THREEJS and Tensorflow

