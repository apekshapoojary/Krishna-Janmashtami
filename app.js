// ==========================================
// KRISHNA JANMASHTAMI WEBSITE - LOGIC (app.js)
// ==========================================

// Seed Data & Global State
const INITIAL_COMPETITIONS = [
  {
    id: "comp_1",
    title: "Kanha Fancy Dress Contest",
    category: "Traditional",
    date: "2026-08-28T10:00",
    prize: "1st: ₹5000, 2nd: ₹3000",
    venue: "College Auditorium",
    rules: "Open to all students. Participants must bring their own costume, flute, and peacock crown. Presentation time limit is 3 minutes.",
    approved: true
  },
  {
    id: "comp_2",
    title: "Dahi Handi Sprint (Pot Breaking)",
    category: "Traditional",
    date: "2026-08-28T15:00",
    prize: "1st: ₹10000, 2nd: ₹5000",
    venue: "College Playground",
    rules: "Teams of 5. Maximum height is 3 human tiers. Safety harnesses and crash mats will be provided by the college. The team that breaks the pot in the shortest time wins.",
    approved: true
  },
  {
    id: "comp_3",
    title: "Janmashtami Rangoli Artistry",
    category: "Arts",
    date: "2026-08-28T11:30",
    prize: "1st: ₹3000, 2nd: ₹1500",
    venue: "Main Block Corridors",
    rules: "Individual or pairs. Time limit: 2 hours. Space provided: 4x4 feet. Stencils are not allowed. Bring your own organic colors.",
    approved: true
  },
  {
    id: "comp_4",
    title: "Muralidhara Solo Flute Recital",
    category: "Musical",
    date: "2026-08-28T13:30",
    prize: "1st: ₹4000, 2nd: ₹2000",
    venue: "Seminar Hall II",
    rules: "Time limit: 5 minutes. Classical or semi-classical Janmashtami tunes/bhajans are allowed. Shruti box is permitted.",
    approved: true
  }
];

const INITIAL_MEMORIES = [
  {
    id: "mem_1",
    title: "Floral Jhoola Decoration Winner",
    year: "2025",
    image: "decor",
    desc: "The final year B.Sc. students hand-crafted a breathtaking floral swing for Little Krishna, using fresh jasmine, marigolds, and mango leaves. Their attention to detail and traditional patterns secured them the first place."
  },
  {
    id: "mem_2",
    title: "Historic Dahi Handi Break",
    year: "2025",
    image: "dahi-handi",
    desc: "Reliving the electric atmosphere at the college grounds! After three failed attempts, the 'B.Com Warriors' team formed a flawless 3-tier pyramid and cracked the golden clay pot amidst drenching water and joyful drums."
  },
  {
    id: "mem_3",
    title: "Traditional Garba & Dandiya Eve",
    year: "2024",
    image: "dancing",
    desc: "A beautiful evening celebration where staff and students dressed in vibrant traditional attire (Chaniya Cholis and Kurtas) danced to rhythmic beats, showcasing college unity and traditional culture."
  },
  {
    id: "mem_4",
    title: "Little Kanhas Walk",
    year: "2024",
    image: "krishna.jpg",
    desc: "Our annual fancy dress parade featured dozens of cute portrayals of Little Krishna, complete with butter pots, mischief, and charming smiles. Truly a blessing to watch."
  }
];

const TEACHINGS = [
  {
    text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    chapter: "Bhagavad Gita - Chapter 2, Verse 47"
  },
  {
    text: "A man is made by his belief. As he believes, so he is.",
    chapter: "Bhagavad Gita - Chapter 17, Verse 3"
  },
  {
    text: "Change is the law of the universe. You can be a millionaire, or a pauper in an instant.",
    chapter: "Bhagavad Gita - Chapter 2, Verse 12"
  },
  {
    text: "Deliver the self by the Self, and do not let the self sink. For the Self is the friend of the self, and the Self is the enemy of the self.",
    chapter: "Bhagavad Gita - Chapter 6, Verse 5"
  },
  {
    text: "Whatever actions great people perform, common people follow. And whatever standards they set, all the world pursues.",
    chapter: "Bhagavad Gita - Chapter 3, Verse 21"
  },
  {
    text: "For the soul there is neither birth nor death at any time. It has not come into being, does not come into being, and will not come into being.",
    chapter: "Bhagavad Gita - Chapter 2, Verse 20"
  },
  {
    text: "Whenever righteousness (dharma) declines and unrighteousness rises, I manifest Myself on Earth.",
    chapter: "Bhagavad Gita - Chapter 4, Verse 7"
  }
];

const MEMORY_IMAGE_MAPPING = {
  "krishna.jpg": "krishna.jpg",
  "decor": "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=500&q=80", // Flowers / festival
  "dahi-handi": "https://images.unsplash.com/photo-1605335198270-b472e389d4fb?auto=format&fit=crop&w=500&q=80", // Indian clay pots
  "dancing": "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=500&q=80" // Indian celebration
};

// State Variables
let competitions = [];
let memories = [];
let registrations = [];
let currentRole = "student";
let activeWisdomIndex = 0;

