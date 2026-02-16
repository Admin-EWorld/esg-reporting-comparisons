# DEPLOYMENT INSTRUCTIONS

The static ESG reports website has been built with Hugo and committed to a local Git repository.

To make the site live, follow these simple steps to connect this repository to a hosting platform like Netlify or GitHub Pages.

## Step 1: Push to Remote Repository

First, you must create a new *empty* repository on a remote service (like GitHub, GitLab, or Bitbucket) and push your local files to it.

1.  **Create Remote Repository:** Go to your preferred Git host (e.g., GitHub) and create a new repository (do **not** initialize it with a README or license).
2.  **Add Remote:** Replace `<YOUR_REMOTE_URL>` with the URL of your new repository and run the following commands from the `esg-reports-site` directory:
    ```bash
    git remote add origin <YOUR_REMOTE_URL>
    git branch -M main
    git push -u origin main
    ```

## Step 2: Connect to a Hosting Service (Netlify or GitHub Pages)

### Option A: Deploy with Netlify (Recommended for Hugo)

Netlify is the easiest way to deploy a Hugo site.

1.  **Sign Up/Log In:** Go to Netlify and log in.
2.  **New Site:** Click **"Add new site"** -> **"Import an existing project"**.
3.  **Connect Provider:** Connect to your Git provider (GitHub, GitLab, etc.) and select the repository you pushed in Step 1.
4.  **Configure Build Settings:**
    *   **Owner:** Your account
    *   **Branch to deploy:** `main`
    *   **Base directory:** (Leave blank)
    *   **Build command:** `hugo`
    *   **Publish directory:** `public`
5.  **Deploy Site:** Click **"Deploy site"**. Netlify will automatically build and publish your site, and it will redeploy every time you push a change to the `main` branch.

### Option B: Deploy with GitHub Pages

GitHub Pages can host your site directly from the repository.

1.  **Go to Repository:** Navigate to your repository on GitHub.
2.  **Settings:** Click the **"Settings"** tab.
3.  **Pages:** In the left sidebar, click **"Pages"**.
4.  **Configure Deployment:**
    *   **Source:** Select **"Deploy from a branch"**.
    *   **Branch:** Select the `main` branch.
    *   **Folder:** Select the `/public` folder.
5.  **Save:** Click **"Save"**. GitHub Pages will now publish the content of the `public` folder from the `main` branch. It may take a few minutes for the site to become available at the displayed URL.

---
**Note:** Hugo generates the static site into the `public/` directory. If you are using another service, ensure the build command is set to `hugo` and the publish/output directory is set to `public`.
