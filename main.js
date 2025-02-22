const commands = [
  'nblx invite',
  'nblx share',
  'nblx checkout',
  'nblx log',
  'nblx pull'
];

let currentCommandIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 50;
let newCommandDelay = 2000;

function typeCommand() {
  const currentCommand = commands[currentCommandIndex];
  const commandElement = document.getElementById('current-command');

  if (isDeleting) {
    commandElement.textContent = currentCommand.substring(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentCommandIndex = (currentCommandIndex + 1) % commands.length;
      setTimeout(typeCommand, newCommandDelay);
      return;
    }

    setTimeout(typeCommand, deletingDelay);
  } else {
    commandElement.textContent = currentCommand.substring(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === currentCommand.length) {
      isDeleting = true;
      setTimeout(typeCommand, newCommandDelay);
      return;
    }

    setTimeout(typeCommand, typingDelay);
  }
}

// Start the typing animation
setTimeout(typeCommand, newCommandDelay);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
