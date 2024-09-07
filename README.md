# Instant Domain Page

**Instant Domain Page** instantly generates "Domain For Sale" page with ease. Built with **Preact** and **TypeScript**, it lets you quickly set up and deploy a professional sale page for your domain.

![Screenshot](https://cdn.prodesquare.com/gh/img/instant-domain-page-desktop.webp)

## Setup Guide

### Prerequisites
- **Node.js** along with **PNPM**

Install the dependencies
```shell
$ pnpm install
```

And run the app in the development mode with
```shell
$ pnpm run dev
```

This will serve the app on localhost running on port `8080`, to change the port number, edit `vite.config.ts`
```js
server: {
    ...
    port: 8080, // change this to your preffered port number, default is 5173
}
```

Now you can run the app in your browser on [127.0.0.1:8080](http://127.0.0.1:8080) *(replace 8080 with your port number)*

### Hacking
You can start customizing the details in `src/data/app.ts`
```typescript
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
```

Also, the default app title is `DOMAIN FOR SALE`, you can modify the `title` tag in `index.html` to change it.
```html
<title>xyz.tld is up for sale</title>
```

Furthermore, form fields are validated before the form is submitted. Validations include:
- Checks for empty fields
- Name is at least 3 characters long
- Email is a valid email
- Already submitted the form with the same email address (checks from local storage)
- Email must not be from the same domain e.g. if `xyz.tld` is being sold, don't allow `abc@xyz.tld`

This can be easily modified in `src/helpers/validate.ts`
```typescript
const validationCheck = (req: Record<string, string>): boolean => {
  // comment out any validation you want to remove
  if (requestHasEmptyFields(req)) return false;
  if (alreadyRequested(req.email)) return false;
  if (emailFromSameDomain(req.email)) return false;
  if (requestHasInvalidData(req)) return false;

  return true;
};
```

You can also change the way validation works, e.g. currently it only validates if the name is at least 3 characters long, you can add a regex to further restrict what a user can enter.
```typescript
// src/helpers/validate.ts
const requestHasInvalidData = (req: Record<string, string>): boolean => {
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (req.name.length < 3 || !emailRegex.test(req.email)) return true;

  return false;
};
```

Change the above example to something like
```typescript
const requestHasInvalidData = (req: Record<string, string>): boolean => {
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const nameRegex: RegExp = /^([^\p{N}\p{S}\p{C}\p{P}]{3,20})$/;
  if (!nameRegex.test(req.name) || !emailRegex.test(req.email)) return true;

  return false;
};
```

And you have better control what the name field accept.

#### Changing the Logo
App logo can be changed in `src/components/partials/Logo.tsx`. The default logo is stored in/as `public/prodesquare-logo.svg`. Copy your logo to the `public` directory and change the path in the `src/components/partials/Logo.tsx` component. E.g. your logo is titled `my-site-logo.png`, you'll then
```html
<img src="/my-site-logo.png" alt="Site Logo" />
```

Instead of copying the logo to the `public` directory, you can instead add the link to it
```html
<!-- src/components/partials/Logo.tsx -->
<img src="https://www.xyz.tld/img/my-site-logo.png" alt="Site Logo" />
```

#### Changing the styles
All the styles are located in `src/assets/styles.scss` file.

### Getting ready for production
Once you're happy with everything, you need to get it ready for deployment
```shell
$ pnpm run build
```

This would compile everything into the `dist` directory which would be ready for deployment.

### License
**Instant Domain Page** is licensed under **GNU General Public License v3.0**, check [LICENSE](./LICENSE) file for more info.

### Contributors
Coded with `<Love />` by **[Hamza The ProDeSquare Mughal](https://prodesquare.com)** on **VS Codium** using the **[Marine Dark](https://surl.prodesquare.com/l/marine-dark-marketplace)** theme.

#### Links:
- [Portfolio](https://prodesquare.com)
- [Email Address](mailto:hamza@prodesquare.com)
