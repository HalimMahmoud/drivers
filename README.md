# 🚖 Driver Search Box

A simple web app that allows you to **search, filter, and update driver records** stored in Firebase Firestore.  
This project is designed as a lightweight tool to quickly find drivers by name, plate (helpful for on-ground supervision), phone, or pool assignment, and update their information in real time.

👉 Originally built as a **support app to complement the Fleet Delivery Management (FDM) system** used at **elmenus** (a food delivery startup), because the first versions of FDM were missing these search and update features.

---

## ✨ Features

- 🔎 **Search Drivers** by name, plate (for on-ground supervision), or phone number
- 🗂️ **Filter by Pool(Working Area)/Group(Driver's Provider)/Blocked**
- 📝 **Update Driver Data** (e.g., pool assignment) directly from the UI
- ⚡ **Realtime Sync with Firestore** – all changes instantly reflected
- 🎨 **Clean UI** with Semantic UI React
- 📢 **Toast Notifications** for success/error actions

---

## 🛠️ Tech Stack

- **Framework:** Next.js 12
- **Frontend:** React 17, Semantic UI React, Formik
- **State Management:** Zustand
- **Notifications:** React Toastify
- **Backend:** Firebase Firestore
- **Deployment:** Firebase Hosting

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HalimMahmoud/drivers.git
cd searchbox
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable **Firestore Database**
3. In your project root, create a `.env.local` file and add your Firebase keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Create lib/firebase.js and load the config from environment variables:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

5. Make sure .env.local is ignored by Git to keep your keys safe. Add this line to your .gitignore (if it’s not already there):

```lua
.env.local
```

### 📄 Example Firestore Collection

Create a collection named **`drivers`** in Firestore, and add documents with the following structure:

**Collection:** `drivers`  
**Document ID:** auto-generated or custom

**Example Document:**

```json
{
  "id": "b08ef72c-0295-4c3b-9cff-cccb4ba27138",
  "key": "7bchLTglXkfP7RUw64fV",
  "name": "Abraham Aufderhar",
  "num": "011*778670*",
  "plate": "8 1 2 8 ب ج د",
  "pool": "Maadi",
  "providerName": "Alalamia",
  "approveStatus": "Approved",
  "blocked": false,
  "updated": {
    "seconds": 1756781808,
    "nanoseconds": 274000000
  }
}
```

### Fields Explanation

- **id** → UUID for the driver (system-generated)
- **key** → Internal Firestore document key
- **name** → Driver’s full name
- **num** → Driver’s phone number (masked for privacy in this case)
- **plate** → Vehicle plate number (Arabic + numbers)
- **pool** → Assigned pool/region (e.g., _Maadi_)
- **providerName** → Partner/fleet provider name
- **approveStatus** → Driver approval status (`Approved`, `Pending`, etc.)
- **blocked** → Whether the driver is blocked (`true` / `false`)
- **updated** → Firestore timestamp object (`seconds` + `nanoseconds`)

## 4. Run the App

### Run Locally

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser at http://localhost:3000
