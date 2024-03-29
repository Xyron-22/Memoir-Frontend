import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

import useStyles from "./styles"


const Paginate = ({page, currentId, toggle}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector((state) => state.posts);
    
   
    useEffect(() => {
        if(page) {
            dispatch(getPosts(page));
        }
    }, [page, currentId, toggle, dispatch]);

    return (
        <Pagination classes={{ ul: classes.ul}} count={numberOfPages} page={Number(page)} variant="outlined" color="primary" renderItem={(item) => (<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>)} ></Pagination>
    )
}

export default Paginate;