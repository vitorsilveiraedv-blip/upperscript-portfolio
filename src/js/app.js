import { filterProjects, formatRepository, isValidEmail } from "./utils.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function setupNavigation() {
  const toggle = $(".menu-toggle");
  const nav = $("#site-nav");
  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("is-open", !isOpen);
  });
  $$("#site-nav a").forEach((link) => link.addEventListener("click", () => {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  }));
}

function setupProjectFilters() {
  const cards = $$(".project-card");
  $$(".filter-btn").forEach((button) => button.addEventListener("click", () => {
    const category = button.dataset.filter || "all";
    const visible = new Set(filterProjects(cards.map((card) => ({
      element: card, category: card.dataset.category
    })), category).map((item) => item.element));
    cards.forEach((card) => { card.hidden = !visible.has(card); });
    $$(".filter-btn").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    $("#empty-state").hidden = visible.size > 0;
  }));
}

async function loadRepositories() {
  const status = $("#github-status");
  const list = $("#github-repos");
  if (!status || !list) return;
  try {
    const response = await fetch("https://api.github.com/users/vitorsilveiraedv-blip/repos?sort=updated&per_page=4", {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      status.textContent = "No public repositories found yet.";
      return;
    }
    status.textContent = "Recently updated public repositories";
    data.map(formatRepository).forEach((repo) => {
      const item = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = repo.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = repo.name;
      const description = document.createElement("p");
      description.textContent = repo.description;
      const meta = document.createElement("span");
      meta.className = "repo-meta";
      meta.textContent = `${repo.language}  ·  ★ ${repo.stars}`;
      item.append(anchor, description, meta);
      list.append(item);
    });
  } catch (error) {
    status.textContent = "Live repository data is temporarily unavailable. Visit GitHub to explore the code.";
    console.error("Could not load GitHub repositories:", error);
  }
}

function setupContactForm() {
  const form = $("#contact-form");
  const input = $("#email");
  const message = $("#form-message");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input || !message) return;
    if (!isValidEmail(input.value)) {
      message.textContent = "Please enter a valid email address.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    message.textContent = "Email looks valid. This demo does not send or store messages.";
  });
  input?.addEventListener("input", () => input.removeAttribute("aria-invalid"));
}

setupNavigation();
setupProjectFilters();
setupContactForm();
$("#year").textContent = String(new Date().getFullYear());
loadRepositories();