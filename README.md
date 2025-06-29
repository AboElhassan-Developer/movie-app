# 🎬 Movie App

A modern and responsive Angular application for browsing, searching, and managing a wishlist of movies. Built using **The Movie Database (TMDB) API**, the app supports multi-language translation and provides users with a seamless movie exploration experience.

## 🌍 Live Demo

🔗 [Live Site on Netlify/Vercel](https://my-movie-app-2025.netlify.app/)  
🔗 [GitHub Repository](https://github.com/AboElhassan-Developer/movie-app)

---

## 📸 Screenshots

![Screenshot (348)](https://github.com/user-attachments/assets/2b41d2df-b296-493c-8656-3263a1e948fa)


---

## 🚀 Features

- 🔥 **Now Playing Movies**  
  View the latest trending movies from TMDB.

- 🔍 **Search Movies**  
  Search for any movie title and display results instantly.

- 🧾 **Movie Details Page**  
  View full details about any movie including overview, genres, rating, and recommendations.

- 💖 **Wishlist Management**  
  Add or remove movies from a persistent wishlist (saved using `localStorage`).

- 🌐 **Multi-language Support**  
  Supports English, Arabic, French, and Chinese with dynamic content switching and direction (RTL/LTR).

- 📱 **Responsive Design**  
  Optimized for desktop and mobile view using Bootstrap.

---

## 🧰 Tech Stack

- **Framework:** Angular 17 (with standalone components)
- **Language:** TypeScript
- **Styling:** SCSS, Bootstrap 5
- **API:** [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **State Management:** RxJS BehaviorSubject
- **Routing:** Angular Router
- **Storage:** LocalStorage for wishlist
- **Deployment:** Vercel / Netlify

---

## 🧑‍💻 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/AboElhassan-Developer/movie-app.git

# Navigate to project directory
cd movie-app

# Install dependencies
npm install

# Run the app locally
ng serve