// Web Audio API Synthesizer variables
let audioCtx = null;
let musicInterval = null;
let melodyTimeout = null;
let isMusicPlaying = false;
const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C4, D4, E4, G4, A4, C5, D5, E5 (Extended Raag Bhupali scale)

// Background music audio track
const bgMusicAudio = new Audio("krishna_flute.mp3");
bgMusicAudio.loop = true;
bgMusicAudio.volume = 0.55; // moderate volume

// Seed data for Users
const DEFAULT_USERS = [
  { name: "Principal Admin", email: "admin@hegde.edu", username: "admin", password: "admin", role: "admin" },
  { name: "Prof. Hegde (HOD)", email: "organiser@hegde.edu", username: "organiser", password: "organiser", role: "organiser" },
  { name: "Apeksha K.", email: "student@hegde.edu", username: "student", password: "student", role: "student" }
];

// ==========================================
// 1. INITIALIZATION & STORAGE
// ==========================================

function initApp() {
  // Load data from Local Storage or Seed
  if (!localStorage.getItem("utsav_competitions")) {
    localStorage.setItem("utsav_competitions", JSON.stringify(INITIAL_COMPETITIONS));
  }
  if (!localStorage.getItem("utsav_memories")) {
    localStorage.setItem("utsav_memories", JSON.stringify(INITIAL_MEMORIES));
  }
  if (!localStorage.getItem("utsav_registrations")) {
    localStorage.setItem("utsav_registrations", JSON.stringify([]));
  }
  if (!localStorage.getItem("utsav_users")) {
    localStorage.setItem("utsav_users", JSON.stringify(DEFAULT_USERS));
  }

  competitions = JSON.parse(localStorage.getItem("utsav_competitions"));
  memories = JSON.parse(localStorage.getItem("utsav_memories"));
  registrations = JSON.parse(localStorage.getItem("utsav_registrations"));

  // Event Listeners
  setupEventListeners();

  // Intro Screen Sequence Setup
  setupIntroSequence();
}

// ==========================================
// 2. INTRO SEQUENCE & EVENT HANDLERS
// ==========================================

function setupIntroSequence() {
  const enterBtn = document.getElementById("enter-site-btn");
  const skipBtn = document.getElementById("skip-intro-btn");
  const introOverlay = document.getElementById("intro-overlay");
  const authOverlay = document.getElementById("auth-overlay");
  const appRoot = document.getElementById("app-root");

  const enterAction = () => {
    introOverlay.style.transform = "translateY(-100vh)";
    startAmbientMusic();
    setTimeout(() => {
      introOverlay.style.display = "none";
      
      // Check active user session
      const currentUser = JSON.parse(localStorage.getItem("utsav_current_user"));
      if (currentUser) {
        appRoot.classList.remove("hidden");
        showUserProfile(currentUser);
        switchRole(currentUser.role);
      } else {
        authOverlay.classList.remove("hidden");
      }
    }, 1200);
  };

  enterBtn.addEventListener("click", enterAction);
  skipBtn.addEventListener("click", enterAction);
}

