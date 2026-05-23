"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faImage,
  faTimes,
  faPen,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const PAGE_SIZE = 50;
const API_BASE = "http://localhost:3200";
const UNDO_REDO_LIMIT = 20;
const REQUIRED_FIELDS = ["status", "stock_status"];
const EDITABLE_FIELDS = new Set([
  "on_sale",
  "stock_quantity",
  "stock_status",
  "regular_price",
  "sale_price",
  "status",
  "name",
  "slug",
  "sku",
  "brand",
  "categories_display",
]);

const MANUAL_BRANDS = [
  "armaf",
  "armaf beauty",
  "flormar",
  "jdot",
  "eby",
  "lattafa",
  "clariss",
  "lear shot",
];

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const titleCase = (value) =>
  String(value || "").replace(/\b\w/g, (char) => char.toUpperCase());

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeStockStatus = (value) => {
  if (
    value === 1 ||
    value === "1" ||
    value === true ||
    value === "true" ||
    value === "instock" ||
    value === "in stock"
  ) {
    return "instock";
  }
  return "outofstock";
};

const normalizeSaleStatus = (value) =>
  value === true || value === "true" ? "true" : "false";

const cleanCategories = (categories = []) => {
  const seen = new Set();

  return (Array.isArray(categories) ? categories : [])
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") return normalizeText(item);
      return normalizeText(
        item?.name || item?.slug || item?.title || item?.label || "",
      );
    })
    .filter(Boolean)
    .filter((name) => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
};

const extractBrandFromCategories = (
  categories = [],
  fallbackBrand = "",
  productName = "",
) => {
  const directBrand = normalizeText(fallbackBrand);
  if (directBrand) return directBrand;

  const cleaned = cleanCategories(categories);

  for (const category of cleaned) {
    for (const brand of MANUAL_BRANDS) {
      const normalizedBrand = normalizeText(brand);
      if (
        category === normalizedBrand ||
        category.startsWith(`${normalizedBrand} `) ||
        category.includes(` ${normalizedBrand} `)
      ) {
        return normalizedBrand;
      }
    }
  }

  for (const category of cleaned) {
    const firstWord = category.split(" ")[0];
    if (MANUAL_BRANDS.includes(firstWord)) return firstWord;
  }

  const normalizedName = normalizeText(productName);
  for (const brand of MANUAL_BRANDS) {
    const normalizedBrand = normalizeText(brand);
    if (
      normalizedName === normalizedBrand ||
      normalizedName.startsWith(`${normalizedBrand} `) ||
      normalizedName.includes(` ${normalizedBrand} `)
    ) {
      return normalizedBrand;
    }
  }

  return "";
};

const getImageSrc = (product) => {
  if (!Array.isArray(product?.images)) return "";
  return product.images.find((img) => img?.src)?.src || "";
};

const sanitizeProduct = (product = {}) => {
  const normalizedCategories = cleanCategories(product?.categories);
  const resolvedBrand = extractBrandFromCategories(
    product?.categories,
    product?.brand,
    product?.name,
  );

  return {
    ...product,
    images: Array.isArray(product?.images) ? product.images : [],
    categories: Array.isArray(product?.categories) ? product.categories : [],
    stock_status: normalizeStockStatus(product?.stock_status),
    on_sale: product?.on_sale === true || product?.on_sale === "true",
    brand: normalizeText(product?.brand || resolvedBrand),
    slug: String(product?.slug || ""),
    __imageSrc: getImageSrc(product),
    __normalizedCategories: normalizedCategories,
    __brand: resolvedBrand,
    categories_display: normalizedCategories.join(", "),
    _edited: product?._edited || false,
  };
};

const cloneDeep = (value) => JSON.parse(JSON.stringify(value));

const stopCellEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const ProductCellRenderer = React.memo(({ data, context }) => {
  const imageSrc = data?.__imageSrc || "";
  const productId = data?._id || "";
  const productName = data?.name || "Unnamed Product";

  return (
    <div className="flex items-center gap-3 py-1 min-w-0 h-full">
      <button
        type="button"
        onMouseDown={stopCellEvent}
        onClick={(e) => {
          stopCellEvent(e);
          if (imageSrc) context?.onOpenImageModal?.(data, 0);
        }}
        className="w-11 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 relative"
        title={imageSrc ? "Open image" : "No image"}
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={productName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(
                  "[data-fallback='true']",
                );
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <div
              data-fallback="true"
              className="hidden absolute inset-0 items-center justify-center text-gray-400 text-[10px]"
            >
              No Img
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[10px]">
            <FontAwesomeIcon icon={faImage} className="text-xs" />
          </div>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <Link
          href={productId ? `/admin/editProduct/${productId}` : "#"}
          className="text-xs font-medium hover:underline transition inline-block truncate max-w-full"
          title={productName}
        >
          {productName}
        </Link>
        <div className="text-[10px] text-gray-400 truncate">
          {data?.slug || "no-slug"}
        </div>
      </div>
    </div>
  );
});

ProductCellRenderer.displayName = "ProductCellRenderer";

const ActionsCellRenderer = React.memo(({ data, context }) => {
  const { onManualSave, onOpenDeleteModal, savingRowIds, hasPendingChanges } =
    context || {};

  const isSaving = savingRowIds?.has?.(data?._id);
  const isEdited = hasPendingChanges?.(data?._id);

  return (
    <div className="flex items-center gap-3 h-full">
      <button
        type="button"
        onMouseDown={stopCellEvent}
        onClick={(e) => {
          stopCellEvent(e);
          onManualSave?.(data);
        }}
        disabled={isSaving}
        className="px-3 py-1.5 bg-[#419be6] text-white text-xs rounded hover:bg-[#499adb] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSaving ? "Saving..." : isEdited ? "Save*" : "Save"}
      </button>

      <button
        type="button"
        onMouseDown={stopCellEvent}
        onClick={(e) => {
          stopCellEvent(e);
          onOpenDeleteModal?.(data?._id);
        }}
        className="text-red-600 hover:text-red-800 transition disabled:opacity-60"
        aria-label="Delete product"
      >
        <FontAwesomeIcon icon={faTrash} className="text-lg" />
      </button>
    </div>
  );
});

ActionsCellRenderer.displayName = "ActionsCellRenderer";

const ImageCellRenderer = React.memo(({ data, context }) => {
  const src = data?.__imageSrc || "";

  return (
    <div className="h-full flex items-center gap-2">
      <button
        type="button"
        disabled={!src}
        onMouseDown={stopCellEvent}
        onClick={(e) => {
          stopCellEvent(e);
          if (src) context?.onOpenImageModal?.(data, 0);
        }}
        className="w-12 h-10 rounded-md overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center disabled:opacity-60"
      >
        {src ? (
          <img
            src={src}
            alt={data?.name || "Product"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[10px] text-gray-400">No Img</span>
        )}
      </button>

      <button
        type="button"
        onMouseDown={stopCellEvent}
        onClick={(e) => {
          stopCellEvent(e);
          context?.onOpenImageEditor?.(data);
        }}
        className="text-sky-600 hover:text-sky-800 transition"
        aria-label="Edit images"
      >
        <FontAwesomeIcon icon={faPen} className="text-sm" />
      </button>
    </div>
  );
});

ImageCellRenderer.displayName = "ImageCellRenderer";

const Filter = () => {
  const gridRef = useRef(null);
  const originalRowsRef = useRef({});
  const modifiedRowsRef = useRef({});
  const undoStackRef = useRef([]);
  const redoStackRef = useRef([]);
  const isRestoringRef = useRef(false);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [filterBy, setFilterBy] = useState("name");
  const [savingRowIds, setSavingRowIds] = useState(() => new Set());
  const [editedRowIds, setEditedRowIds] = useState(() => new Set());
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [allBrands, setAllBrands] = useState([]);
  const [bulkStockValue, setBulkStockValue] = useState("");
  const [bulkStockStatusValue, setBulkStockStatusValue] = useState("instock");
  const [bulkRegularPriceValue, setBulkRegularPriceValue] = useState("");
  const [bulkSalePriceValue, setBulkSalePriceValue] = useState("");
  const [bulkSalePercentValue, setBulkSalePercentValue] = useState("");
  const [bulkBrandValue, setBulkBrandValue] = useState("");
  const [customBrandValue, setCustomBrandValue] = useState("");
  const [bulkAddCategoryValue, setBulkAddCategoryValue] = useState("");

  const [selectedCategoriesFilter, setSelectedCategoriesFilter] = useState([]);
  const [selectedBrandsFilter, setSelectedBrandsFilter] = useState([]);
  const [selectedStockFilter, setSelectedStockFilter] = useState([]);
  const [selectedSaleFilter, setSelectedSaleFilter] = useState([]);

  const [undoVersion, setUndoVersion] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");

  const [imageModal, setImageModal] = useState({
    open: false,
    title: "",
    images: [],
    activeIndex: 0,
  });

  const [imageEditor, setImageEditor] = useState({
    open: false,
    productId: "",
    productName: "",
    images: [],
    newImageUrl: "",
  });

  const isSearching = query.trim().length > 0;
  const hasEditedRows = editedRowIds.size > 0;
  const canUndo = undoStackRef.current.length > 0;
  const canRedo = redoStackRef.current.length > 0;

  useEffect(() => {
    fetch(`${API_BASE}/adminBrands`)
      .then((res) => res.json())
      .then((data) => {
        const brands = Array.isArray(data?.brands)
          ? data.brands.map((brand) => normalizeText(brand)).filter(Boolean)
          : [];

        setAllBrands(brands);
      })
      .catch(() => {
        setAllBrands(MANUAL_BRANDS.map((brand) => normalizeText(brand)));
      });
  }, []);

  const categoryOptions = useMemo(() => {
    const set = new Set();

    products.forEach((product) => {
      cleanCategories(product?.categories).forEach((category) =>
        set.add(category),
      );
    });

    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const brandOptions = useMemo(() => {
    const set = new Set();

    MANUAL_BRANDS.forEach((brand) => set.add(normalizeText(brand)));
    allBrands.forEach((brand) => set.add(normalizeText(brand)));

    products.forEach((product) => {
      const directBrand = normalizeText(product?.brand);
      const derivedBrand = normalizeText(product?.__brand);

      if (directBrand) set.add(directBrand);
      if (derivedBrand) set.add(derivedBrand);
    });

    return Array.from(set)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [allBrands, products, undoVersion]);

  const filteredBrandOptions = useMemo(() => {
    if (!brandSearch.trim()) return brandOptions;

    return brandOptions.filter((brand) =>
      brand.includes(normalizeText(brandSearch)),
    );
  }, [brandOptions, brandSearch]);

  const isUsingSmartFilters =
    selectedCategoriesFilter.length > 0 ||
    selectedBrandsFilter.length > 0 ||
    selectedStockFilter.length > 0 ||
    selectedSaleFilter.length > 0;

  const syncEditedIdsFromRef = useCallback(() => {
    setEditedRowIds(new Set(Object.keys(modifiedRowsRef.current)));
  }, []);

  const getSnapshot = useCallback(() => {
    return {
      products: cloneDeep(products),
      modifiedRows: cloneDeep(modifiedRowsRef.current),
      originalRows: cloneDeep(originalRowsRef.current),
    };
  }, [products]);

  const pushUndoSnapshot = useCallback(() => {
    if (isRestoringRef.current) return;

    undoStackRef.current.push(getSnapshot());

    if (undoStackRef.current.length > UNDO_REDO_LIMIT) {
      undoStackRef.current.shift();
    }

    redoStackRef.current = [];
    setUndoVersion((v) => v + 1);
  }, [getSnapshot]);

  const restoreSnapshot = useCallback((snapshot) => {
    if (!snapshot) return;

    isRestoringRef.current = true;
    setProducts(snapshot.products.map((item) => sanitizeProduct(item)));
    modifiedRowsRef.current = cloneDeep(snapshot.modifiedRows || {});
    originalRowsRef.current = cloneDeep(snapshot.originalRows || {});
    setEditedRowIds(new Set(Object.keys(modifiedRowsRef.current)));

    setTimeout(() => {
      isRestoringRef.current = false;
    }, 0);
  }, []);

  const handleUndo = useCallback(() => {
    if (!undoStackRef.current.length) {
      toast.error("Nothing to undo");
      return;
    }

    const current = getSnapshot();
    const previous = undoStackRef.current.pop();

    redoStackRef.current.push(current);
    restoreSnapshot(previous);
    setUndoVersion((v) => v + 1);
    toast.success("Last change undone");
  }, [getSnapshot, restoreSnapshot]);

  const handleRedo = useCallback(() => {
    if (!redoStackRef.current.length) {
      toast.error("Nothing to redo");
      return;
    }

    const current = getSnapshot();
    const next = redoStackRef.current.pop();

    undoStackRef.current.push(current);
    restoreSnapshot(next);
    setUndoVersion((v) => v + 1);
    toast.success("Change restored");
  }, [getSnapshot, restoreSnapshot]);

  const registerOriginalRows = useCallback((rows) => {
    const nextMap = {};

    (rows || []).forEach((row) => {
      if (row?._id) {
        nextMap[row._id] = {
          ...sanitizeProduct(row),
          on_sale: row.on_sale === true || row.on_sale === "true",
          _edited: false,
        };
      }
    });

    originalRowsRef.current = nextMap;
    modifiedRowsRef.current = {};
    undoStackRef.current = [];
    redoStackRef.current = [];
    setUndoVersion((v) => v + 1);
    setEditedRowIds(new Set());
  }, []);

  const updateSavingState = useCallback((id, isSaving) => {
    setSavingRowIds((prev) => {
      const next = new Set(prev);

      if (isSaving) next.add(id);
      else next.delete(id);

      return next;
    });
  }, []);

  const normalizeProductForUpdate = useCallback((product) => {
    const toNumberString = (value, fallback = "") => {
      if (value === null || value === undefined || value === "")
        return fallback;
      return String(value);
    };

    const toBoolean = (value, fallback = false) => {
      if (typeof value === "boolean") return value;
      if (value === "true") return true;
      if (value === "false") return false;
      return fallback;
    };

    return {
      name: product?.name || "",
      slug: product?.slug || "",
      short_description: product?.short_description || "",
      categories: Array.isArray(product?.categories) ? product.categories : [],
      images: Array.isArray(product?.images)
        ? product.images.filter((img) => img?.src)
        : [],
      status: product?.status || "draft",
      regular_price: toNumberString(product?.regular_price, ""),
      sale_price: toNumberString(product?.sale_price, ""),
      sku: product?.sku || "",
      meta_title: product?.meta_title || "",
      on_sale: toBoolean(product?.on_sale, false),
      stock_quantity: toNumberString(product?.stock_quantity, "0"),
      stock_status: normalizeStockStatus(product?.stock_status),
      meta_description: product?.meta_description || "",
      brand: normalizeText(product?.brand || ""),
    };
  }, []);

  const updateLocalRow = useCallback((updatedProduct) => {
    const normalized = sanitizeProduct(updatedProduct);

    setProducts((prev) =>
      prev.map((item) =>
        item._id === normalized._id ? { ...item, ...normalized } : item,
      ),
    );
  }, []);

  const getChangedPayload = useCallback(
    (product) => {
      const original = originalRowsRef.current[product?._id];

      if (!original || !product?._id) return {};

      const normalizedCurrent = normalizeProductForUpdate(product);
      const normalizedOriginal = normalizeProductForUpdate(original);
      const changed = {};

      Object.keys(normalizedCurrent).forEach((key) => {
        if (
          JSON.stringify(normalizedCurrent[key]) !==
          JSON.stringify(normalizedOriginal[key])
        ) {
          changed[key] = normalizedCurrent[key];
        }
      });

      return changed;
    },
    [normalizeProductForUpdate],
  );

  const markRowEdited = useCallback(
    (row) => {
      if (!row?._id) return;

      const changedPayload = getChangedPayload(row);

      if (Object.keys(changedPayload).length === 0) {
        delete modifiedRowsRef.current[row._id];
      } else {
        modifiedRowsRef.current[row._id] = {
          _id: row._id,
          ...changedPayload,
        };
      }

      syncEditedIdsFromRef();
    },
    [getChangedPayload, syncEditedIdsFromRef],
  );

  const validateField = useCallback((field, value) => {
    if (field === "regular_price" || field === "sale_price") {
      if (value === "" || value === null || value === undefined) return true;

      const num = Number(value);

      if (Number.isNaN(num) || num < 0) {
        toast.error("Price cannot be negative");
        return false;
      }
    }

    if (field === "stock_quantity") {
      if (value === "" || value === null || value === undefined) return true;

      const num = Number(value);

      if (Number.isNaN(num) || num < 0) {
        toast.error("Stock quantity cannot be negative");
        return false;
      }
    }

    if (field === "slug") {
      if (!String(value || "").trim()) {
        toast.error("Slug is required");
        return false;
      }
    }

    if (field === "brand") {
      if (!String(value || "").trim()) {
        toast.error("Brand is required");
        return false;
      }
    }

    if (REQUIRED_FIELDS.includes(field)) {
      if (value === "" || value === null || value === undefined) {
        toast.error("Required field cannot be empty");
        return false;
      }
    }

    if (field === "images" && !Array.isArray(value)) {
      toast.error("Images must be an array");
      return false;
    }

    return true;
  }, []);

  const validateRowBeforeSave = useCallback(
    (product) => {
      const payload = normalizeProductForUpdate(product);

      const checks = [
        ["status", payload.status],
        ["stock_status", payload.stock_status],
        ["regular_price", payload.regular_price],
        ["sale_price", payload.sale_price],
        ["stock_quantity", payload.stock_quantity],
        ["name", payload.name],
        ["slug", payload.slug],
        ["brand", payload.brand],
        ["images", payload.images],
      ];

      for (const [field, value] of checks) {
        if (field === "name" && !String(value || "").trim()) {
          toast.error("Name is required");
          return false;
        }

        if (!validateField(field, value)) return false;
      }

      return true;
    },
    [normalizeProductForUpdate, validateField],
  );

  const clearEditedStateForRow = useCallback(
    (rowId, persistedRow) => {
      if (!rowId) return;

      delete modifiedRowsRef.current[rowId];

      if (persistedRow) {
        originalRowsRef.current[rowId] = {
          ...sanitizeProduct(persistedRow),
          on_sale:
            persistedRow.on_sale === true || persistedRow.on_sale === "true",
          _edited: false,
        };
      }

      syncEditedIdsFromRef();
    },
    [syncEditedIdsFromRef],
  );

  const handleUpdate = useCallback(
    async (product, options = { silent: false, force: false }) => {
      if (!product?._id) return false;

      if (!validateRowBeforeSave(product)) return false;

      const payload = normalizeProductForUpdate(product);
      const changedPayload = getChangedPayload(product);

      if (!options?.force && Object.keys(changedPayload).length === 0) {
        if (!options?.silent) toast.success("No changes to save");
        return true;
      }

      updateSavingState(product._id, true);

      try {
        const res = await fetch(`${API_BASE}/editProduct/${product._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Update failed");

        const responseData = await res.json().catch(() => null);

        const mergedProduct =
          responseData &&
          typeof responseData === "object" &&
          !Array.isArray(responseData)
            ? sanitizeProduct({
                ...product,
                ...responseData,
                ...payload,
                _edited: false,
              })
            : sanitizeProduct({ ...product, ...payload, _edited: false });

        updateLocalRow(mergedProduct);
        clearEditedStateForRow(product._id, mergedProduct);

        if (gridRef.current?.api) {
          const rowNode = gridRef.current.api.getRowNode(product._id);
          if (rowNode) rowNode.setData(mergedProduct);
        }

        if (!options?.silent) toast.success("Product updated");
        return true;
      } catch {
        toast.error("Update failed");
        return false;
      } finally {
        updateSavingState(product._id, false);
      }
    },
    [
      clearEditedStateForRow,
      getChangedPayload,
      normalizeProductForUpdate,
      updateLocalRow,
      updateSavingState,
      validateRowBeforeSave,
    ],
  );

  const fetchFilteredProducts = useCallback(
    async (targetPage = 0, searchText = query) => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.set("page", String(targetPage));
        params.set("limit", String(PAGE_SIZE));

        if (searchText?.trim()) params.set("search", searchText.trim());
        if (selectedCategoriesFilter.length) {
          params.set("categories", selectedCategoriesFilter.join(","));
        }
        if (selectedBrandsFilter.length) {
          params.set("brands", selectedBrandsFilter.join(","));
        }
        if (selectedStockFilter.length) {
          params.set("stockStatuses", selectedStockFilter.join(","));
        }
        if (selectedSaleFilter.length) {
          params.set("saleStatuses", selectedSaleFilter.join(","));
        }

        const res = await fetch(
          `${API_BASE}/adminProductsFiltered?${params.toString()}`,
        );

        if (!res.ok) throw new Error("Filtered fetch failed");

        const data = await res.json();

        const rows = Array.isArray(data?.products)
          ? data.products.map((item) => sanitizeProduct(item))
          : [];

        setProducts(rows);
        registerOriginalRows(rows);
        setSelectedRowIds([]);
        setPage(targetPage);
        setPageCount(data?.totalPages || 0);
      } catch (error) {
        console.error("fetchFilteredProducts error:", error);
        setProducts([]);
        registerOriginalRows([]);
        setSelectedRowIds([]);
        setPageCount(0);
        toast.error("Failed to fetch filtered products");
      } finally {
        setLoading(false);
      }
    },
    [
      query,
      registerOriginalRows,
      selectedBrandsFilter,
      selectedCategoriesFilter,
      selectedSaleFilter,
      selectedStockFilter,
    ],
  );

  useEffect(() => {
    fetch(`${API_BASE}/productCount`)
      .then((res) => res.json())
      .then((data) => {
        const count = data?.count || 0;
        setPageCount(Math.ceil(count / PAGE_SIZE));
      })
      .catch(() => setPageCount(0));
  }, []);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);

      try {
        if (isSearching || isUsingSmartFilters) {
          await fetchFilteredProducts(page, query);
          return;
        }

        const res = await fetch(`${API_BASE}/Allproducts?page=${page}`);

        if (!res.ok) throw new Error("Allproducts fetch failed");

        const data = await res.json();

        if (ignore) return;

        const rows = Array.isArray(data)
          ? data.map((item) => sanitizeProduct(item))
          : [];

        setProducts(rows);
        registerOriginalRows(rows);
        setSelectedRowIds([]);
      } catch (error) {
        console.error("load products error:", error);

        if (ignore) return;

        setProducts([]);
        registerOriginalRows([]);
        setSelectedRowIds([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [
    page,
    isSearching,
    isUsingSmartFilters,
    query,
    fetchFilteredProducts,
    registerOriginalRows,
  ]);

  const handleDelete = useCallback(
    async (id) => {
      setDeleteLoading(true);

      try {
        const res = await fetch(`${API_BASE}/deleteProduct/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Delete failed");

        await res.json().catch(() => null);

        toast.success("Product deleted successfully");

        setProducts((prev) => prev.filter((p) => p._id !== id));
        setSelectedRowIds((prev) => prev.filter((rowId) => rowId !== id));

        delete originalRowsRef.current[id];
        delete modifiedRowsRef.current[id];

        syncEditedIdsFromRef();

        if (gridRef.current?.api) {
          const rowNode = gridRef.current.api.getRowNode(id);

          if (rowNode) {
            gridRef.current.api.applyTransaction({ remove: [rowNode.data] });
          }
        }

        setDeletedId(null);
      } catch {
        toast.error("Failed to delete");
      } finally {
        setDeleteLoading(false);
      }
    },
    [syncEditedIdsFromRef],
  );

  const handleBulkDelete = useCallback(async () => {
    const selectedRows = gridRef.current?.api?.getSelectedRows?.() || [];

    if (!selectedRows.length) {
      toast.error("Please select at least one row");
      return;
    }

    try {
      await Promise.all(
        selectedRows.map((row) =>
          fetch(`${API_BASE}/deleteProduct/${row._id}`, {
            method: "DELETE",
          }).then((res) => {
            if (!res.ok) throw new Error("Delete failed");
            return res.json().catch(() => null);
          }),
        ),
      );

      const ids = new Set(selectedRows.map((row) => row._id));

      setProducts((prev) => prev.filter((row) => !ids.has(row._id)));
      setSelectedRowIds([]);

      toast.success(`${selectedRows.length} products deleted`);

      selectedRows.forEach((row) => {
        delete originalRowsRef.current[row._id];
        delete modifiedRowsRef.current[row._id];
      });

      syncEditedIdsFromRef();

      if (gridRef.current?.api) {
        gridRef.current.api.applyTransaction({ remove: selectedRows });
      }
    } catch {
      toast.error("Bulk delete failed");
    }
  }, [syncEditedIdsFromRef]);

  const resetToDefaultList = useCallback(() => {
    setLoading(true);
    setProducts([]);

    fetch(`${API_BASE}/Allproducts?page=0`)
      .then((res) => res.json())
      .then((data) => {
        const rows = Array.isArray(data)
          ? data.map((item) => sanitizeProduct(item))
          : [];

        setPage(0);
        setProducts(rows);
        registerOriginalRows(rows);
        setSelectedRowIds([]);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        registerOriginalRows([]);
        setSelectedRowIds([]);
        setLoading(false);
      });

    fetch(`${API_BASE}/productCount`)
      .then((res) => res.json())
      .then((data) => setPageCount(Math.ceil((data?.count || 0) / PAGE_SIZE)))
      .catch(() => setPageCount(0));
  }, [registerOriginalRows]);

  const handleSearch = useCallback(async () => {
    if (
      !query.trim() &&
      !selectedCategoriesFilter.length &&
      !selectedBrandsFilter.length &&
      !selectedStockFilter.length &&
      !selectedSaleFilter.length
    ) {
      resetToDefaultList();
      return;
    }

    await fetchFilteredProducts(0, query);
  }, [
    fetchFilteredProducts,
    query,
    resetToDefaultList,
    selectedBrandsFilter,
    selectedCategoriesFilter,
    selectedSaleFilter,
    selectedStockFilter,
  ]);

  const onOpenDeleteModal = useCallback((id) => {
    setDeletedId(id);
  }, []);

  const onOpenImageModal = useCallback((product, startIndex = 0) => {
    const images = Array.isArray(product?.images)
      ? product.images.filter((img) => img?.src)
      : [];

    setImageModal({
      open: true,
      title: product?.name || "Product",
      images,
      activeIndex: startIndex < images.length ? startIndex : 0,
    });
  }, []);

  const onOpenImageEditor = useCallback((product) => {
    setImageEditor({
      open: true,
      productId: product?._id || "",
      productName: product?.name || "Product",
      images: Array.isArray(product?.images)
        ? product.images
            .filter((img) => img?.src)
            .map((img) => ({ src: img.src }))
        : [],
      newImageUrl: "",
    });
  }, []);

  const parseNumberInput = useCallback((value, fallback) => {
    if (value === null || value === undefined || value === "") return fallback;
    return String(value);
  }, []);

  const prepareCellValue = useCallback(
    (field, value, fallback, rowData) => {
      if (field === "on_sale") return value === true || value === "true";

      if (field === "stock_quantity") {
        return parseNumberInput(value, fallback || "0");
      }

      if (field === "regular_price" || field === "sale_price") {
        return parseNumberInput(value, fallback || "");
      }

      if (field === "brand") return normalizeText(value || "");
      if (field === "slug") return slugify(value || "");

      if (field === "categories_display") {
        const normalized = cleanCategories(String(value).split(","));
        return normalized.join(", ");
      }

      if (field === "name" || field === "sku") {
        return String(value || "").trim();
      }

      return value ?? fallback ?? rowData?.[field];
    },
    [parseNumberInput],
  );

  const applyRowUpdate = useCallback((rowId, updater) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item._id !== rowId) return item;

        const nextRow =
          typeof updater === "function"
            ? updater(item)
            : { ...item, ...updater };

        return sanitizeProduct(nextRow);
      }),
    );
  }, []);

  const updateRowInGrid = useCallback((row) => {
    if (!gridRef.current?.api || !row?._id) return;

    const rowNode = gridRef.current.api.getRowNode(row._id);

    if (rowNode) rowNode.setData(sanitizeProduct(row));
  }, []);

  const onCellValueChanged = useCallback(
    (params) => {
      const { data, colDef, newValue, oldValue, node } = params;
      const field = colDef?.field;

      if (
        !field ||
        !EDITABLE_FIELDS.has(field) ||
        newValue === oldValue ||
        !data?._id
      ) {
        return;
      }

      pushUndoSnapshot();

      const normalizedValue = prepareCellValue(
        field,
        newValue,
        data[field],
        data,
      );

      if (field === "name" && !String(normalizedValue || "").trim()) {
        toast.error("Name is required");
        node.setDataValue(field, oldValue);
        return;
      }

      if ((field === "slug" || field === "brand") && !normalizedValue) {
        toast.error(`${field === "slug" ? "Slug" : "Brand"} is required`);
        node.setDataValue(field, oldValue);
        return;
      }

      if (!validateField(field, normalizedValue)) {
        node.setDataValue(field, oldValue);
        return;
      }

      let updatedRow = {
        ...data,
        [field]: normalizedValue,
        _edited: true,
      };

      if (field === "categories_display") {
        const normalizedCategories = cleanCategories(
          String(normalizedValue).split(","),
        );

        updatedRow = sanitizeProduct({
          ...updatedRow,
          categories: normalizedCategories.map((name) => ({ name })),
          categories_display: normalizedCategories.join(", "),
        });
      } else if (field === "name" && !data?.slug) {
        updatedRow = sanitizeProduct({
          ...updatedRow,
          slug: slugify(normalizedValue),
        });
      } else {
        updatedRow = sanitizeProduct(updatedRow);
      }

      node.setData(updatedRow);
      applyRowUpdate(data._id, updatedRow);
      markRowEdited(updatedRow);
    },
    [
      applyRowUpdate,
      markRowEdited,
      prepareCellValue,
      pushUndoSnapshot,
      validateField,
    ],
  );

  const getSelectedRows = useCallback(() => {
    if (!gridRef.current?.api) return [];
    return gridRef.current.api.getSelectedRows() || [];
  }, []);

  const hasPendingChanges = useCallback(
    (rowId) => !!modifiedRowsRef.current[rowId],
    [],
  );

  const saveRows = useCallback(
    async (rows, options = { silent: false }) => {
      const uniqueRows = Array.from(
        new Map((rows || []).map((row) => [row._id, row])).values(),
      ).filter(Boolean);

      if (!uniqueRows.length) {
        if (!options?.silent) toast.success("No changes to save");
        return;
      }

      const changedRows = uniqueRows.filter(
        (row) => Object.keys(getChangedPayload(row)).length > 0,
      );

      if (!changedRows.length) {
        if (!options?.silent) toast.success("No changes to save");
        return;
      }

      const results = await Promise.all(
        changedRows.map((row) =>
          handleUpdate(row, { silent: true, force: false }),
        ),
      );

      const savedCount = results.filter(Boolean).length;

      if (!options?.silent) {
        if (savedCount > 0) {
          toast.success(
            `${savedCount} product${savedCount > 1 ? "s" : ""} updated`,
          );
        } else {
          toast.error("No products were updated");
        }
      }
    },
    [getChangedPayload, handleUpdate],
  );

  const handleSaveSelected = useCallback(async () => {
    await saveRows(getSelectedRows());
  }, [getSelectedRows, saveRows]);

  const handleSaveAllChanges = useCallback(async () => {
    const rowsToSave = products.filter(
      (row) => modifiedRowsRef.current[row._id],
    );

    await saveRows(rowsToSave);
  }, [products, saveRows]);

  const applyBulkPatchToRows = useCallback(
    (rows, patchBuilder, successMessage = null) => {
      if (!rows.length) {
        toast.error("Please select at least one row");
        return;
      }

      pushUndoSnapshot();

      const updatedRows = [];

      rows.forEach((row) => {
        const patch = patchBuilder(row);

        if (!patch) return;

        let nextRow = {
          ...row,
          ...patch,
          _edited: true,
        };

        if (patch.categories) {
          nextRow = sanitizeProduct({
            ...nextRow,
            categories: patch.categories,
          });
        } else if (patch.images) {
          nextRow = sanitizeProduct({ ...nextRow, images: patch.images });
        } else {
          nextRow = sanitizeProduct(nextRow);
        }

        const validationEntries = Object.entries(patch).filter(
          ([key]) => key !== "categories" && key !== "images",
        );

        const isValid = validationEntries.every(([field, value]) => {
          if (
            (field === "name" || field === "slug" || field === "brand") &&
            !String(value || "").trim()
          ) {
            return false;
          }

          return validateField(field, value);
        });

        if (!isValid) return;

        updatedRows.push(nextRow);
      });

      if (!updatedRows.length) return;

      const updatedMap = new Map(updatedRows.map((row) => [row._id, row]));

      setProducts((prev) =>
        prev.map((item) => updatedMap.get(item._id) || item),
      );

      updatedRows.forEach((row) => {
        markRowEdited(row);
        updateRowInGrid(row);
      });

      toast.success(
        successMessage ||
          `${updatedRows.length} selected product${
            updatedRows.length > 1 ? "s" : ""
          } updated`,
      );
    },
    [markRowEdited, pushUndoSnapshot, updateRowInGrid, validateField],
  );

  const handleBulkStockSet = useCallback(() => {
    const value = Number(bulkStockValue);

    if (Number.isNaN(value) || value < 0) {
      toast.error("Enter a valid stock quantity");
      return;
    }

    applyBulkPatchToRows(getSelectedRows(), () => ({
      stock_quantity: String(value),
    }));
  }, [applyBulkPatchToRows, bulkStockValue, getSelectedRows]);

  const handleBulkStockStatusSet = useCallback(() => {
    applyBulkPatchToRows(getSelectedRows(), () => ({
      stock_status: bulkStockStatusValue,
    }));
  }, [applyBulkPatchToRows, bulkStockStatusValue, getSelectedRows]);

  const handleBulkRegularPriceSet = useCallback(() => {
    const value = Number(bulkRegularPriceValue);

    if (Number.isNaN(value) || value < 0) {
      toast.error("Enter a valid regular price");
      return;
    }

    applyBulkPatchToRows(getSelectedRows(), () => ({
      regular_price: String(value),
    }));
  }, [applyBulkPatchToRows, bulkRegularPriceValue, getSelectedRows]);

  const handleBulkSalePriceSet = useCallback(() => {
    const value = Number(bulkSalePriceValue);

    if (Number.isNaN(value) || value < 0) {
      toast.error("Enter a valid sale price");
      return;
    }

    applyBulkPatchToRows(getSelectedRows(), () => ({
      sale_price: String(value),
      on_sale: value > 0,
    }));
  }, [applyBulkPatchToRows, bulkSalePriceValue, getSelectedRows]);

  const handleBulkSalePercentSet = useCallback(() => {
    const percent = Number(bulkSalePercentValue);

    if (Number.isNaN(percent) || percent < 0 || percent > 100) {
      toast.error("Enter a valid sale percent between 0 and 100");
      return;
    }

    applyBulkPatchToRows(
      getSelectedRows(),
      (row) => {
        const regular = Number(row?.regular_price || 0);

        if (Number.isNaN(regular) || regular <= 0) return null;

        const sale = Math.max(
          0,
          Number((regular - regular * (percent / 100)).toFixed(2)),
        );

        return {
          sale_price: String(sale),
          on_sale: percent > 0,
        };
      },
      "Sale percent applied to selected products",
    );
  }, [applyBulkPatchToRows, bulkSalePercentValue, getSelectedRows]);

  const handleBulkBrandSet = useCallback(() => {
    const selectedBrand = normalizeText(bulkBrandValue);
    const customBrand = normalizeText(customBrandValue);
    const brand = customBrand || selectedBrand;

    if (!brand) {
      toast.error("Select or create a brand name");
      return;
    }

    setAllBrands((prev) => {
      const next = new Set(prev.map((item) => normalizeText(item)));
      next.add(brand);
      return Array.from(next).sort((a, b) => a.localeCompare(b));
    });

    applyBulkPatchToRows(
      getSelectedRows(),
      () => ({
        brand,
      }),
      `"${titleCase(brand)}" brand updated for selected products`,
    );

    setBulkBrandValue(brand);
    setCustomBrandValue("");
  }, [applyBulkPatchToRows, bulkBrandValue, customBrandValue, getSelectedRows]);

  const handleBulkToggleStatus = useCallback(
    (status) => {
      applyBulkPatchToRows(getSelectedRows(), () => ({ status }));
    },
    [applyBulkPatchToRows, getSelectedRows],
  );

  const handleBulkSaleStatus = useCallback(
    (saleValue) => {
      applyBulkPatchToRows(
        getSelectedRows(),
        () => ({ on_sale: saleValue }),
        saleValue
          ? "Selected products marked as On Sale"
          : "Selected products marked as Not On Sale",
      );
    },
    [applyBulkPatchToRows, getSelectedRows],
  );

  const handleBulkAddCategory = useCallback(() => {
    const normalized = cleanCategories([bulkAddCategoryValue]);

    if (!normalized.length) {
      toast.error("Enter a category/tag");
      return;
    }

    applyBulkPatchToRows(getSelectedRows(), (row) => {
      const combined = cleanCategories([
        ...cleanCategories(row?.categories),
        normalized[0],
      ]);

      return {
        categories: combined.map((name) => ({ name })),
      };
    });
  }, [applyBulkPatchToRows, bulkAddCategoryValue, getSelectedRows]);

  const handleImageEditorSave = useCallback(async () => {
    const productId = imageEditor.productId;

    if (!productId) return;

    const cleanedImages = imageEditor.images
      .map((img) => ({ src: String(img?.src || "").trim() }))
      .filter((img) => img.src);

    const product = products.find((item) => item._id === productId);

    if (!product) {
      toast.error("Product not found");
      return;
    }

    pushUndoSnapshot();

    const updatedRow = sanitizeProduct({
      ...product,
      images: cleanedImages,
      _edited: true,
    });

    applyRowUpdate(productId, updatedRow);
    markRowEdited(updatedRow);
    updateRowInGrid(updatedRow);

    const saved = await handleUpdate(updatedRow, {
      silent: false,
      force: true,
    });

    if (saved) {
      setImageEditor({
        open: false,
        productId: "",
        productName: "",
        images: [],
        newImageUrl: "",
      });
    }
  }, [
    applyRowUpdate,
    handleUpdate,
    imageEditor,
    markRowEdited,
    products,
    pushUndoSnapshot,
    updateRowInGrid,
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      editable: true,
      suppressMovable: false,
      flex: 1,
      minWidth: 110,
      singleClickEdit: true,
      checkboxSelection: false,
      headerCheckboxSelection: false,
      cellClassRules: {
        "bg-yellow-50": (params) =>
          !!params.data?._edited && params.colDef.field !== "actions",
        "bg-red-50": (params) =>
          (params.colDef.field === "name" &&
            !String(params.data?.name || "").trim()) ||
          (params.colDef.field === "slug" &&
            !String(params.data?.slug || "").trim()) ||
          (params.colDef.field === "brand" &&
            !String(params.data?.brand || "").trim()),
      },
      headerClass: "font-semibold",
    }),
    [],
  );

  const commonTallCell = {
    lineHeight: "1.4",
    paddingTop: "8px",
    paddingBottom: "8px",
    whiteSpace: "normal",
    wordBreak: "break-word",
  };

  const gridContext = useMemo(
    () => ({
      onManualSave: (row) => handleUpdate(row, { silent: false, force: false }),
      onOpenDeleteModal,
      onOpenImageModal,
      onOpenImageEditor,
      savingRowIds,
      hasPendingChanges,
    }),
    [
      handleUpdate,
      hasPendingChanges,
      onOpenDeleteModal,
      onOpenImageEditor,
      onOpenImageModal,
      savingRowIds,
    ],
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Product",
        field: "name",
        editable: false,
        flex: 2,
        minWidth: 150,
        maxWidth: 450,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        pinned: "left",
        lockPinned: true,
        cellRenderer: ProductCellRenderer,
        comparator: (a, b) => String(a || "").localeCompare(String(b || "")),
      },
      {
        headerName: "Slug",
        field: "slug",
        editable: true,
        minWidth: 80,
        maxWidth: 200,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
      },
      {
        headerName: "Brand",
        field: "brand",
        editable: true,
        minWidth: 70,
        maxWidth: 120,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: brandOptions,
        },
        valueFormatter: (params) => titleCase(params.value || "—"),
      },
      {
        headerName: "Image",
        field: "__imageSrc",
        editable: false,
        minWidth: 80,
        maxWidth: 110,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRenderer: ImageCellRenderer,
      },
      {
        headerName: "Categories",
        field: "categories_display",
        editable: true,
        minWidth: 160,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        valueFormatter: (params) => params.value || "—",
      },
      {
        headerName: "SKU",
        field: "sku",
        editable: true,
        minWidth: 120,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
      },
      {
        headerName: "Reg Price",
        field: "regular_price",
        minWidth: 90,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellDataType: "text",
        valueParser: (params) =>
          parseNumberInput(params.newValue, params.oldValue || ""),
        valueSetter: (params) => {
          const nextValue = parseNumberInput(
            params.newValue,
            params.oldValue || "",
          );

          if (!validateField("regular_price", nextValue)) return false;

          params.data.regular_price = nextValue;
          return true;
        },
      },
      {
        headerName: "Sale Price",
        field: "sale_price",
        minWidth: 90,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellDataType: "text",
        valueParser: (params) =>
          parseNumberInput(params.newValue, params.oldValue || ""),
        valueSetter: (params) => {
          const nextValue = parseNumberInput(
            params.newValue,
            params.oldValue || "",
          );

          if (!validateField("sale_price", nextValue)) return false;

          params.data.sale_price = nextValue;
          return true;
        },
      },
      {
        headerName: "Stock Qty",
        field: "stock_quantity",
        minWidth: 90,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellDataType: "text",
        valueParser: (params) =>
          parseNumberInput(params.newValue, params.oldValue || "0"),
        valueSetter: (params) => {
          const nextValue = parseNumberInput(
            params.newValue,
            params.oldValue || "0",
          );

          if (!validateField("stock_quantity", nextValue)) return false;

          params.data.stock_quantity = nextValue;
          return true;
        },
      },
      {
        headerName: "Stock Status",
        field: "stock_status",
        minWidth: 110,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["instock", "outofstock"],
        },
        valueFormatter: (params) =>
          normalizeStockStatus(params.value) === "outofstock"
            ? "Out of Stock"
            : "In Stock",
      },
      {
        headerName: "On Sale",
        field: "on_sale",
        minWidth: 80,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["true", "false"],
        },
        valueFormatter: (params) => {
          const value = params.value === true || params.value === "true";
          return value ? "Yes" : "No";
        },
        valueGetter: (params) => normalizeSaleStatus(params.data?.on_sale),
        valueSetter: (params) => {
          params.data.on_sale = params.newValue === "true";
          return true;
        },
      },
      {
        headerName: "Status",
        field: "status",
        minWidth: 100,
        wrapText: true,
        autoHeight: true,
        cellStyle: commonTallCell,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["publish", "draft"],
        },
        valueFormatter: (params) =>
          params.value === "publish" ? "Publish" : "Draft",
      },
      {
        headerName: "Actions",
        field: "actions",
        editable: false,
        sortable: false,
        filter: false,
        floatingFilter: false,
        minWidth: 100,
        maxWidth: 130,
        pinned: "right",
        cellRenderer: ActionsCellRenderer,
        suppressMenu: true,
      },
    ],
    [brandOptions, commonTallCell, parseNumberInput, validateField],
  );

  const onGridReady = useCallback((params) => {
    gridRef.current = params;
  }, []);

  const onFirstDataRendered = useCallback(() => {
    setTimeout(() => {
      try {
        gridRef.current?.api?.refreshCells({ force: true });
      } catch {}
    }, 0);
  }, []);

  const onSelectionChanged = useCallback(() => {
    const rows = getSelectedRows();
    setSelectedRowIds(rows.map((row) => row._id));
  }, [getSelectedRows]);

  const getRowClass = useCallback((params) => {
    if (params.data?._edited) return "bg-yellow-50";
    return "";
  }, []);

  const emptyState = !loading && products.length === 0;

  const toggleMultiSelect = (value, current, setter) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const activePreviewImage =
    imageModal.images[imageModal.activeIndex]?.src || "";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-2 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage products, bulk updates, slug, brand and sale pricing.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600">
                    Filter by
                  </span>
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none focus:border-sky-500"
                  >
                    <option value="name">Name</option>
                    <option value="Tag">Tag</option>
                    <option value="Category">Category</option>
                  </select>
                </div>

                <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="h-11 w-[240px] px-4 text-sm outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    className="h-11 bg-sky-500 px-5 text-sm font-semibold text-white hover:bg-sky-600 transition"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Categories
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {selectedCategoriesFilter.length} selected
                  </span>
                </div>

                <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                  {categoryOptions.length ? (
                    categoryOptions.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 text-xs text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategoriesFilter.includes(category)}
                          onChange={() =>
                            toggleMultiSelect(
                              category,
                              selectedCategoriesFilter,
                              setSelectedCategoriesFilter,
                            )
                          }
                        />
                        <span>{titleCase(category)}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400">No categories</div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Brands
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedBrandsFilter([])}
                    className="text-[11px] font-medium text-sky-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Search brand..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="mb-3 h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs outline-none focus:border-sky-500"
                />

                <div className="max-h-24 space-y-2 overflow-y-auto pr-1">
                  {filteredBrandOptions.length ? (
                    filteredBrandOptions.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-xs text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrandsFilter.includes(brand)}
                          onChange={() =>
                            toggleMultiSelect(
                              brand,
                              selectedBrandsFilter,
                              setSelectedBrandsFilter,
                            )
                          }
                        />
                        <span>{titleCase(brand)}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400">
                      No brands found
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Stock
                </h3>

                <div className="space-y-2">
                  {["instock", "outofstock"].map((stock) => (
                    <label
                      key={stock}
                      className="flex items-center gap-2 text-xs text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStockFilter.includes(stock)}
                        onChange={() =>
                          toggleMultiSelect(
                            stock,
                            selectedStockFilter,
                            setSelectedStockFilter,
                          )
                        }
                      />
                      <span>
                        {stock === "instock" ? "In Stock" : "Out of Stock"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  Sale Status
                </h3>

                <div className="space-y-2">
                  {[
                    { value: "true", label: "On Sale" },
                    { value: "false", label: "Not On Sale" },
                  ].map((sale) => (
                    <label
                      key={sale.value}
                      className="flex items-center gap-2 text-xs text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSaleFilter.includes(sale.value)}
                        onChange={() =>
                          toggleMultiSelect(
                            sale.value,
                            selectedSaleFilter,
                            setSelectedSaleFilter,
                          )
                        }
                      />
                      <span>{sale.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoriesFilter([]);
                    setSelectedBrandsFilter([]);
                    setSelectedStockFilter([]);
                    setSelectedSaleFilter([]);
                    setQuery("");
                    setPage(0);
                    setBrandSearch("");
                    resetToDefaultList();
                  }}
                  className="h-11 rounded-xl border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Reset Smart Filters
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 px-5 py-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveSelected}
                    disabled={selectedRowIds.length === 0}
                    className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Save Selected ({selectedRowIds.length})
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAllChanges}
                    disabled={!hasEditedRows}
                    className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Save All Changes ({editedRowIds.size})
                  </button>

                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={!canUndo}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
                    Undo
                  </button>

                  <button
                    type="button"
                    onClick={handleRedo}
                    disabled={!canRedo}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faRotateRight} className="mr-2" />
                    Redo
                  </button>

                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    disabled={selectedRowIds.length === 0}
                    className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Bulk Delete
                  </button>

                  <div className="text-xs text-slate-500">
                    {editedRowIds.size > 0
                      ? `${editedRowIds.size} row(s) modified`
                      : "No pending changes"}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 xl:grid-cols-5">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-xs font-semibold text-slate-500">
                      Stock Tools
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={bulkStockValue}
                        onChange={(e) => setBulkStockValue(e.target.value)}
                        placeholder="Stock Qty"
                        className="h-10 w-28 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                      />

                      <button
                        type="button"
                        onClick={handleBulkStockSet}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Set Qty
                      </button>

                      <select
                        value={bulkStockStatusValue}
                        onChange={(e) =>
                          setBulkStockStatusValue(e.target.value)
                        }
                        className="h-10 rounded-lg border border-slate-300 px-3 text-sm bg-white"
                      >
                        <option value="instock">In Stock</option>
                        <option value="outofstock">Out of Stock</option>
                      </select>

                      <button
                        type="button"
                        onClick={handleBulkStockStatusSet}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Set Status
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-xs font-semibold text-slate-500">
                      Pricing Tools
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={bulkRegularPriceValue}
                        onChange={(e) =>
                          setBulkRegularPriceValue(e.target.value)
                        }
                        placeholder="Regular Price"
                        className="h-10 w-32 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                      />

                      <button
                        type="button"
                        onClick={handleBulkRegularPriceSet}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Set Regular
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-xs font-semibold text-slate-500">
                      Sale Tools
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={bulkSalePriceValue}
                        onChange={(e) => setBulkSalePriceValue(e.target.value)}
                        placeholder="Sale Price"
                        className="h-10 w-28 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                      />

                      <button
                        type="button"
                        onClick={handleBulkSalePriceSet}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Set Sale
                      </button>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={bulkSalePercentValue}
                        onChange={(e) =>
                          setBulkSalePercentValue(e.target.value)
                        }
                        placeholder="Sale %"
                        className="h-10 w-24 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                      />

                      <button
                        type="button"
                        onClick={handleBulkSalePercentSet}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Apply %
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-xs font-semibold text-slate-500">
                      Brand & Category
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={bulkBrandValue}
                        onChange={(e) => {
                          setBulkBrandValue(e.target.value);
                          setCustomBrandValue("");
                        }}
                        className="h-10 w-36 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-sky-500"
                      >
                        <option value="">Select brand</option>
                        {brandOptions.map((brand) => (
                          <option key={brand} value={brand}>
                            {titleCase(brand)}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={customBrandValue}
                        onChange={(e) => {
                          setCustomBrandValue(e.target.value);
                          setBulkBrandValue("");
                        }}
                        placeholder="Create brand"
                        className="h-10 w-32 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                      />

                      <button
                        type="button"
                        onClick={handleBulkBrandSet}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Set Brand
                      </button>

                      <input
                        type="text"
                        value={bulkAddCategoryValue}
                        onChange={(e) =>
                          setBulkAddCategoryValue(e.target.value)
                        }
                        placeholder="Add category"
                        className="h-10 w-32 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                      />

                      <button
                        type="button"
                        onClick={handleBulkAddCategory}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-xs font-semibold text-slate-500">
                      Status
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleBulkSaleStatus(true)}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Sale ON
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBulkSaleStatus(false)}
                        className="h-10 rounded-lg border border-emerald-600 px-3 text-sm font-medium text-slate-700 hover:bg-emerald-50"
                      >
                        Sale OFF
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBulkToggleStatus("publish")}
                        className="h-10 rounded-lg bg-emerald-600 px-3 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Publish
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBulkToggleStatus("draft")}
                        className="h-10 rounded-lg bg-slate-700 px-3 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex h-64 items-center justify-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#6366f1"
              ariaLabel="loading"
            />
          </div>
        )}

        {!loading && (
          <div className="mt-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-4 py-3 text-xs text-slate-500">
                Loaded products: {products.length}
              </div>

              <div className="ag-theme-alpine w-full">
                <style jsx global>{`
                  .ag-theme-alpine {
                    --ag-font-size: 12px;
                    --ag-border-color: #e5e7eb;
                    --ag-header-background-color: #f8fafc;
                    --ag-header-foreground-color: #374151;
                    --ag-row-hover-color: #f9fafb;
                    --ag-selected-row-background-color: rgba(
                      59,
                      130,
                      246,
                      0.08
                    );
                    --ag-odd-row-background-color: #ffffff;
                    --ag-row-border-color: #f1f5f9;
                    --ag-background-color: #ffffff;
                    --ag-header-height: 44px;
                  }
                  .ag-theme-alpine .ag-cell {
                    display: flex;
                    align-items: center;
                  }
                  .ag-theme-alpine .ag-row.bg-yellow-50 .ag-cell {
                    background-color: #fefce8 !important;
                  }
                  .ag-theme-alpine .ag-row .ag-cell.bg-red-50 {
                    background-color: #fef2f2 !important;
                  }
                `}</style>

                <AgGridReact
                  ref={gridRef}
                  theme="legacy"
                  rowData={products}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  context={gridContext}
                  getRowId={(params) => String(params.data?._id || "")}
                  rowSelection={{
                    mode: "multiRow",
                    checkboxes: true,
                    headerCheckbox: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: 50,
                    minWidth: 50,
                    maxWidth: 50,
                    pinned: "left",
                    lockPinned: true,
                    suppressMovable: true,
                    resizable: false,
                    sortable: false,
                    filter: false,
                  }}
                  suppressRowClickSelection={true}
                  animateRows={true}
                  pagination={false}
                  headerHeight={44}
                  domLayout="autoHeight"
                  stopEditingWhenCellsLoseFocus={true}
                  enterNavigatesVertically={true}
                  enterNavigatesVerticallyAfterEdit={true}
                  suppressCellFocus={false}
                  ensureDomOrder={true}
                  tooltipShowDelay={0}
                  enableCellTextSelection={true}
                  undoRedoCellEditing={true}
                  undoRedoCellEditingLimit={UNDO_REDO_LIMIT}
                  copyHeadersToClipboard={false}
                  rowMultiSelectWithClick={true}
                  maintainColumnOrder={true}
                  onCellValueChanged={onCellValueChanged}
                  onGridReady={onGridReady}
                  onFirstDataRendered={onFirstDataRendered}
                  onSelectionChanged={onSelectionChanged}
                  getRowClass={getRowClass}
                  overlayNoRowsTemplate={
                    '<div class="py-10 text-sm text-gray-500">No products found.</div>'
                  }
                />
              </div>

              {emptyState && (
                <div className="border-t border-slate-100 py-16 text-center text-sm text-slate-500">
                  No products found.
                </div>
              )}
            </div>
          </div>
        )}

        {deletedId && (
          <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                Confirm Delete
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={() => setDeletedId(null)}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 transition disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleteLoading}
                  onClick={() => handleDelete(deletedId)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition disabled:opacity-60"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {imageModal.open && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <button
                type="button"
                onClick={() =>
                  setImageModal({
                    open: false,
                    title: "",
                    images: [],
                    activeIndex: 0,
                  })
                }
                className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="border-b p-4">
                <h3 className="truncate font-semibold text-gray-900">
                  {imageModal.title}
                </h3>
              </div>

              <div className="min-h-[400px] bg-gray-50 p-4">
                <div className="flex min-h-[420px] items-center justify-center">
                  {activePreviewImage ? (
                    <img
                      src={activePreviewImage}
                      alt={imageModal.title}
                      className="max-h-[70vh] max-w-full rounded-lg object-contain"
                    />
                  ) : (
                    <div className="text-gray-400">No image available</div>
                  )}
                </div>

                {imageModal.images.length > 1 && (
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setImageModal((prev) => ({
                          ...prev,
                          activeIndex:
                            prev.activeIndex === 0
                              ? prev.images.length - 1
                              : prev.activeIndex - 1,
                        }))
                      }
                      className="h-9 w-9 rounded-full border border-gray-300 bg-white text-gray-700"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div className="flex flex-1 gap-2 overflow-x-auto">
                      {imageModal.images.map((img, index) => (
                        <button
                          key={`${img.src}-${index}`}
                          type="button"
                          onClick={() =>
                            setImageModal((prev) => ({
                              ...prev,
                              activeIndex: index,
                            }))
                          }
                          className={`h-16 w-16 overflow-hidden rounded-md border ${
                            imageModal.activeIndex === index
                              ? "border-sky-500 ring-2 ring-sky-200"
                              : "border-gray-200"
                          }`}
                        >
                          <img
                            src={img.src}
                            alt={`thumb-${index}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setImageModal((prev) => ({
                          ...prev,
                          activeIndex:
                            prev.activeIndex === prev.images.length - 1
                              ? 0
                              : prev.activeIndex + 1,
                        }))
                      }
                      className="h-9 w-9 rounded-full border border-gray-300 bg-white text-gray-700"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {imageEditor.open && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <button
                type="button"
                onClick={() =>
                  setImageEditor({
                    open: false,
                    productId: "",
                    productName: "",
                    images: [],
                    newImageUrl: "",
                  })
                }
                className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="border-b p-5">
                <h3 className="font-semibold text-gray-900">
                  Edit Images — {imageEditor.productName}
                </h3>
              </div>

              <div className="max-h-[75vh] space-y-4 overflow-y-auto p-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageEditor.newImageUrl}
                    onChange={(e) =>
                      setImageEditor((prev) => ({
                        ...prev,
                        newImageUrl: e.target.value,
                      }))
                    }
                    placeholder="Paste image URL"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const url = String(imageEditor.newImageUrl || "").trim();

                      if (!url) {
                        toast.error("Enter image URL");
                        return;
                      }

                      setImageEditor((prev) => ({
                        ...prev,
                        images: [...prev.images, { src: url }],
                        newImageUrl: "",
                      }));
                    }}
                    className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {imageEditor.images.length ? (
                    imageEditor.images.map((img, index) => (
                      <div
                        key={`${img.src}-${index}`}
                        className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-xl border border-gray-200 p-3"
                      >
                        <div className="h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                          {img?.src ? (
                            <img
                              src={img.src}
                              alt={`img-${index}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No Img
                            </div>
                          )}
                        </div>

                        <input
                          type="text"
                          value={img?.src || ""}
                          onChange={(e) => {
                            const value = e.target.value;

                            setImageEditor((prev) => ({
                              ...prev,
                              images: prev.images.map((item, i) =>
                                i === index ? { ...item, src: value } : item,
                              ),
                            }));
                          }}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                        />

                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => {
                              setImageEditor((prev) => {
                                const next = [...prev.images];

                                [next[index - 1], next[index]] = [
                                  next[index],
                                  next[index - 1],
                                ];

                                return { ...prev, images: next };
                              });
                            }}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs"
                          >
                            Up
                          </button>

                          <button
                            type="button"
                            disabled={index === imageEditor.images.length - 1}
                            onClick={() => {
                              setImageEditor((prev) => {
                                const next = [...prev.images];

                                [next[index + 1], next[index]] = [
                                  next[index],
                                  next[index + 1],
                                ];

                                return { ...prev, images: next };
                              });
                            }}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs"
                          >
                            Down
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setImageEditor((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index,
                                ),
                              }));
                            }}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                      No images added yet.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t p-5">
                <button
                  type="button"
                  onClick={() =>
                    setImageEditor({
                      open: false,
                      productId: "",
                      productName: "",
                      images: [],
                      newImageUrl: "",
                    })
                  }
                  className="rounded-lg bg-gray-200 px-5 py-2.5 text-gray-800 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleImageEditorSave}
                  className="rounded-lg bg-sky-600 px-5 py-2.5 text-white hover:bg-sky-700 transition"
                >
                  Save Images
                </button>
              </div>
            </div>
          </div>
        )}

        {pageCount > 1 && (
          <div className="mt-8 mb-12 flex flex-wrap justify-center gap-2">
            {[...Array(pageCount).keys()].map((index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  page === index
                    ? "bg-[#49ADFF] text-white shadow"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
