# Development Guide - Code Court VS Code Extension

## 🎯 Project Structure

```
codecourt-vscode/
├── src/
│   ├── auth/              # Authentication logic
│   │   └── AuthManager.ts
│   ├── api/               # API client
│   │   └── CodeCourtClient.ts
│   ├── providers/         # VS Code providers (tree views, etc.)
│   │   └── SnippetsProvider.ts
│   ├── commands/          # Command handlers
│   │   └── index.ts
│   ├── utils/             # Utilities
│   │   ├── Logger.ts
│   │   └── config.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   └── extension.ts       # Extension entry point
├── assets/                # Icons and images
├── dist/                  # Compiled output (webpack)
├── .vscode/               # VS Code debug configuration
│   ├── launch.json
│   └── tasks.json
├── package.json           # Extension manifest
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack bundler configuration
├── .eslintrc.json         # ESLint rules
└── .prettierrc.json       # Prettier formatting rules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- VS Code 1.85+
- npm or pnpm

### Installation
```bash
npm install
```

### Development Workflow

**1. Start Watch Mode**
```bash
npm run watch
```
This runs webpack in watch mode - it recompiles whenever you save files.

**2. Debug Extension**
- Press `F5` in VS Code
- Or: Run > Start Debugging
- This opens a new VS Code window with the extension loaded

**3. Make Changes**
- Edit source files in `src/`
- Webpack automatically recompiles
- Reload the Extension Development Host: `Ctrl+R` (or `Cmd+R` on Mac)

### Available Scripts

```bash
# Development
npm run watch          # Webpack watch mode
npm run compile        # Production build

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix linting issues
npm run format         # Format code with Prettier

# Testing
npm test               # Run tests (to be implemented)

# Packaging
npm run package        # Create .vsix package for distribution
npm run publish        # Publish to VS Code Marketplace
```

## 🏗️ Architecture Principles

This extension follows **clean code** and **SOLID principles**:

### 1. Single Responsibility Principle (SRP)
Each class has one job:
- `AuthManager` - Handles authentication only
- `CodeCourtClient` - API communication only
- `SnippetsProvider` - Tree view data only
- `Logger` - Logging only

### 2. Dependency Injection
Services are injected via constructor:
```typescript
// Good - Testable, maintainable
class CodeCourtClient {
  constructor(private readonly authManager: AuthManager) {}
}

// Bad - Hard-coded dependency
class CodeCourtClient {
  private authManager = new AuthManager();
}
```

### 3. Type Safety
All functions have explicit return types and parameter types.

### 4. Error Handling
- Try-catch in async functions
- Centralized error logging via `Logger`
- User-friendly error messages

### 5. Configuration
- Centralized in `utils/config.ts`
- Type-safe access to settings

## 📝 Code Style

### TypeScript
- Use strict mode (configured in tsconfig.json)
- No implicit any
- Explicit return types
- No unused variables (except prefixed with `_`)

### Naming Conventions
- **Classes**: PascalCase (`AuthManager`)
- **Functions**: camelCase (`getAuthData()`)
- **Constants**: UPPER_CASE (`AUTH_SECRET_KEY`)
- **Private members**: prefix with `_` only if needed
- **Unused params**: prefix with `_` (`_param`)

### Comments
- JSDoc for public functions
- Inline comments for complex logic only
- Self-documenting code preferred

## 🔒 Security Best Practices

### 1. Token Storage
- **NEVER** store tokens in plaintext
- Use VS Code `SecretStorage` API
- Check expiration before use

### 2. API Communication
- Always use HTTPS
- Bearer token in Authorization header
- Validate responses

### 3. User Input
- Validate all user input
- Sanitize before API calls
- Show meaningful errors

## 🧪 Testing Strategy

### Unit Tests (Phase 6)
- Test each class in isolation
- Mock dependencies
- Use VS Code testing framework

### Integration Tests (Phase 6)
- Test command execution
- Test API client with mock server
- Test authentication flow

### Manual Testing Checklist
- [ ] Extension activates without errors
- [ ] Commands appear in Command Palette
- [ ] Tree view renders correctly
- [ ] Authentication flow works
- [ ] Snippets load and refresh
- [ ] Insert snippet works
- [ ] Create snippet works
- [ ] Search works
- [ ] Settings are respected

## 📦 Packaging for Distribution

### Before Publishing
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Test thoroughly
4. Run `npm run lint`
5. Run `npm run compile`
6. Test the built extension

### Create .vsix Package
```bash
npm run package
```

This creates `codecourt-{version}.vsix` file.

### Install Locally for Testing
```bash
code --install-extension codecourt-{version}.vsix
```

### Publish to Marketplace
```bash
npm run publish
```

## 🐛 Debugging Tips

### View Extension Logs
1. Open Output panel: View > Output
2. Select "Code Court" from dropdown

### Debug Breakpoints
1. Set breakpoints in source files
2. Press `F5` to start debugging
3. Use Debug Console for variable inspection

### Common Issues

**Extension doesn't activate:**
- Check Output panel for errors
- Verify `activationEvents` in package.json
- Check extension.ts for initialization errors

**Commands not appearing:**
- Verify `contributes.commands` in package.json
- Check command registration in commands/index.ts
- Reload window: `Developer: Reload Window`

**Build fails:**
- Run `npm run lint` to check for errors
- Check TypeScript compilation errors
- Verify all imports are correct

## 🔄 Git Workflow

### Branching Strategy
- `main` - Production-ready code
- `develop` - Active development
- `feature/*` - New features
- `fix/*` - Bug fixes

### Commit Messages
Follow conventional commits:
```
feat: Add search snippets command
fix: Resolve token expiration issue
docs: Update development guide
chore: Update dependencies
```

## 📚 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Guides](https://code.visualstudio.com/api/extension-guides/overview)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 🤝 Contributing

1. Create feature branch from `develop`
2. Make changes following code style
3. Add tests if applicable
4. Run linter and fix issues
5. Update documentation
6. Create pull request

---

**Phase 1 Complete** ✅
- Project structure established
- Build system working
- Code quality tools configured
- Development environment ready

**Next: Phase 2 - Authentication** 🚀
