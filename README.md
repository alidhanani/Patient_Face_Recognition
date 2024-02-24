# Patient_Face_Recognition


## Projects
The project is divided into 3 sections:
- Firebase
- React Native (iOS, Android)
- ReactJS

We would be looking into each section on how to run each project

### Firebase
The idea is to first create a firebase project, enabling the following tools within firebase:
- Realtime database
- Authentication
- Storage

To create a firebase project:
- Visit `https://console.firebase.google.com/`
- Login with a google account
- Name the project
- On the dashboard choose Web to get firebase web configuration

Each of the folder `PatientApp` and `PatientWeb`, has a `firebase.ts` file that needs to be filled with the developer's information:

```JSON
const firebaseConfig = {
  apiKey: "<API Key>",
  authDomain: "<Auth Domain>",
  projectId: "<project id>",
  storageBucket: "<Stage Bucket>",
  messagingSenderId: "<Message Sender>",
  appId: "<App ID>",
  measurementId: "<Measure ID>",
  databaseURL: '<Database URL>', // Update this line
};
```

This information can be found when initiating firebase for web application.

Changes to be made in:
- Patient App: PatientApp/firebase.ts
- Patient Web: PatientWeb/src/firebase.ts

### React Native
The folder `PatientApp` is a react native project, once inside the folder, to the code we would require some prerequisites:

### Installation Prerequisites

Before proceeding, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (Recommended version: 20.0.0 or higher)
- [Yarn](https://yarnpkg.com/) (Recommended version: 1.22.0 or higher)
- [React Native](https://reactnative.dev/docs/environment-setup) (Follow the official React Native guide for installation)
- [Expo](https://reactnative.dev/docs/environment-setup) (Recommended version: 4.0.0 or higher)
- Android Studio (For Android development, including an Android emulator)
- Xcode (For iOS development, including an iOS emulator)

![Alt text](MobileApplication.png?raw=true "Mobile App")

#### Running react native application
The following bash code needs to be executed to run the react native mobile application:

```bash
    cd PatientApp
    yarn
```

To build an android application run the following:
```bash
    yarn android
```
[Note: To run an android application be sure to run the android emulator]

To build an android application run the following:
```bash
    yarn ios
```
[Note: To run an ios application be sure to run the ios emulator]

### React JS
The folder `PatientWeb` is a react native project, once inside the folder, to the code we would require some prerequisites:

- Node
- Yarn


![Alt text](WebApplication.png?raw=true "Mobile App")

#### Running reactjs web application
The following bash code needs to be executed to run the react native mobile application:

```bash
    cd PatientWeb
    yarn
    yarn dev
```

After successfull compilation of the code, you can view the web application on `http://localhost:5173/`.

### Reference
- [https://firebase.google.com/docs/functions/get-started?gen=2nd]
- [https://firebase.google.com/docs/database/web/start]
- [https://firebase.google.com/docs/storage/web/start]
- [https://firebase.google.com/docs/auth/web/start]
- [https://reactnavigation.org/docs/hello-react-navigation/]
- [https://reactnative.dev/docs/activityindicator]
- [https://tailwindcss.com/docs/guides/create-react-app]
- [https://github.com/justadudewhohacks/face-api.js]
- [https://chat.openai.com/]