// cursor.js
document.addEventListener("mousemove", e => {
    const cursor = document.getElementById("anime-cursor");
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  });
  