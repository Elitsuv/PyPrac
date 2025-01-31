document.addEventListener('DOMContentLoaded', function() {
    fetch('grade_11/practice/practice_questions.json') // Adjusted path
        .then(response => response.json())
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
        .catch(error => console.error('Error fetching questions:', error));

    document.getElementById('submit-btn').addEventListener('click', function() {
        fetch('grade_11/practice/practice_questions.json') // Adjusted path
            .then(response => response.json())
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
            .catch(error => console.error('Error fetching questions:', error));
    });
});
