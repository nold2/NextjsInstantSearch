import NextHead from "next/head";
import React from "react";

export const Head = () => (
    <NextHead>
      <title>Browse</title>
      <meta name="description" content="Alamat.com"/>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/reset-min.css"
        />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
        />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800" rel="stylesheet"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </NextHead>
);
