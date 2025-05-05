// Game Class
class TrainClickGame {
    constructor() {
        this.clickCount = 0;
        this.firstWinThreshold = this.getRandomInt(1, 17);
        this.secondWinThreshold = this.getRandomInt(37, 1781);
        this.wins = 0;
        this.generateWinCodes();
        this.setupGame();
    }

    generateWinCodes() {
        // Generate unique random codes for each reward
        this.rewardCodes = {
            ticket: this.generateRandomCode(),
            nft: this.generateRandomCode(), 
            token: this.generateRandomCode()
        };
    }

    generateRandomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for(let i = 0; i < 11; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomReward() {
        const rewards = [
            {
                message: "Вы получили скидку на приобретение билета",
                code: this.rewardCodes.ticket
            },
            {
                message: "Вы получили памятное НФТ",
                code: this.rewardCodes.nft
            },
            {
                message: "Вы получили один токен",
                code: this.rewardCodes.token
            }
        ];
        return rewards[Math.floor(Math.random() * rewards.length)];
    }

    setupGame() {
        const gameContainer = document.createElement('div');
        gameContainer.id = 'game-container';
        
        // Create train
        this.train = document.createElement('div');
        this.train.id = 'train';
        this.train.innerHTML = `
            <div class="locomotive">
                <div class="door closed"></div>
            </div>
            <div class="wagon">
                <div class="door closed"></div>
            </div>
            <div class="wagon">
                <div class="door closed"></div>
            </div>
        `;

        // Add click handler
        this.train.addEventListener('click', () => this.handleClick());

        // Create click counter
        this.clickCounter = document.createElement('div');
        this.clickCounter.id = 'click-counter';
        this.clickCounter.innerHTML = `
            <div class="counter-text">Количество кликов: <span class="count-number">0</span></div>
            <div class="progress-indicator"></div>
        `;

        // Create message display
        this.messageDisplay = document.createElement('div');
        this.messageDisplay.id = 'message-display';

        gameContainer.appendChild(this.train);
        gameContainer.appendChild(this.clickCounter);
        gameContainer.appendChild(this.messageDisplay);
        
        // Create game section with title and description
        const gameSection = document.createElement('section');
        gameSection.className = 'game-section';
        gameSection.id = 'mini-game';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const gameTitle = document.createElement('h2');
        gameTitle.textContent = 'Проверь свою удачу!';
        
        const gameDescription = document.createElement('p');
        gameDescription.className = 'section-description';
        gameDescription.textContent = 'Щелкайте по поезду и выигрывайте призы! Двери могут скрывать ценные награды.';
        
        container.appendChild(gameTitle);
        container.appendChild(gameDescription);
        container.appendChild(gameContainer);
        gameSection.appendChild(container);
        
        // Insert before footer
        const footer = document.querySelector('footer');
        document.body.insertBefore(gameSection, footer);

        // Add navigation link to the game section
        this.addGameNavLink();
    }

    addGameNavLink() {
        // Add link to nav menu if it exists
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const gameLink = document.createElement('a');
            gameLink.href = '#mini-game';
            gameLink.textContent = 'Мини-игра';
            navLinks.appendChild(gameLink);
        }
    }

    handleClick() {
        this.clickCount++;
        this.updateClickCounter();
        this.animateDoors();
        this.updateProgressIndicator();

        if(this.clickCount === this.firstWinThreshold || 
           (this.wins === 1 && this.clickCount === this.secondWinThreshold)) {
            this.wins++;
            const reward = this.getRandomReward();
            this.showReward(reward);
        }
    }

    updateClickCounter() {
        const countElement = this.clickCounter.querySelector('.count-number');
        countElement.textContent = this.clickCount;
        
        // Add animation effect to the counter
        countElement.classList.add('count-updated');
        setTimeout(() => countElement.classList.remove('count-updated'), 300);
    }

    updateProgressIndicator() {
        const progressIndicator = this.clickCounter.querySelector('.progress-indicator');
        
        // Update progress bar based on clicks towards next threshold
        if (this.wins === 0) {
            // Progress towards first win
            const progress = Math.min((this.clickCount / this.firstWinThreshold) * 100, 100);
            progressIndicator.style.width = `${progress}%`;
            
            if (progress >= 70) {
                progressIndicator.classList.add('getting-close');
            } else {
                progressIndicator.classList.remove('getting-close');
            }
        } else if (this.wins === 1) {
            // Progress towards second win
            const progress = Math.min((this.clickCount / this.secondWinThreshold) * 100, 100);
            progressIndicator.style.width = `${progress}%`;
            
            if (progress >= 70) {
                progressIndicator.classList.add('getting-close');
            } else {
                progressIndicator.classList.remove('getting-close');
            }
        } else {
            // Max wins reached
            progressIndicator.style.width = '100%';
            progressIndicator.classList.add('max-wins');
        }
    }

    animateDoors() {
        const doors = document.querySelectorAll('.door');
        doors.forEach(door => {
            door.classList.remove('closed');
            setTimeout(() => door.classList.add('closed'), 500);
        });

        // Add shake animation to train
        this.train.classList.add('shake');
        setTimeout(() => this.train.classList.remove('shake'), 500);
    }

