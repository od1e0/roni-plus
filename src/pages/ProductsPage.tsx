import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import type { Product, Category } from "../types";

const ProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://localhost:3000/api/categories"
        );
        if (!categoriesResponse.ok) {
          throw new Error("Ошибка при загрузке категорий");
        }
        const data = await categoriesResponse.json();
        console.log("=== CATEGORIES LOADED ===");
        console.log("Categories data:", data);
        console.log("Categories count:", data.length);
        console.log(
          "Categories structure:",
          data.map((c: any) => ({
            id: c.id,
            name: c.name,
            parentId: c.parentId,
          }))
        );

        // NEW: Log detailed hierarchy information
        console.log("\n=== CATEGORY HIERARCHY ANALYSIS ===");
        data.forEach((category: any) => {
          const children = data.filter((c: any) => c.parentId === category.id);
          const parent = data.find((c: any) => c.id === category.parentId);
          console.log(`Category: ${category.name} (${category.id})`);
          console.log(`  Parent: ${parent ? parent.name : "None"}`);
          console.log(
            `  Children: ${
              children.map((c: any) => c.name).join(", ") || "None"
            }`
          );
          console.log(`  Is root: ${!category.parentId}`);
          console.log("---");
        });
        console.log("=== HIERARCHY ANALYSIS END ===\n");

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsResponse = await fetch(
          "http://localhost:3000/api/products"
        );
        if (!productsResponse.ok) {
          throw new Error("Ошибка при загрузке товаров");
        }
        const productsData = await productsResponse.json();
        console.log("\n=== PRODUCTS LOADED ===");
        console.log("Products count:", productsData.length);
        console.log("Sample product structure:", productsData[0]);
        console.log(
          "All products categories info:",
          productsData.map((p: any) => ({
            name: p.name,
            categories: p.categories,
            category: p.category,
            categoryName: p.categoryName,
          }))
        );
        setAllProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Set active category based on URL
  useEffect(() => {
    console.log("=== CATEGORY CHANGE DEBUG ===");
    console.log("URL categoryId:", categoryId);
    console.log(
      "Available categories:",
      categories.map((c) => ({ id: c.id, name: c.name }))
    );

    if (categoryId && categories.length > 0) {
      const foundCategory = categories.find((c) => c.id === categoryId);

      if (foundCategory) {
        console.log("✅ Category found in URL:", {
          id: foundCategory.id,
          name: foundCategory.name,
        });
        setActiveCategory(foundCategory.id);
        setCurrentPage(1);
      } else {
        console.log('❌ Category not found in URL, setting to "all"');
        // Don't redirect, just show all products
        setActiveCategory("all");
      }
    } else {
      console.log("ℹ️ No categoryId in URL or no categories loaded yet");
    }
    console.log("=== CATEGORY CHANGE DEBUG END ===\n");
  }, [categoryId, categories, navigate]);

  // Apply filters when active category, search term, or sort by changes
  useEffect(() => {
    let result = [...allProducts];


    if (activeCategory !== "all") {


      result = result.filter((product) => {



        const selectedCategory = categories.find(
          (c) => c.id === activeCategory
        );
        if (selectedCategory) {



          if (product.categories && Array.isArray(product.categories)) {



            if (product.categories.includes(activeCategory)) {
              return true;
            }


            if (
              selectedCategory.children &&
              selectedCategory.children.length > 0
            ) {
              const hasSubcategoryMatch = selectedCategory.children.some(
                (child) => product.categories!.includes(child.id)
              );
              if (hasSubcategoryMatch) {
                return true;
              } 
            } 
          } else if (
            product.categoryNames &&
            Array.isArray(product.categoryNames)
          ) {


            if (product.categoryNames.includes(selectedCategory.name)) {
              return true;
            }

            if (
              selectedCategory.children &&
              selectedCategory.children.length > 0
            ) { 
              const hasSubcategoryNameMatch = selectedCategory.children.some(
                (child) => product.categoryNames!.includes(child.name)
              );
              if (hasSubcategoryNameMatch) {
                return true;
              } 
            } 
          } else {


            if (product.category === activeCategory) {
              return true;
            }

            if (product.categoryName === selectedCategory.name) {
              return true;
            }

            if (product.category && typeof product.category === "string") {
              const categoryIds = product.category
                .split(/[,;\s]+/)
                .filter((id) => id.trim());
              if (categoryIds.length > 1) {
                if (categoryIds.includes(activeCategory)) {
                  return true;
                }
              }
            }

            if (
              product.categoryName &&
              typeof product.categoryName === "string"
            ) {
              const categoryNames = product.categoryName
                .split(/[,;\s]+/)
                .filter((name) => name.trim());
              if (categoryNames.length > 1) {
                if (categoryNames.includes(selectedCategory.name)) {
                  return true;
                }
              }
            }

            if (
              selectedCategory.children &&
              selectedCategory.children.length > 0
            ) {
              const hasSubcategoryMatch = selectedCategory.children.some(
                (child) => product.category === child.id
              );
              if (hasSubcategoryMatch) {
                return true;
              }

              if (product.category && typeof product.category === "string") {
                const categoryIds = product.category
                  .split(/[,;\s]+/)
                  .filter((id) => id.trim());
                const hasMultipleSubcategoryMatch =
                  selectedCategory.children.some((child) =>
                    categoryIds.includes(child.id)
                  );
                if (hasMultipleSubcategoryMatch) {
                  return true;
                }
              }
            }

            if (
              selectedCategory.children &&
              selectedCategory.children.length > 0
            ) {
              const hasSubcategoryMatch = selectedCategory.children.some(
                (child) => product.categoryName === child.name
              );
              if (hasSubcategoryMatch) {
                return true;
              }

              if (
                product.categoryName &&
                typeof product.categoryName === "string"
              ) {
                const categoryNames = product.categoryName
                  .split(/[,;\s]+/)
                  .filter((name) => name.trim());
                const hasMultipleSubcategoryNameMatch =
                  selectedCategory.children.some((child) =>
                    categoryNames.includes(child.name)
                  );
                if (hasMultipleSubcategoryNameMatch) {
                  return true;
                }
              }
            }


            const checkNestedSubcategories = (category: any): boolean => {
              if (category.children && category.children.length > 0) {
                for (const child of category.children) {

                  if (
                    product.category === child.id ||
                    product.categoryName === child.name
                  ) {
                    return true;
                  }


                  if (
                    product.category &&
                    typeof product.category === "string"
                  ) {
                    const categoryIds = product.category
                      .split(/[,;\s]+/)
                      .filter((id) => id.trim());
                    if (categoryIds.includes(child.id)) {
                      return true;
                    }
                  }


                  if (
                    product.categoryName &&
                    typeof product.categoryName === "string"
                  ) {
                    const categoryNames = product.categoryName
                      .split(/[,;\s]+/)
                      .filter((name) => name.trim());
                    if (categoryNames.includes(child.name)) {
                      return true;
                    }
                  }


                  if (checkNestedSubcategories(child)) {
                    return true;
                  }
                }
              }
              return false;
            };

            if (checkNestedSubcategories(selectedCategory)) {
              console.log(
                "🔄 LEGACY NESTED SUBcategory MATCH: Product belongs to nested subcategory"
              );
              return true;
            }


            if (selectedCategory.parentId) {
              console.log("🔍 Checking parent category hierarchy...");
              const parentCategory = categories.find(
                (c) => c.id === selectedCategory.parentId
              );
              if (parentCategory) {
                console.log("Parent category found:", {
                  id: parentCategory.id,
                  name: parentCategory.name,
                });


                if (product.category === parentCategory.id) {
                  console.log(
                    "🔄 LEGACY PARENT ID MATCH: Product belongs to parent category by ID"
                  );
                  return true;
                }


                if (product.category && typeof product.category === "string") {
                  const categoryIds = product.category
                    .split(/[,;\s]+/)
                    .filter((id) => id.trim());
                  if (categoryIds.includes(parentCategory.id)) {
                    console.log(
                      "🔄 LEGACY PARENT ID MATCH: Product category contains parent category ID"
                    );
                    return true;
                  }
                }


                if (product.categoryName === parentCategory.name) {
                  console.log(
                    "🔄 LEGACY PARENT NAME MATCH: Product belongs to parent category by name"
                  );
                  return true;
                }


                if (
                  product.categoryName &&
                  typeof product.categoryName === "string"
                ) {
                  const categoryNames = product.categoryName
                    .split(/[,;\s]+/)
                    .filter((name) => name.trim());
                  if (categoryNames.includes(parentCategory.name)) {
                    console.log(
                      "🔄 LEGACY PARENT NAME MATCH: Product categoryName contains parent category name"
                    );
                    return true;
                  }
                }
              }
            }


            console.log(
              "🔍 Checking if selected category is a subcategory of product category..."
            );
            const productCategory = categories.find(
              (c) => c.id === product.category
            );
            if (productCategory) {
              console.log("Product category found:", {
                id: productCategory.id,
                name: productCategory.name,
                parentId: productCategory.parentId,
              });


              if (
                productCategory.children &&
                productCategory.children.length > 0
              ) {
                const isChildOfProductCategory = productCategory.children.some(
                  (child) =>
                    child.id === activeCategory ||
                    child.name === selectedCategory.name
                );
                if (isChildOfProductCategory) {
                  console.log(
                    "🔄 LEGACY REVERSE HIERARCHY MATCH: Selected category is a subcategory of product category"
                  );
                  return true;
                }


                if (product.category && typeof product.category === "string") {
                  const categoryIds = product.category
                    .split(/[,;\s]+/)
                    .filter((id) => id.trim());
                  const hasMultipleReverseHierarchyMatch = categoryIds.some(
                    (catId) => {
                      const cat = categories.find((c) => c.id === catId);
                      if (cat && cat.children && cat.children.length > 0) {
                        return cat.children.some(
                          (child) =>
                            child.id === activeCategory ||
                            child.name === selectedCategory.name
                        );
                      }
                      return false;
                    }
                  );
                  if (hasMultipleReverseHierarchyMatch) {
                    console.log(
                      "🎯 MULTIPLE CATEGORIES REVERSE HIERARCHY MATCH: Product has multiple categories and selected category is a child of one of them"
                    );
                    return true;
                  }
                }
              }


              const checkIfSelectedIsNestedSubcategory = (
                category: any
              ): boolean => {
                if (category.children && category.children.length > 0) {
                  for (const child of category.children) {
                    if (
                      child.id === activeCategory ||
                      child.name === selectedCategory.name
                    ) {
                      return true;
                    }
                    if (checkIfSelectedIsNestedSubcategory(child)) {
                      return true;
                    }
                  }
                }
                return false;
              };


              if (product.category && typeof product.category === "string") {
                const categoryIds = product.category
                  .split(/[,;\s]+/)
                  .filter((id) => id.trim());
                const hasMultipleNestedReverseHierarchyMatch = categoryIds.some(
                  (catId) => {
                    const cat = categories.find((c) => c.id === catId);
                    if (cat) {
                      return checkIfSelectedIsNestedSubcategory(cat);
                    }
                    return false;
                  }
                );
                if (hasMultipleNestedReverseHierarchyMatch) {
                  return true;
                }
              }

              if (checkIfSelectedIsNestedSubcategory(productCategory)) {
                return true;
              }
            }

            if (product.category === selectedCategory.name) {
              return true;
            }
          }

          return false;
        }

        return false;
      });
    } 

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "price_low_high":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price_high_low":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "name_a_z":
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_z_a":
        result = result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order or sort by some default field
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeCategory, searchTerm, sortBy, allProducts, categories]);

  // Calculate current items for pagination
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredProducts]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);

    // Scroll to top of product section
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-neutral-100 py-10 mb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-900">
              {activeCategory === "all"
                ? "Каталог продукции"
                : categories.find((c) => c.id === activeCategory)?.name ||
                  "Каталог продукции"}
            </h1>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
              {activeCategory === "all"
                ? "Широкий выбор памятников различных форм и размеров из качественных материалов"
                : `Товары в категории "${
                    categories.find((c) => c.id === activeCategory)?.name
                  }". ${
                    categories.find((c) => c.id === activeCategory)
                      ?.description ||
                    "Качественные изделия по доступным ценам."
                  }`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            {/* Main content */}
            <div className="w-full">
              {/* Filters Panel - Desktop */}
              <div className="hidden lg:block mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Фильтры</h3>
                    {(searchTerm || activeCategory !== "all") && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setActiveCategory("all");
                          navigate("/products");
                        }}
                        className="text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 py-2 px-3 rounded transition-colors flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Сбросить фильтры
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="search"
                        className="block text-sm font-medium mb-2"
                      >
                        Поиск
                      </label>
                      <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Поиск по названию или описанию..."
                        className="w-full border border-neutral-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sort"
                        className="block text-sm font-medium mb-2"
                      >
                        Сортировка
                      </label>
                      <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full border border-neutral-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="default">По умолчанию</option>
                        <option value="price_low_high">
                          Цена: от низкой к высокой
                        </option>
                        <option value="price_high_low">
                          Цена: от высокой к низкой
                        </option>
                        <option value="name_a_z">По названию: А-Я</option>
                        <option value="name_z_a">По названию: Я-А</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile filters */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-neutral-300 rounded-lg shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Фильтры
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      isFilterOpen ? "transform rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isFilterOpen && (
                  <div className="mt-2 bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                      <label
                        htmlFor="mobile-search"
                        className="block text-sm font-medium mb-2"
                      >
                        Поиск
                      </label>
                      <input
                        type="text"
                        id="mobile-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Поиск по названию или описанию..."
                        className="w-full border border-neutral-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="mobile-sort"
                        className="block text-sm font-medium mb-2"
                      >
                        Сортировка
                      </label>
                      <select
                        id="mobile-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full border border-neutral-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="default">По умолчанию</option>
                        <option value="price_low_high">
                          Цена: от низкой к высокой
                        </option>
                        <option value="price_high_low">
                          Цена: от высокой к низкой
                        </option>
                        <option value="name_a_z">По названию: А-Я</option>
                        <option value="name_z_a">По названию: Я-А</option>
                      </select>
                    </div>

                    {(searchTerm || activeCategory !== "all") && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setActiveCategory("all");
                          navigate("/products");
                        }}
                        className="w-full text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Сбросить фильтры
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Products count and active filters */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-neutral-600">
                    {filteredProducts.length} товаров
                    {activeCategory !== "all" && (
                      <span className="ml-2 text-sm text-primary">
                        в категории "
                        {categories.find((c) => c.id === activeCategory)?.name}"
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {(searchTerm || activeCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setActiveCategory("all");
                        navigate("/products");
                      }}
                      className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Сбросить фильтры
                    </button>
                  )}

                  {searchTerm && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Поиск: "{searchTerm}"</span>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-neutral-500 hover:text-neutral-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Products grid */}
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg">Товары не найдены</p>
                  <p className="text-neutral-600 mt-2">
                    Попробуйте изменить параметры фильтрации
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded border ${
                        currentPage === 1
                          ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
                          : "border-neutral-300 hover:bg-neutral-100"
                      }`}
                    >
                      &laquo;
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      // Show current page, first, last and nearby pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1) ||
                        (currentPage === 1 && page <= 3) ||
                        (currentPage === totalPages && page >= totalPages - 2)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 rounded ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "border border-neutral-300 hover:bg-neutral-100"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        (page === 2 && currentPage > 3) ||
                        (page === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        // Show ellipsis
                        return (
                          <span key={page} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded border ${
                        currentPage === totalPages
                          ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
                          : "border-neutral-300 hover:bg-neutral-100"
                      }`}
                    >
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
