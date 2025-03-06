// Simulated backend storage (would be replaced by actual backend in production)
const CREDENTIALS = {
    username: 'admin',
    password: 'gLp4O66Xr9Zkrg'
};

let contentData = {
    home: {
        profileImage: null,
        name: 'Placeholder Name',
        profession: 'Placeholder Profession'
    },
    about: {
        image: null,
        text: 'Placeholder text about professional background and skills.'
    },
    projects: [
        {
            image: null,
            name: 'Project 1',
            description: 'Placeholder description of project 1.'
        },
        {
            image: null,
            name: 'Project 2',
            description: 'Placeholder description of project 2.'
        },
        {
            image: null,
            name: 'Project 3',
            description: 'Placeholder description of project 3.'
        }
    ],
    contact: {
        email: 'contact@example.com'
    }
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
    function loadCurrentContent() {
        // Home section
        document.getElementById('name').value = contentData.home.name;
        document.getElementById('profession').value = contentData.home.profession;

        // About section
        document.getElementById('about-text').value = contentData.about.text;

        // Projects section
        projectsContainer.innerHTML = '';
        contentData.projects.forEach((project, index) => {
            addProjectFields(project, index);
        });

        // Contact section
        document.getElementById('contact-email').value = contentData.contact.email;
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
    saveChangesButton.addEventListener('click', () => {
        // Update home section
        contentData.home.name = document.getElementById('name').value;
        contentData.home.profession = document.getElementById('profession').value;

        // Update about section
        contentData.about.text = document.getElementById('about-text').value;

        // Update projects
        contentData.projects = Array.from(projectsContainer.children).map(projectDiv => ({
            name: projectDiv.querySelector('.project-name').value,
            description: projectDiv.querySelector('.project-description').value,
            image: null // In a real implementation, handle file uploads
        }));

        // Update contact section
        contentData.contact.email = document.getElementById('contact-email').value;

        // In a real implementation, you would send this data to a backend
        alert('Changes saved successfully!');
        updateMainSite();
    });

    // Function to update main site content (would typically be done via backend)
    function updateMainSite() {
        // Update about section
        const aboutTextElements = document.querySelectorAll('#about p');
        aboutTextElements[0].textContent = contentData.about.text;
        aboutTextElements[1].textContent = contentData.about.text;

        // Update projects section
        const projectElements = document.querySelectorAll('#projects .grid > div');
        contentData.projects.forEach((project, index) => {
            if (projectElements[index]) {
                const projectElement = projectElements[index];
                projectElement.querySelector('h3').textContent = project.name;
                projectElement.querySelector('p').textContent = project.description;
            }
        });

        // Update contact email (if needed)
        console.log('Site updated with new content');
    }
});
