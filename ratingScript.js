class RatingWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="style.css" media="screen">
            <form id="ratingForm" action="https://httpbin.org/post" method="POST">
                <label>How satisfied are you?</label> 
                <input type="hidden" name="question" value="How satisfied are you?">
                <input type="hidden" name="sentBy" value="JavaScript"> 
            
                <input type="radio" id="star1" name="rating" value="1" style="display: none;">
                <label for="star1">&#9733;</label>
            
                <input type="radio" id="star2" name="rating" value="2" style="display: none;">
                <label for="star2">&#9733;</label>
            
                <input type="radio" id="star3" name="rating" value="3" style="display: none;">
                <label for="star3">&#9733;</label>
            
                <input type="radio" id="star4" name="rating" value="4" style="display: none;">
                <label for="star4">&#9733;</label>
            
                <input type="radio" id="star5" name="rating" value="5" style="display: none;">
                <label for="star5">&#9733;</label>
            </form>
            <p id="thankYouMessage" style="display: none;"></p>
            <button id="resetButton" style="display: none;">Rate Again</button>
        `;

        this.ratingForm = this.shadowRoot.getElementById('ratingForm');
        this.thankYouMessage = this.shadowRoot.getElementById('thankYouMessage');
        this.resetButton = this.shadowRoot.getElementById('resetButton');
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('label').forEach((label, index) => {
            label.addEventListener('mouseover', () => this.highlightStars(index));
            label.addEventListener('mouseout', () => this.resetStars());
            label.addEventListener('click', () => this.submitRating(index));
        });
        this.resetButton.addEventListener('click', () => this.resetRating());
    }

    highlightStars(starCount) {
        for (let i = 1; i <= starCount; i++) {
            const star = this.shadowRoot.querySelector(`[for=star${i}]`);
            star.style.color = '#5e8b62';
        }
    }

    resetStars() {
        for (let i = 1; i <= 5; i++) {
            const star = this.shadowRoot.querySelector(`[for=star${i}]`);
            star.style.color = 'black';
        }
    }

    submitRating(rating) {
        this.ratingForm.reset();

        this.ratingForm.style.display = 'none';
        this.thankYouMessage.style.display = 'block';

        switch (rating) {
            case 1:
                this.thankYouMessage.innerText = "Thank you for rating 1 star. We will do better!";
                break;
            case 2:
                this.thankYouMessage.innerText = "Thank you for rating 2 stars. Your feedback helps us improve!";
                break;
            case 3:
                this.thankYouMessage.innerText = "Thank you for rating 3 stars. We appreciate your feedback!";
                break;
            case 4:
                this.thankYouMessage.innerText = "Thank you for rating 4 stars. We're glad you had a positive experience!";
                break;
            case 5:
                this.thankYouMessage.innerText = "Thank you for rating 5 stars. We appreciate your support!";
                break;
            default:
                this.thankYouMessage.innerText = `Thank you for rating ${rating} stars. We value your feedback!`;
                break;
        }

        this.resetButton.style.display = 'block';

        const formData = new FormData(this.ratingForm);
        formData.append('rating', rating);

        const headers = new Headers();
        headers.append('X-Sent-By', 'JavaScript');

        fetch(this.ratingForm.action, {
            method: 'POST',
            headers: headers,
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    resetRating() {
        this.ratingForm.style.display = 'block';
        this.thankYouMessage.style.display = 'none';
        this.resetButton.style.display = 'none';
        this.resetStars();
    }
}

window.customElements.define('rating-widget', RatingWidget);
