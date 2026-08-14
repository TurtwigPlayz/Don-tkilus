document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

let yesVotes = 9;
let noVotes = 1;

const yesButton = document.getElementById("yesVote");
const noButton = document.getElementById("noVote");
const barFill = document.getElementById("barFill");
const voteText = document.getElementById("voteText");

function updateVote(message) {
  const total = yesVotes + noVotes;
  const yesPercent = Math.round((yesVotes / total) * 100);

  barFill.style.width = `${yesPercent}%`;
  voteText.textContent = `${yesPercent}% say SAVE GROUP 9. ${message}`;
}

yesButton.addEventListener("click", () => {
  yesVotes++;
  updateVote("Correct decision.");
  yesButton.textContent = "VOTE COUNTED ✓";
});

noButton.addEventListener("click", () => {
  // A little campaign-page bias never hurt anybody.
  yesVotes += 2;
  updateVote("Your vote has been respectfully overruled by the narrative.");
  noButton.textContent = "NICE TRY.";
});

const cards = document.querySelectorAll(".player-card, .reason");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 500, easing: "ease-out", fill: "forwards" }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

cards.forEach((card) => observer.observe(card));
