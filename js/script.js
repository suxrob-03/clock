const countdownEls = document.querySelectorAll(".countdown");

countdownEls.forEach((countdownEl) => createCountdown(countdownEl));

function createCountdown(countdownEl) {
  const target = new Date();
  const parts = {
    hours: { text: ["hour", "hour"], dots: 24 },
    minutes: { text: ["minut", "minute"], dots: 60 },
    seconds: { text: ["second", "second"], dots: 60 },
  };

  Object.entries(parts).forEach(([key, value]) => {
    const partEl = document.createElement("div");
    partEl.classList.add("part", key);
    partEl.style.setProperty("--dots", value.dots);
    value.element = partEl;

    const remainingEl = document.createElement("div");
    remainingEl.classList.add("remaining");
    remainingEl.innerHTML = `
    <span class="number"></span>
    <span class="text"></span>
    `;
    partEl.append(remainingEl);
    for (let i = 0; i < value.dots; i++) {
      const dotContainerEl = document.createElement("div");
      dotContainerEl.style.setProperty("--dot-idx", i);
      dotContainerEl.classList.add("dot-container");
      const dotEl = document.createElement("div");
      dotEl.classList.add("dot");
      dotContainerEl.append(dotEl);
      partEl.append(dotContainerEl);
    }
    countdownEl.append(partEl);
  });

  getRemainingTime(target, parts);
}
function getRemainingTime(target, parts, first = true) {
  setInterval(() => {
    const now = new Date();
    if (first);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = formatZeroes(hours);
    minutes = formatZeroes(minutes);
    seconds = formatZeroes(seconds);
    
    Object.entries({ hours, minutes, seconds }).forEach(([key, value]) => {
      const remaining = parts[key].element.querySelector(".number");
      const text = parts[key].element.querySelector(".text");
      remaining.innerText = value;
      text.innerText = parts[key].text[Number(value == 1)];
      const dots = parts[key].element.querySelectorAll(".dot");
      dots.forEach((dot, idx) => {
        dot.dataset.active = idx <= value;
        dot.dataset.lastactive = idx == value;
      });
    });

    function formatZeroes(time) {
      time = time.toString();
      return time.length < 2 ? "0" + time : time;
    }
  }, 1000);
}
