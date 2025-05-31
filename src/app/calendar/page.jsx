import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/CalenderBox";

// Optional: Add custom metadata using <Head> if needed
// import Head from "next/head";

const CalendarPage = () => {
  return (
    <>
      {/* If you want to set the title without using Metadata, use <Head> */}
      {/* 
      <Head>
        <title>Calendar Page</title>
      </Head>
      */}

      <Breadcrumb pageName="Calendar" />
      <CalendarBox />
    </>
  );
};

export default CalendarPage;
