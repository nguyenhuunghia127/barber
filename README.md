# Barber House - Men's Grooming Studio

A modern, responsive, and mobile-first landing page designed for a premium Barber Shop. 
Built to provide a seamless user experience across all devices, focusing heavily on touch-friendly interactions and stunning aesthetics.

## 🚀 Key Features

*   **Mobile-First & Touch-Friendly:** Fully optimized for mobile devices with large touch targets (buttons, inputs) and smooth responsive flex/grid layouts.
*   **Dynamic Carousels (Drag-to-Scroll):** Includes custom auto-sliding carousels for the Hero Banner, Shop Interior, and Haircut Gallery. Features intelligent pause-on-hover and desktop drag-to-scroll functionality.
*   **Multi-Language Support:** Instant toggle between English (EN) and Vietnamese (VN) without page reloads.
*   **Booking System:** Integrated booking form with [Flatpickr](https://flatpickr.js.org/) for date/time selection. Form submissions are handled securely via [Web3Forms](https://web3forms.com/).
*   **Live Customer Reviews:** Dynamically fetches and displays real-time customer reviews and 5-star ratings from a connected Google Sheets database.
*   **Scroll Animations:** Smooth scroll-reveal animations using the Intersection Observer API.

## 📁 Project Structure

```text
barber_house/
├── index.html            # Main HTML layout
├── README.md             # Project documentation
├── .gitignore            # Git ignore rules
└── assets/
    ├── css/
    │   └── style.css     # Custom styles and Tailwind directives
    └── js/
        └── main.js       # Core JavaScript logic
```

## 🛠️ Technologies Used

*   **HTML5** (Semantic structure)
*   **Tailwind CSS** (Utility-first styling via CDN)
*   **Vanilla JavaScript** (ES6+, DOM manipulation, Intersection Observer)
*   **Web3Forms** (Contact/Booking form backend)
*   **Google Sheets API (gviz)** (Database for reviews)

## 💡 How to Run Locally

This is a static Front-end project. No complex build tools are required!
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. (Optional) For the best experience and to avoid CORS issues when fetching reviews, run a local development server (e.g., VS Code Live Server, or Python's `python -m http.server`).

## 🤖 Google Reviews Automation (Make.com)

This project uses a zero-cost, automated pipeline to sync 5-star Google Maps reviews to the website without using expensive 3rd-party widgets.

**Workflow:**
1. User clicks the "Review on Google" button on the website and leaves a review on Google Maps.
2. [Make.com](https://www.make.com/) (Free tier) acts as an automation bridge.
3. **Trigger:** Make.com watches for new reviews on Google Business Profile.
4. **Action:** If the review is 5 stars, Make.com extracts the Name, Rating, and Comment, and adds a new row to the linked Google Sheet (`1F6YAkHVe4AQq3_6ElJivWSOWcd3vAZlmuQ9vDz6vFwc`).
5. **Result:** The website dynamically fetches the updated Google Sheet data and displays the new review immediately.

### Setup Instructions for Make.com:
1. Create a new Scenario.
2. Add **Google Business Profile** module -> `Watch Reviews`. Connect your Google account and select your Barber Shop location.
3. Add **Google Sheets** module -> `Add a Row`. 
   - Connect the same Google account.
   - Select the Spreadsheet ID: `1F6YAkHVe4AQq3_6ElJivWSOWcd3vAZlmuQ9vDz6vFwc`.
   - Map Column B to `Reviewer Name`, Column E to `Star Rating`, and Column F to `Comment`.
4. Turn on Scheduling (e.g., Every 15 minutes) and Save.

---
*Designed for the best premium grooming experience.*
