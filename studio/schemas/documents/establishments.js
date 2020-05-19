export default {
  name: "establishments",
  type: "document",
  title: "Establishments",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "description",
      type: "text",
      title: "Discription"
    },
    {
      name: "image",
      type: "image",
      title: "Image"
    },
    {
      name: "typeOfEstablishment",
      type: "string",
      title: "Type"
    },
    {
      title: "Available from",
      name: "availableFrom",
      type: "date"
    },
    {
      title: "Available untill",
      name: "availableUntill",
      type: "date"
    },
    {
      name: "price",
      type: "string",
      title: "Price per night"
    },
    {
      name: "bedrooms",
      type: "string",
      title: "How many bedrooms?"
    },
    {
      name: "beds",
      type: "string",
      title: "How many beds?"
    },
    {
      name: "maxGuests",
      type: "string",
      title: "Max amount of guests"
    },
    {
      name: "latitude",
      type: "string",
      title: "Latitude"
    },
    {
      name: "longitude",
      type: "string",
      title: "Longitude"
    },
    {
      name: "rating",
      type: "string",
      title: "Rating"
    },
    {
      title: "Facilites",
      name: "facilities",
      type: "array",
      of: [
        {
          name: "facilities",
          type: "reference",
          to: [{ type: "facilities", title: "Facility" }]
        }
      ]
    }
  ]
};
