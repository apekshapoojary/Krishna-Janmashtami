# Walkthrough - Krishna Janmashtami Website

We have successfully developed the interactive, traditional, and playful Krishna Janmashtami website for **Dr. B.B. Hegde First Grade College, Kundapura**. The application contains functional modules for **Students**, **Organisers**, and **Admins** with data persistence via `localStorage`.

## 🌟 Visual Accomplishments & Aesthetics

1. **Cute Little Krishna Theme**:
   - Integrated the custom generated 3D Pixar-style image of Baby Krishna.
   - Designed a playful, traditional UI with a royal peacock-blue header, warm marigold garlands, and little baby Krishna footprints.
   - Designed a beautiful **Interactive Hero Centerpiece** displaying the user-provided high-definition illustration of Lord Krishna with a calf (`krishna_hero.jpg`) framed inside an elegant, lightweight card with a semi-translucent background, delicate double gold borders, inner padding, and soft floating drop shadows. The centerpiece has been expanded to a larger size (`max-width: 420px`), drifts slowly using a CSS float animation with an added top margin of `30px` to maintain clean visual spacing from the top border banner, and clicking anywhere on Krishna triggers a tactile scale-bounce animation while cycling wisdom teachings from the Bhagavad Gita.

2. **Epic Intro Animation**:
   - On load, the screen displays a mystical midnight-blue starry sky.
   - The loading/intro page features a beautiful landscape canvas painting of Yashoda Amma chasing little baby Krishna (`yashoda_chasing.jpg`), centered inside a soft rectangular golden aura glow with the gold-glowing subtitle **"Krishna Janmashtami"** directly beneath it. Both zoom out and disappear together with the glow.
   - As it disappears, the college logo and name emerge with a clean fade-in and a call-to-action button to enter the celebrations.
   - Both the baby Krishna logo and the subsequent college name reveal container are centered in the exact middle of the viewport using an overlapping CSS Grid configuration, preventing either element from displaying off-center at the top or bottom of the screen.

3. **Ambient Music & Audio Synthesizer**:
   - Programmed background ambient music to play the user's custom track **`assets/audio/krishna_flute.mp3`**.
   - Integrated an automatic **Web Audio API synthesizer fallback** loop. If browser security blocks or fails to load the MP3, it dynamically falls back to playing a synthesized bamboo flute melody.
   - The synthesised engine features a base breathy triangle oscillator, a sine harmonic octave overtone, and **exponential frequency glides (Meend)** that mimic natural Indian bansuri finger-sliding pitch shifts.
   - Added an **echo delay loop with feedback lowpass filtering** to the synthesizer to create a warm, deep, meditative temple-reverb acoustic atmosphere.
   - Hovering or clicking the interactive flute continues to trigger ascending flute sweeps, while all form submission, login success, demo filling, and action button sounds have been completely disabled for user comfort.

4. **Traditional & Festive Login Portal**:
   - Set the background to a cute, playful, 3D Pixar-style widescreen illustration of Baby Krishna playing with a pot of butter (`krishna_cute_bg.jpg`), shifting the background position horizontally to the right (`82% center`) and aligning the login card to the left side with a `4%` spacer (gutter) from the screen boundary on all laptop, desktop, and tablet displays (breakpoint `768px`). The card has a sufficient width scale of `450px`, keeping Baby Krishna fully visible and unobstructed on the right side of the screen.
   - Resolved a CSS selector ordering bug in `style.css` by moving the media query below the base `.auth-card` block, ensuring the left-alignment rules override the default centering margins.
   - Implemented a **3D Parallax Mouse-Tilt Effect** that tilts the login card and slides the background slightly in response to your cursor movements.
   - Added a playful, traditional **Yashoda Chasing Little Krishna runner animation** at the bottom of the login overlay screen (`.chase-animation-lane`). Hand-crafted custom SVG vectors of Little Krishna running (facing right, holding a butter pot) and Mother Yashoda chasing from behind. They continuously jog and run across the screen from left to right, adding a delightful, festive motion.
   - Styled the auth card as a traditional Indian scroll with a warm cream parchment background, a double-lined golden border, a marigold flower garland at the top, and a subtle peacock feather watermark in the corner.
   - Centered all header titles and decorative dividers (`.ornament`) to ensure a balanced, symmetric layout.
   - Removed the registration option entirely from the login portal; hidden the tab switcher and completely removed the registration form and associated event handlers, establishing a direct, clean login-only interface.
   - Changed password fields to **plain text** to make passwords visible as they are typed, removing/unvisibling the password dots.
   - Optimized script execution to trigger immediately on **DOM Content Loaded** instead of waiting for heavy background image downloads, resolving an issue where the "Create Account" button was unresponsive on slow network loads.
   - Implemented a responsive **Slide Entrance & Exit Animation** system for the login card. On desktop, the card slides in from the left and slides out left upon successful validation; on mobile, it slides up from the bottom and exits downward, ensuring a premium tactile transition.

