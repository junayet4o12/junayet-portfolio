import { ProjectType } from "@/type";
const bicycleImages = Array.from({ length: 14 }, (_, i) => `/projects/cycle-craze/img${i + 1}.png`)
const zamshedImages = Array.from({ length: 12 }, (_, i) => `/projects/zamshed-store/img${i + 1}.png`)
const formifyImages = Array.from({ length: 9 }, (_, i) => `/projects/formify/img${i + 1}.png`)
export const projects: ProjectType[] = [
    {
        id: "cycle-craze-001",
        name: "Cycle-Craze",
        description:
            "Cycle-Craze is a modern bicycle e-commerce website offering a rich user experience, powerful admin features, and full backend integration including secure payments and analytics.",
        projectType: "personal",
        live_link: {
            frontend: "https://cycle-craze-frontend.vercel.app",
            backend: "https://bi-cicle-backend.vercel.app/"
        },
        code_repo: {
            frontend: "https://github.com/junayet4o12/cycle-craze-frontend",
            backend: "https://github.com/junayet4o12/bi-cicle-backend"
        },
        technology: {
            frontend: [
                "React 19",
                "TypeScript",
                "Vite",
                "Tailwind CSS 4",
                "ShadCN UI",
                "Radix UI",
                "Framer Motion",
                "Embla Carousel",
                "Swiper",
                "Sonner",
                "Redux Toolkit",
                "Redux Persist",
                "Axios",
                "React Hook Form",
                "Zod",
                "date-fns",
                "jwt-decode",
                "React Router DOM",
                "Recharts",
                "React Dropzone",
                "React Quill",
                "Tiptap",
                "DnD Kit",
                "Cloudinary"
            ],
            backend: [
                "Node.js",
                "Express.js",
                "TypeScript",
                "MongoDB",
                "Mongoose",
                "JWT",
                "Zod",
                "bcrypt",
                "Nodemailer",
                "SSLCommerz",
                "ESLint",
                "ts-node-dev"
            ]
        },
        features: [
            {
                title: "🌙 Smart Interface & User Experience",
                description:
                    "<p>Includes theme toggling between light, dark, and system preferences for accessibility and comfort. Fully responsive design with intuitive mobile navigation ensures a seamless experience across all devices. Optimized for performance with fast load times and smooth interactions.</p>"
            },
            {
                title: "🛍️ Advanced Shopping Experience",
                description:
                    "<p>Comprehensive product discovery tools including search, filtering, and zoomable image galleries. Easily save and manage wishlists with one-click actions. Streamlined multi-step checkout minimizes friction and increases conversions.</p>"
            },
            {
                title: "💳 Secure & Flexible Transactions",
                description:
                    "<p>Integrated with SSLCommerz to support multiple payment methods including digital wallets and cash on delivery. Secured authentication using JWT, with protected routes and role-based access control. Data flows are secured with Zod validation, bcrypt hashing, and token verification.</p>"
            },
            {
                title: "📦 Order & Content Management",
                description:
                    "<p>Users can track orders in real-time and view order history from their dashboard. Admins have access to drag-and-drop product gallery management with support for image reordering, enhancing content flexibility and presentation.</p>"
            },
            {
                title: "📊 Admin Dashboard & Analytics",
                description:
                    "<p>Powerful admin dashboard provides tools for inventory control, role management, and performance monitoring. Sales analytics offer insights into top products and customer behavior trends to guide strategic decisions.</p>"
            }
        ],
        images: bicycleImages,
        thumbnail: "/projects/cycle-craze/img1.png",
        duration: {
            start: '2025-03-17T00:00:00.000Z',
            end: new Date().toLocaleString()
        },
        status: "completed",
        tags: ["e-commerce", "bicycle", "mern", "typescript", "sslcommerz"],
        isFeatured: true,
        createdAt: "2025-03-01",
        updatedAt: "2025-05-06"
    },
    {
        id: "zamshed-store-001",
        name: "Zamshed Store",
        description: "Zamshed Store is a full-stack grocery shop management app built to simplify ordering and product management for small businesses. It provides both customer-facing and admin-side functionality.",
        projectType: "personal",
        live_link: {
            frontend: "https://zamshed-store.web.app/",
            backend: "https://zamshed-store-backend.vercel.app",
        },
        code_repo: {
            frontend: "https://github.com/junayet4o12/zamshed_store_frontend",
            backend: "https://github.com/junayet4o12/zamshed_store_backend",
        },
        technology: {
            frontend: [
                "React",
                "Vite",
                "React Router DOM",
                "Redux Toolkit",
                "RTK Query",
                "Tailwind CSS",
                "Firebase Auth"
            ],
            backend: [
                "Node.js",
                "Express.js",
                "MongoDB",
                "Mongoose",
                "Cloudinary",
                "JWT"
            ],
        },
        features: [
            {
                title: "🔐 Secure Authentication & Authorization",
                description:
                    "Users can register and log in securely using <strong>Firebase Authentication</strong>. The app uses <strong>JWT</strong> to protect private API routes, ensuring sensitive user operations are fully secured and authenticated.",
            },
            {
                title: "🛒 Advanced Cart, Checkout & Order Tracking",
                description:
                    "Users can add products to a cart, update quantities, and place orders by providing shipping details. Once placed, orders move through real-time statuses: <em>Pending</em>, <em>Processing</em>, and <em>Ongoing</em>, keeping users informed at every stage.",
            },
            {
                title: "🧑‍💼 Complete Admin Control Panel",
                description:
                    "Admins have full control over product listings — add, update, delete, or mark items as <strong>Hot</strong>. Additionally, they can manage shop information, update proprietor profiles, and view key metrics like product count and category totals.",
            },
            {
                title: "🗂️ Smart Category & Content Management",
                description:
                    "Admins can organize the store by creating, renaming, or deleting product categories, making it easier for users to browse. Rich text features powered by <strong>React Quill</strong> allow for styled descriptions and enhanced content editing.",
            },
            {
                title: "📤 Optimized Media Handling with Cloudinary",
                description:
                    "All product images are uploaded to <strong>Cloudinary</strong>, enabling efficient image hosting, automatic optimization, and fast content delivery for a better user experience across the store.",
            }
        ],
        images: zamshedImages,
        thumbnail: "/projects/zamshed-store/img1.png",
        duration: {
            start: '2024-05-01T00:00:00.000Z',
            end: '2024-08-20T00:00:00.000Z'
        },
        status: "completed",
        tags: ["grocery", "fullstack", "firebase", "cloudinary", "jwt", "mern"],
        isFeatured: true,
        createdAt: "2024-09-28",
        updatedAt: "2024-10-05"
    },
    {
        id: "formify-001",
        name: "Formify",
        description:
            "Formify is a powerful and user-friendly form builder web app that enables users to create, manage, and analyze forms with ease. It's a faster and more customizable alternative to Google Forms, supporting authentication, image uploads, and real-time submission insights.",
        projectType: "personal",
        live_link: {
            frontend: "https://formify-99f7d.web.app/",
            backend: "https://form-maker-backend.vercel.app/",
        },
        code_repo: {
            frontend: "https://github.com/junayet4o12/form-maker",
            backend: "https://github.com/junayet4o12/form-maker-backend",
        },
        technology: {
            frontend: ["React", "Vite", "React Router DOM"],
            backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"],
        },
        features: [
            {
                title: "🔐 Firebase Authentication",
                description:
                    "Secure and seamless user authentication using <strong>Firebase</strong>, with support for registration, login, and session management.",
            },
            {
                title: "🛡️ JWT-Protected API Access",
                description:
                    "APIs are protected using <strong>JSON Web Tokens</strong>, ensuring that only authenticated users can access and modify form data.",
            },
            {
                title: "📝 Customizable Form Creation",
                description:
                    "Users can create, update, and manage fully customizable forms through an intuitive user interface — faster than Google Forms.",
            },
            {
                title: "📊 Response Collection & Analysis",
                description:
                    "Collected responses are displayed in a user-friendly format, with tabular view and detailed individual analysis options.",
            },
            {
                title: "📤 Image Upload via ImgBB",
                description:
                    "Forms support embedded image uploads using the <strong>ImgBB API</strong>, enabling dynamic, media-rich questions or sections.",
            }
        ],
        images:formifyImages,
        thumbnail: "/projects/formify/img1.png",
        duration: {
            start: '2024-04-01T00:00:00.000Z',
            end: '2024-04-23T00:00:00.000Z'
        },
        status: "completed",
        tags: ["form-builder", "firebase", "vite", "imgbb", "jwt", "mongodb"],
        isFeatured: true,
        createdAt: "2025-04-05",
        updatedAt: "2025-04-30",
    },

];
