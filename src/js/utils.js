export function filterProjects(projects, category = "all") {
  if (!Array.isArray(projects)) return [];
  if (category === "all") return [...projects];
  return projects.filter((project) => project.category === category);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function formatRepository(repo) {
  return {
    name: String(repo.name ?? "Untitled repository"),
    description: String(repo.description ?? "No description provided."),
    url: String(repo.html_url ?? "#"),
    stars: Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : 0,
    language: String(repo.language ?? "Other")
  };
}