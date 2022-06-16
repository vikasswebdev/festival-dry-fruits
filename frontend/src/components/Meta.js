import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Festival Dry Fruits",
  description:
    "we are serving best services with dry fruits that is our first responsibility",
  keywords: "dry-fruits, premium quality dryfruits, buy dry fruits",
};

export default Meta;
