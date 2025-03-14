document.addEventListener("DOMContentLoaded", function () {
    const switchForm = document.getElementById("switchForm");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const backToTop = document.getElementById("backToTop");

    // Ensure correct initial background
    document.body.classList.add("login-active");

    // Switch Forms
    switchForm.addEventListener("click", function () {
        loginForm.classList.toggle("hidden");
        signupForm.classList.toggle("hidden");

        if (loginForm.classList.contains("hidden")) {
            document.body.classList.replace("login-active", "signup-active");
        } else {
            document.body.classList.replace("signup-active", "login-active");
        }
    });

});

<div class="contact-form">
  <form id="contactForm">
    <div class="row">
      <div class="col-md-6">
        <input type="text" class="form-control mb-3" id="firstName" placeholder="Firstname" required />
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control mb-3" id="lastName" placeholder="Lastname" required />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <input type="email" class="form-control mb-3" id="email" placeholder="Email Address" required />
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control mb-3" id="phone" placeholder="Phone number" required />
      </div>
    </div>
    <div class="mb-3">
      <select class="form-select" id="service" required>
        <option selected disabled>Select a service</option>
        <option value="Web Development">Web Development</option>
        <option value="IT Consulting">IT Consulting</option>
        <option value="Technical Support">Technical Support</option>
      </select>
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="message" rows="5" placeholder="Type your message here." required></textarea>
    </div>
    <button type="submit" class="btn btn-success">Send message</button>
  </form>
</div>
