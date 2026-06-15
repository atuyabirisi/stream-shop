import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserPropertyView from "../components/property/UserPropertyView";

export default function PropertyView() {
  return (
    <main>
      <Navbar />
      <UserPropertyView />
      <Footer />
    </main>
  );
}
