document.addEventListener('DOMContentLoaded', function() {
    fetch('practice_questions.json') 
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const questionsContainer = document.getElementById('questions-container');
            data.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `
                    <h2>Question ${index + 1}</h2>
                    <p>${question.question}</p>
                    <ul class="options">
                        ${question.options.map(option => `
                            <li>
                                <label>
                                    <input type="radio" name="question${index}" value="${option}">
                                    ${option}
                                </label>
                            </li>
                        `).join('')}
                    </ul>
                `;
                questionsContainer.appendChild(questionDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching questions:', error); // Improved error logging
        });

    // Add event listener for the submit button
    document.getElementById('submit-btn').addEventListener('click', function() {
        // Adjust the path for the second fetch
        fetch('grade_11/practice/practice_questions.json') // Ensure correct relative path
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let score = 0;
                data.forEach((question, index) => {
                    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                    if (selectedOption && selectedOption.value === question.answer) {
                        score++;
                    }
                });
                const resultContainer = document.getElementById('result-container');
                resultContainer.innerHTML = `You scored ${score} out of ${data.length}`;
            })
            .catch(error => {
                console.error('Error fetching questions for grading:', error); // Error handling for grading
            });
    });
});
