import { TechsType, } from "@/type";

const techs = [
    // Previously listed 85
    "React", "Angular", "Vue.js", "Next.js", "Nuxt.js", "Svelte", "TypeScript",
    "JavaScript", "HTML5", "CSS3", "SASS/SCSS", "Tailwind CSS", "Bootstrap",
    "Node.js", "Express", "NestJS", "Django", "Flask", "Ruby on Rails",
    "GraphQL", "REST API", "MongoDB", "PostgreSQL", "MySQL", "Redis",
    "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Firebase",
    "Jest", "Cypress", "React Testing Library", "Webpack", "Vite",
    "Zod", "Redux", "Recoil", "React Query", "TanStack Query", "RTK Query",
    "Strapi", "Contentful", "Sanity.io", "Prisma", "Sequelize", "Mongoose",
    "ESLint", "Prettier", "Nginx", "PM2", "Socket.io", "Three.js",
    "Framer Motion", "ShadCN UI", "MUI", "Chakra UI", "Ant Design",
    "Material Tailwind", "Vitest", "Mocha", "Chai", "Jasmine",
    "Rollup", "Parcel", "Gulp", "Grunt", "Babel", "Turbopack",
    "Storybook", "Lerna", "NX", "Monorepo", "OAuth", "OpenID",
    "Clerk", "Auth0", "Supabase", "PlanetScale", "Railway",
    "Render", "Netlify", "Vercel", "DigitalOcean", "LocalStorage",

    // 100 more
    "WebSockets", "PWA", "Service Workers", "IndexedDB", "WebRTC",
    "Tauri", "Electron", "Capacitor", "Cordova", "Expo", "React Native",
    "NextAuth.js", "Passport.js", "JSON Web Tokens (JWT)", "Bcrypt",
    "Argon2", "bcryptjs", "Helmet", "CORS", "Rate Limiter", "Multer",
    "Sharp", "Cloudinary", "ImgBB", "S3", "Linode", "MinIO", "Stripe",
    "PayPal API", "Razorpay", "Braintree", "Square", "Algolia", "ElasticSearch",
    "Meilisearch", "Apollo Client", "Apollo Server", "Relay", "URQL",
    "tRPC", "RPC", "RESTful Services", "Swagger", "Postman", "Insomnia",
    "Figma", "Adobe XD", "Zeplin", "Canva", "Figma Tokens",
    "SWR", "MobX", "XState", "Jotai", "Formik", "React Hook Form",
    "Yup", "Classnames", "clsx", "Tailwind Merge", "Headless UI", "Radix UI",
    "React Table", "TanStack Table", "React Charts", "Recharts", "Chart.js",
    "D3.js", "Google Maps API", "Leaflet", "Mapbox", "OpenLayers",
    "GSAP", "Lottie", "Anime.js", "Day.js", "Moment.js", "date-fns",
    "uuid", "nanoid", "Axios", "Fetch API", "Qwik", "Marko",
    "SolidJS", "Alpine.js", "HTMX", "Backbone.js", "Ember.js",
    "Phoenix (Elixir)", "Blitz.js", "Remix", "Hono", "Fastify", "Koa",
    "Sapper", "AdonisJS", "FeathersJS", "KeystoneJS", "Ghost CMS",
    "HTMX", "Unocss", "Windicss", "Tachyons", "Bulma", "Foundation", "Spectre.css", "Milligram", "Shoelace", "UIkit",
    "RSC (React Server Components)", "Server Actions", "ISR (Incremental Static Regeneration)", "SSG", "SSR",
    "Astro", "Eleventy", "Jekyll", "Hugo", "Gatsby",
    "Qwik", "Marko", "SolidStart", "Fresh (Deno)", "Deno",
    "WebAssembly", "Rust (for Web)", "Go (for Web)", "Bun", "Esbuild",
    "Microbundle", "Snowpack", "SystemJS", "RequireJS", "Alpine.js",
    "Stencil", "Lit", "Inferno", "Mithril.js", "CanJS",
    "RxJS", "Effector", "MobX State Tree", "Overmind", "Vuex",
    "Pinia", "Nuxt Auth", "Vue Router", "Vueuse", "Vitest UI",
    "Playwright", "TestCafe", "Nightwatch.js", "Puppeteer", "Selenium WebDriver",
    "AlloyEditor", "TinyMCE", "CKEditor", "Quill", "Slate.js",
    "NestJS CLI", "tsup", "ts-node", "zx", "npm-check-updates",
    "Husky", "lint-staged", "Commitlint", "Conventional Commits", "Semantic Release",
    "VitePress", "Docusaurus", "VuePress", "Nextra", "Docz",
    "Remotion", "Motion One", "Rive", "Spline", "React Spring",
    "Lerna Monorepo", "TurboRepo", "Bit.dev", "Module Federation", "Federated Modules",
    "OpenAPI", "AsyncAPI", "Redoc", "Stoplight", "GraphQL Yoga",
    "Envelop", "Hasura", "FaunaDB", "CockroachDB", "HarperDB",
    "SurrealDB", "Xata", "Neon", "Upstash", "EdgeDB",
    // Popular Payment Gateways
    "Stripe", "PayPal", "Razorpay", "Square", "Braintree",
    "Klarna", "Afterpay", "Sezzle", "Affirm", "Amazon Pay",
    "Google Pay", "Apple Pay", "Samsung Pay", "2Checkout", "Authorize.Net",
    "Payoneer", "PayU", "Instamojo", "Mollie", "Flutterwave",
    "Paystack", "Worldpay", "Adyen", "BlueSnap", "Skrill",
    "WePay", "Alipay", "UnionPay", "DLocal", "Paddle",

    // Subscription & Billing
    "Chargebee", "Recurly", "Pabbly", "Zoho Subscriptions", "Stripe Billing",
    "FastSpring", "Cheddar", "PayWhirl", "Billsby", "MonetizeNow",

    // Crypto Payments
    "Coinbase Commerce", "BitPay", "NOWPayments", "CoinGate", "Crypto.com Pay",
    "Binance Pay", "BTCPay Server", "OpenNode", "MoonPay", "Wyre",

    // Donation Platforms
    "Buy Me a Coffee", "Ko-fi", "Patreon", "Gumroad", "Payhip",
    "Donorbox", "GiveWP", "Open Collective", "Liberapay", "Tipeee",

    // E-Commerce Integrations
    "WooCommerce Payments", "Shopify Payments", "Magento Payments", "BigCommerce", "Ecwid",
    "Snipcart", "FoxCart", "Foxy.io", "Commerce.js", "Medusa.js",

    // API & SDKs
    "Stripe.js", "Razorpay.js", "Square Web Payments SDK", "PayPal JS SDK", "Braintree Drop-in UI",
    "Google Pay API", "Apple Pay JS", "WalletConnect", "Plaid", "FinBox",

    // Security & Fraud Prevention
    "3D Secure", "Tokenization", "PCI DSS", "Chargeback Protection", "FraudLabs Pro",
    "Sift", "Signifyd", "Kount", "ThreatMetrix", "MaxMind",

    // Currencies, Tax, Invoicing
    "Fixer API", "CurrencyLayer", "TaxJar", "Quaderno", "Xero Integration",
    "QuickBooks Online API", "FreshBooks API", "Invoice Ninja", "Zoho Invoice", "Wave API",
    // Languages & Supersets
    "Elm", "ReasonML", "PureScript", "Haxe", "CoffeeScript",
    "LiveScript", "Nim", "Crystal", "Dart", "OCaml",

    // CMS & Headless CMS
    "Strapi", "Sanity", "Contentful", "Ghost CMS", "Netlify CMS",
    "DatoCMS", "Directus", "KeystoneJS", "Payload CMS", "ButterCMS",

    // Static Site Generators
    "Brunch", "Hexo", "VuePress", "Gridsome", "Zola",
    "Pelican", "Nikola", "Cuttlebelle", "Assemble", "Sculpin",

    // Hosting & Deployment
    "Netlify", "Vercel", "Render", "Railway", "Surge",
    "Heroku", "Glitch", "Fly.io", "Cloudflare Pages", "GitHub Pages",

    // UI Libraries & Systems
    "ShadCN UI", "Chakra UI", "Mantine", "Radix UI", "Headless UI",
    "Material UI", "Ant Design", "Evergreen", "Grommet", "Blueprint.js",

    // CLI & Dev Tools
    "Yeoman", "Nx", "Turbo", "Hygen", "Plop.js",
    "Degit", "npx", "dotenv-cli", "tsc", "nodemon",

    // Linting, Formatting & QA
    "ESLint", "Prettier", "Stylelint", "SonarQube", "CodeClimate",
    "Dependabot", "Renovate", "Bundlephobia", "Lighthouse", "Sourcegraph",

    // Auth & Identity
    "Auth0", "Clerk", "Supabase Auth", "Firebase Auth", "NextAuth.js",
    "Keycloak", "Okta", "Magic.link", "Descope", "Ory",

    // Database & ORM
    "Prisma", "Drizzle ORM", "Objection.js", "TypeORM", "Sequelize",
    "Waterline", "Mongoose", "Turso", "Supabase", "PocketBase",

    // Web APIs & Protocols
    "WebSockets", "Server-Sent Events", "WebRTC", "Service Workers", "Web Bluetooth",
    "WebGL", "Canvas API", "Web Speech API", "Web Animations API", "Streams API",

    // Modern Frameworks & Meta Frameworks
    "RedwoodJS", "Blitz.js", "Refine", "Remix", "Wasp",
    "Inertia.js", "T3 Stack", "Expo Router", "Tauri", "Capacitor"
]

