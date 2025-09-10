function previewImage() {
    const input = document.getElementById('imageUpload');
    const preview = document.getElementById('imagePreview');
    const resultDiv = document.getElementById('detectionResult');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Medical Image">`;

            // Send image to backend
            const formData = new FormData();
            formData.append('image', input.files[0]);

            fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.result_image_url) {
                    resultDiv.innerHTML = `<img src="${data.result_image_url}" alt="Detection Result">`;
                } else {
                    resultDiv.innerHTML = '<p>Error processing image</p>';
                }
            })
            .catch(err => {
                resultDiv.innerHTML = '<p>Server error</p>';
                console.error(err);
            });
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = "<p>No image selected</p>";
        resultDiv.innerHTML = "<p>Processed result will appear here</p>";
    }
}
