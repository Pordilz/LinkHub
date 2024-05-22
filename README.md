Installation Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
Install Dependencies:

bash
Copy code
npm install
Set Up Firebase:

Go to the Firebase console and create a new project.
Add a web app to your project and copy the Firebase config object.
Create a .env file in the root of your project and add the Firebase config variables:
env
Copy code
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
Run the Development Server:

bash
Copy code
npm run dev
