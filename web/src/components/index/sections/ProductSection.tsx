'use client'
import { motion } from "framer-motion";
import ProductItem from "./ProductItem";
const ProductsSections = [
    {
        title: "Tracker",
        description: "Your trading dashboard—seamlessly integrating your trades, stats, journal, trackers, tools, and more!",
        image: "/iconhome1.png",
        page: "/tracker"
    },
    {
        title: "Optimizer",
        description: "Refine your trading strategies with backtesting for peak performance.",
        image: "/alltra_tracker.png",
        page: "/optimizer"
    },
    {
        title: "Learn",
        description: "Learn to trade and simply navigate your personalized Alltra platform.",
        image: "/alltra_tracker.png",
        page: "/learn"
    },
    {
        title: "CHAT",
        description: "Trade. Connect. Share. Your central hub for trading communication.",
        image: "/iconhome1.png",
        page: "/chat"
    }
]
const ProductSection = () => {
    return (
        <section className="w-full mt-[20px] grid md:grid-cols-2 gap-x-4 gap-y-3">
            {ProductsSections.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }} // Start slightly below with opacity 0
                    whileInView={{ opacity: 1, y: 0 }} // Animate to visible
                    viewport={{ once: true, amount: 0.2 }} // Triggers when 20% in view
                    transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
                >
                    <ProductItem item={item} />
                </motion.div>
            ))}
        </section>
    )
}

export default ProductSection;