document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
  
    const comics = JSON.parse(localStorage.getItem("animeComics")) || {};
    const comic = comics[title];
  
    if (!comic) {
      document.body.innerHTML = "<h2 class='text-center pt-32'>Comic Not Found</h2>";
      return;
    }
  
    const comicNameEl = document.getElementById("comic-name");
    const comicPage = document.getElementById("comic-page");
    const pageIndicator = document.getElementById("page-indicator");
  
    let currentPage = 0;
  
    function updatePage() {
      comicPage.src = comic.pages[currentPage];
      pageIndicator.textContent = `Page ${currentPage + 1} of ${comic.pages.length}`;
    }
  
    comicNameEl.textContent = comic.name;
    updatePage();
  
    document.getElementById("prev-page").addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        updatePage();
      }
    });
  
    document.getElementById("next-page").addEventListener("click", () => {
      if (currentPage < comic.pages.length - 1) {
        currentPage++;
        updatePage();
      }
    });
  
    document.getElementById("rename-comic").addEventListener("click", () => {
      const newName = prompt("Enter new comic title:", comic.name);
      if (newName && newName !== comic.name) {
        if (comics[newName]) {
          alert("A comic with that title already exists!");
          return;
        }
        comics[newName] = { ...comic, name: newName };
        delete comics[title];
        localStorage.setItem("animeComics", JSON.stringify(comics));
        window.location.href = `comic.html?title=${encodeURIComponent(newName)}`;
      }
    });
  
    document.getElementById("delete-comic").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this comic?")) {
          const comics = JSON.parse(localStorage.getItem("animeComics")) || {};
          delete comics[title];
          localStorage.setItem("animeComics", JSON.stringify(comics));
          window.location.href = "index.html";
          window.location.reload();
        }
      });
      
  

  
    // Fullscreen viewer
    comicPage.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        comicPage.requestFullscreen();
      }
    });
  
    // Zoom on scroll
    let zoom = 1;
    comicPage.addEventListener("wheel", (e) => {
      e.preventDefault();
      zoom += e.deltaY * -0.001;
      zoom = Math.min(Math.max(zoom, 0.5), 2);
      comicPage.style.transform = `scale(${zoom})`;
    });
  });
  