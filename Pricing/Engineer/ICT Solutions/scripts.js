document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".toggle-info-btn");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentCard = btn.closest(".pricing-card");
      const moreInfo = parentCard.querySelector(".more-info");

      if (moreInfo.classList.contains("hidden")) {
        moreInfo.classList.remove("hidden");
        btn.textContent = "Hide Details";
      } else {
        moreInfo.classList.add("hidden");
        btn.textContent = "View More";
      }
    });
  });
});
