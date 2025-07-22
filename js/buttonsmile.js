document.addEventListener("DOMContentLoaded", () => {
    const emojis = ["😎", "🤖", "🔥", "🎉", "👾", "✨", "🧠", "🚀"];
    const buttons = document.querySelectorAll(".dark-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Вспышка
            button.classList.add("clicked");
            setTimeout(() => button.classList.remove("clicked"), 400);

            // Смайлик
            const emojiDiv = button.nextElementSibling;
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            emojiDiv.textContent = randomEmoji;
            emojiDiv.classList.add("show");

            // Автоматическое исчезновение через 2 секунды
            setTimeout(() => {
                emojiDiv.classList.remove("show");
            }, 2000);
        });
    });
});