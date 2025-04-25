document.addEventListener("DOMContentLoaded", () => {
    const comicUpload = document.getElementById("comic-upload");
    const comicTitle = document.getElementById("comic-title");
    const comicPreview = document.getElementById("comic-preview");
    const finishComic = document.getElementById("finish-comic");
    let uploadedPages = [];
  
    comicUpload.addEventListener("change", e => {
      comicPreview.innerHTML = "";
      uploadedPages = [];
    
      for (const file of e.target.files) {
        if (!file.type.startsWith("image/")) {
          alert(`${file.name} is not a valid image.`);
          continue;
        }
    
        const reader = new FileReader();
        reader.onload = function (event) {
          uploadedPages.push(event.target.result);
          const img = document.createElement("img");
          img.src = event.target.result;
          img.className = "rounded shadow-lg";
          comicPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
    
  
    finishComic.addEventListener("click", () => {
      const title = comicTitle.value.trim();
      if (!title || uploadedPages.length === 0) {
        alert("Enter title and at least one image.");
        return;
      }
  
      const comics = JSON.parse(localStorage.getItem("animeComics")) || {};
      comics[title] = { name: title, pages: uploadedPages };
      localStorage.setItem("animeComics", JSON.stringify(comics));
      window.location.href = "index.html#comics";
    });
  });
  