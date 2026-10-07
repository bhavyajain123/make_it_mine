import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                main: resolve(import.meta.dirname, "index.html"),

                home: resolve(import.meta.dirname, "src/pages/home.html"),
                shop: resolve(import.meta.dirname, "src/pages/shop.html"),
                categories: resolve(import.meta.dirname, "src/pages/categories.html"),
                customize: resolve(import.meta.dirname, "src/pages/customize.html"),
                "product-detail": resolve(import.meta.dirname, "src/pages/product-detail.html"),
                cart: resolve(import.meta.dirname, "src/pages/cart.html"),
                checkout: resolve(import.meta.dirname, "src/pages/checkout.html"),
                payment: resolve(import.meta.dirname, "src/pages/payment.html"),
                "order-success": resolve(import.meta.dirname, "src/pages/order-success.html"),
                "order-tracking": resolve(import.meta.dirname, "src/pages/order-tracking.html"),
                "my-orders": resolve(import.meta.dirname, "src/pages/my-orders.html"),
                wishlist: resolve(import.meta.dirname, "src/pages/wishlist.html"),
                "saved-designs": resolve(import.meta.dirname, "src/pages/saved-designs.html"),
                addresses: resolve(import.meta.dirname, "src/pages/addresses.html"),
                offers: resolve(import.meta.dirname, "src/pages/offers.html"),
                notifications: resolve(import.meta.dirname, "src/pages/notifications.html"),
                profile: resolve(import.meta.dirname, "src/pages/profile.html"),
                "admin-dashboard": resolve(import.meta.dirname, "src/pages/admin-dashboard.html"),
                login: resolve(import.meta.dirname, "src/pages/login.html"),
                "forgot-password": resolve(import.meta.dirname, "src/pages/forgot-password.html"),
                about: resolve(import.meta.dirname, "src/pages/about.html"),
                contact: resolve(import.meta.dirname, "src/pages/contact.html"),
                faq: resolve(import.meta.dirname, "src/pages/faq.html")
            }
        }
    }
});