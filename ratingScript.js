// function highlightStars(starCount) {
//     for (let i = 1; i <= starCount; i++) {
//         const star = document.querySelector(`[for=star${i}]`);
//         star.style.color = '#5e8b62';
//     }
// }

// function resetStars() {
//     for (let i = 1; i <= 5; i++) {
//         const star = document.querySelector(`[for=star${i}]`);
//         star.style.color = 'black';
//     }
// }

// function submitRating(rating) {
//     const ratingForm = document.getElementById('ratingForm');
//     ratingForm.reset();

//     document.getElementById('ratingForm').style.display = 'none';
//     const thankYouMessage = document.getElementById('thankYouMessage');
//     thankYouMessage.style.display = 'block';

//     switch (rating) {
//         case 1:
//             thankYouMessage.innerText = "Thank you for rating 1 star. We will do better!";
//             break;
//         case 2:
//             thankYouMessage.innerText = "Thank you for rating 2 stars. Your feedback helps us improve!";
//             break;
//         case 3:
//             thankYouMessage.innerText = "Thank you for rating 3 stars. We appreciate your feedback!";
//             break;
//         case 4:
//             thankYouMessage.innerText = "Thank you for rating 4 stars. We're glad you had a positive experience!";
//             break;
//         case 5:
//             thankYouMessage.innerText = "Thank you for rating 5 stars. We appreciate your support!";
//             break;
//         default:
//             thankYouMessage.innerText = "Thank you for rating ${rating} stars. We value your feedback!";
//             break;
//     }

//     const resetButton = document.getElementById('resetButton');
//     resetButton.style.display = 'block';

//     const formData = new FormData(ratingForm);
//     formData.append('rating', rating);

//     const headers = new Headers();
//     headers.append('X-Sent-By', 'JavaScript');

//     fetch(ratingForm.action, {
//         method: 'POST',
//         headers: headers,
//         body: formData,
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
// }

// function resetRating() {
//     document.getElementById('ratingForm').style.display = 'block';
//     document.getElementById('thankYouMessage').style.display = 'none';

//     document.getElementById('resetButton').style.display = 'none';

//     resetStars();
// }

// document.getElementById('ratingForm').style.display = 'block';
