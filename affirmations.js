(async () => {
  try {
    // Fetch the text file
    const res = await fetch("./affirmations.txt");
    const text = await res.text();

    // Split into non-empty lines
    const AFFIRMATIONS = text
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);

    if (!AFFIRMATIONS.length) throw new Error("No affirmations found");

    // Get today's date (local timezone)
    const now = new Date();
    const key = now.toISOString().slice(0, 10); // YYYY-MM-DD

    // Deterministic hash so same day → same affirmation
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }

    const idx = hash % AFFIRMATIONS.length;

    // Inject into DOM
    document.getElementById("affirmation").textContent =
      AFFIRMATIONS[idx];

    document.getElementById("date").textContent =
      now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric"
      });

  } catch (err) {
    console.error(err);
    document.getElementById("affirmation").textContent =
      "Take a slow breath. You are doing enough.";
  }
})();
