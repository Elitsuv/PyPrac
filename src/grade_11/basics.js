document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const code = button.previousElementSibling.innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerText = 'Copied! to clipboard';
                setTimeout(() => {
                    button.innerText = 'Copy';
                }, 2000);
            });
        });
    });
});