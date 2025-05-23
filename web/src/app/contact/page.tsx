import ContactForm from "@/components/ContactForm";
import Footer from "@/components/global/footer";
import getUser from "@/components/global/getUser";
import Navbar from "@/components/global/navbar";

const page = async () => {
    const user = await getUser();

    return (
        <div>
            <Navbar isLoggedIn={!!user} />
            <ContactForm isLoggedIn={!!user} user={user} />
            <Footer className="border-t border-neutral-800" />
        </div>
    )
}

export default page;