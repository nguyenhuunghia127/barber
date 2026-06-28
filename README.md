<div align="center">
  <img src="https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?w=1200&h=400&fit=crop&q=80" alt="1997 Barber Banner">

  <h1 align="center">1997 Barber - Men's Grooming Studio</h1>

  <p align="center">
    A Modern, High-Performance, Mobile-First Landing Page for a Premium Barbershop.
    <br />
    <a href="https://barber-eight-omega.vercel.app/"><strong>View Live Demo »</strong></a>
    <br />
    <br />
    <a href="#about-the-project">About</a>
    ·
    <a href="#key-features">Features</a>
    ·
    <a href="#getting-started">Deployment</a>
    ·
    <a href="#configuration">Configuration</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

---

## 📖 About The Project

**1997 Barber** is a custom-built, modern landing page designed specifically for barbershops and men's grooming salons. The primary goal of this project is to create an immediate visual impact, build trust with potential clients, and seamlessly convert visitors into booked appointments.

This static web application requires zero server-side maintenance, leveraging third-party APIs and widgets to handle dynamic content like customer reviews, social media feeds, and email booking notifications.

### 🎯 Key Features

*   📱 **Mobile-First & Fully Responsive:** Designed to look flawless on smartphones, tablets, and desktops using the powerful utility classes of Tailwind CSS.
*   🌍 **Bilingual Support (I18n):** Users can instantly toggle between English and Vietnamese. The translation is handled natively via JavaScript without page reloads.
*   ⭐ **Live Google Maps Reviews:** Integrates the [Trustindex](https://www.trustindex.io/) widget to dynamically pull and display authentic 5-star reviews directly from your Google Business Profile, maximizing social proof.
*   🎵 **TikTok Social Feed:** Keeps the website fresh and engaging by embedding your latest TikTok videos automatically via [Elfsight](https://elfsight.com/).
*   📅 **Smart Booking Form:** A fully functional booking system equipped with a date/time picker ([Flatpickr](https://flatpickr.js.org/)) that sends booking requests straight to your email using [Web3Forms](https://web3forms.com/).
*   🚀 **Insanely Fast:** Pure HTML/JS/CSS architecture with lazy-loading images ensures near-instant page load speeds.
*   🔍 **Advanced Local SEO:** Pre-configured with Open Graph tags for social media sharing, Canonical links, and `LocalBusiness` JSON-LD Schema markup to dominate local Google search results.

---

## 🧰 Built With

This project relies on the following open-source technologies and third-party services:

*   **Markup & Styling:** [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) & [Tailwind CSS v3](https://tailwindcss.com/)
*   **Interactivity:** Vanilla JavaScript (ES6)
*   **Icons:** [Phosphor Icons](https://phosphoricons.com/) / SVG
*   **Date Picker:** [Flatpickr](https://flatpickr.js.org/)
*   **Form Backend:** [Web3Forms](https://web3forms.com/) (No-code email API)
*   **Widgets:** [Trustindex](https://www.trustindex.io/) (Reviews) & [Elfsight](https://elfsight.com/) (Social Feed)

---

## 📂 Project Structure

```text
barber_house/
├── index.html            # The main landing page file (All UI & Logic included)
├── README.md             # Project documentation
├── .gitignore            # Git configuration
├── img/                  # Local image assets (Logo, Favicon)
└── assets/
    ├── css/
    │   └── style.css     # Custom CSS overrides and Tailwind directives
    └── js/
        └── main.js       # Core JavaScript (Animations, Language Toggle, etc.)
```

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You only need a modern web browser (Chrome, Safari, Firefox, Edge). No Node.js or backend servers are required!

### Local Installation

1. Clone the repository
   ```sh
   git clone https://github.com/nguyenhuunghia127/barber.git
   ```
2. Navigate to the project directory
   ```sh
   cd barber
   ```
3. Open `index.html` in your browser.
   *(Optional but recommended: Use an extension like **Live Server** in VS Code to view changes in real-time without refreshing).*

---

## 🌐 Deployment (Vercel)

This project is highly optimized for deployment on [Vercel](https://vercel.com/), the easiest platform for frontend frameworks and static sites.

1. Commit and push your code to a GitHub repository.
2. Log in to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: `Other`, Build Command: `None`, Output Directory: `None`).
5. Click **Deploy**.
6. Within seconds, your site will be live. You can add a **Custom Domain** (e.g., `1997barber.com`) in your project's `Settings > Domains` on Vercel.

---

## ⚙️ Configuration Guide

To make this website yours, you need to configure the third-party services used in the project.

### 1. Booking Notifications (Web3Forms)
Currently, when a user submits a booking, it goes to the default email. To receive bookings to **your** email:
1. Go to [Web3Forms](https://web3forms.com/) and enter your email address to get a free **Access Key**.
2. Open `index.html` and locate the booking form: `<form id="booking-form">`.
3. Find the hidden input: `<input type="hidden" name="access_key" value="...">`.
4. Replace the `value` with your newly generated Access Key.

### 2. Google Reviews (Trustindex)
To display your own Google Maps reviews:
1. Create a free account at [Trustindex.io](https://www.trustindex.io/).
2. Connect your Google Business Profile.
3. Customize your widget layout and copy the generated `<script>` tag.
4. Open `index.html`, find the `Customer Reviews` section, and replace the existing Trustindex script with yours.

### 3. TikTok Feed (Elfsight)
To display your own TikTok videos:
1. Create a free account at [Elfsight.com](https://elfsight.com/).
2. Create a **TikTok Feed** widget and input your TikTok username.
3. Copy the generated `<div>` and `<script>` code.
4. Open `index.html`, find the `Follow us on TikTok` section, and replace the existing Elfsight code with yours.

---

## 📞 Contact & Support

**1997 Barber Studio**
- **Address:** 24654 Joyce street, Hayward 94544
- **Phone:** 510-501-0274
- **Email:** tuaudi@gmail.com

---
*Designed to deliver the ultimate masculine grooming experience.*
