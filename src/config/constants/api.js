// export const BASE_URL = "https://secure.demo243.webhostlabs.net:3002/api/"
// export const UPLOADS_URL = "https://secure.demo243.webhostlabs.net:3002/Uploads/"
const { NODE_ENV } = process.env;
const { hostname } = window.location;

const servers = {
  local: "http://localhost:3024",
  customDev: "https://react.customdev.solutions:3024",
  live: "",
};

var URL;
if (NODE_ENV === "production" && hostname === "react.customdev.solutions")
  URL = servers.customDev;
else if (NODE_ENV === "production" && hostname === "")
  URL = servers.live;
else URL = servers.local;

// export const SOCKET_URL = `${URL}`;

export const UPLOADS_URL = URL + "/Uploads/";
export const BASE_URL = URL + "/api";

export const SITE_NAME = "My Website";
export const countries = ["USA", "Canada", "UK"];

export const AUTH = {
  login: "/auth/signin",
};
export const USER_AUTH = {
  login: "/organization/login",
  signup: "/organization/signup",
  getAccountDetails: "/user/getAccountDetails",
};
export const ARTIST = {
  getOrganizationArtists: "/artist/getOrganizationArtists",
  getArtist: "/artist/getArtist/",
  addArtist: "/artist/addArtist",
  getOrganizationArtists: "/artist/getOrganizationArtists",
  updateArtist : "/artist/updateArtist/"
};
export const ORGANIZATION = {
  getDashboardInfo : "/organization/getDashboardInfo"
}
export const COMPANY = {
  // getPricing : "/company/getPricing/",
  getProfile: "/company/getProfile/",
  signup: "/company/signup",
  getMyAccount: "/company/getMyAccount",
  login: "/company/login",
  createProfile: "/company/createProfile",
  updateProfile: "/company/updateProfile/",
  getMyGigs: "/company/getMyGigs",
  updateAccount: "/company/updateAccount",
  getCompanies: "/company/getCompanies",
  toggleStatus: "/company/toggleStatus/",
};
export const PROFILE = {
  editProfile: "/organization/editProfile",
};
export const JOB = {
  getCompanyJobs: "/company/career/getAllJobs/",
  getJob: "/company/career/getJob/",
  addJob: "/company/career/addJob",
  getMyJobs: "/company/career/getMyJobs",
  updateJob: "/company/career/updateJob/",
  deleteJob: "/company/career/deleteJob/",
};
export const JUMP = {
  getMyJumps: "/jump/getMyJumps",
  getJump: "/jump/getJump/",
  getLatestJump: "/jump/getLatestJump/",
  getCompanyJumps: "/jump/getCompanyJumps",
  getAllJumps: "/jump/getAllJumps",
};
export const BOOKING = {
  getAllEventBookings: "/booking/getAllEventBookings/",
  getBooking: "/booking/getBooking/",
};
export const EVENT = {
  getOrganizationEvents: "/event/getOrganizationEvents/",
  getEvent: "/event/getEvent/",
  addEvent: "/event/addEvent",
  updateEvent: "/company/event/updateEvent/",
  deleteEvent : "/event/deleteEvent/"
};
export const INSTRUCTOR = {
  getAllInstructors: "/company/getAllInstructors/",
  getInstructor: "/company/getInstructor/",
};
export const GIGS = {
  getAllGigs: "/company/getAllGigs",
  getGig: "/company/getGig/",
  getCompanyGigs: "/company/getCompanyGigs/",
  deleteGig: "/company/deleteGig/",
  createGig: "/company/createGig",
  updateGig: "/company/updateGig/",
};
export const AMENITY = {
  getAmenities: "/amenities/getAmenities",
};
export const SIGNWAIVER = {
  approvePolicy: "/signwaiver/policyApproval",
};
export const PRODUCT = {
  getVendorProducts: "/product/getAllVendorProducts",
  getProduct: "/product/getProduct/",
  getAdminProducts: "/product/getAllAdminProducts",
  deleteProduct: "/product/deleteProduct/",
  addProduct: "/product/addProduct",
};
export const REVIEWS = {
  getGigReviews: "/review/getGigReviews/",
  getProductReviews: "/review/getProductReviews/",
  addReview: "/review/addReview",
  getRoomReviews: "/review/getRoomReviews/",
};
export const RESET = {
  sendCode: "/reset/sendVerificationCode",
  verifyCode: "/reset/verifyRecoverCode",
  resetPassword: "/reset/resetPassword",
  changePassword: "/reset/changePassword",
};
export const COUPON = {
  getCoupons: "/coupon/getCoupons",
  getCoupon: "/coupon/getCoupon/",
};
export const GIFT = {
  addGift: "/gift/addGift",
  utilizeGift: "/gift/utilizeGift",
};
export const ORDER = {
  getMyOrders: "/order/getMyOrders",
  getOrder: "/order/getOrder/",
};
export const STAY = {
  getAllRooms: "/stay/getAllRooms",
  getRoom: "/stay/getRoom/",
  getStays: "/stay/getStays",
  getStay: "/stay/getStay/",
  toggleStay: "/stay/toggleStatus/",
  getCompanyRooms: "/stay/getCompanyRooms/",
};
export const PAYMENT = {
  paymentConfig: "/payment/config",
  paymentIntent: "/payment/create-payment-intent",
  stripeCharge: "/payment/create-stripe-charge",
};
export const FEEDBACK = {
  addFeedback: "/feedback/addFeedback",
  getFeedbacks: "/feedback/getFeedbacks",
  getFeedback: "/feedback/getFeedback/",
};
export const AVAILABILITY = {
  setHours: "/availabilty/setHours",
  getMyAvailability: "/availabilty/getMyAvailability",
  deleteHours: "/availabilty/deleteHours/",
};
export const ADMIN = {
  getUsers: "/user/admin/getUsers",
  getUser: "/user/admin/getUser/",
  toggleUser: "/user/toggleStatus/",
  dashboardInfo: "/user/admin/dashboard",
};
export const NOTIFICATIONS = {
  getMyNotifications: "/notification/getAllMyNotifications",
  toggleNotification: "/notification/toggleNotification/",
  getAllAdminNotifications: "/notification/getAllAdminNotifications",
};
export const VENDORS = {
  getVendors: "/vendor/getVendors",
  getVendor: "/vendor/getVendor/",
  toggleStatus: "/vendor/toggleStatus/",
};
export const DRIVERS = {
  getDrivers: "/driver/getDrivers",
  getDriverVehicle: "/driver/getDriverVehicle/",
  getDriver: "/driver/getDriver/",
};
export const GOOGLE_MAPS = "AIzaSyBXqV9bSEkfm5Wh7OQMj37V-n3F4AiyE40";
// export const GOOGLE_MAPS = 'AIzaSyBECY2aNK5YkXshm_ZEqtZY0M_hcJT65Iw'
