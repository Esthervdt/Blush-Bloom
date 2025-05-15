"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // Common DOM Caching (all pages)
  // ================================
  const navbar = document.getElementById("navbar"); // header nav
  const navLinks = document.querySelectorAll("nav .nav-link"); // links to highlight
  const btnShop = document.querySelector(".btn-shop"); // “Shop Now” on index
  const wishlistBtns = document.querySelectorAll(".btn-wishlist"); // Collection page buttons

  // ================================
  // 1) NAVBAR: sticky + active link (all pages)
  // ================================
  window.addEventListener("scroll", () => {
    // add .sticky when scrolled down
    navbar.classList.toggle("sticky", window.scrollY > 50);
  });

  navLinks.forEach((link) => {
    // highlight current page link
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // ================================
  // 2) INDEX.HTML: Shop Now smooth scroll
  // ================================
  if (btnShop) {
    btnShop.addEventListener("click", () => {
      const section = document.getElementById("collection");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ================================
  // 3) COLLECTION.HTML: Wishlist toggle
  // ================================
  wishlistBtns.forEach((btn, idx) => {
    const key = `wishlist-${idx}`;
    // restore previous state
    if (localStorage.getItem(key) === "true") {
      btn.textContent = "Remove from Wishlist";
    }
    // toggle on click
    btn.addEventListener("click", () => {
      const added = localStorage.getItem(key) === "true";
      localStorage.setItem(key, String(!added));
      btn.textContent = added ? "Add to Wishlist" : "Remove from Wishlist";
    });
  });

  // ================================
  // 4) CONTACT.HTML: Contact form validation
  // ================================
  const contactForm = document.getElementById("contact-form");
  const contactFeedback = document.getElementById("contact-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent real submission

      // IDs of required fields
      const fields = ["name", "email", "message"];
      let allFilled = true;

      fields.forEach((id) => {
        const el = document.getElementById(id);
        const empty = !el.value.trim();
        el.classList.toggle("error", empty);
        if (empty) allFilled = false;
      });

      if (!allFilled) return;

      // show success message
      if (contactFeedback) {
        contactFeedback.textContent = "Thank you for your message!";
        contactFeedback.style.color = "lightgreen";
      }
      contactForm.reset();
    });
  }

  // ================================
  // 5) LOGIN.HTML: Login form handling
  // ================================
  const loginForm = document.getElementById("login-form");
  const userNameInput = document.getElementById("userName");
  const loginMessage = document.getElementById("login-message");
  const toggleLoginPwd =
    document.getElementById("toggle-password-login") ||
    document.getElementById("toggle-password");

  if (toggleLoginPwd && loginForm) {
    // checkbox or button to show/hide password
    toggleLoginPwd.addEventListener("click", () => {
      const pwdInput = document.getElementById("password");
      pwdInput.type = pwdInput.type === "password" ? "text" : "password";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = userNameInput.value.trim();
      if (!username) {
        loginMessage.textContent = "Username is required.";
        loginMessage.style.color = "red";
        return;
      }

      loginMessage.textContent = `Welcome back, ${username}!`;
      loginMessage.style.color = "lightgreen";
      loginForm.reset();
    });
  }

  // ================================
  // 6) SIGN-UP.HTML: Sign-up form handling
  // ================================
  const signupForm = document.getElementById("signup-form");
  const fullNameInput = document.getElementById("fullName");
  const signupEmailInput = document.getElementById("email");
  const signupPwdInput = document.getElementById("password");
  const signupMessage = document.getElementById("signup-message");
  const showPwdCheckbox = document.getElementById("show-password");

  if (showPwdCheckbox && signupPwdInput) {
    // checkbox toggles password visibility
    showPwdCheckbox.addEventListener("change", () => {
      signupPwdInput.type = showPwdCheckbox.checked ? "text" : "password";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = fullNameInput.value.trim();
      const email = signupEmailInput.value.trim();
      const pwd = signupPwdInput.value;

      if (!name) {
        signupMessage.textContent = "Name is required.";
        signupMessage.classList.remove("success");
        return;
      }
      if (!email.includes("@")) {
        signupMessage.textContent = "Enter a valid email.";
        signupMessage.classList.remove("success");
        return;
      }
      if (pwd.length < 8) {
        signupMessage.textContent = "Password must be at least 8 characters.";
        signupMessage.classList.remove("success");
        return;
      }

      signupMessage.textContent = `Welcome, ${name}!`;
      signupMessage.classList.add("success");
      signupForm.reset();
    });
  }
});
