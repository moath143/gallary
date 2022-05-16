import React, { useState, useEffect } from "react";
import RecipeReviewCard from "../../components/Card";
import SearchAppBar from "../../components/Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { api } from "../../api";

const Home = () => {
  const [photosResponse, setPhotosResponse] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = photosResponse?.response?.results?.map((item, index) => {
    return (
      <ListItemIcon
        key={index}
        align="justify"
        sx={{ width: 300, height: 300 }}
      >
        <RecipeReviewCard
          img={item.urls.full}
          btn={item.links.download_location}
        />
      </ListItemIcon>
    );
  });

  // console.log(photosResponse?.response?.results[5].links.download_location);
  console.log(search);

  useEffect(() => {
    setIsLoading(true);
    api.search
      .getPhotos({ query: search || "dog", orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("something went wrong!");
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <SearchAppBar setSearch={setSearch} search={search} />
      <Container>
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="secondary" />
          </Box>
        ) : (
          data
        )}
      </Container>
    </div>
  );
};

export default Home;
