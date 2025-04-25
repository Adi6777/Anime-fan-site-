document.addEventListener("DOMContentLoaded", () => {
    const comicList = document.getElementById("comic-list");
    comicList.innerHTML = ""; // Clear old content
  
    const comics = JSON.parse(localStorage.getItem("animeComics")) || {};
  
    for (const [name, comic] of Object.entries(comics)) {
      const card = document.createElement("div");
      card.className = "bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transition-transform";
      card.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${name}</h3>
        <img src="${comic.pages[0]}" class="rounded max-h-48 object-cover" />
        <a href="comic.html?title=${encodeURIComponent(name)}" class="block mt-2 text-purple-300 hover:underline">Read Comic</a>
      `;
      comicList.appendChild(card);
    }
  

    });