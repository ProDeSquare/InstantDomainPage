const app = {
  domain: "prodesquare.com", // domain to sell

  seller: {
    name: "Hamza Mughal", // Seller Name
    email: "hamza@prodesquare.com", // Seller Email Address
  },

  form: {
    // form.api_url tells where to submit the form, e.g. formspree
    api_url: "https://api.domain.com/submit-form",
    method: "POST", // form submit method, {POST, GET}

    response: {
      success: "Your submission was successfully received!", // Success message upon successful form submission
      // Failure message if the form fails to submit
      failure:
        "An error occurred while submitting your request. Please feel free to contact us directly via email for assistance.",
    },
  },
};

export default app;
