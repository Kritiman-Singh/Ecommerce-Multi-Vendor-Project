package com.zosh.controller;

import com.zosh.exception.ProductException;
import com.zosh.model.Category;
import com.zosh.model.Product;
import com.zosh.model.Seller;
import com.zosh.repository.CategoryRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.repository.SellerRepository;
import com.zosh.request.CreateCategoryRequest;
import com.zosh.request.CreateProductRequest;
import com.zosh.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Admin catalog management.
 * Products created here are owned by the built-in "Zentro Store" system seller
 * (auto-created on startup, see DataInitializationComponent) so they flow
 * through the exact same storefront/cart/order pipeline as seller products.
 */
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminProductController {

    public static final String STORE_SELLER_EMAIL = "store@zentro.com";

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SellerRepository sellerRepository;

    // ---------- categories ----------

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping("/categories")
    public ResponseEntity<?> createCategory(@RequestBody CreateCategoryRequest req) {
        if (req.getCategoryId() == null || req.getCategoryId().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "categoryId is required (e.g. men_sherwanis)"));
        }
        if (categoryRepository.findByCategoryId(req.getCategoryId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Category already exists: " + req.getCategoryId()));
        }

        Category category = new Category();
        category.setName(req.getName() != null && !req.getName().isBlank()
                ? req.getName()
                : req.getCategoryId().replace("_", " "));
        category.setCategoryId(req.getCategoryId());
        category.setLevel(req.getLevel() == 0 ? 3 : req.getLevel());

        if (req.getParentCategoryId() != null && !req.getParentCategoryId().isBlank()) {
            Category parent = categoryRepository.findByCategoryId(req.getParentCategoryId());
            if (parent == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Parent category not found: " + req.getParentCategoryId()));
            }
            category.setParentCategory(parent);
        }

        return new ResponseEntity<>(categoryRepository.save(category), HttpStatus.CREATED);
    }

    // ---------- products ----------

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductRequest req) {
        Seller storeSeller = sellerRepository.findByEmail(STORE_SELLER_EMAIL);
        if (storeSeller == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Store seller not initialized. Please restart the backend once."));
        }
        if (req.getCategory3() == null || req.getCategory3().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Leaf category (category3) is required"));
        }
        try {
            Product product = productService.createProduct(req, storeSeller);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch (ProductException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok(Map.of("message", "Product deleted"));
        } catch (ProductException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Product not found: " + productId));
        }
    }
}
