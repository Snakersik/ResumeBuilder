import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    width: 200,
    height: "100%",
    alignItems: "center",
    padding: 20,

    backgroundColor: "blue",
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    "@media orientation: landscape": {
      width: 200,
    },
  },
  rightColumn: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  footer: {
    fontSize: 12,
    fontFamily: "Lato Bold",
    textAlign: "center",
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
    "@media orientation: landscape": {
      marginTop: 10,
    },
  },
});

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    image: null,
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, [id]: file }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  return (
    <>
      <div className="App">
        <form>
          <div className="form-row">
            <label htmlFor="fullName">Full name:</label>
            <br />
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="address">Address:</label>
            <br />
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="phone">Phone:</label>
            <br />
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">E-mail:</label>
            <br />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="image">Photo</label>
            <br />
            <input
              type="file"
              id="image"
              onChange={handleChange}
              required
              accept=".png, .jpg, .jpeg"
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <PDFViewer formData={formData} width={2000} height={1000}>
        <Resume formData={formData} />
      </PDFViewer>
    </>
  );
}

const Resume = ({ formData }) => (
  <Document pageLayout="twoColumnLeft">
    <Page size="A4" style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          src={URL.createObjectURL(formData.image)}
          style={{
            width: "100",
            height: "100",
            borderRadius: "100",
          }}
        ></Image>
        <Text style={{ fontSize: "10px" }}>{formData?.fullName}</Text>
        <Text>{formData?.email}</Text>
        <Text>{formData?.address}</Text>
        <Text>{formData?.phone}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text>Education</Text>
        <Text>Education</Text>
        <Text>Education</Text>
        <Text>Education</Text>
        <Text>Education</Text>
      </View>
    </Page>
  </Document>
);

export default App;