    showReward(reward) {
        this.messageDisplay.innerHTML = `
            <div class="reward-message">
                <h3>${reward.message}</h3>
                <p>Ваш код: <span class="reward-code">${reward.code}</span></p>
                <button class="copy-code-btn">Скопировать код</button>
            </div>
        `;

        // Add copy to clipboard functionality
        const copyBtn = this.messageDisplay.querySelector('.copy-code-btn');
        copyBtn.addEventListener('click', () => {
            const code = reward.code;
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.textContent = 'Скопировано!';
                setTimeout(() => {
                    copyBtn.textContent = 'Скопировать код';
                }, 2000);
            });
        });
    }
}

// CSS Styles
const gameStyles = `
    .game-section {
        background-color: var(--light);
        text-align: center;
        padding: var(--spacing-xl) 0;
        overflow: hidden;
        position: relative;
    }
    
    .game-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.8), transparent);
        z-index: 1;
    }

    #game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }

    #train {
        display: flex;
        cursor: pointer;
        margin-bottom: 20px;
        animation: trainFloat 3s infinite ease-in-out;
        position: relative;
    }
    
    #train.shake {
        animation: trainShake 0.5s;
    }
    
    @keyframes trainFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes trainShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .locomotive, .wagon {
        width: 100px;
        height: 60px;
        background-color: #4a90e2;
        margin-right: 5px;
        position: relative;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .locomotive {
        background-color: var(--primary-dark);
        border-radius: 15px 10px 10px 15px;
    }
    
    .locomotive::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 15px;
        background-color: var(--dark);
        left: -15px;
        top: 25px;
        border-radius: 5px 0 0 5px;
    }
    
    .locomotive::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: var(--dark);
        right: 30px;
        top: -10px;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .door {
        position: absolute;
        width: 20px;
        height: 40px;
        background-color: var(--gray-light);
        top: 10px;
        right: 10px;
        transition: transform 0.3s ease-in-out;
        border-radius: 2px;
    }

    .door.closed {
        transform: scaleX(1);
    }
    
    .door:not(.closed) {
        transform: scaleX(0);
    }
    
    #click-counter {
        width: 100%;
        max-width: 300px;
        margin: 15px 0;
        background-color: var(--white);
        padding: 10px;
        border-radius: var(--radius-md);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .counter-text {
        margin-bottom: 5px;
        font-weight: 600;
    }
    
    .count-number {
        color: var(--primary);
        font-weight: 700;
    }
    
    .count-number.count-updated {
        animation: pulse 0.3s;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .progress-indicator {
        height: 8px;
        background-color: var(--primary);
        width: 0%;
        border-radius: var(--radius-full);
        transition: width 0.3s ease-out;
    }
    
    .progress-indicator.getting-close {
        background-color: var(--secondary);
        animation: pulse-bg 1s infinite;
    }
    
    .progress-indicator.max-wins {
        background-color: #2ecc71;
    }
    
    @keyframes pulse-bg {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    #message-display {
        min-height: 100px;
        padding: 20px;
        text-align: center;
        width: 100%;
    }

    .reward-message {
        background-color: var(--primary);
        color: white;
        padding: 20px;
        border-radius: var(--radius-md);
        animation: popup 0.5s;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .reward-message h3 {
        color: white;
    }
    
    .reward-message p {
        margin-top: 10px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    
    .reward-code {
        font-family: monospace;
        font-size: 1.2em;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 3px 6px;
        border-radius: 4px;
        letter-spacing: 2px;
    }
    
    .copy-code-btn {
        background-color: white;
        color: var(--primary);
        border: none;
        border-radius: var(--radius-md);
        padding: 8px 16px;
        margin-top: 15px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
    }
    
    .copy-code-btn:hover {
        background-color: var(--gray-light);
        transform: translateY(-2px);
    }

    @keyframes popup {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    /* Track effect */
    .game-section::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10px;
        background: repeating-linear-gradient(
            90deg,
            var(--gray) 0,
            var(--gray) 20px,
            transparent 20px,
            transparent 40px
        );
    }
    
    /* Steam effect from locomotive */
    @keyframes steam {
        0% { 
            transform: translateY(0) scale(1);
            opacity: 0.7;
        }
        100% { 
            transform: translateY(-15px) scale(1.5);
            opacity: 0;
        }
    }
    
    .locomotive::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 15px;
        background-color: var(--dark);
        left: -15px;
        top: 25px;
        border-radius: 5px 0 0 5px;
    }
    
    @media (max-width: 768px) {
        .locomotive, .wagon {
            width: 80px;
            height: 50px;
        }
        
        .door {
            width: 16px;
            height: 30px;
        }
    }
`;

// Add styles to document
const gameStyleSheet = document.createElement('style');
gameStyleSheet.textContent = gameStyles;
document.head.appendChild(gameStyleSheet);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to make sure the page is fully loaded
    setTimeout(() => {
        const game = new TrainClickGame();
    }, 1000);
}); 