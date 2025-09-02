const TOO_DARK = "too dark?"
const TOO_BRIGHT = "too bright?"

const toggleTheme = () => {
  const html = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');

  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    toggle.textContent = TOO_BRIGHT;
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    toggle.textContent = TOO_DARK;
    localStorage.setItem('theme', 'dark');
  }
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

if (shouldUseDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.querySelector('.theme-toggle').textContent = TOO_DARK;
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  document.querySelector('.theme-toggle').textContent = TOO_BRIGHT;
}
