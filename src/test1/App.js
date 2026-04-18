import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import ScrollToTop from "./ScrollToTop";

import StickyContactButtons from "./Components/StickyContactBtn";

// all pages
import Home from "./Pages/Home.Page";
import HomeCollection from "./Pages/HomeCollection.page";
import OurPackagesPage from "./Pages/OurPackages.Page";
import DoctorsGridPage from "./Pages/DoctorsGrid.Page";
import FAQsPage from "./Pages/FAQs.Page";
import CorporateWellnessPage from "./Pages/CorporateWellness.Page";
import DoctorDetailsPage from "./PageElements/DoctorsGridPageElements/DoctorDetailsPage";
import ViewReportsPage from "./Pages/ViewReports.Page";
import LoginPage from "./Pages/Login.Page";
import RegistrationPage from "./Pages/Registration.Page";
import AboutPage from "./Pages/About.Page";
import ContactUsPage from "./Pages/Contact.Page";
import TestPackagesPage from "./Pages/TestPackages.Page.jsx";

// services pages
import PulmonologyPage from "./Pages/ServicePages/Pulmonology.Page";
import GastroenterologyPage from "./Pages/ServicePages/Gastroenterology.Page";
import RadiologyPage from "./Pages/ServicePages/Radiology.Page";
import NeurologyPage from "./Pages/ServicePages/Neurology.Page";
import DentalPage from "./Pages/ServicePages/Dental.Page";
import DialysisPage from "./Pages/ServicePages/Dialysis.Page";
import DermatologyPage from "./Pages/ServicePages/Dermatology.Page";
import HomecarePage from "./Pages/ServicePages/Homecare.Page";
import OphthalmologyPage from "./Pages/ServicePages/Ophthalmology.Page";
import PhysiotherapyPage from "./Pages/ServicePages/Physiotherapy.Page";
import PathologyPage from "./Pages/ServicePages/Pathology.Page";
import UrologyPage from "./Pages/ServicePages/Urology.Page";
import CardiologyPage from "./Pages/ServicePages/Cardiology.Page";
import PortablePage from "./Pages/ServicePages/Portable.Page.jsx";

import XrayPage from "./Pages/ServicePages/Xray.Page.jsx";
import BMDPage from "./Pages/ServicePages/BMD.Page.jsx";
import DigitalMammographyPage from "./Pages/ServicePages/Mamology.Page.jsx";

// Booking route
import BookAppointmentPage from "./Pages/BookingAppointment.Page";
import DoctorSeparatePage from "./PageElements/DoctorsGridPageElements/DoctorSeperatePage.jsx";

// Cart route
import CartPage from "./Pages/Cart.Page.jsx";
import CheckOutPage from "./Pages/CartCheckOut.page.jsx";
import { Toaster } from "react-hot-toast";
import DiagnosticServicesPage from "./Pages/ServicePages/DiagnosticServices.Page.jsx";
import InnerServiceDetailsPage from "./Pages/ServicePages/InnerServiceDetails.jsx";
import B2BMainSection from "./Pages/ServicePages/B2B.Page.jsx";
import DoctorDirectory from "./PageElements/DoctorsGridPageElements/DoctorDirectory.jsx";
import PaymentSucess from "./PageElements/ViewReportsPageElements/PaymentSucess.jsx";
import AllMembersPage from "./Pages/AllMembers.Page.jsx";
import { HomeColleectionTest } from "./Pages/HomeColleectionTest.jsx";
import NewsPage from "./Pages/News.Page.jsx";
import NewsDetailPage from "./PageElements/NewsPageElements/NewsDetailsSection.jsx";
import Overviews from "./Pages/Overviews.Page.jsx";
import ContactUs from "./Pages/ContactUs.Page.jsx";
import DisclaimerPage from "./Pages/Disclaimer.Page.jsx";
import TermsAndCondition from "./Pages/TermsAndCondition.Page.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import UserLayout from "./Pages/DashboardLayout.jsx";
import ProfilePage from "./PageElements/DashboardPageElements/ProfilePage.jsx";
import ViewMembers from "./PageElements/DashboardPageElements/ViewMembersPage.jsx";
import BookHomeCollection from "./PageElements/DashboardPageElements/BookHomePage.jsx";
import HomeCollectionHistory from "./PageElements/DashboardPageElements/CollectionHistoryPage.jsx";

