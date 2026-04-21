<p align="center">
  <img src="/public/img/kydo.png" width="120" alt="KYDO Logo" />
</p>

<div align="center">

# Personal Portfolio Website

A modern portfolio website showcasing your profile, tech stack, GitHub projects, GitHub statistics (repositories, followers, starred, etc.), personal blog, and social contacts. Built with Next.js, Tailwind CSS, and TypeScript, this portfolio is directly integrated with GitHub data and displays information dynamically.

</div>

---

## Demo

![alt text](/public/img/demo-image.png)

> Live demo is now available: [Live Demo (Website)](https://portofolio-kydo.vercel.app)

---

## Sections
- [x] Profile / Home
- [x] Blog
- [x] Projects
- [x] Socials
- [x] Stats

---

## Features
- [x] Dynamic GitHub data for profile stats, pinned repositories, followers, following, and starred repos
- [x] Discord avatar and presence integration
- [x] Tech stack showcase with animated marquee
- [x] Responsive navigation for desktop and mobile
- [x] Smooth page transitions with click sound effects
- [x] Social contact links for Discord, email, GitHub, X, and Steam

---

## Prerequisites

- Node.js (LTS version recommended)
- npm, yarn, or bun

---

## Installation & Development

1. Clone the repository
```bash
git clone https://github.com/88JC/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
bun install
```

3. (Optional) Set up environment variables in `.env` to avoid GitHub API rate limits:
```env
# GITHUB TOKEN
GITHUB_TOKEN=your_github_token
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This portfolio is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F88JC%2FPortfolio)

---

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request. You can also open an issue to discuss potential changes or enhancements.

## License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.