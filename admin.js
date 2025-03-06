// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrrz31FUmfVbiTzGpRcO-QySwbY9mgRmg",
  authDomain: "d1-site.firebaseapp.com",
  projectId: "d1-site",
  storageBucket: "d1-site.firebasestorage.app",
  messagingSenderId: "260758419103",
  appId: "1:260758419103:web:9a58539f5b30fdde0f54aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simulated backend storage (would be replaced by actual backend in production)
const CREDENTIALS = {
  username: 'admin',
  password: 'gLp4O66Xr9Zkrg'
};

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const adminSection = document.getElementById('admin-section');
  const logoutButton = document.getElementById('logout');
  const saveChangesButton = document.getElementById('save-changes');
  const addProjectButton = document.getElementById('add-project');
  const projectsContainer = document.getElementById('projects-container');

  // Login functionality
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      loginSection.classList.add('hidden');
      adminSection.classList.remove('hidden');
      loadCurrentContent();
    } else {
      alert('Invalid credentials');
    }
  });

  // Logout functionality
  logoutButton.addEventListener('click', () => {
    loginSection.classList.remove('hidden');
    adminSection.classList.add('hidden');
  });

  // Load current content into admin panel
  async function loadCurrentContent() {
    // Home section
    const homeDoc = await getDoc(doc(db, "content", "home"));
    if (homeDoc.exists()) {
      const data = homeDoc.data();
      document.getElementById('name').value = data.name;
      document.getElementById('profession').value = data.profession;
    }

    // About section
    const aboutDoc = await getDoc(doc(db, "content", "about"));
    if (aboutDoc.exists()) {
      const data = aboutDoc.data();
      document.getElementById('about-text').value = data.text;
    }

    // Contact section
    const contactDoc = await getDoc(doc(db, "content", "contact"));
    if (contactDoc.exists()) {
      const data = contactDoc.data();
      document.getElementById('contact-email').value = data.email;
    }

    // Social Links section
    const socialLinksDoc = await getDoc(doc(db, "content", "socialLinks"));
    if (socialLinksDoc.exists()) {
      const data = socialLinksDoc.data();
      document.getElementById('github-link').value = data.github;
      document.getElementById('telegram-link').value = data.telegram;
      document.getElementById('admin-panel-link').value = data.adminPanel;
    }

    // Projects section
    const projectsDoc = await getDoc(doc(db, "content", "projects"));
    if (projectsDoc.exists()) {
      const data = projectsDoc.data();
      projectsContainer.innerHTML = '';
      data.projects.forEach((project, index) => {
        addProjectFields(project, index);
      });
    }
  }

  // Add project fields dynamically
  function addProjectFields(project = {}, index = null) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('mb-4');
    projectDiv.innerHTML = `
      <label class="block mb-2">Project Image:</label>
      <input type="file" class="project-image mb-2">
      <label class="block mb-2">Project Name:</label>
      <input type="text" class="project-name w-full p-2 mb-2 bg-[#222629] rounded" 
             placeholder="Project Name" value="${project.name || ''}">
      <label class="block mb-2">Project Description:</label>
      <textarea class="project-description w-full p-2 bg-[#222629] rounded" 
                placeholder="Project Description" rows="3">${project.description || ''}</textarea>
      ${index !== null ? `<button class="remove-project bg-red-500 text-white p-2 mt-2 rounded">Remove</button>` : ''}
    `;

    projectsContainer.appendChild(projectDiv);

    // Remove project button functionality
    const removeButton = projectDiv.querySelector('.remove-project');
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        projectsContainer.removeChild(projectDiv);
      });
    }
  }

  // Add project button
  addProjectButton.addEventListener('click', () => {
    addProjectFields();
  });

  // Save changes functionality
  saveChangesButton.addEventListener('click', async () => {
    // Update home section
    const homeData = {
      name: document.getElementById('name').value,
      profession: document.getElementById('profession').value
    };
    await setDoc(doc(db, "content", "home"), homeData);

    // Update about section
    const aboutData = {
      text: document.getElementById('about-text').value
    };
    await setDoc(doc(db, "content", "about"), aboutData);

    // Update projects
    const projects = Array.from(projectsContainer.children).map(projectDiv => ({
      name: projectDiv.querySelector('.project-name').value,
      description: projectDiv.querySelector('.project-description').value,
      image: null // In a real implementation, handle file uploads
    }));
    await setDoc(doc(db, "content", "projects"), { projects });

    // Update contact section
    const contactData = {
      email: document.getElementById('contact-email').value
    };
    await setDoc(doc(db, "content", "contact"), contactData);

    // Update social links
    const socialLinksData = {
      github: document.getElementById('github-link').value,
      telegram: document.getElementById('telegram-link').value,
      adminPanel: document.getElementById('admin-panel-link').value
    };
    await setDoc(doc(db, "content", "socialLinks"), socialLinksData);

    alert('Changes saved successfully!');
  });
});
