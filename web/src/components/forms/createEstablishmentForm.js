import React, { useState } from "react";

const CreateEstablishmentForm = () => {
  const [today, setToday] = useState(new Date());
  const [inputTitle, setInputTitle] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputBedrooms, setInputBedrooms] = useState("");
  const [inputBeds, setInputBeds] = useState("");
  const [inputGuests, setInputGuests] = useState("");
  const [inputLatitude, setInputLatitude] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");
  const [inputRating, setInputRating] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [inputFacilities, setInputFacilities] = useState([
    {
      _ref: "69983d75-9668-44d2-9027-41bbba38a668",
      _key: "b26739ab-3b5e-55ab-9bb4-ac642969fab9",
      _type: "facilities"
    },
    {
      _ref: "5c1f1264-94ab-4998-9451-44fc2c1fbd32", // _id these are needed to reference facilities
      _key: "9fbde20d-a505-5fe0-963b-c7f0bb7e0692", // id
      _type: "facilities"
    }
  ]);
  const [inputDescription, setInputDescription] = useState("");
  const [fileState, setFileState] = useState("");
  const [dataState, setDataState] = useState("");

  const handleFileSelect = e => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        // set image and base64'd image data in component state

        setDataState(reader.result);
        setFileState(file);
      };
    }
  };

  const handleCreateEstablishment = image => {
    const mutations = [
      {
        create: {
          _type: "establishments",
          title: inputTitle,
          image: {
            _type: "image",
            asset: {
              _ref: image._id
            }
          },
          description: inputDescription,
          typeOfEstablishment: inputType,
          availableFrom: today,
          availableUntill: today,
          price: inputPrice,
          bedrooms: inputBedrooms,
          beds: inputBeds,
          maxGuests: inputGuests,
          beds: inputBeds,
          latitude: inputLatitude,
          longitude: inputLongitude,
          rating: inputRating,
          facilities: inputFacilities
        }
      }
    ];
    console.log(mutations);
    const token =
      "skj7PZDTY7H7i09HdhE3tmtQNHurEWLABgqvzPA5naMxg62seswXv3eJzat62cCVxvURdjLNPyoeMdm8m0UAaGeHIJmT7rkoVEdKQQN7WRJ0kXwKfD3VkD5bLSurDub519SpQdYWC2ydEM0Ijcnhg56pUPY9dvJCChLLMWlKDq4EhL81X1DE";

    fetch("https://8g6l9b4n.api.sanity.io/v1/data/mutate/production", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ mutations })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  const handleUploadAndCreate = () => {
    const data = dataState;
    const file = fileState;

    const imageData = {
      image: data,
      name: file.name,
      size: file.size,
      type: file.type
    };

    if (data && file) {
      // fire off request to our upload handler
      fetch("http://localhost:9000/.netlify/functions/syncEnquiries.js", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageData)
      })
        .then(res => res.json())
        .then(imageResult => {
          console.log("success response from server...", imageResult);
          setInputImage(imageResult.data);
          handleCreateEstablishment(imageResult.data);
        })
        .catch(err => {
          console.log("error ", err);
        });
    }
  };

  const handleFormSubmit = event => {
    // const { isFormValid } = this.state;
    event.preventDefault();
    // add validation
    handleUploadAndCreate();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        placeholder="title"
        type="text"
        value={inputTitle}
        name="title"
        onChange={e => {
          setInputTitle(e.target.value);
        }}
      />
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={handleFileSelect}
      />
      <input
        placeholder="type"
        type="text"
        value={inputType}
        name="type"
        onChange={e => {
          setInputType(e.target.value);
        }}
      />
      <input
        placeholder="price"
        type="number"
        value={inputPrice}
        name="price"
        onChange={e => {
          setInputPrice(e.target.value);
        }}
      />
      <input
        placeholder="bedrooms"
        type="number"
        value={inputBedrooms}
        name="bedrooms"
        onChange={e => {
          setInputBedrooms(e.target.value);
        }}
      />
      <input
        placeholder="beds"
        type="number"
        value={inputBeds}
        name="beds"
        onChange={e => {
          setInputBeds(e.target.value);
        }}
      />
      <input
        placeholder="guests"
        type="number"
        value={inputGuests}
        name="guests"
        onChange={e => {
          setInputGuests(e.target.value);
        }}
      />
      <input
        placeholder="latitude"
        type="number"
        value={inputLatitude}
        name="latitude"
        onChange={e => {
          setInputLatitude(e.target.value);
        }}
      />
      <input
        placeholder="longitude"
        type="number"
        value={inputLongitude}
        name="longitude"
        onChange={e => {
          setInputLongitude(e.target.value);
        }}
      />
      <input
        placeholder="longitude"
        type="number"
        value={inputRating}
        name="longitude"
        onChange={e => {
          setInputRating(e.target.value);
        }}
      />
      <textarea
        placeholder="description"
        type="textarea"
        value={inputDescription}
        name="description"
        onChange={e => {
          setInputDescription(e.target.value);
        }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default CreateEstablishmentForm;
