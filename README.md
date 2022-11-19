## Description

---
This project is to demo the ability using d3 and d3fc to handle large data on browser with hitting web app performance.
The dummy data rendered on the screen is around 20K data point.

With current setup, d3 and d3fc, the web app can easily render million data point on the screen with bring down the web app. 

This app includes following features:

- Zoom in and zoom out
- Annotation to show data point information


### Tech stack

---

- React + Typescript
- Styled component
- d3.js
- d3fc
- d3-svg-annotation

### Required Environment

---

- node v16.16.0

### Project Architect

---

For code structuring, in this project, we follow principle of Proximity which group relevant files together. It could be much easier to maintain over time. Please refer [this doc](https://kula.blog/posts/proximity_principle/#:~:text=The%20principle%20of%20proximity%20focuses,code%20that's%20easier%20to%20understand) for more information regarding principle of Proximity.


### Project setup

1. `yarn install` to install required packages
2. `yarn dev` to start a dev server for local development
