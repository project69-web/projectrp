// ================= LOAD COMPONENT =================
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error("File tidak ditemukan");

    const data = await res.text();
    el.innerHTML = data;

  } catch (err) {
    console.error("Gagal load component:", file);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
  loadNews();
});


// ================= LOAD NEWS =================
async function loadNews() {
  const container = document.getElementById("news-container");
  if (!container) return;

  try {
    const res = await fetch("data/news.json");
    if (!res.ok) throw new Error("News tidak ditemukan");

    const data = await res.json();

    container.innerHTML = "";

    // clone biar gak merusak data asli
    [...data].reverse().forEach(item => {
      const div = document.createElement("div");
      div.className = "news-card";

      div.innerHTML = `
        <img src="${item.image || 'assets/images/hero.jpg'}" alt="news">
        <div class="news-content">
          <small>
            ${item.date || ''} 
            ${item.category ? '• ' + item.category : ''}
          </small>
          <h3>${item.title}</h3>
          <p>${item.content}</p>
          ${item.author ? `<span class="author">By ${item.author}</span>` : ''}
        </div>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Gagal load news:", err);
  }
}