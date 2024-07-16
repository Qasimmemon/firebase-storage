



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwwuczW0LLhhP8A5f_4sliRkhq-E25AIQ",
  authDomain: "first-project-fe546.firebaseapp.com",
  projectId: "first-project-fe546",
  storageBucket: "first-project-fe546.appspot.com",
  messagingSenderId: "521320857220",
  appId: "1:521320857220:web:f2296527cedf7b68024cd1",
  measurementId: "G-GSCYXYFGX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const carsCollection = collection(db, "cars");

const carImgInput = document.getElementById("car_img");
const submitBtn = document.getElementById("save_file");
const showResult = document.getElementById("show_Result");
const submit = document.getElementById("submit");

submit.addEventListener("click", async () => {
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const gender = document.getElementById("Gender").value;

  if (!carImgInput.files.length) {
    alert("Please select an image");
    return;
  }

  const carImgFile = carImgInput.files[0];
  const carStorageRef = ref(storage, carImgFile.name);
  // if (carImgFile) {
  //   alert('aa gai')
  // }else{
  //   alert('nhi aae')
  // }
  submitBtn.disabled = true;

  try {
    const snapshot = await uploadBytes(carStorageRef, carImgFile);
    const url = await getDownloadURL(carStorageRef);
    await addDoc(carsCollection, {
      firstName,
      lastName,
      contact,
      email,
      message,
      gender,
      url
    });
    showProfile(firstName, lastName, contact, email, message, gender, url);
    submitBtn.disabled = false;
  } catch (err) {
    console.error("Error uploading file: ", err);
    submitBtn.disabled = false;
  }
});

function showProfile(firstName, lastName, contact, email, message, gender, url) {
  const profileHTML = `
    <div class="profile-container">
        <div>
            <div class="profile-header">
                <img src="${url}" alt="Profile Picture" class="profile-pic" />
                
            </div>
            <div class="profile-info">
                <h1 class="profile-name">${firstName} ${lastName}</h1>
                <div class="profile-details">
                    <p><strong>First Name:</strong> ${firstName}</p>
                    <p><strong>Last Name:</strong> ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Contact Number:</strong> ${contact}</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <p><strong>Gender:</strong> ${gender}</p>
                  <a href="Mesage/index.html">  <button class="button">
                      Message
                  </button></a>
                  
                </div>
            </div>
        </div>
    </div>
  `;
  showResult.innerHTML = profileHTML;
  
}


// async function addData(a, b,c,d,e,f) {
//   try {
//     const userCollection = collection(db, "allusers");
//     const userRef = await addDoc(userCollection, {
//       firstName:a,
//       lastName:b,
//       Email: c,
//       Contact: d,
//       Message:e,
//       Gender:f,
//       created_at: new Date().toDateString(),
//     });
//     console.log("Document written with ID: ", userRef.id);
//   } catch (e) {
//     alert("Error adding document: ", e);
//   }
// }