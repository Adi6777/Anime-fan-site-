document.addEventListener("DOMContentLoaded", () => {
  const comicsList = document.getElementById("comic-list");

  function renderComics() {
    comicsList.innerHTML = "";
    const comics = JSON.parse(localStorage.getItem("animeComics")) || {};

    Object.keys(comics).forEach((title) => {
      const comic = comics[title];
      const comicItem = document.createElement("div");
      comicItem.className = "rounded shadow-lg bg-white/5 p-4 hover:bg-white/10 transition cursor-pointer";
      comicItem.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">${comic.name}</h3>
        <img src="${comic.pages[0]}" alt="${comic.name}" class="rounded shadow-md max-h-48 object-cover w-full mb-2" />
        <p class="text-sm text-gray-300">${comic.pages.length} page(s)</p>
      `;
      comicItem.addEventListener("click", () => {
        window.location.href = `comic.html?title=${encodeURIComponent(title)}`;
      });
      comicsList.appendChild(comicItem);
    });

    if (Object.keys(comics).length === 0) {
      comicsList.innerHTML = `<p class="text-center text-gray-400 mt-6">No comics found.</p>`;
    }
  }

  renderComics();
});
