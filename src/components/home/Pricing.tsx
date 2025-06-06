// File: src/components/SubscriptionPricing.tsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { getPublicPackagesByField } from "../../services/packageService"; // adjust path if needed
import { Package } from "../../types/package";

/**
 * SubscriptionPricing
 *
 * Fetches all “subscription” packages from the API and displays them
 * in a grid of cards using the same styling/design as the hardcoded version.
 * Shows a “No subscription packages found.” message if the API returns no data.
 */
const SubscriptionPricing: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchSubscriptions() {
      try {
        setLoading(true);
        const data = await getPublicPackagesByField("package_type", "subscription");
        if (isMounted) {
          setPackages(data);
        }
      } catch (err) {
        console.error("Error fetching subscription packages:", err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSubscriptions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-primary-100/30">
        <Container>
          <SectionHeading
            title="Subscription Packages"
            subtitle="Loading subscription packages…"
          />
          <div className="text-center py-16 text-gray-600">Loading…</div>
        </Container>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-primary-100/30">
        <Container>
          <SectionHeading
            title="Subscription Packages"
            subtitle="Unable to load subscription packages"
          />
          <div className="text-center py-16 text-red-500">
            Something went wrong. Please try again later.
          </div>
        </Container>
      </section>
    );
  }

  // No-data state
  if (!packages.length) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-primary-100/30">
        <Container>
          <SectionHeading
            title="Subscription Packages"
            subtitle="Choose the perfect plan to accelerate your AI journey"
          />
          <div className="text-center py-16 text-gray-600">
            No subscription packages found.
          </div>
        </Container>
      </section>
    );
  }

  // Render the subscription packages
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-primary-100/30">
      <Container>
        <SectionHeading
          title="Subscription Packages"
          subtitle="Choose the perfect plan to accelerate your AI journey"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {packages.map((pkg, index) => {
            // Format price as INR
            const priceText = `₹${pkg.price.toLocaleString()}`;

            // Format duration
            const durationText =
              pkg.duration_days > 1
                ? `${pkg.duration_days} days`
                : `${pkg.duration_days} day`;

            // Determine if this package is “popular” (optional logic):
            // Here, we’ll mark the first package as popular if there is more than one.
            const popular = index === 0 && packages.length > 1;

            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                className={`relative card flex flex-col ${
                  popular ? "border-2 border-primary shadow-lg" : ""
                }`}
              >
                {popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon placeholder */}
                <div className="mb-6 text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Check className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {pkg.description ?? "No description provided."}
                  </p>
                </div>

                {/* Price & Duration */}
                <div className="mb-6 text-center">
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-primary">
                      {priceText}
                    </span>
                    <span className="text-gray-500">/ {durationText}</span>
                  </div>
                </div>

                {/* Spacer so that “Get Started” button sits at bottom */}
                <div className="flex-grow" />

                <a
                  href={`/signup/${pkg.slug}`}
                  className={`btn w-full text-center ${
                    popular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <a
            href="#contact"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            Contact Us
            <Check size={16} />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default SubscriptionPricing;
