 // Reasons database
 const reasons = [
    { 
         text: "Anh rất thích cách em nhìn nhận mọi thứ — nhẹ nhàng nhưng cũng rất tinh tế 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "Ở bên em anh thấy rất thoải mái, dù đôi khi anh cũng hơi 'ngứa đòn' để được em đấm 'yêu' nàyyy🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Có những ngày bận rộn, chỉ cần nghe giọng em là anh thấy mọi mệt mỏi đều tan biếnnn ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Sinh nhật năm nay, anh mong em luôn vui vẻ và là chính mình. Vì với anh, em như hiện tại đã rất đặc biệt rồi🥳 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Chưa hết đâu nha 😉💌";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}





// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);




document.addEventListener("mousemove", function (e) {

    const heart = document.createElement("div");

    const hearts = ["💖", "💕", "💗", "💘", "💝", "❤️"];

    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.pointerEvents = "none";
    heart.style.fontSize = Math.random() * 10 + 15 + "px";
    heart.style.zIndex = "999";

    document.body.appendChild(heart);

    gsap.to(heart, {
        y: -60,
        x: Math.random() * 60 - 30,
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        ease: "power1.out",
        onComplete: () => heart.remove()
    });

    const audio = document.getElementById('bgMusic');

    function playMusicOnInteraction() {
        if (audio.paused) {
            audio.volume = 0; // Bắt đầu từ im lặng
            audio.play().then(() => {
                // Nhạc to dần lên trong 2.5 giây
                gsap.to(audio, { volume: 0.6, duration: 2.5 });

                // Gỡ bỏ các "bẫy" để tránh chạy lại lệnh này
                ['click', 'touchstart', 'scroll', 'keydown'].forEach(event => {
                    window.removeEventListener(event, playMusicOnInteraction);
                });
            }).catch(error => {
                console.log("Đang đợi Hiền chạm vào màn hình...");
            });
        }
    }

    // Đăng ký các hành động để nhạc lên ngay lập tức
    window.addEventListener('click', playMusicOnInteraction);
    window.addEventListener('touchstart', playMusicOnInteraction);
    window.addEventListener('scroll', playMusicOnInteraction);
    window.addEventListener('keydown', playMusicOnInteraction);
    

   

    

});