export const defaultTech: TechsType = [...new Set(techs)].sort().map(item => ({ value: item, label: item }));
const webDevTags = [
    "#webdevelopment", "#frontend", "#backend", "#fullstack", "#html", "#css", "#css3", "#javascript", "#typescript", "#reactjs", "#vuejs", "#angular", "#nextjs", "#nuxtjs", "#svelte", "#nodejs", "#expressjs", "#mongodb", "#mongoose", "#sql", "#postgresql", "#firebase", "#supabase", "#webdev", "#webdesign", "#responsivedesign", "#uiux", "#uxdesign", "#uidesign", "#tailwindcss", "#bootstrap", "#materialui", "#materialtailwind", "#chakraui", "#shadcnui", "#redux", "#zustand", "#reactquery", "#tanstackquery", "#nextauth", "#jwt", "#authentication", "#api", "#restapi", "#graphql", "#axios", "#fetchapi", "#vite", "#webpack", "#babel", "#eslint", "#prettier", "#git", "#github", "#githubactions", "#ci", "#cd", "#netlify", "#vercel", "#heroku", "#render", "#digitalocean", "#cloudflare", "#aws", "#azure", "#gcp", "#docker", "#devops", "#performance", "#lighthouse", "#a11y", "#accessibility", "#seo", "#semantics", "#forms", "#reacthookform", "#zod", "#formik", "#yup", "#testing", "#jest", "#cypress", "#vitest", "#playwright", "#storybook", "#npm", "#pnpm", "#yarn", "#npmjs", "#components", "#hooks", "#customhooks", "#animations", "#framerMotion", "#gsap", "#canvas", "#threejs", "#webapps", "#progressivewebapp", "#pwa", "#mobilefirst", "#draggable", "#dndkit", "#cms", "#headlesscms", "#contentful", "#sanity", "#strapi", "#mernstack", "#softwaredevelopment", "#softwareengineering", "#webapplication", "#appdevelopment", "#devcommunity", "#techstack", "#developerlife", "#programminglife", "#techcareer", "#learncoding", "#webdevlife", "#frontenddeveloper", "#backenddeveloper", "#fullstackdeveloper", "#juniordeveloper", "#seniordeveloper", "#codingbootcamp", "#100daysofcode", "#codewithme", "#cleanarchitecture", "#oop", "#objectoriented", "#functionalprogramming", "#asynchronousjs", "#eventloop", "#callbacks", "#promises", "#asyncawait", "#modules", "#bundling", "#minification", "#codeoptimization", "#responsivelayout", "#crossbrowser", "#mobiledevelopment", "#websecurity", "#xss", "#csrf", "#cors", "#cookies", "#sessions", "#localstorage", "#sessionstorage", "#serviceworker", "#workbox", "#pushnotifications", "#websockets", "#socketio", "#realtimeapp", "#authenticationflow", "#oauth", "#sso", "#emailverification", "#forgotpassword", "#userprofile", "#adminpanel", "#dashboard", "#datatable", "#pagination", "#infiniteScroll", "#filtering", "#sorting", "#fileupload", "#imagecompression", "#imageoptimization", "#cloudinary", "#imgbb", "#formvalidation", "#inputmask", "#modals", "#toasts", "#notifications", "#darkmode", "#theming", "#cssvariables", "#scss", "#sass", "#less", "#postcss", "#criticalcss", "#fontawesome", "#reacticons", "#lucideicons", "#clipboardjs", "#pdfgeneration", "#htmltopdf", "#charts", "#d3js", "#recharts", "#chartjs", "#adminlte", "#antdesign", "#primevue", "#vuetify", "#quasar", "#nuxt", "#remix", "#solidjs", "#astro", "#microfrontend", "#monorepo", "#turborepo", "#nx"
];

export const defaultTags: TechsType = [...new Set(webDevTags)].sort().map(item => ({ value: item, label: item }));