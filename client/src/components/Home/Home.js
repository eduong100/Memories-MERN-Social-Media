import React, { useState } from "react";
import {
  Grow,
  Grid,
  Container,
  Paper,
  TextField,
  Button,
  AppBar,
} from "@material-ui/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import useStyles from "./styles";

import { getPostsBySearch } from "../../actions/posts";
import { GH_PATH } from "../../constants/actionTypes.js";

import Pagination from "../Pagination";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const searchQuery = searchParams.get("searchQuery");
  //const tags = searchParams.get("tags");

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        GH_PATH +
          `/posts/search?searchQuery=${search || ""}&tags=${tags.join(",")}`
      );
    } else {
      navigate(GH_PATH + "/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
