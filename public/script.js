document.getElementById('faq-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const review = document.getElementById('review').value;
    const userId = Math.floor(Math.random() * 10000);
    const faq = { id: userId, question: review };

    // Send FAQ to server
    fetch('/faqs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(faq),
    })
    .then(() => {
        // After adding a new FAQ, fetch and display the updated list
        loadFaqs();
    });

    // Clear the textarea
    document.getElementById('review').value = '';
});

function loadFaqs() {
    fetch('/faqs')
        .then(response => response.json())
        .then(faqs => {
            const faqsList = document.getElementById('faqs-list');
            faqsList.innerHTML = ''; // Clear existing FAQs
            faqs.forEach(faq => {
                const faqElement = document.createElement('div');
                faqElement.classList.add('faq-card');
                faqElement.innerHTML = `<p><strong>User${faq.id}:</strong> ${faq.question}</p>`;
                faqsList.appendChild(faqElement);
            });
        });
}

window.onload = loadFaqs;
