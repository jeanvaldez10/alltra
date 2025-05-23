import Footer from "@/components/global/footer";
import getUser from "@/components/global/getUser";
import Navbar from "@/components/global/navbar"

export default async function PrivacyPolicy() {
    const user = await getUser()
    return (
        <div>
            <Navbar isLoggedIn={!!user} />
            <div className="min-h-screen bg-black text-white p-6 md:p-12">

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold flex items-center gap-2">
                        <span>🔒</span> Our Privacy Policy
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Our Privacy Policy explains how we gather, use, and safeguard your personal information.
                        Protecting your privacy and security is our top priority.
                    </p>
                    <div className="mt-4 bg-gray-800 text-gray-300 py-2 px-4 rounded-lg text-center">
                        Last Updated on February 24, 2025
                    </div>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold">Information We Collect</h2>
                        <p className="text-gray-300 mt-2">
                            When you visit our website, sign up for an account, or use our services,
                            we may collect personal information from you. This can include your name,
                            email address, contact details, and any other information you choose to share with us.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
                        <p className="text-gray-300 mt-2">
                            We use the information we collect to provide, improve, and personalize our services.
                            This includes:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                            <li>Processing your requests and managing your account</li>
                            <li>Communicating with you about updates or important notices</li>
                            <li>Enhancing user experience and optimizing our website</li>
                            <li>Ensuring security and preventing fraudulent activities</li>
                            <li>Complying with legal obligations and policies</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold">Data Security</h2>
                        <p className="text-gray-300 mt-2">
                            We take the protection of your personal information seriously. To safeguard your data,
                            we implement industry-standard security measures, including encryption, secure servers,
                            and access controls. Our goal is to prevent unauthorized access, misuse, or disclosure of
                            your information.
                        </p>
                        <p className="text-gray-300 mt-2">
                            We do not sell, trade, or share your personal information with third parties without your consent,
                            except when required by law or necessary to provide our services. We may, however, share your
                            information with trusted third-party service providers under strict confidentiality standards.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold">Cookies</h2>
                        <p className="text-gray-300 mt-2">
                            Our website may use cookies to improve your browsing experience and gather insights on how
                            you interact with our site. You can modify your browser settings to block cookies or receive alerts
                            when they are used. However, please note that certain site features may not work properly without cookies.
                        </p>
                    </section>

                    <footer className="mt-8 text-gray-400">
                        <p>
                            We reserve the right to modify or update this Privacy Policy at any time. Any changes will be posted on this
                            page, with the effective date revised accordingly. We encourage you to check this policy periodically to stay
                            informed about any updates.
                        </p>
                    </footer>
                </div>
            </div>
            <Footer className="border-t"/>
        </div>

    );
}
