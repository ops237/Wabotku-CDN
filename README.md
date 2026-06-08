# Wabotku CDN

Wabotku CDN is a lightweight image uploader application built with Next.js 16 (App Router), React, and Tailwind CSS. It allows users to upload images (JPG, PNG, GIF, WEBP, SVG) up to 4 MB, using a GitHub repository as the backend storage solution.

## Features

- **Image Upload**: Supports JPG, PNG, GIF, WEBP, and SVG formats with a maximum file size of 4 MB.
- **Drag & Drop**: Seamlessly upload files using an intuitive drag-and-drop interface.
- **Image Preview**: View local previews before and during the upload process.
- **Progress Indicator**: Real-time visual feedback with a custom progress bar.
- **Instant URL**: Automatically generates a raw GitHub URL for the uploaded image, ready to be copied.
- **Upload History**: Keeps track of your recent uploads using `localStorage`.
- **Premium Aesthetics**: Features a high-contrast black theme with sharp-edged boxes, neon accents, and smooth interactive transitions.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icons)
- GitHub API for storage

## Installation & Setup

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/ops237/wabotku-cdn.git
    cd wabotku-cdn
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    GITHUB_TOKEN=your_personal_access_token
    GITHUB_OWNER=your_github_username
    GITHUB_REPO=your_repository_name
    GITHUB_BRANCH=main
    ```

    -   `GITHUB_TOKEN`: Your [GitHub Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with `repo` scope.
    -   `GITHUB_OWNER`: Your GitHub username.
    -   `GITHUB_REPO`: The name of the repository you want to use for image storage.
    -   `GITHUB_BRANCH`: The branch where files will be committed (usually `main`).

4.  **Run Locally**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1.  Push your code to a GitHub repository.
2.  Connect your repository to [Vercel](https://vercel.com/).
3.  Add the `GITHUB_*` environment variables in the Vercel dashboard.
4.  Deploy.

## Limitations

-   **File Size**: Maximum file size is 4 MB due to Vercel Serverless Function request body limits.
-   **Privacy**: Uploaded images are stored on GitHub and will be public if the repository is public. No automatic deletion is implemented.

## Author

**Irfan Maulana Saputra**  
Fullstack Developer | Backend Engineer

-   **GitHub**: [github.com/ops237](https://github.com/ops237)
-   **Web**: [Wabotku.com](https://wabotku.com)

## License

This project is licensed under the MIT License.

---

Wabotku CDN &copy; 2026 - Free Image Hosting up to 4MB
