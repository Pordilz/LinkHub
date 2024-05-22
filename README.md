# Link.hub

Link.hub is a platform where users can create a single profile to share all their important links. Users can customize their profile with a bio, profile picture, and manage their collection of links.

## Purpose

The purpose of Link.hub is to provide users with a centralized place to share their portfolio of links. Whether you are an individual wanting to share your social media profiles, a developer showcasing your projects, or a business displaying your services, Link.hub simplifies the process by providing a single link to share.


## Technology Choices

### Frontend
- **SvelteKit**: For building the reactive web application.
- **Tailwind CSS**: For styling the application.
- **DaisyUI**: For pre-designed Tailwind CSS components.

### Backend
- **Firebase Auth**: For authentication and managing user sessions.
- **Firestore**: For storing user data including profiles and links.
- **Firebase Storage**: For storing user-uploaded images.



# Installation Manual for Link.hub

Follow these steps to set up and run the Link.hub project on your local machine.

## Prerequisites

- **Node.js** (version 14 or later)
- **npm** (version 6 or later)
- **Firebase Account** (to set up Firestore, Auth, and Storage)

## Steps

### 1. Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/Pordilz/LinkHub
cd repositoryName
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase
   
## a. Create a Firebase Project
Go to the Firebase Console.
Click on Add project and follow the instructions to create a new Firebase project.

## b. Add a Web App to the Firebase Project
In the Firebase Console, go to Project settings.
In the Your apps section, click on the </> icon to add a new web app.
Register the app and copy the Firebase config object provided.

## c. Configure Firebase in the Project
Create a .env file in the root of your project.

Add the Firebase configuration variables to the .env file:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```
Replace the placeholders (your_api_key, your_project_id, etc.) with your actual Firebase configuration values.

### 4. Run the Development Server

Start the development server by running:

```bash
npm run dev
```

This will start the server at http://localhost:3000 (or another available port).





   

