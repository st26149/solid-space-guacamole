document.addEventListener("DOMContentLoaded", () => {
   const contactForm = document.querySelector('.contact-form-box');
   const successBox = document.getElementById('form-success-message');


   const targetHomeLinks = document.querySelectorAll('.glass-nav a[href="#home"]');
   const targetCuisineLinks = document.querySelectorAll('.glass-nav a[href="#cultural-cuisine"]');
   const targetContactLinks = document.querySelectorAll('.glass-nav a[href="#contact-us"], .glass-nav a[href="index.html#contact-us"]');


   targetHomeLinks.forEach(link => link.addEventListener('click', (e) => {
       e.preventDefault();
       window.scrollTo({ top: 0, behavior: 'smooth' });
   }));


   targetCuisineLinks.forEach(link => link.addEventListener('click', (e) => {
       e.preventDefault();
       const element = document.getElementById('cultural-cuisine');
       if(element) element.scrollIntoView({ behavior: 'smooth' });
   }));


   targetContactLinks.forEach(link => link.addEventListener('click', (e) => {
       e.preventDefault();
       const element = document.getElementById('contact-us');
       if(element) element.scrollIntoView({ behavior: 'smooth' });
   }));


   if (contactForm) {
       contactForm.addEventListener('submit', (event) => {
           event.preventDefault();
           const formData = new FormData(contactForm);


           contactForm.style.opacity = '0.4';
           contactForm.style.pointerEvents = 'none';


           fetch('https://api.web3forms.com/submit', {
               method: 'POST',
               body: formData
           })
           .then(response => response.json())
           .then(data => {
               if (data.success) {
                   contactForm.style.display = 'none';
                   if (successBox) {
                       successBox.style.display = 'block';
                       successBox.innerHTML = "✨ Message sent successfully!";
                   }
                   setTimeout(() => {
                       contactForm.reset();
                       contactForm.style.opacity = '1';
                       contactForm.style.pointerEvents = 'auto';
                       contactForm.style.display = 'block';
                       successBox.style.display = 'none';
                   }, 4000);
               } else {
                   alert("Something went wrong. Please try again.");
                   contactForm.style.opacity = '1';
                   contactForm.style.pointerEvents = 'auto';
               }
           })
           .catch(error => {
               console.error("Form transmission error:", error);
               contactForm.style.opacity = '1';
               contactForm.style.pointerEvents = 'auto';
           });
       });
   }
});



