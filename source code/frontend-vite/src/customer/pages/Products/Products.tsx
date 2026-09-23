/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import FilterSection from "./FilterSection";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../Redux Toolkit/Customer/ProductSlice";



const Products = () => {
  const [sort, setSort] = React.useState("");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showFilter, setShowFilter] = useState(false);
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store);
  const [searchParams] = useSearchParams();
  const [page,setPage]=useState(1)
  

  const handleSortProduct = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
    console.log("showFilter   ", showFilter);
  };

  const handlePageChange = (value: any) => {
    setPage(value)
    console.log("page nummmberr ", value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const newFilters = {
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber:page-1,
      minDiscount: searchParams.get("discount")
        ? Number(searchParams.get("discount"))
        : undefined,
    };

    dispatch(getAllProducts({ category: categoryId, sort, ...newFilters }));
  }, [searchParams, categoryId, sort,page]);


  // console.log(" store ", products)
  return (
    <div className="bg-ink min-h-screen text-cream pt-10 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <p className="text-center text-[11px] tracking-[0.35em] uppercase text-gold-soft">The Collection</p>
        <h1 className="mt-2 text-3xl lg:text-4xl text-center font-display luxury-gradient-text pb-8 uppercase space-x-2">
          {categoryId?.split("_").map((item) => (
            <span key={item}>{item}</span>
          ))}
        </h1>

        {/* toolbar row: aligned with both columns */}
        <div className="flex justify-between items-center h-[52px] px-1 mb-5">
          <div className="flex items-center gap-3">
            {!isLarge && (
              <IconButton onClick={handleShowFilter} sx={{ border: "1px solid rgba(var(--line))" }}>
                <FilterAltIcon className="text-gold-soft" />
              </IconButton>
            )}
            <p className="text-sm text-muted">
              {products.products?.length ? `${products.products.length} pieces` : "Curated pieces"}
            </p>
          </div>
          <FormControl size="small" sx={{ width: "200px" }}>
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              id="sort"
              value={sort}
              label="Sort"
              onChange={handleSortProduct}
            >
              <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
              <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
            </Select>
          </FormControl>
        </div>
        {showFilter && !isLarge && (
          <Box sx={{ zIndex: 30 }} className="mb-5 lg:hidden">
            <FilterSection />
          </Box>
        )}

        <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6 items-start">
          <aside className="hidden lg:block lg:sticky lg:top-24">
            <FilterSection />
          </aside>
          <div className="min-w-0">
            <Divider sx={{ mb: 3 }} />

            {products.products?.length > 0 ? (
              <section className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8 justify-center">
                {products.products.map((item: any, index: number) => (
                  <div key={item.id ?? index} className="min-w-0">
                    <ProductCard item={item} />
                  </div>
                ))}
              </section>
            ) : (
              <section className="items-center flex flex-col gap-5 justify-center min-h-[50vh] border border-line rounded-2xl bg-card px-6 py-12 text-center">
                <img
                  className="w-72 max-w-full opacity-80"
                  src="https://cdn.pixabay.com/photo/2022/05/28/10/45/oops-7227010_960_720.png"
                  alt="No products"
                />
                <h1 className="font-bold text-xl flex flex-wrap items-center justify-center gap-2 text-cream">
                  Product Not Found For{" "}
                  <span className="text-gold-soft flex gap-2 uppercase">
                    {categoryId?.split("_").map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </span>
                </h1>
              </section>
            )}
            <div className="flex justify-center pt-10">
              <Pagination
                page={page}
                onChange={(e, value) => handlePageChange(value)}
                color="primary"
                count={products?.totalPages}
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
