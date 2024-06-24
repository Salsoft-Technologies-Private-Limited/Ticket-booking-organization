import testiProfilePic from "../../assets/testi-profile.png";
import clientlogo1 from "../../assets/client-logo1.png";
import clientlogo2 from "../../assets/client-logo2.png";
import clientlogo3 from "../../assets/client-logo3.png";
import clientlogo4 from "../../assets/client-logo4.png";
import clientlogo5 from "../../assets/client-logo5.png";
import clientlogo6 from "../../assets/client-logo6.png";

import stayBookingimg from "../../assets/stay-bookingimg.png";
import dropcardimg from "../../assets/skydrive-img.png";
import reviewspro from "../../assets/reviews-pro.png";
import instructorspro from "../../assets/instructors-pro.png";
import myprofilepic from "../../assets/profileimg.png";
import flagimg from "../../assets/flag.png";
import glasses from "../../assets/glasses.png";
import helmet from "../../assets/helmet.png";
import skycamera from "../../assets/skycamera.png";
import gloves from "../../assets/gloves.png";
import sellerimg from "../../assets/seller-img.png";
import selfieImg from "../../assets/profileimg.png";
import idFrontImg from "../../assets/idfront.png";
import idBackImg from "../../assets/idback.png";
import licenseImg from "../../assets/license.png";
import { Link } from "react-router-dom";

export const userManagementDate = [
  {
    id: 1,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    firstName: "Alex",
    lastName: "Martin",
    email: "Alex@Martinjames.com",
    loctaion: "ABC road, 123 street New York",
    gender: "Male",
    mobile: "+1 844-219-0009",
  },
  {
    id: 2,
    firstName: "Alex",
    lastName: "Martin",
    email: "Alex@Martinjames.com",
    loctaion: "ABC road, 123 street New York",
    gender: "Male",
    mobile: "+1 844-219-0009",
  },
  {
    id: 3,
    firstName: "Alex3",
    lastName: "Martin",
    email: "Alex@Martinjames.com",
    loctaion: "ABC road, 123 street New York",
    gender: "Male",
    mobile: "+1 844-219-0009",
  },
];
export const artistData = [
  {
    id: 1,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    firstName: "Alex",
    lastName: "Martin",
    email: "Alex@Martinjames.com",
    loctaion: "ABC road, 123 street New York",
    gender: "Male",
    mobile: "+1 844-219-0009",
  },
  {
    id: 2,
    firstName: "Alex",
    lastName: "Martin",
    email: "Alex@Martinjames.com",
    loctaion: "ABC road, 123 street New York",
    gender: "Male",
    mobile: "+1 844-219-0009",
  },
  {
    id: 3,
    firstName: "Alex3",
    lastName: "Martin",
    email: "Alex@Martinjames.com",
    loctaion: "ABC road, 123 street New York",
    gender: "Male",
    mobile: "+1 844-219-0009",
  },
];

export const staysManagementDate = [
  {
    id: 1,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    stayName: "Alex",
    userName: "Martin",
    email: "Alex@Martinjames.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 2,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    stayName: "Alex",
    userName: "Martin",
    email: "Alex@Martinjames.com",
  },
  {
    id: 3,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    stayName: "Alex",
    userName: "Martin",
    email: "Alex@Martinjames.com",
  },
];

