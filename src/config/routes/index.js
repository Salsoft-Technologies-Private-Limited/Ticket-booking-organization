import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";
import Login from "../../views/login";
import SignUp from "../../views/signUp";
import ForgetPassword1 from "../../views/forget-password-1";
import ForgetPassword2 from "../../views/forget-password-2";
import ForgetPassword3 from "../../views/forget-password-3";
import ProtectedRoute from "../../views/protectedRoute";
import Profile from "../../views/profile";
import EditProfile from "../../views/profile/editProfile";
import ChangePassword from "../../views/profile/changePassword";
import CreateDropzoneCompany from "../../views/create-dropzone-company";
import DropzoneCompanyFormView from "../../views/dropzone-company-form-view";
import DropzoneCompanyFormEdit from "../../views/dropzone-company-form-view/dropzone-company-form-edit";
import Dashboard from "../../views/dashboard";
// import DropZoneListing from "../../views/dropZoneListing";
// import DropzoneDetails from "../../views/dropZoneListing/dropzoneDetails";
// import AddDropZone from "../../views/dropZoneListing/addDropZone";
// import EditDropZone from "../../views/dropZoneListing/editDropZone";
import PaymentLogs from "../../views/paymentLogs";
import DropZoneLogs from "../../views/dropZoneLogs";
import DropZoneLogDetails from "../../views/dropZoneLogs/dropZoneLogDetails";
import EventManagement from "../../views/eventManagement";
import EventDetails from "../../views/eventManagement/eventDetails";
import CreateEvent from "../../views/eventManagement/createEvent";

import TicketsManagement from "../../views/ticketsManagement";
import TicketsDetails from "../../views/ticketsManagement/ticketsDetails";

import Stayreservation from "../../views/ticketsManagement/reservationLogs";
import StayreservationDetails from "../../views/ticketsManagement/reservationDetails";

import DropZoneManagement from "../../views/dropZoneManagement";
import DropZoneManagementDetails from "../../views/dropZoneManagement/dropZoneManagementDetails";
import ReservationLogs from "../../views/dropZoneManagement/reservationLogs";
import ReservationDetails from "../../views/dropZoneManagement/reservationDetails";
import DropZoneListing from "../../views/dropZoneManagement/dropZoneListing";
import DropZoneListingDetails from "../../views/dropZoneManagement/dropZoneListingDetails";
import Notifications from "../../views/notifications";
import CreateProfile from "../../views/profile/createProfile";
import ViewRooms from "../../views/ticketsManagement/viewRooms";
import RoomDetails from "../../views/ticketsManagement/roomDetails";
import ArtistManagement from "../../views/artistManagement";
import ArtistDetails from "../../views/artistManagement/artistDetails";
import AddArtist from "../../views/artistManagement/addArtist";
import EditArtist from "../../views/artistManagement/editArtist";
import Support from "../../views/Support";
import DriverDetails from "../../views/Support/driverDetails";
import VendorManagement from "../../views/vendorManagement";
import VendorDetails from "../../views/vendorManagement/vendorDetails";
import ProductManagement from "../../views/productManagement";
import AddProduct from "../../views/productManagement/addProduct";
import ProductDetails from "../../views/productManagement/productDetails";
import EditProduct from "../../views/productManagement/editProduct";
import OrderManagement from "../../views/orderManagement";
import OrderDetail from "../../views/orderManagement/myorderInfo/orderDetail";
import Eventreservation from "../../views/eventManagement/reservationLogs";
import EventreservationDetails from "../../views/eventManagement/reservationDetails";
import EventsEdit from "../../views/eventManagement/editEvent";

