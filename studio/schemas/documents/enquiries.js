export default {
  name: "enquiries",
  type: "document",
  title: "Enquiries",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name"
    },
    {
      name: "email",
      type: "string",
      title: "Email"
    },
    {
      name: "phone",
      type: "string",
      title: "Phone"
    },
    {
      name: "check_in",
      type: "date",
      title: "Check in"
    },
    {
      name: "check_out",
      type: "date",
      title: "Check out"
    },
    {
      name: "guests",
      type: "string",
      title: "Guests"
    }
  ]
};