5. **Custom Alert & Confirm Modal System**:
   - Replaced all native browser popups (`alert()` and `confirm()`) with a beautifully crafted, responsive **Custom Dialog Modal** (`#custom-popup`) that matches the festival's traditional scroll aesthetic.
   - Designed the popup with a warm cream parchment background, double gold borders, traditional typography, and a scale-spring springy entrance transition.
   - **Global Interceptor Override**: Globally intercepted the native `window.alert` method so that any existing or new call to `alert(message)` automatically opens the custom dialog. Dynamically detects keywords in the alert message to show a green check icon / "Success" title for success actions, or a red warning icon / "Alert" title for validation or credentials errors.
   - **Asynchronous Promise Confirmations**: Re-wrote all native `confirm` blocks (for logouts, reject/discard competition proposals, and app data resets) to use an asynchronous promise-based `showCustomConfirm` helper, keeping all actions safe, elegant, and native-feeling.

---

## 🛠️ Module Workflows Completed

### 1. Student View
- **Wisdom Board**: Click the butter pot to break it and reveal modern interpretations of Bhagavad Gita teachings.
- **Competitions list**: View active, approved events (fancy dress, dahi handi, etc.) with dates and rules (cash prizes have been completely removed from the entire application).
- **Registration Form**: Click "Register Now" on an event card to open a gorgeous **Full-Screen Split-Pane Event Details & Registration Interface** (`width: 100vw; height: 100vh;`). The left pane displays the large traditional banner image corresponding to the event, title, category, formatted date, venue, and full guidelines. The right pane displays the student registration form directly, allowing complete enrollment in one screen. The terms agreement checkbox has been removed.
- **Memory Lane**: Filter and browse memories (with pictures and stories) of previous years' celebrations.

### 2. Organiser View
- **Create Competition**: Propose new events (e.g. Dahi Handi Sprint). Removed category and cash prize options from the form for simplification, reorganizing the layout to pair event date and venue, and **added a Select Banner Image dropdown** allowing organisers to select a specific traditional Krishna illustration for their proposed event. Proposes them in a "Pending" state which requires Admin approval.
- **Add Memory**: Share stories, year tags, and pictures of past achievements which update instantly on the student portal.
- **Participant Rosters**: Select an active event and see a list of students registered, including contact details and registration dates.

### 3. Admin View
- **Dashboard Stats**: Real-time counts of total student sign-ups, active published events, and pending event approvals.
- **Approve Event Proposals**: Instantly approve or decline organizer-proposed events. Approved events are instantly published.
- **Master Roster**: A table of all student entries with a **CSV Export** button.
- **System Clear**: Wipe custom entries to reset the application back to its seeded template.

---

## 🔬 Verification & Testing

### Hosting & Deployment
- **Local Server**: Running locally at:
  👉 **[http://localhost:8000/index.html](http://localhost:8000/index.html)**
- **Production Vercel Live Build**: Fully deployed and active at:
  👉 **[https://krishna-janmashtami-pi.vercel.app](https://krishna-janmashtami-pi.vercel.app)**

- [x] **Intro Overlay**: Confirmed transition from the cosmic zoom-out animation to the college entry screen.
- [x] **Login & Registration Portal**: Verified that new students and organizers can register accounts. Verified role matching and password validation on login.
- [x] **Demo Login Shortcut**: Confirmed quick credentials fill-helper buttons work for Student, Organiser, and Admin.
- [x] **Role Access Isolation**: Logged in as different users and confirmed only the corresponding module (Student / Organiser / Admin) is accessible.
- [x] **Session Persistence**: Verified refreshing the page retains user login state.
- [x] **Logout Flow**: Verified logging out correctly clears the user session and takes the user back to the login wall.
- [x] **Student Registration Flow**: Logged in as student, registered for "Rangoli Artistry" and verified it appears under "My Registrations".
- [x] **CSV Export & Data Operations**: Verified exporting rosters as CSV and clearing system data work correctly.
- [x] **Web Audio API**: Checked synth generation and verified flute loops play smoothly without crashing or lag.