export const dropZoneManagementData = [
  {
    id: 1,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "ACTIVE",
    statusText: "Active",
    companyName: "Primitive Conditioning",
    username: "Jeremy Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 2,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "BANNED",
    statusText: "Banned",
    companyName: "Drop the Complexity",
    username: "Jeremy Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 3,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "PENDING",
    statusText: "Pending",
    companyName: "The Universal Solution",
    username: "Jeremy Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
];

export const listingData = [
  {
    id: 1,
    pic: (
      <img
        src={dropcardimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Jump Switzerland Tickets",
    companylink: "ABC DROPZONE",
    subtitle: "Tandem Jump from 13,000 Ft",
    price: "425.00",
    rating: 4,
    additionalDetails:
      "Aenean euismod Lorem ipsum dolor sit amet, m dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "12:00 PM",
    date: "29 Sep 2023",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    loctaion: "ABC road, 123 street New York",
    weather: "Sunny",
    jumptype: "Tandem",
  },
  {
    id: 2,
    pic: (
      <img
        src={dropcardimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Jump Switzerland Tickets",
    companylink: "ABC DROPZONE",
    subtitle: "Tandem Jump from 13,000 Ft",
    price: "425.00",
    rating: 4,
    additionalDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since....",
    time: "12:00 PM",
    date: "29 Sep 2023",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    loctaion: "ABC road, 123 street New York",
    weather: "Sunny",
    jumptype: "Tandem",
  },
];

export const reservationLogsData = [
  {
    id: 1,
    pic: (
      <img
        src={dropcardimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "UPCOMING",
    statusText: "Upcoming",
    bookingId: "#25874",
    customername: "Jeremy",
    dropZoneName: "Tandem Jump",
    cost: "$450.00",
    title: "Jump Switzerland Tickets",
    subtitle: "Tandem Jump from 13,000 Ft",
    additionalDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sitamet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "12:00 PM",
    date: "29 Sep 2023",
  },
  {
    id: 2,
    pic: (
      <img
        src={dropcardimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "ONGOING",
    statusText: "Ongoing",
    bookingId: "#25874",
    customername: "Jeremy",
    dropZoneName: "Tandem Jump",
    subtitle: "Tandem Jump from 13,000 Ft",
    cost: "$450.00",
    title: "Elegantly Sobha Hartlands",
    additionalDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sitamet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "12:00 PM",
    date: "29 Sep 2023",
  },
  {
    id: 3,
    pic: (
      <img
        src={dropcardimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "UPCOMING",
    statusText: "Upcoming",
    bookingId: "#25874",
    customername: "Jeremy",
    dropZoneName: "Tandem Jump",
    subtitle: "Tandem Jump from 13,000 Ft",
    cost: "$450.00",
    title: "Elegantly Sobha Hartlands",
    additionalDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sitamet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "12:00 PM",
    date: "29 Sep 2023",
  },
  {
    id: 4,
    pic: (
      <img
        src={dropcardimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "COMPLETED",
    statusText: "Completed",
    bookingId: "#25874",
    customername: "Jeremy",
    dropZoneName: "Tandem Jump",
    subtitle: "Tandem Jump from 13,000 Ft",
    cost: "$450.00",
    title: "Elegantly Sobha Hartlands",
    additionalDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sitamet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "12:00 PM",
    date: "29 Sep 2023",
  },
];

export const roomViewDate = [
  {
    id: 1,
    pic: <img src={stayBookingimg} alt="" className="img-fluid" />,
    statusText: "Completed",
    time: "12:00 PM",
    date: "29 Sep 2023",
    day: "02 Days",
    paidAmmont: "$80.00/Paid",
    title: "Elegantly Sobha Hartlands",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    lengthStay: "02 Days Stay",
    roomType: "Studio with Balcony",
    bathroom: "Private studio • 1 bathroom • 30m²",
    beds: "2 beds (1 king, 1 sofa bed",
    included: "Breakfast included",
    price: "80.00",
    duration: "2 Night, 2 Adults",
    rating: 4,
    loctaion: "ABC road, 123 street New York",
  },
  {
    id: 2,
    pic: <img src={stayBookingimg} alt="" className="img-fluid" />,
    statusText: "Ongoing",
    time: "12:00 PM",
    date: "29 Sep 2023",
    day: "02 Days",
    paidAmmont: "$80.00/Paid",
    title: "Elegantly Sobha Hartlands",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    lengthStay: "02 Days Stay",
    roomType: "Studio with Balcony",
    bathroom: "Private studio • 1 bathroom • 30m²",
    beds: "2 beds (1 king, 1 sofa bed",
    included: "Breakfast included",
    price: "80.00",
    duration: "2 Night, 2 Adults",
    rating: 5,
    loctaion: "ABC road, 123 street New York",
  },
  {
    id: 3,
    pic: <img src={stayBookingimg} alt="" className="img-fluid" />,
    statusText: "Upcoming",
    time: "12:00 PM",
    date: "29 Sep 2023",
    day: "02 Days",
    paidAmmont: "$80.00/Paid",
    title: "Elegantly Sobha Hartlands",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    lengthStay: "02 Days Stay",
    roomType: "Studio with Balcony",
    bathroom: "Private studio • 1 bathroom • 30m²",
    beds: "2 beds (1 king, 1 sofa bed",
    included: "Breakfast included",
    price: "80.00",
    duration: "2 Night, 2 Adults",
    rating: 5,
    loctaion: "ABC road, 123 street New York",
  },
  {
    id: 4,
    pic: <img src={stayBookingimg} alt="" className="img-fluid" />,
    statusText: "Completed",
    time: "12:00 PM",
    date: "29 Sep 2023",
    day: "02 Days",
    paidAmmont: "$80.00/Paid",
    title: "Elegantly Sobha Hartlands",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    lengthStay: "02 Days Stay",
    roomType: "Studio with Balcony",
    bathroom: "Private studio • 1 bathroom • 30m²",
    beds: "2 beds (1 king, 1 sofa bed",
    included: "Breakfast included",
    price: "80.00",
    duration: "2 Night, 2 Adults",
    rating: 4,
    loctaion: "ABC road, 123 street New York",
  },
  {
    id: 5,
    pic: <img src={stayBookingimg} alt="" className="img-fluid" />,
    statusText: "Ongoing",
    time: "12:00 PM",
    date: "29 Sep 2023",
    day: "02 Days",
    paidAmmont: "$80.00/Paid",
    title: "Elegantly Sobha Hartlands",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    lengthStay: "02 Days Stay",
    roomType: "Studio with Balcony",
    bathroom: "Private studio • 1 bathroom • 30m²",
    beds: "2 beds (1 king, 1 sofa bed",
    included: "Breakfast included",
    price: "80.00",
    duration: "2 Night, 2 Adults",
    rating: 5,
    loctaion: "ABC road, 123 street New York",
  },
  {
    id: 6,
    pic: <img src={stayBookingimg} alt="" className="img-fluid" />,
    statusText: "Completed",
    time: "12:00 PM",
    date: "29 Sep 2023",
    day: "02 Days",
    paidAmmont: "$80.00/Paid",
    title: "Elegantly Sobha Hartlands",
    checkIn: "Wed, May 25, 2023, From 2:00 PM",
    checkOut: "Fri, May 27, 2023, Until 11:00 AM",
    lengthStay: "02 Days Stay",
    roomType: "Studio with Balcony",
    bathroom: "Private studio • 1 bathroom • 30m²",
    beds: "2 beds (1 king, 1 sofa bed",
    included: "Breakfast included",
    price: "80.00",
    duration: "2 Night, 2 Adults",
    rating: 5,
    loctaion: "ABC road, 123 street New York",
  },
];

export const reviews = [
  {
    id: 1,
    reviewsProfile: <img src={reviewspro} alt="" className="img-fluid" />,
    reviewName: "James Anderson",
    rating: 5,
    reviewDiscretion:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    reviewsProfile: <img src={reviewspro} alt="" className="img-fluid" />,
    rating: 4,
    reviewName: "James Anderson",
    reviewDiscretion:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export const paymentData = [
  {
    id: 1,
    dropZoneID: "#25874",
    dropZoneName: "Drop Zone Name",
    customername: "Jeremy Martin",
    skydiveType: "Tandem",
    amountPaid: "$224.00",
    commission: "$224.00",
  },
  {
    id: 2,
    dropZoneID: "#25874",
    dropZoneName: "Drop Zone Name",
    customername: "Jeremy Martin",
    skydiveType: "Tandem",
    amountPaid: "$224.00",
    commission: "$224.00",
  },
  {
    id: 3,
    dropZoneID: "#25874",
    dropZoneName: "Drop Zone Name",
    customername: "Jeremy Martin",
    skydiveType: "Tandem",
    amountPaid: "$224.00",
    commission: "$224.00",
  },
];

export const feedbackData = [
  {
    id: 1,
    name: "Mary Moore",
    email: "mary@gmail.com",
  },
  {
    id: 2,
    name: "Alex James",
    email: "Alex@gmail.com",
  },
];

export const driverManagementData = [
  {
    id: 1,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "ACTIVE",
    statusText: "Active",
    firstName: "Jeremy",
    lastName: "Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 2,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "BANNED",
    statusText: "Banned",
    firstName: "Jeremy",
    lastName: "Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 3,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "PENDING",
    statusText: "Pending",
    firstName: "Jeremy",
    lastName: "Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
];

export const vendorManagementData = [
  {
    id: 1,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "ACTIVE",
    statusText: "Active",
    firstName: "Jeremy",
    lastName: "Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 2,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "BANNED",
    statusText: "Banned",
    firstName: "Jeremy",
    lastName: "Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
  {
    id: 3,
    pic: (
      <img
        src={myprofilepic}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    status: "PENDING",
    statusText: "Pending",
    firstName: "Jeremy",
    lastName: "Martin",
    email: "Jermy@Martin.com",
    mobile: "+353 01 311 00",
  },
];


export const marketplaceData = [
  {
    id: 1,
    pic: (
      <img
        src={glasses}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Dark Skydiving Goggles",
    price: "380.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 2,
    pic: (
      <img
        src={helmet}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Aero Full Face",
    price: "450.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 3,
    pic: (
      <img
        src={skycamera}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "AS-15 Angle Camera",
    price: "880.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 4,
    pic: (
      <img
        src={gloves}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Akando Windstopper Gloves",
    price: "220.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 5,
    pic: (
      <img
        src={glasses}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Dark Skydiving Goggles",
    price: "380.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 6,
    pic: (
      <img
        src={helmet}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Aero Full Face",
    price: "450.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 7,
    pic: (
      <img
        src={skycamera}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "AS-15 Angle Camera",
    price: "880.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 8,
    pic: (
      <img
        src={gloves}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Akando Windstopper Gloves",
    price: "220.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
  {
    id: 9,
    pic: (
      <img
        src={glasses}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
    title: "Dark Skydiving Goggles",
    price: "380.00",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    sellerName: "Alan Anderson",
    sellerNumber: "+353 01 311 00",
    sellerEmail: "Testing@Example.com",
    sellerimg: (
      <img
        src={sellerimg}
        alt=""
        className="img-fluid"
        style={{ width: "100%" }}
      />
    ),
  },
];

export const myordersData = [
  {
    id: 1,
    orderId: "001_4567",
    createdAt: new Date(),
    amount: 1000,
    status: "PENDING",
    customerName: "Tom Albert",
    email: "Testing@Example.com",
    paymentMethod: "Card",
    address: "3718 Davis Avenue, 94785 San Francisco ",
    statusText: "Pending",
    username: "Tom Albert",
    phoneNumber: "+1 707-787-0345",
    country: "United States",
    city: "San Francisco",
    state: "California",
    zipcode: "94107",
  },
  {
    id: 2,
    orderId: "001_4568",
    createdAt: new Date(),
    amount: 500,
    status: "ONGOING",
    customerName: "Tom Albert",
    email: "Testing@Example.com",
    paymentMethod: "Card",
    address: "3718 Davis Avenue, 94785 San Francisco ",
    statusText: "Ongoing",
    username: "Tom Albert",
    phoneNumber: "+1 707-787-0345",
    country: "United States",
    city: "San Francisco",
    state: "California",
    zipcode: "94107",
  },
  {
    id: 3,
    orderId: "001_4578",
    createdAt: new Date(),
    amount: 587,
    status: "PENDING",
    customerName: "Tom Albert",
    email: "Testing@Example.com",
    paymentMethod: "Card",
    address: "3718 Davis Avenue, 94785 San Francisco ",
    statusText: "Pending",
    username: "Tom Albert",
    phoneNumber: "+1 707-787-0345",
    country: "United States",
    city: "San Francisco",
    state: "California",
    zipcode: "94107",
  },
  {
    id: 4,
    orderId: "001_4567",
    createdAt: new Date(),
    amount: 660,
    status: "COMPLETED",
    customerName: "Tom Albert",
    email: "Testing@Example.com",
    paymentMethod: "Card",
    address: "3718 Davis Avenue, 94785 San Francisco ",
    statusText: "Completed",
    username: "Tom Albert",
    phoneNumber: "+1 707-787-0345",
    country: "United States",
    city: "San Francisco",
    state: "California",
    zipcode: "94107",
  },
  {
    id: 5,
    orderId: "001_4567",
    createdAt: new Date(),
    amount: 750,
    status: "COMPLETED",
    customerName: "Tom Albert",
    email: "Testing@Example.com",
    paymentMethod: "Card",
    address: "3718 Davis Avenue, 94785 San Francisco ",
    statusText: "Completed",
    username: "Tom Albert",
    phoneNumber: "+1 707-787-0345",
    country: "United States",
    city: "San Francisco",
    state: "California",
    zipcode: "94107",
  },
];
