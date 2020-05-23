import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ContactForm from "../components/forms/contactForm.js";
import Container from "../components/container";

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <Container>
      <div className="contact">
        <h1>Contact</h1>

        <ContactForm />
      </div>
    </Container>
  </Layout>
);

export default Contact;