import OPDHistoryPage from "./PageElements/DashboardPageElements/OPDHistoryPage.jsx";
import PastReportPage from "./PageElements/DashboardPageElements/PastReportPage.jsx";
import ReportGraphPage from "./PageElements/DashboardPageElements/ReportGraphPage.jsx";
import ChangePassPage from "./PageElements/DashboardPageElements/PasswordChange.jsx";
import EditProfile from "./PageElements/DashboardPageElements/ProfileEditPage.jsx";
import AddMembersPage from "./PageElements/DashboardPageElements/AddMemberPage.jsx";
import PaymentHistory from "./PageElements/DashboardPageElements/PaymentHistoryPage.jsx";
import MyHealth from "./PageElements/DashboardPageElements/MyHealthPage.jsx";
import BookOPDPage from "./PageElements/DashboardPageElements/BookOPDPage.jsx";
import PaymentRefundPolicy from "./Pages/PaymentRefundPolicy.Page.jsx";
import AccountDeletion from "./Pages/AccountDeletion.Page.jsx";
import ForgotPassword from "./PageElements/RegistrationPageElements/ForgotPassword.jsx";
import CorporateDashboardLayout from "./Pages/CorporateDashboardLayout.jsx";
import CorporateReport from "./PageElements/CorporatePageElements/CorporateReport.jsx";
import CorporateCollection from "./PageElements/CorporatePageElements/CorporateCollection.jsx";
import CorporateBilling from "./PageElements/CorporatePageElements/CorporateBilling.jsx";

function App() {
  return (
    <Router basename="/RBD">
        {/* <Router basename="/rbweb-react"> */}
      <ScrollToTop />
      {/* <StickyContactButtons /> */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Home />
                <StickyContactButtons />
              </>
            }
          />
          {/* <Route path="/collection" element={<HomeCollection />} /> */}
          <Route path="/home-collection" element={<HomeColleectionTest />} />
          <Route path="/OurPackagesPage" element={<OurPackagesPage />} />
          <Route path="/doctors-grid" element={<DoctorsGridPage />} />
          <Route path="/doctors-grid/:id" element={<DoctorDetailsPage />} />
          <Route path="/view-reports" element={<ViewReportsPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route
            path="/corporate-wellness"
            element={<CorporateWellnessPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route
            path="/test-packages"
            element={
              <>
                <TestPackagesPage />
                <StickyContactButtons />
              </>
            }
          />

          <Route path="/doctor/:doctorId" element={<DoctorSeparatePage />} />

          {/* booking routes */}
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/all-members" element={<AllMembersPage />} />

          {/*services routes */}

          <Route path="/service/pulmonology" element={<PulmonologyPage />} />
          <Route
            path="/service/gastroenterology"
            element={<GastroenterologyPage />}
          />
          <Route path="/service/radiology" element={<RadiologyPage />} />
          <Route path="/service/radiology/xray" element={<XrayPage />} />
          <Route path="/service/radiology/bmd" element={<BMDPage />} />
          <Route
            path="/service/radiology/mamography"
            element={<DigitalMammographyPage />}
          />
          <Route path="/service/neurology" element={<NeurologyPage />} />
          <Route path="/service/dental" element={<DentalPage />} />
          <Route path="/service/dialysis" element={<DialysisPage />} />
          <Route path="/service/dermatology" element={<DermatologyPage />} />
          <Route path="/service/homecare" element={<HomecarePage />} />
          <Route
            path="/service/ophthalmology"
            element={<OphthalmologyPage />}
          />
          <Route
            path="/service/physiotherapy"
            element={<PhysiotherapyPage />}
          />
          <Route path="/service/pathology" element={<PathologyPage />} />
          <Route path="/service/urology" element={<UrologyPage />} />
          <Route path="/service/cardiology" element={<CardiologyPage />} />
          <Route path="/service/portable" element={<PortablePage />} />
          <Route
            path="/service/DiagnosticServices"
            element={<DiagnosticServicesPage />}
          />
          <Route path="/service/:title" element={<InnerServiceDetailsPage />} />
          <Route path="/service/B2B" element={<B2BMainSection />} />
          <Route path="/payment-success/:data" element={<PaymentSucess />} />

          {/* BookingAppointment */}
          <Route
            path="/appointment"
            element={<Navigate to="/appointment/date-and-time" replace />}
          />
          <Route path="/appointment/:step" element={<BookAppointmentPage />} />

          {/* cart route */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/doctorDirectory" element={<DoctorDirectory />} />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/details" element={<NewsDetailPage />} />
          <Route path="/overview" element={<Overviews />} />
          <Route path="contact" element={<ContactUs />} />

          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/account-delete" element={<AccountDeletion />} />
          <Route path="/TermsAndCondition" element={<TermsAndCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/paymentRefundPolicy"
            element={<PaymentRefundPolicy />}
          />
        </Route>
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="members" element={<ViewMembers />} />
          <Route path="book-homecollection" element={<BookHomeCollection />} />
          <Route
            path="collection-history"
            element={<HomeCollectionHistory />}
          />
          <Route path="book-opd" element={<BookOPDPage />} />
          <Route path="opd-history" element={<OPDHistoryPage />} />
          <Route path="past-report" element={<PastReportPage />} />
          <Route path="report-graph" element={<ReportGraphPage />} />
          <Route path="change-password" element={<ChangePassPage />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="add-member" element={<AddMembersPage />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="my-health" element={<MyHealth />} />
        </Route>
        <Route path="/corporate" element={<CorporateDashboardLayout />}>
          <Route index element={<CorporateReport />} />
          <Route path="collection" element={<CorporateCollection />} />
          <Route path="billing" element={<CorporateBilling />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
