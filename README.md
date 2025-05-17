# Source Map Online Parser

<div align="center">
  <img src="design/logo.svg" alt="Source Map Online Parser Logo" width="200"/>
  <br/>
  <p><em>Online JavaScript Source Map parser, supporting single file parsing and error stack parsing</em></p>
</div>

## Features

- 🔍 **Source Map Parsing**: Parse and analyze JavaScript source maps online
- 📝 **Error Stack Parsing**: Convert minified error stacks to original source locations
- 🎯 **Single File Support**: Parse individual source map files
- 🌙 **Dark Mode**: Support for both light and dark themes
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Fast & Efficient**: Built with Next.js and optimized for performance

## Getting Started

### Prerequisites

- Node.js >= 22.15.0
- pnpm >= 10.11.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/whale4113/sourcemap-online
cd sourcemap-online
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Project Structure

```
sourcemap-online/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and shared logic
├── public/          # Static assets
└── styles/          # Global styles
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [source-map-js](https://github.com/7rulnik/source-map-js) - Source map parsing

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [source-map-js](https://github.com/7rulnik/source-map-js) for the source map parsing library
- All contributors who have helped shape this project