const MyRouter = () => {
  return (
    // <BrowserRouter basename="badshah_tickets_admin">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/signUP" index element={<SignUp />} />
        <Route path="/forget-password-1" index element={<ForgetPassword1 />} />
        <Route path="/forget-password-2" index element={<ForgetPassword2 />} />
        <Route path="/forget-password-3" index element={<ForgetPassword3 />} />
        {/* <Route
          path="/aboutUs"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <AboutUs />
            </ClientLayout>
          }
        /> */}
        {/* <Route
          path="/privacyPolicy"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <PrivacyPolicy />
            </ClientLayout>
          }
        /> */}
        {/* <Route
          path="/termsConditions"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <TermsConditions />
            </ClientLayout>
          }
        /> */}
        <Route
          path="/createProfile"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <CreateProfile />
            </ClientLayout>
          }
        />
        <Route
          path="/profile"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <Profile />
            </ClientLayout>
              </ProtectedRoute>
          }
        />
        <Route
          path="/editProfile"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <EditProfile />
            </ClientLayout>
              </ProtectedRoute>
          }
        />
        <Route
          path="/changePassword"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <ChangePassword />
            </ClientLayout>
              </ProtectedRoute>
          }
        />

        <Route
          path="/create-dropzone-company"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <CreateDropzoneCompany />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dropzone-company-form-view"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <DropzoneCompanyFormView />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dropzone-company-form-edit"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <DropzoneCompanyFormEdit />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <Dashboard />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/dropZoneListing"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <DropZoneListing />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dropZoneListing/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropzoneDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/addDropZone"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <AddDropZone />
            </ClientLayout>
          }
        />
        <Route
          path="/editDropZone/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <EditDropZone />
            </ClientLayout>
          }
        /> */}
        <Route
          path="/paymentLogs"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <PaymentLogs />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneLogs"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropZoneLogs />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneLogs/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropZoneLogDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/eventManagement"
          index
          element={
            <ProtectedRoute>

            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <EventManagement />
            </ClientLayout>
              </ProtectedRoute>
          }
          />
         
        <Route
          path="/eventManagement/:id"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <EventDetails />
            </ClientLayout>
              </ProtectedRoute>
          }
          />
        <Route
          path="/eventManagement/reservationLogs"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <Eventreservation />
            </ClientLayout>
              </ProtectedRoute>
          }
          />
           <Route
          path="/eventManagement/EventsEdit/:id"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <EventsEdit />
            </ClientLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/eventManagement/reservationLogs/:id"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
            head={{ title: "Dashboard", description: "Some Description." }}
            headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <EventreservationDetails />
            </ClientLayout>
          </ProtectedRoute>
          }
          />
        <Route
          path="/createEvent"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <CreateEvent />
            </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManagement"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <TicketsManagement />
            </ClientLayout>
          }
        />
        <Route
          path="/userManagement/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <TicketsDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneManagement"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropZoneManagement />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneManagement/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropZoneManagementDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneManagement/reservationLogs"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ReservationLogs />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneManagement/reservationLogs/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ReservationDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneManagement/dropZoneListing"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropZoneListing />
            </ClientLayout>
          }
        />
        <Route
          path="/dropZoneManagement/dropZoneListing/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DropZoneListingDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/staysManagement/viewRooms"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ViewRooms />
            </ClientLayout>
          }
        />
        <Route
          path="/staysManagement/viewRooms/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <RoomDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/staysManagement/reservationLogs"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Stayreservation />
            </ClientLayout>
          }
        />
        <Route
          path="/staysManagement/reservationLogs/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <StayreservationDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/artistManagement"
          index
          element={
           <ProtectedRoute>

            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <ArtistManagement />
            </ClientLayout>
              </ProtectedRoute> 
          }
          />
        <Route
          path="/addArtist"
          index
          element={
          <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <AddArtist />
            </ClientLayout>
              </ProtectedRoute> 
          }
          />
        <Route
          path="/artistManagement/:id"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <ArtistDetails />
            </ClientLayout>
              </ProtectedRoute> 
          }
          />
        <Route
          path="/artistManagement/editArtist/:id"
          index
          element={
            <ProtectedRoute>
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <EditArtist />
            </ClientLayout>
          </ProtectedRoute> 
          }
        />
        <Route
          path="/notifications"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Notifications />
            </ClientLayout>
          }
        />
        <Route
          path="/support"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <Support />
            </ClientLayout>
          }
        />
        <Route
          path="/driverManagement/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <DriverDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/vendorManagement"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <VendorManagement />
            </ClientLayout>
          }
        />
        <Route
          path="/vendorManagement/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <VendorDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/productManagement"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ProductManagement />
            </ClientLayout>
          }
        />
        <Route
          path="/addProduct"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <AddProduct />
            </ClientLayout>
          }
        />
        <Route
          path="/productManagement/:id"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <ProductDetails />
            </ClientLayout>
          }
        />
        <Route
          path="/editProduct"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <EditProduct />
            </ClientLayout>
          }
        />
        <Route
          path="/orderManagement"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <OrderManagement />
            </ClientLayout>
          }
        />
        <Route
          path="/orderManagement/myorderInfo/:id"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <OrderDetail />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default MyRouter;
