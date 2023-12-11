// class RatingWidget extends HTMLElement {
//     constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.innerHTML = `
//         <form id="ratingForm" action="https://httpbin.org/post" method="POST">
//             <label>How satisfied are you?</label> 
//             <input type="hidden" name="question" value="How satisfied are you?">
//             <input type="hidden" name="sentBy" value="JavaScript"> 
        
//             <input type="radio" id="star1" name="rating" value="1" style="display: none;">
//             <label for="star1" onmouseover="highlightStars(1)" onmouseout="resetStars()" onclick="submitRating(1)">&#9733;</label>
        
//             <input type="radio" id="star2" name="rating" value="2" style="display: none;">
//             <label for="star2" onmouseover="highlightStars(2)" onmouseout="resetStars()" onclick="submitRating(2)">&#9733;</label>
        
//             <input type="radio" id="star3" name="rating" value="3" style="display: none;">
//             <label for="star3" onmouseover="highlightStars(3)" onmouseout="resetStars()" onclick="submitRating(3)">&#9733;</label>
        
//             <input type="radio" id="star4" name="rating" value="4" style="display: none;">
//             <label for="star4" onmouseover="highlightStars(4)" onmouseout="resetStars()" onclick="submitRating(4)">&#9733;</label>
        
//             <input type="radio" id="star5" name="rating" value="5" style="display: none;">
//             <label for="star5" onmouseover="highlightStars(5)" onmouseout="resetStars()" onclick="submitRating(5)">&#9733;</label>
//         </form>
//     `;
//     }
//     connectedCallback() {
//         this.shadowRoot.querySelectorAll('label').forEach((label, index) => {
//             label.addEventListener('mouseover', () => this.highlightStars(index + 1));
//             label.addEventListener('mouseout', () => this.resetStars());
//             label.addEventListener('click', () => this.submitRating(index + 1));
//         });
//     }
// }

// window.customElements.define('rating-widget', RatingWidget);

function highlightStars(starCount) {
    for (let i = 1; i <= starCount; i++) {
        const star = document.querySelector(`[for=star${i}]`);
        star.style.color = '#5e8b62';
    }
}

function resetStars() {
    for (let i = 1; i <= 5; i++) {
        const star = document.querySelector(`[for=star${i}]`);
        star.style.color = 'black';
    }
}

function submitRating(rating) {
    const ratingForm = document.getElementById('ratingForm');
    ratingForm.reset();

    document.getElementById('ratingForm').style.display = 'none';
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';

    switch (rating) {
        case 1:
            thankYouMessage.innerText = "Thank you for rating 1 star. We will do better!";
            break;
        case 2:
            thankYouMessage.innerText = "Thank you for rating 2 stars. Your feedback helps us improve!";
            break;
        case 3:
            thankYouMessage.innerText = "Thank you for rating 3 stars. We appreciate your feedback!";
            break;
        case 4:
            thankYouMessage.innerText = "Thank you for rating 4 stars. We're glad you had a positive experience!";
            break;
        case 5:
            thankYouMessage.innerText = "Thank you for rating 5 stars. We appreciate your support!";
            break;
        default:
            thankYouMessage.innerText = "Thank you for rating ${rating} stars. We value your feedback!";
            break;
    }

    const resetButton = document.getElementById('resetButton');
    resetButton.style.display = 'block';

    const formData = new FormData(ratingForm);
    formData.append('rating', rating);

    const headers = new Headers();
    headers.append('X-Sent-By', 'JavaScript');

    fetch(ratingForm.action, {
        method: 'POST',
        headers: headers,
        body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function resetRating() {
    document.getElementById('ratingForm').style.display = 'block';
    document.getElementById('thankYouMessage').style.display = 'none';

    document.getElementById('resetButton').style.display = 'none';

    resetStars();
}

document.getElementById('ratingForm').style.display = 'block';
