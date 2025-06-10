import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface EventConfig {
  name: string;
  category: string;
  description: string;
  requiredProperties: string[];
  optionalProperties: string[];
}

interface ClientConfig {
  clientName: string;
  packageName: string;
  version: string;
  events: {
    [key: string]: EventConfig;
  };
}

function generateTypes(config: ClientConfig): string {
  const eventTypes = Object.entries(config.events)
    .map(([key, event]) => `  ${key.toUpperCase()}: '${event.name}'`)
    .join(',\n');

  const eventInterfaces = Object.entries(config.events)
    .map(([key, event]) => {
      const requiredProps = event.requiredProperties
        .map(prop => `  ${prop}: string | number;`)
        .join('\n');
      
      const optionalProps = event.optionalProperties
        .map(prop => `  ${prop}?: string | number;`)
        .join('\n');

      return `
export interface ${key.charAt(0).toUpperCase() + key.slice(1)}Event {
${requiredProps}
${optionalProps}
}`;
    })
    .join('\n');

  return `
export const EventTypes = {
${eventTypes}
} as const;

${eventInterfaces}

export type TrackEvent = ${Object.keys(config.events)
  .map(key => `${key.charAt(0).toUpperCase() + key.slice(1)}Event`)
  .join(' | ')};
`;
}

function generateSDK(config: ClientConfig): void {
  // Create SDK directory
  const sdkDir = path.join(process.cwd(), 'generated-sdk');
  if (!fs.existsSync(sdkDir)) {
    fs.mkdirSync(sdkDir);
  }

  // Generate package.json
  const packageJson = {
    name: config.packageName,
    version: config.version,
    description: `Custom tracking SDK for ${config.clientName}`,
    main: 'lib/index.js',
    types: 'lib/index.d.ts',
    scripts: {
      build: 'tsc',
      prepare: 'npm run build'
    },
    peerDependencies: {
      'react-native': '>=0.60.0'
    },
    devDependencies: {
      typescript: '^4.5.0',
      '@types/react-native': '^0.60.0'
    }
  };

  fs.writeFileSync(
    path.join(sdkDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Generate tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'es2015',
      module: 'commonjs',
      declaration: true,
      outDir: './lib',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      jsx: 'react-native'
    },
    include: ['src'],
    exclude: ['node_modules', '**/__tests__/*']
  };

  fs.writeFileSync(
    path.join(sdkDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2)
  );

  // Generate types
  fs.writeFileSync(
    path.join(sdkDir, 'src/types.ts'),
    generateTypes(config)
  );

  // Generate Track class
  const trackClass = `
import { Platform } from 'react-native';
import { TrackEvent } from './types';

export class Track {
  private static instance: Track;
  private config: {
    apiKey: string;
    apiUrl?: string;
    debug?: boolean;
  };

  private constructor(config: {
    apiKey: string;
    apiUrl?: string;
    debug?: boolean;
  }) {
    this.config = config;
  }

  public static initialize(config: {
    apiKey: string;
    apiUrl?: string;
    debug?: boolean;
  }): void {
    if (!Track.instance) {
      Track.instance = new Track(config);
    }
  }

  public static getInstance(): Track {
    if (!Track.instance) {
      throw new Error('Track SDK not initialized. Call Track.initialize() first.');
    }
    return Track.instance;
  }

  public async trackEvent(event: TrackEvent): Promise<void> {
    try {
      const response = await fetch(this.config.apiUrl || 'https://api.track.com/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this.config.apiKey}\`
        },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          platform: Platform.OS,
          version: Platform.Version
        })
      });

      if (!response.ok) {
        throw new Error(\`Failed to send event: \${response.statusText}\`);
      }

      if (this.config.debug) {
        console.log('Event tracked successfully:', event);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('Error tracking event:', error);
      }
      throw error;
    }
  }
}
`;

  fs.writeFileSync(
    path.join(sdkDir, 'src/Track.ts'),
    trackClass
  );

  // Generate index.ts
  const indexFile = `
export * from './Track';
export * from './types';
`;

  fs.writeFileSync(
    path.join(sdkDir, 'src/index.ts'),
    indexFile
  );

  // Generate README.md
  const readme = `# ${config.clientName} Tracking SDK

Custom tracking SDK for ${config.clientName}.

## Installation

\`\`\`bash
npm install ${config.packageName}
# or
yarn add ${config.packageName}
\`\`\`

## Usage

### Initialize the SDK

\`\`\`typescript
import { Track } from '${config.packageName}';

Track.initialize({
  apiKey: 'your-api-key',
  debug: true, // Enable debug mode for detailed logging
  apiUrl: 'https://your-api-url.com' // Your API endpoint
});
\`\`\`

### Track Events

\`\`\`typescript
const track = Track.getInstance();

// Track a product view
try {
  await track.trackEvent({
    name: 'product_view',
    productId: '123',
    productName: 'Premium Widget',
    category: 'Electronics',
    price: 99.99
  });
} catch (error) {
  console.error('Failed to track event:', error);
}
\`\`\`

## Available Events

${Object.entries(config.events)
  .map(([key, event]) => `
### ${event.name}

${event.description}

Required properties:
${event.requiredProperties.map(prop => `- \`${prop}\``).join('\n')}

Optional properties:
${event.optionalProperties.map(prop => `- \`${prop}\``).join('\n')}
`)
  .join('\n')}

## License

MIT
`;

  fs.writeFileSync(
    path.join(sdkDir, 'README.md'),
    readme
  );

  // Install dependencies and build
  execSync('npm install', { cwd: sdkDir });
  execSync('npm run build', { cwd: sdkDir });

  console.log(`SDK generated successfully in ${sdkDir}`);
}

// Read and validate config
const configPath = process.argv[2];
if (!configPath) {
  console.error('Please provide a path to the configuration file');
  process.exit(1);
}

try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  generateSDK(config);
} catch (error) {
  console.error('Error generating SDK:', error);
  process.exit(1);
} 