function setupEventListeners() {
  // Auth Login Form submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleUserLogin);
  }

  // Logout button
  document.getElementById("logout-btn").addEventListener("click", handleUserLogout);

  // 3D Parallax Mouse Effect on Login Background and Card
  const authOverlay = document.getElementById("auth-overlay");
  const authCard = authOverlay.querySelector(".auth-card");
  const authBgLayer = authOverlay.querySelector(".auth-bg-layer");

  authOverlay.addEventListener("mousemove", (e) => {
    // Only run if the login screen is visible
    if (authOverlay.classList.contains("hidden")) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate mouse position relative to center (-1 to 1)
    const mouseX = (e.clientX - width / 2) / (width / 2);
    const mouseY = (e.clientY - height / 2) / (height / 2);

    // Rotate card in 3D (max 7 degrees rotation)
    const rotateX = -mouseY * 7;
    const rotateY = mouseX * 7;

    // Shift background in the opposite direction (Parallax offset)
    const bgShiftX = -mouseX * 20; // max 20px shift
    const bgShiftY = -mouseY * 20;

    authCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    authBgLayer.style.transform = `translate(${bgShiftX}px, ${bgShiftY}px) scale(1.03)`;
  });

  // Reset positioning when mouse leaves the overlay (restores CSS floating animation)
  authOverlay.addEventListener("mouseleave", () => {
    authCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    authBgLayer.style.transform = "";
  });



  // Tab systems for Student, Organiser, and Admin Portals
  const tabContainers = [
    { module: "module-student", selector: "#module-student .tab-btn" },
    { module: "module-organiser", selector: "#module-organiser .tab-btn" },
    { module: "module-admin", selector: "#module-admin .tab-btn" }
  ];

  tabContainers.forEach(container => {
    const tabs = document.querySelectorAll(container.selector);
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetTabId = tab.getAttribute("data-tab");
        const parentModule = document.getElementById(container.module);
        
        // Deactivate old tabs & contents in this module
        parentModule.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
        parentModule.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        // Activate selected tab & content
        tab.classList.add("active");
        const targetContent = document.getElementById(targetTabId);
        if (targetContent) targetContent.classList.add("active");
      });
    });
  });

  // Memory Lane category filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderMemoryGallery(filter);
    });
  });

  // Next Wisdom quote button
  document.getElementById("next-wisdom-btn").addEventListener("click", cycleWisdom);
  
  // Interactive elements hover/click playfulness
  // Interactive elements hover/click playfulness (Click Krishna to cycle wisdom)
  const matka = document.getElementById("interactive-matka");
  if (matka) {
    matka.addEventListener("click", () => {
      if (matka.classList.contains("bounce-click")) return;

      cycleWisdom();
      matka.classList.add("bounce-click");

      setTimeout(() => {
        matka.classList.remove("bounce-click");
      }, 500);
    });
  }

  const flute = document.getElementById("interactive-flute");
  if (flute) {
    flute.addEventListener("mouseenter", () => {
      playShortFluteRiff();
    });
    flute.addEventListener("click", () => {
      playShortFluteRiff();
    });
  }

  // Ambient music toggle
  document.getElementById("music-toggle-btn").addEventListener("click", toggleMusic);

  // Core student forms submit
  document.getElementById("student-registration-form").addEventListener("submit", handleStudentRegistration);
  document.getElementById("add-competition-form").addEventListener("submit", handleOrganiserAddCompetition);
  document.getElementById("add-memory-form").addEventListener("submit", handleOrganiserAddMemory);
  
  // Organiser event select filter for rosters
  document.getElementById("organiser-comp-select").addEventListener("change", (e) => {
    renderOrganiserRoster(e.target.value);
  });

  // Admin Controls
  document.getElementById("admin-export-csv").addEventListener("click", exportRegistrationsCSV);
  document.getElementById("admin-clear-data").addEventListener("click", resetAllData);

  // Modal close
  document.querySelectorAll(".close-modal-btn").forEach(btn => btn.addEventListener("click", closeModal));
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("registration-modal")) {
      closeModal();
    }
  });

  // Modal navigation step wizard buttons
  document.getElementById("proceed-to-register-btn").addEventListener("click", () => {
    document.getElementById("modal-details-screen").classList.add("hidden");
    document.getElementById("modal-form-screen").classList.remove("hidden");
  });

  document.getElementById("back-to-details-btn").addEventListener("click", () => {
    document.getElementById("modal-details-screen").classList.remove("hidden");
    document.getElementById("modal-form-screen").classList.add("hidden");
  });

  // Parallax 3D effect on mouse movement in the Hero arena
  const playground = document.querySelector(".hero-3d-playground");
  const scene = document.querySelector(".interactive-3d-scene");
  
  if (playground && scene) {
    playground.addEventListener("mousemove", (e) => {
      const rect = playground.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotX = (y / rect.height) * -30;
      const rotY = (x / rect.width) * 30;
      
      scene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    playground.addEventListener("mouseleave", () => {
      scene.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }
}

// ==========================================
// 3. AUTHENTICATION & SESSION LOGIC
// ==========================================

function handleUserLogin(e) {
  e.preventDefault();
  const role = document.getElementById("login-role").value;
  const usernameOrEmail = document.getElementById("login-username").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("utsav_users")) || [];
  const foundUser = users.find(u => 
    (u.username.toLowerCase() === usernameOrEmail || u.email.toLowerCase() === usernameOrEmail) && 
    u.password === password && 
    u.role === role
  );

  if (foundUser) {
    localStorage.setItem("utsav_current_user", JSON.stringify(foundUser));
    
    // Play success chime
    // playFluteTone(523.25, 0.15, 0.4);
    
    // Hide auth page, reveal app dashboard
    document.getElementById("auth-overlay").classList.add("hidden");
    document.getElementById("app-root").classList.remove("hidden");
    
    showUserProfile(foundUser);
    switchRole(role);
    
    document.getElementById("login-form").reset();
  } else {
    alert("Invalid credentials or role selection! Please check your details and try again.");
  }
}



function handleUserLogout() {
  showCustomConfirm("Are you sure you want to log out?", "Log Out").then(confirmed => {
    if (!confirmed) return;

    localStorage.removeItem("utsav_current_user");
    stopAmbientMusic();

    // Hide app and show login
    document.getElementById("app-root").classList.add("hidden");
    document.getElementById("user-profile-badge").classList.add("hidden");
    document.getElementById("auth-overlay").classList.remove("hidden");
  });
}

function showUserProfile(user) {
  const profileBadge = document.getElementById("user-profile-badge");
  const displayName = document.getElementById("user-display-name");
  const displayRole = document.getElementById("user-display-role");

  displayName.textContent = user.name;
  displayRole.textContent = user.role === "admin" ? "Principal Admin" : user.role === "organiser" ? "Utsav Organiser" : "Student";
  displayRole.className = `user-role-tag ${user.role}-role`;

  profileBadge.classList.remove("hidden");
}

function fillDemoCredentials(role) {
  const roleSelect = document.getElementById("login-role");
  const usernameInput = document.getElementById("login-username");
  const passwordInput = document.getElementById("login-password");

  roleSelect.value = role;
  usernameInput.value = role; // demo username is same as role
  passwordInput.value = role; // demo password is same as role
  
  // playFluteTone(392.00, 0.1, 0.25); // sound feedback
}

function switchRole(role) {
  currentRole = role;
  
  // Hide all modules, show selected
  document.querySelectorAll(".role-module").forEach(mod => mod.classList.remove("active"));
  const targetModule = document.getElementById(`module-${role}`);
  if (targetModule) {
    targetModule.classList.add("active");
  }

  // Re-sync components for the module
  if (role === "student") {
    renderStudentPortal();
  } else if (role === "organiser") {
    renderOrganiserPortal();
  } else if (role === "admin") {
    renderAdminPortal();
  }
}

// ==========================================
// 4. STUDENT PORTAL LOGIC
// ==========================================

function renderStudentPortal() {
  // Render Approved Competitions
  const compGrid = document.getElementById("student-competitions-list");
  compGrid.innerHTML = "";
  
  const approvedComps = competitions.filter(c => c.approved);

  if (approvedComps.length === 0) {
    compGrid.innerHTML = `<p class="no-data-msg">No active competitions available. Check back soon!</p>`;
  } else {
    approvedComps.forEach(comp => {
      const card = document.createElement("div");
      card.className = "traditional-card";
      
      // Set image category background
      const categoryClass = comp.category.toLowerCase();
      const imageSrc = MEMORY_IMAGE_MAPPING[categoryClass] || MEMORY_IMAGE_MAPPING["krishna.jpg"];
      
      // Check if student registered
      const isRegistered = registrations.some(r => r.compId === comp.id);
      const regBtnText = isRegistered ? `<i class="fa-solid fa-check"></i> Registered` : `<i class="fa-solid fa-id-card"></i> Register Now`;

      card.innerHTML = `
        <div class="card-header-pic">
          <img src="${imageSrc}" class="card-img" alt="${comp.title}">
          <span class="card-badge ${categoryClass}">${comp.category}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${comp.title}</h3>
          <p class="card-desc">${comp.rules}</p>
          <div class="card-meta-list">
            <div class="meta-item"><i class="fa-solid fa-calendar-day"></i> <span>${formatDate(comp.date)}</span></div>
            <div class="meta-item"><i class="fa-solid fa-map-pin"></i> <span>${comp.venue}</span></div>
          </div>
        </div>
        <div class="card-footer">
          <button class="card-action-btn" ${isRegistered ? 'disabled' : ''} onclick="openRegistrationModal('${comp.id}')">
            ${regBtnText}
          </button>
        </div>
      `;
      compGrid.appendChild(card);
    });
  }

  // Render Memories list
  renderMemoryGallery("all");

  // Render Student's My Registrations tab
  const studentRegsBody = document.getElementById("student-my-registrations-list");
  studentRegsBody.innerHTML = "";

  if (registrations.length === 0) {
    studentRegsBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-gray);">You have not registered for any events yet.</td></tr>`;
  } else {
    registrations.forEach(reg => {
      const comp = competitions.find(c => c.id === reg.compId);
      const compTitle = comp ? comp.title : "Unknown Competition";
      const statusLabel = comp && comp.approved ? "Approved" : "Pending Approval";
      const badgeClass = statusLabel.toLowerCase();

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${reg.studentName}</td>
        <td>${reg.rollNo}</td>
        <td>${reg.studentClass}</td>
        <td>${compTitle}</td>
        <td>${formatDate(reg.dateRegistered)}</td>
        <td><span class="status-badge ${badgeClass}">${statusLabel}</span></td>
      `;
      studentRegsBody.appendChild(row);
    });
  }
}

function renderMemoryGallery(filter) {
  const memoryGrid = document.getElementById("student-memories-list");
  memoryGrid.innerHTML = "";

  const filteredMemories = filter === "all" ? memories : memories.filter(m => m.year === filter);

  if (filteredMemories.length === 0) {
    memoryGrid.innerHTML = `<p class="no-data-msg">No memories archived for this year.</p>`;
  } else {
    filteredMemories.forEach(mem => {
      const card = document.createElement("div");
      card.className = "memory-card";
      
      const imgUrl = MEMORY_IMAGE_MAPPING[mem.image] || mem.image || MEMORY_IMAGE_MAPPING["krishna.jpg"];

      card.innerHTML = `
        <div class="card-header-pic">
          <img src="${imgUrl}" class="card-img" alt="${mem.title}">
        </div>
        <div class="memory-body">
          <div class="memory-title-row">
            <h3 class="card-title">${mem.title}</h3>
            <span class="memory-year-badge">${mem.year}</span>
          </div>
          <p class="card-desc">${mem.desc}</p>
        </div>
      `;
      memoryGrid.appendChild(card);
    });
  }
}

// ==========================================
// 5. REGISTRATION MODAL
// ==========================================

function openRegistrationModal(compId) {
  const comp = competitions.find(c => c.id === compId);
  if (!comp) return;

  document.getElementById("reg-comp-id").value = compId;
  document.getElementById("modal-comp-title").textContent = comp.title;
  document.getElementById("modal-form-comp-title").textContent = "Register: " + comp.title;
  
  // Populate details
  document.getElementById("modal-event-category").textContent = comp.category || "Traditional";
  document.getElementById("modal-event-date").textContent = formatDate(comp.date);
  document.getElementById("modal-event-venue").textContent = comp.venue;
  document.getElementById("modal-event-rules").textContent = comp.rules;
  
  // Reset screen states to show details screen first
  document.getElementById("modal-details-screen").classList.remove("hidden");
  document.getElementById("modal-form-screen").classList.add("hidden");
  
  const modal = document.getElementById("registration-modal");
  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("registration-modal").classList.add("hidden");
  document.getElementById("modal-details-screen").classList.remove("hidden");
  document.getElementById("modal-form-screen").classList.add("hidden");
  document.getElementById("student-registration-form").reset();
}

function handleStudentRegistration(e) {
  e.preventDefault();
  
  const compId = document.getElementById("reg-comp-id").value;
  const studentName = document.getElementById("reg-student-name").value;
  const rollNo = document.getElementById("reg-roll-no").value;
  const studentClass = document.getElementById("reg-class").value;
  const email = document.getElementById("reg-email").value;
  const phone = document.getElementById("reg-phone").value;

  // Add validation
  if (!studentName || !rollNo || !studentClass || !email || !phone) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Create new registration
  const newReg = {
    id: "reg_" + Date.now(),
    compId,
    studentName,
    rollNo,
    studentClass,
    email,
    phone,
    dateRegistered: new Date().toISOString()
  };

  registrations.push(newReg);
  localStorage.setItem("utsav_registrations", JSON.stringify(registrations));
  
  // playFluteTone(523.25, 0.15, 0.4); // Success high C note

  alert("Congratulations! You have successfully registered for the event.");
  closeModal();
  renderStudentPortal();
}

// ==========================================
// 6. ORGANISER PORTAL LOGIC
// ==========================================

function renderOrganiserPortal() {
  // Populate the rosters select dropdown filter
  const selectComp = document.getElementById("organiser-comp-select");
  selectComp.innerHTML = "";

  const approvedComps = competitions.filter(c => c.approved);
  
  if (approvedComps.length === 0) {
    const opt = document.createElement("option");
    opt.textContent = "No approved events";
    selectComp.appendChild(opt);
    renderOrganiserRoster(null);
  } else {
    approvedComps.forEach(comp => {
      const opt = document.createElement("option");
      opt.value = comp.id;
      opt.textContent = comp.title;
      selectComp.appendChild(opt);
    });
    // Trigger render on first item
    renderOrganiserRoster(approvedComps[0].id);
  }
}

function renderOrganiserRoster(compId) {
  const rosterBody = document.getElementById("organiser-roster-list");
  rosterBody.innerHTML = "";

  if (!compId) {
    rosterBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-gray);">No competition selected or available.</td></tr>`;
    return;
  }

  const filteredRegs = registrations.filter(r => r.compId === compId);

  if (filteredRegs.length === 0) {
    rosterBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-gray);">No students have registered for this competition yet.</td></tr>`;
  } else {
    filteredRegs.forEach(reg => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${reg.rollNo}</td>
        <td>${reg.studentName}</td>
        <td>${reg.studentClass}</td>
        <td>${reg.email}</td>
        <td>${reg.phone}</td>
        <td>${formatDate(reg.dateRegistered)}</td>
      `;
      rosterBody.appendChild(row);
    });
  }
}

function handleOrganiserAddCompetition(e) {
  e.preventDefault();

  const title = document.getElementById("comp-title").value;
  const date = document.getElementById("comp-date").value;
  const venue = document.getElementById("comp-venue").value;
  const rules = document.getElementById("comp-rules").value;

  const newComp = {
    id: "comp_" + Date.now(),
    title,
    category: "Traditional", // Default category
    date,
    prize: "N/A", // Default prize
    venue,
    rules,
    approved: false // Proposals from organisers require admin approval
  };

  competitions.push(newComp);
  localStorage.setItem("utsav_competitions", JSON.stringify(competitions));

  // playFluteTone(329.63, 0.2, 0.4); // sweet tone

  alert("Competition proposed successfully! It has been sent to the Admin for approval.");
  document.getElementById("add-competition-form").reset();
  renderOrganiserPortal();
}

function handleOrganiserAddMemory(e) {
  e.preventDefault();

  const title = document.getElementById("mem-title").value;
  const year = document.getElementById("mem-year").value;
  const image = document.getElementById("mem-image-select").value;
  const desc = document.getElementById("mem-desc").value;

  const newMemory = {
    id: "mem_" + Date.now(),
    title,
    year,
    image,
    desc
  };

  memories.push(newMemory);
  localStorage.setItem("utsav_memories", JSON.stringify(memories));

  // playFluteTone(440.00, 0.15, 0.45); // cheerful tone

  alert("Success! Previous year memory archived successfully.");
  document.getElementById("add-memory-form").reset();
  
  // Direct sync
  renderMemoryGallery("all");
}

// ==========================================
// 7. ADMIN PORTAL LOGIC
// ==========================================

function renderAdminPortal() {
  // Sync Stats Counters
  document.getElementById("stat-total-registrations").textContent = registrations.length;
  
  const activeComps = competitions.filter(c => c.approved);
  document.getElementById("stat-total-competitions").textContent = activeComps.length;

  const pendingComps = competitions.filter(c => !c.approved);
  document.getElementById("stat-pending-proposals").textContent = pendingComps.length;

  // Render Proposals Approval View
  const proposalsContainer = document.getElementById("admin-proposals-list");
  proposalsContainer.innerHTML = "";

  if (pendingComps.length === 0) {
    proposalsContainer.innerHTML = `<p class="no-data-msg" style="text-align: center; grid-column: 1/-1;"><i class="fa-solid fa-clipboard-check"></i> All proposed competitions have been reviewed.</p>`;
  } else {
    pendingComps.forEach(comp => {
      const card = document.createElement("div");
      card.className = "proposal-card";
      
      card.innerHTML = `
        <div class="proposal-info">
          <h4 class="proposal-title">${comp.title}</h4>
          <div class="proposal-meta-row">
            <span><strong>Category:</strong> ${comp.category}</span>
            <span><strong>Date:</strong> ${formatDate(comp.date)}</span>
            <span><strong>Venue:</strong> ${comp.venue}</span>
            <span><strong>Prize:</strong> ${comp.prize}</span>
          </div>
          <p class="proposal-desc">${comp.rules}</p>
        </div>
        <div class="proposal-actions">
          <button class="admin-approve-btn" onclick="approveCompetition('${comp.id}')">
            <i class="fa-solid fa-check"></i> Approve
          </button>
          <button class="admin-reject-btn" onclick="rejectCompetition('${comp.id}')">
            <i class="fa-solid fa-xmark"></i> Reject
          </button>
        </div>
      `;
      proposalsContainer.appendChild(card);
    });
  }

  // Render Admin Master Registrations Table
  const masterTableBody = document.getElementById("admin-master-registrations-list");
  masterTableBody.innerHTML = "";

  if (registrations.length === 0) {
    masterTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-gray);">No registrations recorded yet.</td></tr>`;
  } else {
    registrations.forEach(reg => {
      const comp = competitions.find(c => c.id === reg.compId);
      const compTitle = comp ? comp.title : "Deleted Competition";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${reg.rollNo}</td>
        <td>${reg.studentName}</td>
        <td>${reg.studentClass}</td>
        <td>${compTitle}</td>
        <td>${reg.email}</td>
        <td>${reg.phone}</td>
        <td>${formatDate(reg.dateRegistered)}</td>
      `;
      masterTableBody.appendChild(row);
    });
  }
}

function approveCompetition(compId) {
  const compIndex = competitions.findIndex(c => c.id === compId);
  if (compIndex === -1) return;

  competitions[compIndex].approved = true;
  localStorage.setItem("utsav_competitions", JSON.stringify(competitions));
  
  // playFluteTone(523.25, 0.1, 0.3); // success note
  
  alert("Competition approved and published live!");
  renderAdminPortal();
  renderStudentPortal();
}

function rejectCompetition(compId) {
  showCustomConfirm("Are you sure you want to reject and discard this proposed competition?", "Discard Proposal").then(confirmed => {
    if (!confirmed) return;

    competitions = competitions.filter(c => c.id !== compId);
    localStorage.setItem("utsav_competitions", JSON.stringify(competitions));
    
    alert("Competition proposal discarded.");
    renderAdminPortal();
  });
}

function exportRegistrationsCSV() {
  if (registrations.length === 0) {
    alert("No registrations available to export.");
    return;
  }

  // CSV headers
  let csvContent = "Roll No,Student Name,Class,Competition,Email,Phone,Registration Date\n";

  // CSV rows
  registrations.forEach(reg => {
    const comp = competitions.find(c => c.id === reg.compId);
    const compTitle = comp ? comp.title.replace(/,/g, " ") : "Unknown";
    const name = reg.studentName.replace(/,/g, " ");
    const sClass = reg.studentClass.replace(/,/g, " ");

    csvContent += `"${reg.rollNo}","${name}","${sClass}","${compTitle}","${reg.email}","${reg.phone}","${formatDate(reg.dateRegistered)}"\n`;
  });

  // Download logic
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `Janmashtami_Registrations_${new Date().toLocaleDateString()}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function resetAllData() {
  showCustomConfirm("CRITICAL WARNING: This will delete all student registrations, custom memories, and custom proposed competitions, resetting the application to default seed files. Proceed?", "Reset All Data").then(confirmed => {
    if (!confirmed) return;

    localStorage.removeItem("utsav_competitions");
    localStorage.removeItem("utsav_memories");
    localStorage.removeItem("utsav_registrations");

    initApp();
    alert("All application data has been reset to defaults.");
  });
}

// ==========================================
// 8. OTHER CORE UTILITIES
// ==========================================

function cycleWisdom() {
  activeWisdomIndex = (activeWisdomIndex + 1) % TEACHINGS.length;
  const card = document.getElementById("wisdom-card");
  const wisdomText = document.getElementById("wisdom-text");
  const wisdomChapter = document.getElementById("wisdom-chapter");

  // Fade out effect
  wisdomText.style.opacity = 0;
  wisdomChapter.style.opacity = 0;
  
  setTimeout(() => {
    wisdomText.textContent = `"${TEACHINGS[activeWisdomIndex].text}"`;
    wisdomChapter.textContent = TEACHINGS[activeWisdomIndex].chapter;
    
    wisdomText.style.opacity = 1;
    wisdomChapter.style.opacity = 1;
  }, 250);
}

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ==========================================
// 9. WEB AUDIO API SOUND GENERATION
// ==========================================

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Play a simulated breathy Indian woodwind flute (Bansuri) note
let lastPlayedFreq = 329.63; // starting pitch register

function playFluteTone(frequency, duration, volume) {
  try {
    initAudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator(); // Sine wave octave harmonic overtone
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Create Delay and Echo nodes for a temple-reverb atmosphere
    const delayNode = audioCtx.createDelay(1.0);
    const feedbackGain = audioCtx.createGain();
    const delayFilter = audioCtx.createBiquadFilter();

    delayNode.delayTime.value = 0.38; // 380ms delay length
    feedbackGain.gain.value = 0.42; // Feedback volume decay rate
    delayFilter.type = "lowpass";
    delayFilter.frequency.value = 750; // Soft warm echoes

    // Connect feedback loop
    delayNode.connect(delayFilter);
    delayFilter.connect(feedbackGain);
    feedbackGain.connect(delayNode);

    // Connect oscillators to lowpass filter
    osc.connect(filter);
    osc2.connect(filter);

    // Connect filter to main gain and delay node
    filter.connect(gainNode);
    filter.connect(delayNode);

    // Connect nodes to destination
    delayNode.connect(audioCtx.destination);
    gainNode.connect(audioCtx.destination);

    // Main breathy triangle wave
    osc.type = "triangle";
    osc.frequency.setValueAtTime(lastPlayedFreq, audioCtx.currentTime);
    // Smooth pitch glide (Meend)
    osc.frequency.exponentialRampToValueAtTime(frequency, audioCtx.currentTime + 0.12);

    // Sine harmonic wave (octave higher)
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(lastPlayedFreq * 2, audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(frequency * 2, audioCtx.currentTime + 0.12);

    // Soft classical vibrato
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 5.8; // 5.8Hz vibrato frequency
    lfoGain.gain.value = frequency * 0.012; // Pitch bend depth
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfoGain.connect(osc2.frequency);
    lfo.start();

    // Lowpass filter to soften attack and overtones
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(frequency * 1.8, audioCtx.currentTime);

    // Amplitude envelope: soft wind-blown breath attack
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.12); // 120ms fade in
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime + duration - 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.start();
    osc2.start();
    osc.stop(audioCtx.currentTime + duration);
    osc2.stop(audioCtx.currentTime + duration);
    lfo.stop(audioCtx.currentTime + duration);

    // Save pitch for next glide
    lastPlayedFreq = frequency;
  } catch (err) {
    console.warn("Audio playing blocked or failed", err);
  }
}

// Play short 3-note melody sweeps on interactions
function playShortFluteRiff() {
  playFluteTone(329.63, 0.25, 0.15); // E4
  setTimeout(() => playFluteTone(392.00, 0.25, 0.15), 180); // G4
  setTimeout(() => playFluteTone(440.00, 0.4, 0.2), 360); // A4
}

// Handcrafted classical Indian solo flute loop (Raag Bhupali Alaap)
const bhupaliMelody = [
  { note: 2, dur: 2.0 }, // E4
  { note: 3, dur: 1.0 }, // G4
  { note: 4, dur: 1.0 }, // A4
  { note: 5, dur: 3.5 }, // C5 (held)
  { note: 4, dur: 1.5 }, // A4
  { note: 3, dur: 1.5 }, // G4
  { note: 2, dur: 3.0 }, // E4
  { note: 1, dur: 1.0 }, // D4
  { note: 2, dur: 1.0 }, // E4
  { note: 0, dur: 4.5 }, // C4 (resolution)

  { note: 3, dur: 2.0 }, // G4
  { note: 4, dur: 1.0 }, // A4
  { note: 5, dur: 1.5 }, // C5
  { note: 6, dur: 3.5 }, // D5
  { note: 7, dur: 2.0 }, // E5
  { note: 6, dur: 1.5 }, // D5
  { note: 5, dur: 2.0 }, // C5
  { note: 4, dur: 1.5 }, // A4
  { note: 3, dur: 2.5 }, // G4
  { note: 2, dur: 1.5 }, // E4
  { note: 1, dur: 1.5 }, // D4
  { note: 0, dur: 5.0 }  // C4 (deep base note resolution)
];

let melodyIndex = 0;

// Generate continuous ambient flute loops
function startAmbientMusic() {
  if (isMusicPlaying) return;
  isMusicPlaying = true;
  
  const musicToggle = document.getElementById("music-toggle-btn");
  musicToggle.querySelector(".sound-wave").classList.add("playing");
  musicToggle.querySelector("i").className = "fa-solid fa-volume-high";

  // Try playing the user's custom MP3 file, with automatic fallback to Web Audio synthesis
  bgMusicAudio.play()
    .then(() => {
      console.log("Playing custom background music MP3 track.");
    })
    .catch(err => {
      console.warn("Audio playback of MP3 failed or blocked. Falling back to synthesised flute...", err);
      initAudioContext();
      melodyIndex = 0;
      playNextMelodyNote();
    });
}

function playNextMelodyNote() {
  if (!isMusicPlaying) return;
  
  // Random brief breath pauses to sound like a human flutist
  if (Math.random() > 0.85 && melodyIndex % 4 === 0) {
    melodyTimeout = setTimeout(playNextMelodyNote, 800); // 800ms breath pause
    return;
  }

  const item = bhupaliMelody[melodyIndex % bhupaliMelody.length];
  const freq = pentatonicScale[item.note];
  const duration = item.dur * 1.35; // note ring duration
  const vol = 0.08 + Math.random() * 0.015; // natural volume expression
  
  playFluteTone(freq, duration, vol);
  
  // Schedule next note based on duration (1 beat = 1100ms)
  melodyTimeout = setTimeout(playNextMelodyNote, item.dur * 1100);
  melodyIndex++;
}

function stopAmbientMusic() {
  isMusicPlaying = false;
  
  // Pause MP3 audio track
  if (bgMusicAudio) {
    bgMusicAudio.pause();
  }

  // Clear synthesized melody timeouts
  if (melodyTimeout) {
    clearTimeout(melodyTimeout);
    melodyTimeout = null;
  }
  
  const musicToggle = document.getElementById("music-toggle-btn");
  musicToggle.querySelector(".sound-wave").classList.remove("playing");
  musicToggle.querySelector("i").className = "fa-solid fa-music";
}

function toggleMusic() {
  if (isMusicPlaying) {
    stopAmbientMusic();
  } else {
    startAmbientMusic();
  }
}

// ==========================================
// CUSTOM POPUP ALERTS & CONFIRMATIONS SYSTEM
// ==========================================
function showCustomAlert(message, title = "Notification", type = "info") {
  const modal = document.getElementById("custom-popup");
  const modalTitle = document.getElementById("popup-title");
  const modalMsg = document.getElementById("popup-message");
  const modalIcon = document.getElementById("popup-icon");
  const cancelBtn = document.getElementById("popup-cancel-btn");
  const okBtn = document.getElementById("popup-ok-btn");

  if (!modal) return;

  // Set Content
  modalTitle.textContent = title;
  modalMsg.textContent = message;

  // Set Icon and colors based on type
  modalIcon.className = "fa-solid popup-icon";
  if (type === "error") {
    modalIcon.classList.add("fa-circle-exclamation");
    modalIcon.style.color = "#d11a2a";
  } else if (type === "success") {
    modalIcon.classList.add("fa-circle-check");
    modalIcon.style.color = "#4CAF50";
  } else if (type === "confirm") {
    modalIcon.classList.add("fa-circle-question");
    modalIcon.style.color = "#f2921d";
  } else {
    modalIcon.classList.add("fa-circle-info");
    modalIcon.style.color = "#189ab4";
  }

  // Ensure Cancel Button is hidden for simple alert
  cancelBtn.classList.add("hidden");

  // Show Modal
  modal.classList.remove("hidden");

  // Cleanup active handlers
  const handleOk = () => {
    modal.classList.add("hidden");
    okBtn.removeEventListener("click", handleOk);
  };
  okBtn.addEventListener("click", handleOk);
}

function showCustomConfirm(message, title = "Confirmation") {
  return new Promise((resolve) => {
    const modal = document.getElementById("custom-popup");
    const modalTitle = document.getElementById("popup-title");
    const modalMsg = document.getElementById("popup-message");
    const modalIcon = document.getElementById("popup-icon");
    const cancelBtn = document.getElementById("popup-cancel-btn");
    const okBtn = document.getElementById("popup-ok-btn");

    if (!modal) {
      resolve(false);
      return;
    }

    // Set Content
    modalTitle.textContent = title;
    modalMsg.textContent = message;

    // Set Icon
    modalIcon.className = "fa-solid fa-circle-question popup-icon";
    modalIcon.style.color = "#f2921d";

    // Show Cancel Button
    cancelBtn.classList.remove("hidden");

    // Show Modal
    modal.classList.remove("hidden");

    // Click Handlers
    const cleanUpAndResolve = (result) => {
      modal.classList.add("hidden");
      okBtn.removeEventListener("click", handleOkClick);
      cancelBtn.removeEventListener("click", handleCancelClick);
      resolve(result);
    };

    const handleOkClick = () => cleanUpAndResolve(true);
    const handleCancelClick = () => cleanUpAndResolve(false);

    okBtn.addEventListener("click", handleOkClick);
    cancelBtn.addEventListener("click", handleCancelClick);
  });
}

// Override native alert globally
window.alert = function(message) {
  let type = "info";
  let title = "Notification";
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("success") || lowerMsg.includes("congratulations") || lowerMsg.includes("approved")) {
    type = "success";
    title = "Success";
  } else if (lowerMsg.includes("invalid") || lowerMsg.includes("fail") || lowerMsg.includes("warning") || lowerMsg.includes("please fill")) {
    type = "error";
    title = "Alert";
  }
  
  showCustomAlert(message, title, type);
};

// Load App immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
