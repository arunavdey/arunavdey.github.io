export type Theme = "coffee" | "cyberpunk"

const STORAGE_KEY = "theme"

export function getStoredTheme(): Theme {
  return localStorage.getItem(STORAGE_KEY) === "cyberpunk" ? "cyberpunk" : "coffee"
}

export function applyTheme(theme: Theme): void {
  if (theme === "cyberpunk") {
    document.documentElement.setAttribute("data-theme", "cyberpunk")
  } else {
    document.documentElement.removeAttribute("data-theme")
  }
  localStorage.setItem(STORAGE_KEY, theme)
}
